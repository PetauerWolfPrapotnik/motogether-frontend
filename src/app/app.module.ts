import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Core module (NOTE don't include share module)
    CoreModule,

    // Extra needed for app.compnent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
