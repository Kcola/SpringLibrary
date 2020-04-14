import { validUserName, validateRegistrationObject, calculateFine } from "../../main/resources/src/ts/functions";
import {Reader} from "../../main/resources/src/ts/interfaces";
import * as moment from "moment";
test('Check if username only contains letters and/or numbers', () => {
    expect(validUserName('testUser')).toBe(true);
});

test('Recursively check reader object for empty values', () => {
    let testReader = {firstname: "John", lastname: "Doe", address:"", email:"johnDoe@example.com", readerid:1 , rtype: "admin", zipcode: "12345" } as Reader;
    expect(validateRegistrationObject(testReader)).toBe(false);
});
test('Test fine calculator', ()=>{
    let borrowDate = moment().subtract(10, 'days').toDate() as Date;
    let fine = 0;
    try {
        fine = calculateFine(borrowDate);
    }catch (e) {
        console.log(e.message);
    }
    expect(fine).toBe(2);
});