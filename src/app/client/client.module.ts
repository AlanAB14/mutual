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
import { ComponentsModule } from './components/components.module';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
// import { ClientComponent } from './client.component';


@NgModule({
  declarations: [
    ClientLayoutComponent,
    HomeComponent,
    NosotrosComponent,
    ServiciosComponent,
    AyudaComponent,
    FormularioComponent,
    PrestamoComponent,
    // ClientComponent
  ],
  imports: [
    CommonModule,
    SharedGlobalModule,
    ClientRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class ClientModule { }
