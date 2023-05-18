import { ChangeDetectorRef, Component } from '@angular/core';
import { GiftIdea } from 'src/app/interfaces/gift-idea';
import { ManageIdeasService } from 'src/app/services/manage-ideas.service';
import { ManageUxService } from 'src/app/services/manage-ux.service';

@Component({
  selector: 'app-gift-ideas',
  templateUrl: './gift-ideas.component.html',
  styleUrls: ['./gift-ideas.component.scss']
})
export class GiftIdeasComponent {

  ideas!: Array<GiftIdea>;
  loading: boolean = false;
  displayIdeas: boolean = false;
  highDemandError: boolean = false;
  wrongInputError: boolean = false;
  onceSubmitted: boolean = false;
  otherError: boolean = false;

  disableBtn: boolean = false;

  constructor(private manageIdeas: ManageIdeasService, private manageUx: ManageUxService, private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.manageIdeas.ideasSubject.subscribe((ideas) => {
      this.ideas = ideas;
    });
    this.manageUx.displayedIdeas.subscribe((status) => {
      this.displayIdeas = status;
      if(status){
        this.manageIdeas.scrollToIdeas();
      }
    });
    this.manageUx.loadingIdeasSubject.subscribe((status) => {
      this.loading = status;
      if(status){
        this.manageIdeas.scrollToBottom();
      }
    });
    this.manageUx.onceSubmitted.subscribe((status) => {
      this.onceSubmitted = status;
    });
    this.manageUx.highDemandError.subscribe((status) => {
      this.highDemandError = status;
      if(status){
        this.manageIdeas.scrollToBottom();
      }
    });
    this.manageUx.wrongInputError.subscribe((status) => {
      this.wrongInputError = status;
      if(status){
        this.manageIdeas.scrollToBottom();
      }
    });
    this.manageUx.ongoingRequest.subscribe((status) => {
      this.disableBtn = status;
    });
    this.manageUx.otherError.subscribe((status) => {
      this.otherError = status;
      if(status){
        this.manageIdeas.scrollToBottom();
      }
    })
  }

  async getMoreIdeas(){
    this.manageUx.triggerOngoingRequest(true);
    this.manageUx.triggerOtherError(false);
    this.manageUx.triggerLoadingIdeas(true);
    this.manageUx.triggerHighDemand(false);
    try{
      await this.manageIdeas.getMoreIdeas();
    }catch(e){
      console.log(e);
      this.manageUx.triggerHighDemand(true);
    }
    this.manageUx.triggerLoadingIdeas(false);
    this.manageUx.triggerOngoingRequest(false);
  }

}
