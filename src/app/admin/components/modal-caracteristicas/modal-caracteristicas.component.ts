import { Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiciosService } from 'src/app/client/services/servicios.service';
import { Servicio } from 'src/app/core/interfaces/servicio.interface';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './modal-caracteristicas.component.html',
  styleUrls: ['./modal-caracteristicas.component.scss']
})
export class ModalCaracteristicasComponent implements OnInit{
  @ViewChild('nuevaCaracteristica') nuevaCaracteristica!: ElementRef;
  caracteristicas!: any;
  agregarCaracteristica: boolean = false;
  cargando: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviciosService: ServiciosService
  ) {}

  ngOnInit(): void {
    this.caracteristicas = this.data.caracteristicas;
    const arrayNuevo: any = this.caracteristicas.split('\n');
    this.caracteristicas = JSON.parse(arrayNuevo)
    console.log(this.caracteristicas)
    console.log(this.data.id)
  }

  changeCaracteristica(index: number, event: any) {
    this.caracteristicas[index] = event.target.value
    console.log(this.caracteristicas)
  }

  // get caracteristicasArray(): string[] {
  //   const arrayNuevo: any = this.caracteristicas.split('\n');
  //   return JSON.parse(arrayNuevo);
  // }

  agregarNuevaCaracteristica() {
    if (this.nuevaCaracteristica.nativeElement.value !== '') {
      Swal.fire({
        title: 'Quieres agregar la caracteristica?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.caracteristicas.push(this.nuevaCaracteristica.nativeElement.value)
          console.log('Se agregó')
          this.nuevaCaracteristica.nativeElement.value = '';
        }
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCaracteristicas() {
    this.cargando = true
    const servicio = {
      caracteristicas: JSON.stringify(this.caracteristicas)
    }
    this.serviciosService.updateServicio(servicio, this.data.id)
      .subscribe( (resp) => {
        console.log(resp)
        this.cargando = false;
        Swal.fire('','Caracteristicas actualizadas con éxito', 'success')
        this.dialogRef.close({
          result: true
        });
      },(error) => {
        console.log(error)
        Swal.fire('','Error al actualizar caracteristicas', 'error')
        this.cargando = false;
      })
  }

  borrarCaracteristica(index: number) {
    Swal.fire({
      title: 'Quieres borrar la caracteristica?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.caracteristicas.length > 1) {
          this.caracteristicas.splice(index, 1);
        }else {
          Swal.fire('No se puede borrar la característica', '', 'error')
        }
      }
    })
  }
}
