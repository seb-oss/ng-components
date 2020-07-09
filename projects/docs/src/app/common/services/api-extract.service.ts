import { Injectable } from "@angular/core";
import XRegExp from "xregexp";
import { Observable, from, merge } from "rxjs";
import { map, reduce } from "rxjs/operators";
import { File as ParsedFile } from "typescript-parser/resources/File";
import {
    Declaration,
    TypescriptParser,
    AccessorDeclaration,
    ClassDeclaration,
    PropertyDeclaration,
    MethodDeclaration,
    ParameterDeclaration,
} from "typescript-parser";

export interface ApiSection {
    name: string;
    description: string;
    inputs?: Array<any>;
    outputs?: Array<any>;
    methods?: Array<any>;
    properties?: Array<any>;
}

interface APIInput {
    comment?: string;
    decorator?: string;
    alias?: string;
    accessor?: string;
    name?: string;
    optional?: string;
    default?: any;
    type?: string;
    private?: string;
    skip?: string;
}

interface ParsedAccessorDeclaration extends AccessorDeclaration {
    isOptional?: boolean;
}

interface ParsedAPI {
    [key: string]: APIInput;
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
    static formatSourceCode(sourceCode: string, regex: RegExp): any {
        let parsedObject: any = {};
        (XRegExp.match(sourceCode, regex) as Array<any>).forEach(element => {
            const parsedArray: XRegExp.ExecArray = XRegExp.exec(element, regex);
            const inputs: APIInput = {};
            Object.keys(parsedArray)
                .filter((key: string) => isNaN(parseInt(key, 10)))
                .map((key: string) => {
                    inputs[key] = parsedArray[key];
                });
            if (!!inputs.name) {
                parsedObject = { ...parsedObject, [inputs.name]: inputs };
            }
        });
        return parsedObject;
    }

    /**
     * extract input with comment from source code
     * @param sourceCode string of source code
     */
    static extractInputs(sourceCode: string): ParsedAPI {
        const regex: RegExp = XRegExp(
            `(\\/\\*\\*(?<skip>[\\s\\S]* <!-- skip -->[\\s\\S])?(?<comment>(?:[\\sA-Za-z\\*\\\`\\.\\,\\(\\)\\/\\?\\=\\:\\[\\]\\&\\{\\}]*))\\*\\/)?(?:[\\r\\n\\t\\s]*)(?<decorator>\\@Input)\\((?:'|"?)(?<alias>.*?)(?:'|")?(?:\\))(?:[\\W]+)(?<accessor>get|set|){1}(?:\\W)?(?<name>[^:?\\(]+)(?<optional>[?]?)+`,
            "g"
        );
        return this.formatSourceCode(sourceCode, regex);
    }

    /**
     * extract output with comment from source code
     * @param sourceCode string of source code
     */
    static extractOutputs(sourceCode: string): ParsedAPI {
        const regex: RegExp = XRegExp(
            `(?:\\/\\*\\*(?<skip>[\\s\\S]* <!-- skip -->[\\s\\S])?(?<comment>[\\s\\S][^@]+)\\*\\/[^@]+|)(?<decorator>\\@Output)\\((?:'|"?)(?<alias>.*?)(?:'|")?(?:\\))(?:\\W)?(?<name>[^\\:?]+)+`,
            "g"
        );
        return this.formatSourceCode(sourceCode, regex);
    }

    /**
     * extract property with comment from source code
     * @param sourceCode string of source code
     */
    static extractProperties(sourceCode: string): ParsedAPI {
        const regex: RegExp = XRegExp(
            `(\\/\\*\\*(?<skip>[\\s\\S]* <!-- skip -->[\\s\\S])?(?<comment>(?:[\\sA-Za-z\\*\\\`\\.\\,\\(\\)\\/\\?\\=\\:\\[\\]\\&\\{\\}]*))\\*\\/)?(?:[\\r\\n\\t\\s]*)(?<decorator>\\@Input)\\(\\) (?<name>[\\w\\$]+)\\??\\:\\s(?<type>[^\\;\\=]*)(?:\\;\\s| \\=\\s)[\\'\\"]?(?<default>[\\w][^\\;\\/\\'\\"]*)?[\\'\\"]?`,
            "g"
        );
        return this.formatSourceCode(sourceCode, regex);
    }

    /**
     * extract method with comment from source code
     * @param sourceCode string of source code
     */
    static extractMethods(sourceCode: string): ParsedAPI {
        const regex: RegExp = XRegExp(
            `(?:\\/\\*\\*(?<skip>[\\s\\S]* <!-- skip -->[\\s\\S])?(?<comment>[\\s\\S][^\\/]*)\\*\\/[^\\w\\@]+|)(?!constructor|Input|Component)(?<private>(private )?)(?<name>[a-zA-Z^@]*)\\((?<parameters>[^\\)]*)\\)\\:?\\s?(?<returns>[\\w\\<\\>]*)`,
            "g"
        );
        console.log(this.formatSourceCode(sourceCode, regex));
        return this.formatSourceCode(sourceCode, regex);
    }

    /**
     * extract component description from source code
     * @param sourceCode string of source code
     */
    static extractDescription(sourceCode: string): XRegExp.ExecArray {
        const regex: RegExp = XRegExp(`(?:\\/\\*\\*(?<comment>[\\s\\S][^\\/]*)\\*\\/[^\\w])`, "g");
        return XRegExp.exec(sourceCode, regex);
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
                    !extractedMethods[property.name]?.comment?.indexOf("<!-- skip -->") &&
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
     * sort input
     * @param a AccessorDeclaration
     * @param b AccessorDeclaration
     */
    static sortInputs(a: AccessorDeclaration, b: AccessorDeclaration): number {
        const isSet: boolean = a.constructor.name === "SetterDeclaration";
        return isSet ? -1 : 0;
    }

    initParse(sourceFileUrl: string): void {
        console.log(this.parseSourceFile(require(`!raw-loader!${sourceFileUrl}`).default));
        // this.$content = merge(...obs).pipe(reduce((previous: any, current: any) => [...previous, ...current], []));
    }

    /**
     * parse source file
     * @param source string of source code
     */
    parseSourceFile(source: string): Observable<Array<ApiSection>> {
        const description: XRegExp.ExecArray = APIExtractService.extractDescription(source);
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
        description: XRegExp.ExecArray,
        inputs: ParsedAPI,
        outputs: ParsedAPI,
        properties: ParsedAPI,
        methods: ParsedAPI
    ): Array<ApiSection> {
        return file.declarations
            .filter((declaration: Declaration) => declaration.constructor.name === "ClassDeclaration")
            .reduce((previous: Array<ApiSection>, current: ClassDeclaration) => {
                const declaration: ClassDeclaration = current;
                const section: ApiSection = {
                    description: description ? APIExtractService.parseComment(description.comment) : "n/a",
                    name: declaration.name,
                    inputs: this.parseInputs(declaration.accessors, inputs),
                    outputs: this.parseOutputs(declaration.properties, outputs),
                    properties: APIExtractService.parseProperties(declaration.properties, properties),
                    methods: APIExtractService.parseMethods(declaration.methods, methods),
                };
                const isEmpty: boolean = !Object.entries(section)
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
            .map((property: PropertyDeclaration) => ({
                ...property,
                description: outputs[property.name] && APIExtractService.parseComment(outputs[property.name].comment?.trim()),
            }));
    }
}
