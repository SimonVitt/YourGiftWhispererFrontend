import { Component, Input } from '@angular/core';
import { GiftIdea } from 'src/app/interfaces/gift-idea';

@Component({
  selector: 'app-single-gift-idea',
  templateUrl: './single-gift-idea.component.html',
  styleUrls: ['./single-gift-idea.component.scss']
})
export class SingleGiftIdeaComponent {
  @Input() idea!: GiftIdea;

}
