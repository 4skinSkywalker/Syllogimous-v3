import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenSinkComponent } from './kitchen-sink.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: KitchenSinkComponent }
];

@NgModule({
  declarations: [
    KitchenSinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class KitchenSinkModule { }
