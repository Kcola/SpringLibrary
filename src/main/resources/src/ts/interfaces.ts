export interface Reader{
    readerid : number,
    email: string,
    rtype: "admin"|"user",
    firstname: string,
    lastname: string,
    address: string,
    zipcode: string
}