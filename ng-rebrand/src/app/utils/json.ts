export function jsonCopy(obj: Object) {
    return JSON.parse(JSON.stringify(obj));
}

export function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}