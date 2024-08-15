export function resolve(path: string, obj = self, separator = '.') {
    const properties = path.split(separator);
    return properties.reduce((prev: any, curr: any) => prev?.[curr], obj);
};

export function lookmap<V>(key: string | number, array: V[]): { [key: string | number]: V[] }  {
    return array
        .reduce(
            (a, b) => {

                const _b = b as any;

                a[_b[key]] = a[_b[key]] || [];
                a[_b[key]].push(b);

                return a;
            },
            {} as { [key: string | number]: V[] }
        );
}

export function singlifyLookmap<V>(input: { [key: string | number]: V[] }): { [key: string | number]: V } {
    const result = {} as { [key: string | number]: V };
    Object.keys(input).forEach(key => result[key] = input[key][0]);
    return result;
}

export function emptyObject(object: any) {

    if (typeof object !== "object")
        throw new Error("Argument object of emptyObject is not an object.");
    
    for (const key in object) {
        delete object[key];
    }
    return object;
}

export function replaceProps(object: any, props: any) {

    if (typeof object !== "object")
        throw new Error("Argument object of replaceProps is not an object.");

    if (typeof props !== "object")
        throw new Error("Argument props of replaceProps is not an object.");

    return Object.assign(object, props);
}