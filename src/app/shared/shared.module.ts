import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LimitStringPipe } from './pipes/limit-string.pipe';



@NgModule({
  declarations: [
    LimitStringPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    LimitStringPipe
  ]
})
export class SharedGlobalModule { }
