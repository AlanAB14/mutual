import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { OpinionesComponent } from './pages/opiniones/opiniones.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  },
  {
    path: 'preguntas',
    component: PreguntasComponent
  },
  {
    path: 'opiniones',
    component: OpinionesComponent
  },
  {
    path: 'nosotros',
    component: NosotrosComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'prestamos',
    component: PrestamosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
