import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { SharedModule } from '../../shared/shared.module';
import { DocsRoutingModule } from './docs-routing.module';

@NgModule({
    declarations: [
        DocsComponent,
    ],
    imports: [
        CommonModule,
        DocsRoutingModule,
        SharedModule
    ]
})
export class DocsModule { }
