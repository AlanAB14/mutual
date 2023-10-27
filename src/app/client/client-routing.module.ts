import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ServiciosService } from './services/servicios.service';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { SimuladorComponent } from './pages/simulador/simulador.component';

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
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosModule ),
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
    path: 'prestamo',
    component: PrestamoComponent
  },
  {
    path: 'simulador',
    component: SimuladorComponent
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
export class ClientRoutingModule {

  constructor( private serviciosService: ServiciosService ) {  }

}
