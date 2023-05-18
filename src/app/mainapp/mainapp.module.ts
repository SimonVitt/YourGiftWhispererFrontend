import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserinputComponent } from './userinput/userinput.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainContainerComponent } from './main-container/main-container.component';
import { GiftIdeasComponent } from './gift-ideas/gift-ideas.component';
import { SingleGiftIdeaComponent } from './single-gift-idea/single-gift-idea.component';



@NgModule({
  declarations: [
    UserinputComponent,
    MainContainerComponent,
    GiftIdeasComponent,
    SingleGiftIdeaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class MainappModule { }
