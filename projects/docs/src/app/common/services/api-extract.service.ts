import { Injectable } from "@angular/core";
import { Observable, from, merge } from "rxjs";
import { map, reduce } from "rxjs/operators";
import { File as ParsedFile } from "typescript-parser-es5/resources/File";
import {
    Declaration,
    TypescriptParser,
    AccessorDeclaration,
    ClassDeclaration,
    PropertyDeclaration,
    MethodDeclaration,
    ParameterDeclaration,
} from "typescript-parser-es5";

interface ParsedAccessorDeclaration extends AccessorDeclaration {
    isOptional?: boolean;
}

interface RegexMapper {
    name: keyof APIInput;
    index: string;
}

@Injectable()
export class APIExtractService {
    constructor() {}
    $content: Observable<any>;

    /**
     * extract input/output/properties to object
     * @param sourceCode string of source code
     * @param regex regular expression
     */
    static formatSourceCode(sourceCode: string, regex: RegExp, mapper: Array<RegexMapper>): any {
        let parsedObject: any = {};
        let parsedArray: Array<any> = [];
        while ((parsedArray = regex.exec(sourceCode))) {
            const inputs: APIInput = {};
            Object.keys(parsedArray)
                .filter((key: string) => {
                    return mapper.findIndex(({ index }: RegexMapper) => index === key) > -1;
                })
                .map((key: string) => {
                    const name: string = mapper.find(({ index }: RegexMapper) => index === key)?.name;
                    inputs[name] = parsedArray[key];
                });
            if (!!inputs.name) {
                parsedObject = { ...parsedObject, [inputs.name]: inputs };
            }
        }
        return parsedObject;
    }

    /**
     * extract input with comment from source code
     * @param sourceCode string of source code
     */
    static extractInputs(sourceCode: string): ParsedAPI {
        const regex: RegExp = new RegExp(
            `(\\/\\*\\*([\\s\\S]<!-- skip -->[\\s\\S])?(\\s*\\n)?([^\\*]|(\\*(?!\\/)))*\\*\\/)?(?:[\\r\\n\\t\\s]*)(\\@Input)\\((?:'|"?)(.*?)(?:'|")?(?:\\))(?:[\\W]+)(get|set|){1}(?:\\W)?([^:?\\(]+)([?]?)+`,
            "g"
        );
        const mappers: Array<RegexMapper> = [
            { name: "comment", index: "1" },
            { name: "skip", index: "2" },
            { name: "decorator", index: "6" },
            { name: "alias", index: "7" },
            { name: "accessor", index: "8" },
            { name: "name", index: "9" },
            { name: "optional", index: "10" },
        ];
        return this.formatSourceCode(sourceCode, regex, mappers);
    }

    /**
     * extract output with comment from source code
     * @param sourceCode string of source code
     */
    static extractOutputs(sourceCode: string): ParsedAPI {
        const regex: RegExp = new RegExp(
            `(?:(\\/\\*\\*([\\s\\S]<!-- skip -->[\\s\\S])?(\\s*\\n)?([^\\*]|(\\*(?!\\/)))*\\*\\/)[^@]+|)(\\@Output)\\((?:'|"?)(.*?)(?:'|")?(?:\\))(?:\\W)?([^\\:?]+)+`,
            "g"
        );
        const mappers: Array<RegexMapper> = [
            { name: "comment", index: "1" },
            { name: "skip", index: "2" },
            { name: "decorator", index: "6" },
            { name: "alias", index: "7" },
            { name: "name", index: "8" },
        ];
        return this.formatSourceCode(sourceCode, regex, mappers);
    }

    /**
     * extract property with comment from source code
     * @param sourceCode string of source code
     */
    static extractProperties(sourceCode: string): ParsedAPI {
        const regex: RegExp = new RegExp(
            `(\\/\\*\\*([\\s\\S]<!-- skip -->[\\s\\S])?(\\s*\\n)?([^\\*]|(\\*(?!\\/)))*\\*\\/)?(?:[\\r\\n\\t\\s]*)(\\@Input)\\(\\) ([\\w\\$]+)\\??\\:\\s([^\\;\\=]*)(?:\\;\\s| \\=\\s)[\\'\\"]?([\\w][^\\;\\/\\'\\"]*)?[\\'\\"]?`,
            "g"
        );
        const mappers: Array<RegexMapper> = [
            { name: "comment", index: "1" },
            { name: "skip", index: "2" },
            { name: "decorator", index: "6" },
            { name: "name", index: "7" },
            { name: "type", index: "8" },
            { name: "default", index: "9" },
        ];
        return this.formatSourceCode(sourceCode, regex, mappers);
    }

