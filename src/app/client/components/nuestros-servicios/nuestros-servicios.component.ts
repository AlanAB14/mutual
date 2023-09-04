import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from 'src/app/core/interfaces/servicio.interface';

@Component({
  selector: 'nuestros-servicios',
  templateUrl: './nuestros-servicios.component.html',
  styleUrls: ['./nuestros-servicios.component.scss']
})
export class NuestrosServiciosComponent implements OnInit{
  servicios: Servicio[] = [];

  constructor( private serviciosService: ServiciosService ) {}

  ngOnInit(): void {
    this.serviciosService.getServicios()
      .subscribe( (servicios) => {
        this.servicios = servicios
      })
  }

}
