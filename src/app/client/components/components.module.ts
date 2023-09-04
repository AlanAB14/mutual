import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuestrosServiciosComponent } from './nuestros-servicios/nuestros-servicios.component';
import { PrestamoBoxComponent } from './prestamo-box/prestamo-box.component';
import { SharedGlobalModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    NuestrosServiciosComponent,
    PrestamoBoxComponent
  ],
  imports: [
    CommonModule,
    SharedGlobalModule
  ],
  exports: [
    NuestrosServiciosComponent,
    PrestamoBoxComponent
  ]
})
export class ComponentsModule { }