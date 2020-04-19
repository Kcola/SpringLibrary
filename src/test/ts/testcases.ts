import {NewUser} from "../../main/resources/src/ts/interfaces";

export const ut1_values =
    [
        ["testuser", true],
        ["test_user", false],
        ["testUSER", true],
        ["testuser1", true],
        ["*test*user*", false],
        ["tes#tuser", false]
    ]
export const ut4_values =
    [
        ["yes", "yes", true],
        ["no", "no", true],
        ["no", "yes", false],
        ["dog", "dog", true],
        ["dog", "cat", false],
        ["man", "kind", false]
    ]
export let ut2_values =
    [
        [
            {
                firstname: "John",
                lastname: "Doe",
                address: "",
                email: "johnDoe@example.com",
                zipcode: "12345",
                type: "admin",
                password: ""
            } as NewUser, false
        ],
        [
            {
                firstname: "John",
                lastname: "Doe",
                address: "250 Central",
                email: "johnDoe@example.com",
                type: "admin",
                password: "hey_o",
                zipcode: "12345",
                username: "johnny"
            } as NewUser, true
        ],
        [
            {
                firstname: "John",
                address: "250 Central",
                email: "johnDoe@example.com",
                type: "admin",
                zipcode: "12345"
            } as NewUser, false
        ],
        [
            {
                address: "250 Central",
                lastname: "Doe"
            } as NewUser, false
        ]

    ]