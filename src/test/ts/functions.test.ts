import {
    calculateFine,
    inputConfirmed,
    validateRegistrationObject,
    validUserName
} from "../../main/resources/src/ts/functions";
import {ut1_values, ut2_values, ut4_values} from "./testcases"
import {NewUser} from "../../main/resources/src/ts/interfaces";
import * as moment from "moment";

test.each(ut1_values)('Check if username only contains letters and/or numbers', (username: string, bool: boolean) => { //UNIT TEST 1
    expect(validUserName(username)).toBe(bool);
});

test.each(ut2_values)('Recursively check reader object for empty values', (readerObj: NewUser, bool: boolean) => { //UNIT TEST 2
    expect(validateRegistrationObject(readerObj)).toBe(bool);
});

test('Test fine calculator', () => { //UNIT TEST 3
    let borrowDate = moment().subtract(10, 'days').toDate() as Date;
    let fine = 0;
    fine = calculateFine(borrowDate);
    expect(fine).toBe(2);
});


test.each(ut4_values)('Test matching inputs', (input1: string, input2: string, bool: boolean) => { //UNIT TEST 4
    expect(inputConfirmed(input1, input2)).toBe(bool);
});