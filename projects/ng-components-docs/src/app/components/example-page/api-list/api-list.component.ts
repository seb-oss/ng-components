import { Component, OnInit } from "@angular/core";
import { from, merge, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Declaration, TypescriptParser } from "typescript-parser";
import { File as ParsedFile } from "typescript-parser/resources/File";
import { ApiSection } from "../../../interfaces/api-section";
import marked from "marked";
import { map, reduce } from "rxjs/operators";
import XRegExp from "xregexp";

interface APIInput {
    comment?: string;
    decorator?: string;
    alias?: string;
    accessor?: string;
    name?: string;
    optional?: string;
}

@Component({
    selector: "app-api-list",
    templateUrl: "./api-list.component.html",
    styleUrls: ["./api-list.component.scss"],
})
export class ApiListComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}
    $content: Observable<any>;

    static formatSourceCode(sourceCode: string, regex: RegExp) {
        let parsedInputs: any = {};
        (XRegExp.match(sourceCode, regex) as Array<any>).forEach(element => {
            const parsedArray: XRegExp.ExecArray = XRegExp.exec(element, regex);
            const inputs: APIInput = {};
            Object.keys(parsedArray)
                .filter((key: string) => isNaN(parseInt(key, 10)))
                .map((key: string) => {
                    inputs[key] = parsedArray[key];
                });
            if (!!inputs.name) {
                parsedInputs = { ...parsedInputs, [inputs.name]: inputs };
            }
        });
        return parsedInputs;
    }

    static extractInputs(sourceCode: string) {
        const regex = XRegExp(
            `(\\/\\*\\*(?<comment>(?:[\\sA-Za-z\\*\\\`\\.\\,\\(\\)\\/\\?\\=\\:\\[\\]\\&\\{\\}]*))\\*\\/)?(?:[\\r\\n\\t\\s]*)(?<decorator>\\@Input)\\((?:'|"?)(?<alias>.*?)(?:'|")?(?:\\))(?:[\\W]+)(?<accessor>get|set|){1}(?:\\W)?(?<name>[^:?\\(]+)(?<optional>[?]?)+`,
            "g"
        );
        return this.formatSourceCode(sourceCode, regex);
    }

    static extractOutputs(sourceCode: string) {
        const regex = XRegExp(
            `(?:\\/\\*\\*(?<comment>[\\s\\S][^@]+)\\*\\/[^@]+|)(?<decorator>\\@Output)\\((?:'|"?)(?<alias>.*?)(?:'|")?(?:\\))(?:\\W)?(?<name>[^\\:?]+)(?<optional>[?]?)+`,
            "g"
        );
        return this.formatSourceCode(sourceCode, regex);
    }

    static extractProperties(sourceCode: string) {
        const regex = XRegExp(
            `(?<name>[\\w\\$]+)(?<optional>\\??)\\:\\s(?<type>.[^\\;\\s]*)(?:\\;\\s| \\=\\s)[\\'\\"]?(?<default>[\\w][^\\;\\/\\'\\"]*)?[\\'\\"]?(?:\\;?\\s?\\/\\/\\s?(?<comment>.*))?`,
            "g"
        );
        return this.formatSourceCode(sourceCode, regex);
    }
    static extractMethods(sourceCode: string) {
        const regex = XRegExp(
            `(?:\\/\\*\\*(?<comment>[\\s\\S][^\\/]*)\\*\\/[^\\w\\@]+|)[^\\w\\]](?!constructor|Input|Component)(?<name>[a-z]*)\\((?<parameters>[^\\)]*)\\)\\:?\\s?(?<returns>[\\w\\<\\>]*)`,
            "g"
        );
        return this.formatSourceCode(sourceCode, regex);
    }
    static extractDescription(sourceCode: string) {
        const regex = XRegExp(`(?:\\/\\*\\*(?<comment>[\\s\\S][^\\/]*)\\*\\/[^\\w])`, "g");
        return XRegExp.exec(sourceCode, regex);
    }

    static parseProperties(properties: Array<any>, extractedProperties: any): Array<any> {
        return properties
            .filter(
                property =>
                    property.type &&
                    property.type.indexOf("EventEmitter") === -1 && // remove properties of type event emitter (Outputs)
                    property.name.substring(0, 1) !== "_" // remove private properties
            )
            .map(property => {
                return extractedProperties[property.name]
                    ? {
                          ...property,
                          default: extractedProperties[property.name].default,
                          type: extractedProperties[property.name].type,
                          description: ApiListComponent.parseComment(extractedProperties[property.name].comment),
                          isOptional: extractedProperties[property.name]?.optional === "?",
                      }
                    : {
                          ...property,
                      };
            });
    }

    static parseMethods(methods: Array<any>, extractedMethods: any): Array<any> {
        return methods
            .filter(
                property =>
                    property.name.substring(0, 2) !== "ng" && property.name.substring(0, 1) !== "_" // remove angular lifecycle methods
            ) // remove private methods
            .map(method => {
                return {
                    ...method,
                    functionCall:
                        method.name +
                        "(" +
                        (extractedMethods[method.name]
                            ? extractedMethods[method.name].parameters
                            : method.parameters
                                  .map(param => param.name + ": " + param.type)
                                  .toString()
                                  .replace(/,/g, ", ")) +
                        ")",
                    description: extractedMethods[method.name]
                        ? ApiListComponent.parseComment(extractedMethods[method.name].comment.trim())
                        : "n/a",
                };
            });
    }

    static parseComment(comment: string) {
        return comment ? marked(comment.replace(/\*\/+|\/\*+|\*\s+|[\t\r\n]/g, "")) : "n/a";
    }

    static sortInputs(a, b) {
        const isSet = a.constructor.name === "SetterDeclaration";
        return isSet ? -1 : 0;
    }

    ngOnInit() {
        const sources = this.route.routeConfig.data.sources;
        const obs = sources.reduce((previous, current) => {
            return [...previous, this.parseSourceFile(current)];
        }, []);
        this.$content = merge(...obs).pipe(reduce((previous: any, current: any) => [...previous, ...current], []));
    }

    parseSourceFile(source: string): Observable<ApiSection[]> {
        const description = ApiListComponent.extractDescription(source);
        const inputs = ApiListComponent.extractInputs(source);
        const outputs = ApiListComponent.extractOutputs(source);
        const properties = ApiListComponent.extractProperties(source);
        const methods = ApiListComponent.extractMethods(source);
        const tsParser = new TypescriptParser();
        return from(tsParser.parseSource(source)).pipe(map(res => this.parse(res, description, inputs, outputs, properties, methods)));
    }

    parse(file: ParsedFile, description: any, inputs: any, outputs: any, properties: any, methods: any): Array<ApiSection> {
        return file.declarations
            .filter(declaration => declaration.constructor.name === "ClassDeclaration")
            .reduce((previous, current: any) => {
                const declaration: Declaration = current;
                const section: ApiSection = {
                    description: description ? ApiListComponent.parseComment(description.comment) : "n/a",
                    name: declaration.name,
                    // @ts-ignore
                    inputs: this.parseInputs(declaration.accessors, inputs),
                    // @ts-ignore
                    outputs: this.parseOutputs(declaration.properties, outputs),
                    // @ts-ignore
                    properties: ApiListComponent.parseProperties(
                        // @ts-ignore
                        declaration.properties,
                        properties
                    ),
                    // @ts-ignore
                    methods: ApiListComponent.parseMethods(declaration.methods, methods),
                };
                const isEmpty = !Object.entries(section)
                    .filter(key => Array.isArray(key[1]))
                    .some(key => key[1].length > 0);
                return isEmpty ? [...previous] : [...previous, section];
            }, []);
    }

    parseInputs(accessors: Array<any>, inputs: any): Array<any> {
        return accessors.sort(ApiListComponent.sortInputs).reduce((previous, current: any) => {
            const input = previous.find(i => i.name === current.name);
            if (input) {
                input.type = current.type;
                return [...previous];
            }
            console.log(inputs, current, inputs[current.name]?.comment);
            return [
                ...previous,
                {
                    ...current,
                    alias: inputs[current.name]?.alias,
                    description: ApiListComponent.parseComment(inputs[current.name]?.comment.trim()),
                    isOptional: inputs[current.name]?.optional === "?",
                },
            ];
        }, []);
    }

    parseOutputs(properties: Array<any>, outputs: any): Array<any> {
        return properties
            .filter(property => property.type && property.type.indexOf("EventEmitter") !== -1)
            .map(property => {
                console.log(outputs);
                return {
                    ...property,
                    description: outputs[property.name] && ApiListComponent.parseComment(outputs[property.name].comment.trim()),
                    isOptional: outputs[property.name]?.optional === "?",
                };
            });
    }
}
