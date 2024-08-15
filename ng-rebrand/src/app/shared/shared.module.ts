import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { BreadcrumbRouterComponent } from './components/breadcrumb-router/breadcrumb-router.component';
import { CopyPasterComponent } from './components/copy-paster/copy-paster.component';
import { InputComponent } from './components/input/input.component';
import { SearchRouterComponent } from './components/search-router/search-router.component';
import { TableComponent } from './components/table/table.component';
import { MonthpickerComponent } from './components/monthpicker/monthpicker.component';
import { AppChartComponent } from './components/chart.component';
import { ImageUploaderPreviewComponent } from './components/image-uploader-preview/image-uploader-preview.component';
import { HolyGrailComponent } from './components/holy-grail/holy-grail.component';
import { LinearLoadingIndicatorComponent } from './components/linear-loading-indicator.component';
import { LetDirective } from './directives/ng-let';
import { MaskedInputDirective } from './directives/text2mask';
import { RBACDirective } from './directives/role-based-access-control';
import { AppSortableHeader } from './directives/sortable-header';
import { HackCasePipe } from './pipes/hack-case.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { ToastsContainer } from './components/toasts-container/toasts-container.component';

@NgModule({
    declarations: [
        // Components
        BackButtonComponent,
        BreadcrumbRouterComponent,
        CopyPasterComponent,
        InputComponent,
        SearchRouterComponent,
        TableComponent,
        MonthpickerComponent,
        AppChartComponent,
        ImageUploaderPreviewComponent,
        HolyGrailComponent,
        LinearLoadingIndicatorComponent,
        ToastsContainer,
        // Directives
        LetDirective,
        MaskedInputDirective,
        RBACDirective,
        AppSortableHeader,
        // Pipes
        HackCasePipe,
        HighlightPipe,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        CdkDropList,
        CdkDrag,
        ScrollingModule,
    ],
    exports: [
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        CdkDropList,
        CdkDrag,
        ScrollingModule,
        // Components
        BackButtonComponent,
        BreadcrumbRouterComponent,
        CopyPasterComponent,
        InputComponent,
        SearchRouterComponent,
        TableComponent,
        MonthpickerComponent,
        AppChartComponent,
        ImageUploaderPreviewComponent,
        HolyGrailComponent,
        LinearLoadingIndicatorComponent,
        ToastsContainer,
        // Directives
        LetDirective,
        MaskedInputDirective,
        RBACDirective,
        AppSortableHeader,
        // Pipes
        HackCasePipe,
        HighlightPipe,
    ]
})
export class SharedModule { }
