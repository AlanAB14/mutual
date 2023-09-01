import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientLayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './shared/shared.module';
import { SharedGlobalModule } from '../shared/shared.module';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { FormularioComponent } from './pages/formulario/formulario.component';


@NgModule({
  declarations: [
    ClientLayoutComponent,
    HomeComponent,
    NosotrosComponent,
    ServiciosComponent,
    AyudaComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    SharedGlobalModule,
    ClientRoutingModule,
    SharedModule,
  ]
})
export class ClientModule { }
