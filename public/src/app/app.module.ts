import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OnsenModule } from 'ngx-onsenui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OnsenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
