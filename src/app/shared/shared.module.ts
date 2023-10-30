import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LimitStringPipe } from './pipes/limit-string.pipe';
import { ObjectToStringPipe } from './pipes/object-to-string.pipe';
import { DotThousandSeparatorPipe } from './pipes/dot-thousand-separator.pipe';



@NgModule({
  declarations: [
    LimitStringPipe,
    ObjectToStringPipe,
    DotThousandSeparatorPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    LimitStringPipe,
    ObjectToStringPipe,
    DotThousandSeparatorPipe
  ]
})
export class SharedGlobalModule { }
