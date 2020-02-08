import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';

@NgModule({
  declarations: [],
  imports: [
    // Angular Imports
    CommonModule,
    HttpClientModule,

    // Modules needed for layout components
  ],
  exports: [
    // Export layout components
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) { throwIfAlreadyLoaded(parentModule, 'CoreModule'); }
}
