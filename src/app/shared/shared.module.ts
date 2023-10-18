import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LimitStringPipe } from './pipes/limit-string.pipe';
import { ObjectToStringPipe } from './pipes/object-to-string.pipe';



@NgModule({
  declarations: [
    LimitStringPipe,
    ObjectToStringPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    LimitStringPipe,
    ObjectToStringPipe
  ]
})
export class SharedGlobalModule { }
