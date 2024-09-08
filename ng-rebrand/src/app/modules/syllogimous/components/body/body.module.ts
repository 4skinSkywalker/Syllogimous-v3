import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BodyIntroComponent } from './intro/intro.component';
import { BodyStartComponent } from './start/start.component';
import { BodyInGameComponent } from './in-game/in-game.component';
import { BodyFeedbackComponent } from './feedback/feedback.component';
import { BodyHistoryComponent } from './history/history.component';
import { BodyStatsComponent } from './stats/stats.component';
import { TierStatsComponent } from './stats/tier-stats/tier-stats.component';
import { AccuracyStatsComponent } from './stats/accuracy-stats/accuracy-stats.component';
import { ErrorAnalysisComponent } from './stats/error-analysis/error-analysis.component';
import { TimeBasedStatsComponent } from './stats/time-based-stats/time-based-stats.component';
import { TypeBasedStatsComponent } from './stats/type-based-stats/type-based-stats.component';
import { BodyTutorialComponent } from './tutorial/tutorial.component';
import { TutorialDistinctionComponent } from './tutorial/distinction/distinction.component';
import { TutorialSyllogismComponent } from './tutorial/syllogism/syllogism.component';
import { TutorialComparisonNumericalComponent } from './tutorial/comparison-numerical/comparison-numerical.component';
import { TutorialComparisonChronologicalComponent } from './tutorial/comparison-chronological/comparison-chronological.component';
import { TutorialDirectionComponent } from './tutorial/direction/direction.component';
import { TutorialDirection3DComponent } from './tutorial/direction3D/direction3D.component';
import { TutorialDirection4DComponent } from './tutorial/direction4D/direction4D.component';
import { TutorialAnalogyComponent } from './tutorial/analogy/analogy.component';
import { TutorialBinaryComponent } from './tutorial/binary/binary.component';
import { BodyTutorialsComponent } from './tutorials/tutorials.component';

@NgModule({
  declarations: [
    BodyIntroComponent,
    BodyStartComponent,
    BodyInGameComponent,
    BodyFeedbackComponent,
    BodyHistoryComponent,

    BodyTutorialComponent,
    BodyTutorialsComponent,
    TutorialDistinctionComponent,
    TutorialSyllogismComponent,
    TutorialComparisonNumericalComponent,
    TutorialComparisonChronologicalComponent,
    TutorialDirectionComponent,
    TutorialDirection3DComponent,
    TutorialDirection4DComponent,
    TutorialAnalogyComponent,
    TutorialBinaryComponent,

    BodyStatsComponent,
    TierStatsComponent,
    AccuracyStatsComponent,
    ErrorAnalysisComponent,
    TimeBasedStatsComponent,
    TypeBasedStatsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    BodyIntroComponent,
    BodyStartComponent,
    BodyInGameComponent,
    BodyFeedbackComponent,
    BodyHistoryComponent,
    BodyTutorialComponent,
    BodyTutorialsComponent,
    BodyStatsComponent,
  ]
})
export class BodyModule { }