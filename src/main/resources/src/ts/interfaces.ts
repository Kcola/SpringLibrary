export interface Reader {
    readerid: number,
    email: string,
    rtype: "admin" | "user",
    firstname: string,
    lastname: string,
    address: string,
    zipcode: string
}

export interface NewUser {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string,
    zipcode: string,
    address: string,
    type: "user" | "admin",
}

export interface ReturningUser {
    username: string,
    password: string
}