import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxCountdownModule } from '../lib/ngx-countdown.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxCountdownModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
