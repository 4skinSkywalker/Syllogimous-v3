export function downloadFile(result: Blob | ArrayBuffer, fileNameWithExt: string, customType?: string) {
    const link = document.createElement("A") as HTMLAnchorElement;
    const file = new Blob([ result ], { type: customType || "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = fileNameWithExt;
    link.click();
    URL.revokeObjectURL(link.href);
}

export function downloadFromURL(url: string) {
    const dl = document.createElement("a");
    dl.target = "_blank";
    dl.download = url;
    dl.href = url;
    dl.click();
}