import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicationService {

  BASE_URL = "https://your-giftwhisperer.nw.r.appspot.com";
  //BASE_URL = "http://127.0.0.1:5000";

  constructor(private http: HttpClient) { }

  sendPrompt(body: FormData){
    return lastValueFrom(this.http.post(this.BASE_URL + "/getidea", body))
  }

  sendPromptMoreIdeas(body: FormData){
    return lastValueFrom(this.http.post(this.BASE_URL + "/get_more_ideas", body))
  }
}
