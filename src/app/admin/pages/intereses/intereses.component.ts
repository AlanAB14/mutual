import { Component, OnInit } from '@angular/core';
import { InteresesService } from 'src/app/client/services/intereses.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './intereses.component.html',
  styleUrls: ['./intereses.component.scss']
})
export class InteresesComponent implements OnInit{
  cargandoData: boolean = true;
  intereses: any[] = [];

  constructor( private interesesService: InteresesService ) { }

  ngOnInit(): void {
    this.getIntereses();
  }
  
  getIntereses() {
    this.cargandoData = true;
    this.interesesService.getIntereses()
      .subscribe( (intereses: any) => {
        this.intereses = intereses
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        Swal.fire('Ocurrió un error al traer los intereses', '', 'error')
        this.cargandoData = false;
      })

  }

  editInteres(id: number, nuevoValor: number) {
    console.log(id, nuevoValor)
    if (nuevoValor && nuevoValor > 0) {
      Swal.fire({
        title: '¿Estás seguro de actualizar el interés?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((resp) => {
        if (resp.isConfirmed) {
          this.cargandoData = true
          let interesNuevo = {
            interes: nuevoValor
          }
          this.interesesService.editInteres( id, interesNuevo )
            .subscribe( interes => {
              Swal.fire('Interés actulizado con éxito', '', 'success')
              this.cargandoData = false;
              this.getIntereses();
            }, (error) => {
              console.log(error);
              Swal.fire('Ocurrió un error al actualizar interés', '', 'error')
            })
        }
      })
    }
  }



}
