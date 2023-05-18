import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainappModule } from './mainapp/mainapp.module';
import { NavbarComponent } from './global/navbar/navbar.component';
import { FooterComponent } from './global/footer/footer.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ImprintComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MainappModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
