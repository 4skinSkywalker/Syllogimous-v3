import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ToastService } from "src/app/services/toast.service";

export function formatBytes(bytes: number, decimals = 2) {

    if (!+bytes) return '0 Bytes';

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

interface Base64Details {
    filetype: string;
    size: number;
    filename: string;
    base64: string;
}

@Component({
    selector: "app-image-uploader-preview",
    templateUrl: "./image-uploader-preview.component.html",
    styleUrls: [ "./image-uploader-preview.component.css" ]
})
export class ImageUploaderPreviewComponent {

    @ViewChild("fileUploadForm") fileUploadForm!: ElementRef;
    @ViewChild("fileDrag") fileDrag!: ElementRef;
    
    @Input("base64") base64: string | null = null;
    @Input("maxSize") maxSize = 1000000;
    @Input("fileDragHidden") fileDragHidden = false;
    @Input("disabled") disabled = false;

    @Output("onImageChange") onImageChange = new EventEmitter<string | null>();

    constructor(
        private toaster: ToastService
    ) { }

    fileSelectHandler(e: Event) {

        // Fetch FileList object
        const element = e.target as HTMLInputElement;
        const files: FileList | null = element.files || (e as any).dataTransfer.files;
        const file = (files || [])[0];
    
        // Cancel event and hover styling
        this.fileDragHover(e);

        this.parseFile(file);
    }

    fileDragHover(e: Event) {
    
        e.stopPropagation();
        e.preventDefault();

        const dragEl = this.fileDrag.nativeElement;
        dragEl.className = e.type === "dragover"
            ? "hover"
            : "modal-body file-upload";
    }

    async parseFile(file: File) {
  
        const extCheck = /\.(?=gif|jpg|png|jpeg)/gi.test(file.name);
        const fileDetails = await this.getFileBase64(file);
    
        if (!extCheck) {
            const message = "The file provided is not supported.";
            console.error(message);
            this.toaster.show(message, { classname: "bg-danger text-light"});
            this.reset();
        }
        else if (fileDetails.size > this.maxSize) {
            const message = `The image provided exceeds ${formatBytes(this.maxSize)}.`;
            console.error(message);
            this.toaster.show(message, { classname: "bg-danger text-light"});
            this.reset();
        }
        else {
            this.base64 = fileDetails.base64;
            this.onImageChange.emit(this.base64);
        }
    }

    reset(e?: Event) {

        this.base64 = null;
        this.onImageChange.emit(this.base64);

        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        if (this.fileUploadForm) {
            this.fileUploadForm.nativeElement.reset();
        }
    }

    getFileBase64(file: File): Promise<Base64Details>{
        return new Promise((resolve) => {

            const details: any = {}

            details.filetype = file.type;
            details.size = file.size;
            details.filename = file.name;

            const reader = new FileReader();
            reader.onload = (e: any) => {
                const  base64 = btoa(e.target?.result);
                details.base64 = base64;
                resolve(details);
            };

            reader.readAsBinaryString(file);
        })
    }

}