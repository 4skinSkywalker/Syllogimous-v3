import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterIntroComponent } from './intro/intro.component';
import { FooterInGameComponent } from './in-game/in-game.component';
import { FooterTutorialComponent } from './tutorial/tutorial.component';
import { FooterHistoryComponent } from './history/history.component';
import { FooterTutorialsComponent } from './tutorials/tutorials.component';

@NgModule({
  declarations: [
    FooterIntroComponent,
    FooterTutorialComponent,
    FooterInGameComponent,
    FooterHistoryComponent,
    FooterTutorialsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FooterIntroComponent,
    FooterTutorialComponent,
    FooterInGameComponent,
    FooterHistoryComponent,
    FooterTutorialsComponent,
  ]
})
export class FooterModule { }