import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from 'src/app/core/interfaces/servicio.interface';
import { NavigationEnd, Router } from '@angular/router';
import { DicenService } from '../../services/dicen.service';
import { inversionesData } from 'src/assets/data/inversiones';

const inversiones = inversionesData;

@Component({
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})


export class ServiciosComponent implements OnInit, AfterViewInit {
  inversiones = inversiones;
  cargandoData: boolean = true;
  servicios!: Servicio[];
  servicioSeleccionado!: Servicio;
  dicen: any = [];

  constructor(private serviciosService: ServiciosService,
    private dicenService: DicenService,
    private router: Router,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.serviciosService.getServicios()
      .subscribe(services => {
        this.servicios = services;
        this.setServicioSeleccionado();
      })
    this.dicenService.getDicen()
      .subscribe(dicen => {
        console.log(dicen)
        this.dicen = dicen
      })
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  setServicioSeleccionado() {
    const currentUrl = this.router.url;

    for (const servicio of this.servicios) {
      if (currentUrl.includes(servicio.url)) {
        this.servicioSeleccionado = servicio;
        console.log(this.servicioSeleccionado)
        break; // Exit the loop once we've found the servicio
      }
    }
    this.cargandoData = false
  }

  goToPrestamo(tipoInversion?: string) {
    const data = { url: this.servicioSeleccionado.url, titulo: this.servicioSeleccionado.titulo, tipoInversion: tipoInversion ? tipoInversion : null };
    console.log(data)
    if (this.servicioSeleccionado.url === 'prestamos-prendarios') {
      this.router.navigateByUrl("simulador");
    }else {
      const url = this.router.serializeUrl(this.router.createUrlTree(['prestamo', { c: btoa(JSON.stringify(data)) }]));
      window.open(`/#/${url}`, '_self');
    }
  }

}
