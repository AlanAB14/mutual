import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { FormularioComponent } from './pages/formulario/formulario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'nosotros',
    component: NosotrosComponent
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  },
  {
    path: 'ayuda',
    component: AyudaComponent
  },
  {
    path: 'formulario',
    component: FormularioComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
