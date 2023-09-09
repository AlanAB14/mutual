import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from 'src/app/core/interfaces/servicio.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit, AfterViewInit{

  servicios!: Servicio[];
  servicioSeleccionado!: Servicio;

  constructor( private serviciosService: ServiciosService,
               private router: Router,
               private cdRef: ChangeDetectorRef ) { }



  ngOnInit(): void {
    this.serviciosService.getServicios()
      .subscribe( services => {
        this.servicios = services;
        this.setServicioSeleccionado();
      })
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
    console.log(this.servicioSeleccionado)
  }

  setServicioSeleccionado() {
    const currentUrl = this.router.url;
    
    for (const servicio of this.servicios) {
      if (currentUrl.includes(servicio.url)) {
        this.servicioSeleccionado = servicio;
        break; // Exit the loop once we've found the servicio
      }
    }
  }

}
