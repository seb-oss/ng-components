export function sortArray<T>(array: Array<T>, sortBy: keyof T): Array<T> {
    return array.sort((first: T, second: T) => {
        return String(first[sortBy]).localeCompare(String(second[sortBy]), "en", { sensitivity: "base" });
    });
}
