import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserinputComponent } from './mainapp/userinput/userinput.component';
import { MainContainerComponent } from './mainapp/main-container/main-container.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', component: MainContainerComponent, pathMatch: 'full'},
  { path: 'imprint', component: ImprintComponent, pathMatch: 'full'},
  { path: 'privacypolicy', component: PrivacyPolicyComponent, pathMatch: 'full'},
  { path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
