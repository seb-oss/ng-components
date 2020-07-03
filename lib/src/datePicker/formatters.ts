export interface UIDate {
    day: number;
    month: number;
    year: number;
}

export function uiDateToString(uiDate: UIDate): string {
    const { year, month, day }: UIDate = uiDate;

    if (areNumbers([year, month, day])) {
        return `${year}-${padNumber(month)}-${padNumber(day)}`;
    }
    console.warn(`Could not convert UIDate with year ${year}, month ${month} and day ${day} to string`);
    return "";
}

export function padNumber(value: number): string {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return "";
    }
}

export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

export function isNumber(value: any): value is number {
    return !isNaN(toInteger(value));
}

export function areNumbers(values: any[]): boolean {
    return values.every(val => isNumber(val));
}