    /**
     * extract method with comment from source code
     * @param sourceCode string of source code
     */
    static extractMethods(sourceCode: string): ParsedAPI {
        const regex: RegExp = new RegExp(
            `((\\/\\*\\*([\\s\\S]<!-- skip -->[\\s\\S])?(\\s*\\n)?([^\\*]|(\\*(?!\\/)))*\\*\\/)?[^\\w\\@]+|)(?!constructor|Input|Component)((private )?)([a-zA-Z^@]*)\\(([^\\)]*)\\)\\:?\\s?([\\w\\<\\>]*)`,
            "g"
        );
        const mappers: Array<RegexMapper> = [
            { name: "comment", index: "2" },
            { name: "skip", index: "3" },
            { name: "private", index: "8" },
            { name: "name", index: "9" },
            { name: "parameter", index: "10" },
            { name: "return", index: "11" },
        ];
        return this.formatSourceCode(sourceCode, regex, mappers);
    }

    /**
     * extract component description from source code
     * @param sourceCode string of source code
     */
    static extractDescription(sourceCode: string): APIInput {
        const regex: RegExp = new RegExp(
            `((\\/\\*\\*(\\s*\\n)?([^\\*]|(\\*(?!\\/)))*\\*\\/)?[^\\w\\@]+|)((\\@Component|\\@Directive))`,
            "g"
        );
        const parsedArray: Array<any> = regex.exec(sourceCode);
        return { comment: parsedArray[1], decorator: parsedArray[6] };
    }

    /**
     * parse properties
     * @param properties array of PropertyDeclaration
     * @param extractedProperties parsed API
     */
    static parseProperties(properties: Array<PropertyDeclaration>, extractedProperties: ParsedAPI): Array<PropertyDeclaration> {
        return properties
            .filter(
                (property: PropertyDeclaration) =>
                    property.type &&
                    property.type.indexOf("EventEmitter") === -1 && // remove properties of type event emitter (Outputs)
                    property.name.substring(0, 1) !== "_" && // remove private properties
                    !!extractedProperties[property.name] &&
                    !extractedProperties[property.name]?.skip?.length
            )
            .map((property: PropertyDeclaration) => {
                return extractedProperties[property.name]
                    ? {
                          ...property,
                          default: extractedProperties[property.name].default,
                          description: APIExtractService.parseComment(extractedProperties[property.name].comment?.trim()),
                      }
                    : {
                          ...property,
                      };
            });
    }

    /**
     * parse methods
     * @param methods array of MethodDeclaration
     * @param extractedMethods parsed API
     */
    static parseMethods(methods: Array<MethodDeclaration>, extractedMethods: ParsedAPI): Array<MethodDeclaration> {
        return methods
            .filter(
                (property: MethodDeclaration) =>
                    property.name.substring(0, 2) !== "ng" &&
                    property.name.substring(0, 1) !== "_" &&
                    !!extractedMethods[property.name] &&
                    !extractedMethods[property.name]?.private?.length &&
                    !extractedMethods[property.name]?.skip?.length
            ) // remove private methods
            .map((method: MethodDeclaration) => {
                return {
                    ...method,
                    functionCall: `${method.name}(${method.parameters
                        .map((param: ParameterDeclaration) => param.name + ": " + param.type)
                        .toString()
                        .replace(/,/g, ", ")})`,
                    description: extractedMethods[method.name]
                        ? APIExtractService.parseComment(extractedMethods[method.name].comment?.trim())
                        : "n/a",
                };
            });
    }

    /**
     * parse comment
     * @param comment string of comment
     */
    static parseComment(comment: string): string {
        return comment ? comment.replace(/\*\/+|\/\*+|\*\s+|[\t\r\n]/g, "") : "n/a";
    }

    /**
     * parse output type
     * @param type output type
     */
    static parseOutputType(type: string): APIInput {
        const regex: RegExp = new RegExp(`(EventEmitter<([a-zA-Z]+)>)`, "g");
        const parsedArray: Array<any> = regex.exec(type);
        return { type: parsedArray[2] };
    }

    /**
     * sort input
     * @param a AccessorDeclaration
     * @param b AccessorDeclaration
     */
    static sortInputs(a: AccessorDeclaration, b: AccessorDeclaration): number {
        const isSet: boolean = a.constructor.name === "SetterDeclaration";
        return isSet ? -1 : 0;
    }

