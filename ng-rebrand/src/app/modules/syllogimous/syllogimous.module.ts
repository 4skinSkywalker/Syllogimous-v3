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
import { TutorialDirectionComponent } from './components/tutorial-direction/tutorial-direction.component';
import { TutorialDirection3DComponent } from './components/tutorial-direction3D/tutorial-direction3D.component';
import { TutorialDirection4DComponent } from './components/tutorial-direction4D/tutorial-direction4D.component';
import { TutorialAnalogyComponent } from './components/tutorial-analogy/tutorial-analogy.component';
import { TutorialBinaryComponent } from './components/tutorial-binary/tutorial-binary.component';

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
    TutorialDirectionComponent,
    TutorialDirection3DComponent,
    TutorialDirection4DComponent,
    TutorialAnalogyComponent,
    TutorialBinaryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class SyllogimousModule { }