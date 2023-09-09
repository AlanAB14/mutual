// import { Component, OnInit } from '@angular/core';
// import { ServiciosService } from './services/servicios.service';
// import { Servicio } from '../core/interfaces/servicio.interface';

// @Component({
//   template: `
//   <div>
//     <h1>Mi Componente sin archivos de plantilla ni estilos</h1>
//     <p>Este es un componente sin archivos de plantilla ni estilos.</p>
//   </div>
// `,
// })

// export class ClientComponent implements OnInit{
//   servicios!: Servicio[];

//   constructor(private serviciosService: ServiciosService) { }

//   ngOnInit(): void {
//     this.serviciosService.getServicios()
//       .subscribe( (servicios) => {
//         this.servicios = servicios;
//       })
//   }

// }
