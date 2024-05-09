export class CS571Util {
    public static getDateForLogging(): string {
        const dt = new Date().toString().replace(/[A-Z]{3}\+/, '+').split(/ /);
        return `${dt[2]}/${dt[1]}/${dt[3]}:${dt[4]} ${dt[5]}`;
    }
}