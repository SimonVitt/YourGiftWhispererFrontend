import { Injectable } from '@angular/core';
import { BackendCommunicationService } from './backend-communication.service';
import { GiftIdea } from '../interfaces/gift-idea';
import { BehaviorSubject } from 'rxjs';
import { ManageUxService } from './manage-ux.service';

interface ResponseType {
  id: string;
  choices: [
    {text: string}
  ];
}

@Injectable({
  providedIn: 'root'
})
export class ManageIdeasService {

  ideas: Array<GiftIdea> = [];
  userrequest: string | undefined;

  loadedMoreNumberSubject = new BehaviorSubject<number>(0);

  loadedMoreNumber: number = 0;


  ideasSubject = new BehaviorSubject<Array<GiftIdea>>([]);

  constructor(private backend: BackendCommunicationService, private manageUx: ManageUxService) { }

  async getIdeas(user_input: string) {
    this.loadedMoreNumber = 0;
    this.loadedMoreNumberSubject.next(this.loadedMoreNumber);
    this.ideas = [];
    const fd = new FormData();
    this.userrequest = user_input;
    fd.append('user_input', user_input);
    const response = await this.backend.sendPrompt(fd) as ResponseType;
    console.log(response);
    this.stringToJSON(response);
  }

  async getMoreIdeas() {
    const fd = new FormData();
    let ideastring = '';
    this.ideas.forEach(idea => {
      ideastring = ideastring + ',' + idea.title;
    });
    fd.append('user_input', this.userrequest!);
    fd.append('currentideas', ideastring);
    const response = await this.backend.sendPromptMoreIdeas(fd) as ResponseType;
    try {
      const jsonItems = this.getJSONSasArray(response);
      console.log(jsonItems)
      const newIdeas = jsonItems as Array<GiftIdea>;
      this.pushInIdeas(newIdeas as Array<GiftIdea>);
      this.ideasSubject.next(this.ideas);
      this.manageUx.triggerdisplayedIdeas(true);
      this.loadedMoreNumber++;
      this.loadedMoreNumberSubject.next(this.loadedMoreNumber);
    } catch (e) {
      console.log(e);
      this.manageUx.triggerOtherError(true);
    }
  }

  stringToJSON(response: ResponseType) {
    console.log(response);
    try {
      const jsonItems = this.getJSONSasArray(response);
      console.log(jsonItems);
      this.pushInIdeas(jsonItems as Array<GiftIdea>);
      console.log(this.ideas);
      this.ideasSubject.next(this.ideas);
      this.manageUx.triggerdisplayedIdeas(true);
    } catch (e) {
      console.log(e);
      this.ideas = [];
      this.manageUx.triggerWrongInput(true);
    }
  }

  getJSONSasArray(response: ResponseType) {
    const rawString = response['choices'][0]['text']; // Replace this with your raw string.

    // Matches strings that look like JSON objects, capturing the object content.
    let jsonObjectRegex = /\{(.*?)\}/gs;
    let jsonObjects = [];
    let match;
    while (match = jsonObjectRegex.exec(rawString)) {
      let jsonString = '{' + match[1] + '}';
      let jsonObject = JSON.parse(jsonString);
      jsonObjects.push(jsonObject);
    }
    return jsonObjects;
  }

  pushInIdeas(newArray: Array<GiftIdea>){
    newArray.forEach(idea => {
      const exists = this.ideas.some(ideaInside => ideaInside.title === idea.title);
      if(!exists){
        this.ideas.push(idea);
      }
    })
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
