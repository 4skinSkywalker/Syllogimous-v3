export function delay(ms: number) {
    return new Promise(res => setTimeout(() => res(1), ms));
}