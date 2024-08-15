import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'appd-image-uploader',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './image-uploader.html',
})
export class AppdImageUploader {

    base64: string | null = null;

}
