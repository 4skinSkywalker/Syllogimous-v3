import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SyllogimousComponent } from './syllogimous.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IntroComponent } from './components/intro/intro.component';
import { TutorialSyllogismComponent } from './components/tutorial-syllogism/tutorial-syllogism.component';
import { TutorialDistinctionComponent } from './components/tutorial-distinction/tutorial-distinction.component';
import { TutorialComparisonNumericalComponent } from './components/tutorial-comparison-numerical/tutorial-comparison-numerical.component';
import { TutorialComparisonChronologicalComponent } from './components/tutorial-comparison-chronological/tutorial-comparison-chronological.component';

const routes: Routes = [
  { path: '', component: SyllogimousComponent }
];

@NgModule({
  declarations: [
    SyllogimousComponent,
    IntroComponent,
    TutorialDistinctionComponent,
    TutorialSyllogismComponent,
    TutorialComparisonNumericalComponent,
    TutorialComparisonChronologicalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class SyllogimousModule { }