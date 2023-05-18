import { Injectable } from '@angular/core';
import { BackendCommunicationService } from './backend-communication.service';
import { GiftIdea } from '../interfaces/gift-idea';
import { BehaviorSubject } from 'rxjs';
import { ManageUxService } from './manage-ux.service';

interface ResponseType {
  id: string;
  choices: {
    message: {
      content: string;
    };
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ManageIdeasService {

  ideas: Array<GiftIdea> = [];
  userrequest: string | undefined;


  ideasSubject = new BehaviorSubject<Array<GiftIdea>>([]);

  constructor(private backend: BackendCommunicationService, private manageUx: ManageUxService) { }

  async getIdeas(user_input: string) {
    const fd = new FormData();
    this.userrequest = user_input;
    fd.append('user_input', user_input);
    const response = await this.backend.sendPrompt(fd) as ResponseType;
    console.log(response);
    this.stringToJSON(response.choices[0].message.content);
  }

  async getMoreIdeas(){
    const fd = new FormData();
    const ideastring = JSON.stringify(this.ideas);
    fd.append('user_input', this.userrequest!);
    fd.append('currentideas', ideastring);
    const response = await this.backend.sendPrompt(fd) as ResponseType;
    try{
      const jsonItems = JSON.parse(response.choices[0].message.content);
      console.log(jsonItems)
      const newIdeas = jsonItems as Array<GiftIdea>;
      this.ideas = this.ideas.concat(newIdeas);
      this.ideasSubject.next(this.ideas);
      this.manageUx.triggerdisplayedIdeas(true);
    }catch(e){
      console.log(e);
      this.manageUx.triggerOtherError(true);
    }
  }

  stringToJSON(ideastring: string) {
    console.log(ideastring);
    try {
      const jsonItems = JSON.parse(ideastring);
      console.log(jsonItems);
      this.ideas = jsonItems as Array<GiftIdea>;
      console.log(this.ideas);
      this.ideasSubject.next(this.ideas);
      this.manageUx.triggerdisplayedIdeas(true);
    } catch (e) {
      console.log(e);
      this.ideas = [];
      this.manageUx.triggerWrongInput(true);
    }
  }

  scrollToIdeas() {
    const element = document.getElementById('ideas-container');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const element = document.getElementById('footer')!;
      const distancetop = element.getBoundingClientRect().top + window.pageYOffset;
      const scrollDestination = distancetop - window.innerHeight;
      window.scrollTo({
        top: scrollDestination,
        behavior: "smooth"
      });
    }, 400);

  }

}
