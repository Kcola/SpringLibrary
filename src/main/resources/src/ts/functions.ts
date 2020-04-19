import * as moment from "moment"
import {NewUser} from "./interfaces";

export function validUserName(s: string) {
    return /^[a-z0-9]+$/i.test(s);
}

export function validateRegistrationObject(obj: NewUser): boolean {
    let output = true;
    if (obj.address === "" || obj.address === undefined)
        output = false
    if (obj.firstname === "" || obj.firstname === undefined)
        output = false
    if (obj.lastname === "" || obj.lastname === undefined)
        output = false
    if (obj.zipcode === "" || obj.zipcode === undefined)
        output = false
    if (obj.type === undefined)
        output = false
    if (obj.email === "" || obj.email === undefined)
        output = false
    if (obj.password === "" || obj.password === undefined)
        output = false
    return output;
}

export function calculateFine(borrowDate: Date): number {
    const today = moment();
    let fine = today.diff(moment(borrowDate), 'days') * 0.20;
    return fine;
}

export function inputConfirmed(input1: string, input2: string): boolean {
    return input1 === input2;
}