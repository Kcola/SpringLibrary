import { validUserName, validateRegistrationObject } from "../../main/resources/src/ts/functions";
import {Reader} from "../../main/resources/src/ts/interfaces";

test('Check if username only contains letters and/or numbers', () => {
    expect(validUserName('testUser')).toBe(true);
});

test('Recursively check reader object for empty values', () => {
    let testReader = {firstname: "John", lastname: "Doe", address:"", email:"johnDoe@example.com", readerid:1 , rtype: "admin", zipcode: "12345" } as Reader;
    expect(validateRegistrationObject(testReader)).toBe(false);
});