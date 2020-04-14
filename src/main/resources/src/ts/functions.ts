import * as moment from "moment"
export function validUserName(s: string) {
    return /^[a-z0-9]+$/i.test(s);
}

export function validateRegistrationObject(obj: any) {
    for (let key in obj) {
        if (obj[key] === null || obj[key] === "")
            return false;
    }
    return true;
}

export function calculateFine(borrowDate: Date): number {
    const today = moment();
    let fine = today.diff(moment(borrowDate), 'days') * 0.20;
    return fine;
}