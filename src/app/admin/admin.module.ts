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


@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    SideBarComponent,
    HeaderComponent,
    ServiciosComponent,
    ModalEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
