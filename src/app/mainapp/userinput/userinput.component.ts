import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendCommunicationService } from 'src/app/services/backend-communication.service';
import { ManageIdeasService } from 'src/app/services/manage-ideas.service';
import { ManageUxService } from 'src/app/services/manage-ux.service';

@Component({
  selector: 'app-userinput',
  templateUrl: './userinput.component.html',
  styleUrls: ['./userinput.component.scss']
})
export class UserinputComponent {

  giftinputForm!: FormGroup;
  formSend: boolean = false;

  constructor(private fb: FormBuilder, private manageIdeas: ManageIdeasService, private manageUx: ManageUxService) { }

  ngOnInit() {
    this.giftinputForm = this.fb.group({
      user_input: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(200)])
    });
  }

  async sendRequest() {
    if (this.giftinputForm.valid && !this.formSend) {
      this.formSend = true;
      this.manageUx.triggeronceSubmitted(true);
      this.manageUx.triggerHighDemand(false);
      this.manageUx.triggerWrongInput(false);
      this.manageUx.triggerdisplayedIdeas(false);
      this.manageUx.triggerLoadingIdeas(true);
      this.formSend = true;
      const fd = new FormData();
      fd.append('user_input', this.giftinputForm.get('user_input')!.value);
      try {
        await this.manageIdeas.getIdeas(fd);
        this.formSend = false;
        this.manageUx.triggerLoadingIdeas(false);
      } catch (e) {
        console.log(e);
        this.manageUx.triggerHighDemand(true);
        this.manageUx.triggerLoadingIdeas(false);
        this.formSend = false;
      }
    }
  }
}
