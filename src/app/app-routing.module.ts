import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserinputComponent } from './mainapp/userinput/userinput.component';
import { MainContainerComponent } from './mainapp/main-container/main-container.component';

const routes: Routes = [
  { path: '', component: MainContainerComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
