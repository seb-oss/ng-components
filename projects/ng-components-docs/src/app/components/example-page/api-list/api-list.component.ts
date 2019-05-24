import { Component, OnInit } from '@angular/core';
import {from, merge, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Declaration, TypescriptParser} from 'typescript-parser';
import {File as ParsedFile} from 'typescript-parser/resources/File';
import {ApiSection} from '../../../interfaces/api-section';
import marked from 'marked';
import {map, reduce, tap} from 'rxjs/operators';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss']
})
export class ApiListComponent implements OnInit {

  $content: Observable<any>;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const sources = this.route.routeConfig.data.sources;
    const obs = sources.reduce((previous, current) => {
      return [...previous, this.parseSourceFile(current)];
    }, []);
    this.$content = merge(...obs).pipe(
        reduce((previous, current) => [...previous, ...current],[]),
    );
  }

  parseSourceFile(source: string): Observable<ApiSection[]> {
    const inputs = ApiListComponent.extractInputs(source);
    const outputs = ApiListComponent.extractOutputs(source);
    const tsParser = new TypescriptParser();
    return from(tsParser.parseSource(source)).pipe(
        map(res => this.parse(res, inputs, outputs))
    );
  }

  parse(file: ParsedFile, inputs: any, outputs: any): Array<ApiSection> {

    return file.declarations
      .filter(declaration => declaration.constructor.name === 'ClassDeclaration')
      .reduce((previous, current: any) => {
      const declaration: Declaration = current;
      const section: ApiSection = {
        name: declaration.name,
        // @ts-ignore
        inputs: this.parseInputs(declaration.accessors, inputs),
        // @ts-ignore
        outputs: this.parseOutputs(declaration.properties, outputs),
        // @ts-ignore
        properties: ApiListComponent.parseProperties(declaration.properties),
        // @ts-ignore
        methods: ApiListComponent.parseMethods(declaration.methods)
      };
      const isEmpty = !Object.entries(section)
          .filter(key => Array.isArray(key[1]))
          .some(key => { console.log(key[1]); return key[1].length > 0});
      return isEmpty ? [...previous] : [...previous, section];
      }, []
    );
  }

  static extractInputs(sourceCode: string) {
    const regex = /(?:\/\*\*(?<comment>[\W\w]*?)\*\/[\W][^@]+|)(?<decorator>\@Input)\((?:'|"?)(?<alias>.*?)(?:'|")?(?:\))(?:[\W]+)(?<accessor>get|set|){1}(?:\W)?(?<name>[^\(]+)/g;
    let input = regex.exec(sourceCode);
    let inputs = input ? {[input.groups.name] : input.groups} : {};
    while (input !== null) {
      input = regex.exec(sourceCode);
      if (input) {
        inputs = {...inputs, [input.groups.name] : input.groups};
      }
    }
    return inputs;
  }

  static extractOutputs(sourceCode: string) {
    const regex = /(?:\/\*\*(?<comment>[\s\S][^@]+)\*\/[^@]+|)(?<decorator>\@Output)\((?:'|"?)(?<alias>.*?)(?:'|")?(?:\))(?:\W)?(?<name>[^\:]+)/g;
    let output = regex.exec(sourceCode);
    let outputs = output ? {[output.groups.name] : output.groups} : {};
    while (output !== null) {
      output = regex.exec(sourceCode);
      if (output) {
        outputs = {...outputs, [output.groups.name] : output.groups};
      }
    }
    return outputs;
  }

  parseInputs(accessors: Array<any>, inputs: any): Array<any> {
    return accessors
      .sort(ApiListComponent.sortInputs)
      .reduce((previous, current: any) => {
        const input = previous.find(i => i.name === current.name);
        if (input) {
          input.type = current.type;
          return [...previous];
        }
        return [...previous, {
          ...current,
          alias: inputs[current.name].alias,
          description: ApiListComponent.parseComment(inputs[current.name].comment)
        }];
      }, []);
  }

  parseOutputs(properties: Array<any>, outputs: any): Array<any> {
    return properties
      .filter(property => property.type && property.type.indexOf('EventEmitter') !== -1)
        .map(property => {
          return {
            ...property, description: ApiListComponent.parseComment(outputs[property.name].comment)
          }
        });
  }

  static parseProperties(properties: Array<any>): Array<any> {
    return properties
      .filter(property =>
        property.type && property.type.indexOf('EventEmitter') === -1 && // remove properties of type event emitter (Outputs)
        property.name.substring(0, 1) !== '_'); // remove private properties
  }

  static parseMethods(methods: Array<any>): Array<any> {
    return methods
      .filter(property =>
        property.name.substring(0, 2) !== 'ng' && // remove angular lifecycle methods
        property.name.substring(0, 1) !== '_') // remove private methods
      .map(method => {
        return {
          ...method, functionCall:
              method.name + '(' +
              method.parameters.map(param => param.name + ': ' +
              param.type).toString().replace(/,/g, ', ') + ')'
        };
      });
  }

  static parseComment(comment: string) {
    return comment ? marked(comment.replace(/\*\s+|[\t\r\n]/g,'')) : 'n/a';
  }

  static sortInputs(a, b) {
    const isSet = a.constructor.name === 'SetterDeclaration';
    return isSet ? -1 : 0;
  }
}

