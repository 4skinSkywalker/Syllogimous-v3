export function guid() {
    return Math.random().toString(36).substring(2, 15)
         + Math.random().toString(36).substring(2, 15);
}

export function suid(length = 40) {
    return Math.random().toString(36).substring(2, 2 + Math.floor(length / 2))
         + Math.random().toString(36).substring(2, 2 + Math.round(length / 2));
}