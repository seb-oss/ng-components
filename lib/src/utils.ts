import { capitalize } from "@sebgroup/frontend-tools/dist/capitalize";

/**
 * Creates a human readable text from camel case
 * @param {string} value the camel case string (example "caseId")
 * @param {boolean} shouldCapitalizeEvery OPTIONAL should every subsequest word be capitalized? Defaults to false
 * @returns the a capitalised human readable string (example "Case Id" or "Case id")
 */
export function readableFromCamelCase(value: string, shouldCapitalizeEvery?: boolean): string {
    let wordList: Array<string> = capitalize(value)
        .split(/([A-Z][a-z]+)/)
        .filter(e => e);
    if (wordList && wordList.length) {
        wordList = [...wordList.map(val => (val.match(/([A-Z][a-z]+)/) ? val.toLowerCase() : val))];
        if (shouldCapitalizeEvery) {
            wordList = [...wordList.map(val => capitalize(val))];
        } else {
            wordList[0] = capitalize(wordList[0]);
        }
        return [...wordList].join(" ");
    }
    return "";
}
