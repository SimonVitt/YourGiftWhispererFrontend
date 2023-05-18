import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GiftIdea } from '../interfaces/gift-idea';

@Injectable({
  providedIn: 'root'
})
export class ManageUxService {

  loadingIdeasSubject = new Subject<boolean>();
  onceSubmitted = new BehaviorSubject<boolean>(false);
  displayedIdeas = new BehaviorSubject<boolean>(false);
  highDemandError = new BehaviorSubject<boolean>(false);
  wrongInputError = new BehaviorSubject<boolean>(false);

  constructor() { }

  triggerLoadingIdeas(status: boolean){
    this.loadingIdeasSubject.next(status);
  }

  triggeronceSubmitted(status: boolean){
    this.onceSubmitted.next(status);
  }

  triggerdisplayedIdeas(status: boolean){
    this.displayedIdeas.next(status);
  }

  triggerHighDemand(status: boolean){
    this.highDemandError.next(status);
  }

  triggerWrongInput(status: boolean){
    this.wrongInputError.next(status);
  }

}
