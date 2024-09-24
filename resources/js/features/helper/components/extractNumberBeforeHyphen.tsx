export default function extractNumberBeforeHyphen(input: string) {
    const match = input.match(/(\d+)-/);
    if (match) {
        return Number(match[1]);
    }
}

export function getNameCategory(input: string) {
    const position = input.indexOf('-');
    const resultName = position !== -1 ? input.slice(position + 1).trim() : input;

    return resultName;
}

export function CheckNegativeNumber(data:number) {
    if(data < 0) {
        return true
    }

    return false;
}