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
