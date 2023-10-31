import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from '../shared/material/material.module';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalCaracteristicasComponent } from './components/modal-caracteristicas/modal-caracteristicas.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { LimitStringPipe } from '../shared/pipes/limit-string.pipe';
import { SharedGlobalModule } from '../shared/shared.module';
import { OpinionesComponent } from './pages/opiniones/opiniones.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { HeaderPageComponent } from './pages/header/header.component';
import { InteresesComponent } from './pages/intereses/intereses.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    SideBarComponent,
    HeaderComponent,
    ServiciosComponent,
    HeaderPageComponent,
    ModalEditComponent,
    ModalCaracteristicasComponent,
    PreguntasComponent,
    OpinionesComponent,
    NosotrosComponent,
    UsuariosComponent,
    PrestamosComponent,
    InteresesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedGlobalModule,
  ]
})
export class AdminModule { }
