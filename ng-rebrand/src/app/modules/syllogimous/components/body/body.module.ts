import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TutorialModule } from './tutorial/tutorial.module';
import { BodyIntroComponent } from './intro/intro.component';
import { BodyStartComponent } from './start/start.component';
import { BodyInGameComponent } from './in-game/in-game.component';
import { BodyFeedbackComponent } from './feedback/feedback.component';
import { BodyHistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    BodyIntroComponent,
    BodyStartComponent,
    BodyInGameComponent,
    BodyFeedbackComponent,
    BodyHistoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TutorialModule,
  ],
  exports: [
    TutorialModule,
    BodyIntroComponent,
    BodyStartComponent,
    BodyInGameComponent,
    BodyFeedbackComponent,
    BodyHistoryComponent,
  ]
})
export class BodyModule { }