    initParse(sourceFileUrl: any): Observable<Array<ApiSection>> {
        return this.parseSourceFile(sourceFileUrl?.default);
    }

    /**
     * parse source file
     * @param source string of source code
     */
    parseSourceFile(source: string): Observable<Array<ApiSection>> {
        const description: APIInput = APIExtractService.extractDescription(source);
        const inputs: ParsedAPI = APIExtractService.extractInputs(source);
        const outputs: ParsedAPI = APIExtractService.extractOutputs(source);
        const properties: ParsedAPI = APIExtractService.extractProperties(source);
        const methods: ParsedAPI = APIExtractService.extractMethods(source);
        const tsParser: TypescriptParser = new TypescriptParser();
        return from(tsParser.parseSource(source)).pipe(
            map((res: ParsedFile) => this.parse(res, description, inputs, outputs, properties, methods))
        );
    }

    /**
     * parse source code file to api
     * @param file parsed file
     * @param description extracted description
     * @param inputs extracted inputs
     * @param outputs extracted outputs
     * @param properties extracted properties
     * @param methods extracted methods
     */
    parse(
        file: ParsedFile,
        description: APIInput,
        inputs: ParsedAPI,
        outputs: ParsedAPI,
        properties: ParsedAPI,
        methods: ParsedAPI
    ): Array<ApiSection> {
        return file.declarations
            .filter((declaration: Declaration) => {
                // only parse component or directive
                return declaration.name.indexOf("Directive") > -1 || declaration.name.indexOf("Component") > -1;
            })
            .reduce((previous: Array<ApiSection>, current: ClassDeclaration) => {
                const declaration: ClassDeclaration = current;
                const section: ApiSection = {
                    description: description ? APIExtractService.parseComment(description.comment) : "n/a",
                    name: declaration.name,
                    inputs: this.parseInputs(declaration.accessors, inputs),
                    outputs: this.parseOutputs(declaration.properties, outputs),
                    properties: APIExtractService.parseProperties(declaration.properties, properties) as any,
                    // methods: APIExtractService.parseMethods(declaration.methods, methods) as any,
                };
                const isEmpty: boolean = !this.getEntries(section)
                    .filter((key: [string, any]) => Array.isArray(key[1]))
                    .some((key: [string, any]) => key[1].length > 0);
                return isEmpty ? [...previous] : [...previous, section];
            }, []);
    }

    /**
     * parse inputs
     * @param accessors array of AccessorDeclaration
     * @param inputs extracted api
     */
    parseInputs(accessors: Array<AccessorDeclaration>, inputs: ParsedAPI): Array<AccessorDeclaration> {
        return accessors
            .filter((item: AccessorDeclaration) => !!inputs[item.name] && !inputs[item.name]?.skip?.length)
            .sort(APIExtractService.sortInputs)
            .reduce((previous: Array<ParsedAccessorDeclaration>, current: AccessorDeclaration) => {
                const input: ParsedAccessorDeclaration = previous.find((i: ParsedAccessorDeclaration) => i.name === current.name);
                if (!!input && !inputs[input.name]?.skip?.length) {
                    input.type = current.type;
                    return [...previous];
                }
                return [
                    ...previous,
                    {
                        ...current,
                        alias: inputs[current.name]?.alias,
                        description: APIExtractService.parseComment(inputs[current.name]?.comment?.trim()),
                        isOptional: inputs[current.name]?.optional === "?",
                    },
                ];
            }, []);
    }

    /**
     * parse outputs
     * @param accessors array of PropertyDeclaration
     * @param outputs extracted api
     */
    parseOutputs(properties: Array<PropertyDeclaration>, outputs: ParsedAPI): Array<PropertyDeclaration> {
        return properties
            .filter(
                (property: PropertyDeclaration) =>
                    property.type && property.type.indexOf("EventEmitter") !== -1 && !outputs[property.name]?.skip?.length
            )
            .map((property: PropertyDeclaration) => {
                return {
                    ...property,
                    type: APIExtractService.parseOutputType(property.type)?.type || "n/a",
                    description: outputs[property.name] && APIExtractService.parseComment(outputs[property.name].comment?.trim()),
                };
            });
    }

    /** get object entries */
    getEntries(obj: ApiSection): Array<any> {
        const ownProps: Array<string> = Object.keys(obj);
        let i: number = ownProps.length;
        const resArray: Array<any> = new Array(i); // preallocate the Array
        while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }
        return resArray;
    }
}
