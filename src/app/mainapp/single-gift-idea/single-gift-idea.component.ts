import { Component, Input } from '@angular/core';
import { GiftIdea } from 'src/app/interfaces/gift-idea';

@Component({
  selector: 'app-single-gift-idea',
  templateUrl: './single-gift-idea.component.html',
  styleUrls: ['./single-gift-idea.component.scss']
})
export class SingleGiftIdeaComponent {
  @Input() idea!: GiftIdea;
  @Input() index!: number;

  imageSource!: string;

  ngOnInit(){
    const modulo = this.index % 4;
    this.imageSource = `assets/img/cardimg${modulo}.webp`
  }

}
