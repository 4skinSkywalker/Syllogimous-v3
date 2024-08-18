import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TutorialSyllogismComponent } from './syllogism/syllogism.component';
import { TutorialDistinctionComponent } from './distinction/distinction.component';
import { TutorialComparisonNumericalComponent } from './comparison-numerical/comparison-numerical.component';
import { TutorialComparisonChronologicalComponent } from './comparison-chronological/comparison-chronological.component';
import { TutorialDirectionComponent } from './direction/direction.component';
import { TutorialDirection3DComponent } from './direction3D/direction3D.component';
import { TutorialDirection4DComponent } from './direction4D/direction4D.component';
import { TutorialAnalogyComponent } from './analogy/analogy.component';
import { TutorialBinaryComponent } from './binary/binary.component';
import { BodyTutorialComponent } from './tutorial.component';

@NgModule({
  declarations: [
    BodyTutorialComponent,
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
  ],
  exports: [
    BodyTutorialComponent,
  ]
})
export class TutorialModule { }