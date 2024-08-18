import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SyllogimousComponent } from './syllogimous.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BodyModule } from './components/body/body.module';
import { FooterModule } from './components/footer/footer.module';

const routes: Routes = [
  { path: '', component: SyllogimousComponent }
];

@NgModule({
  declarations: [
    SyllogimousComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    BodyModule,
    FooterModule
  ]
})
export class SyllogimousModule { }