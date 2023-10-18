import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCaracteristicasComponent } from '../modal-caracteristicas/modal-caracteristicas.component';
import Swal from 'sweetalert2';
import { ServiciosService } from 'src/app/client/services/servicios.service';

@Component({
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent {

  cargando: boolean = false;

  formServicio = this.fb.group({
    id: [this.data.servicio.id],
    titulo: [this.data.servicio.titulo ?? ''],
    texto: [this.data.servicio.texto ?? ''],
    caracteristicas: [this.data.servicio.caracteristicas ?? ''],
    icon: [this.data.servicio.icon ?? ''],
    image: [this.data.servicio.image ?? ''],
  })

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private serviciosService: ServiciosService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadFile(event: any, ctrl: string) {
    this.imageBlob(event)
      .then((result: any) => {
        if (ctrl === 'icon') {
          this.formServicio.controls['icon'].setValue(result.split(',')[1])
          this.formServicio.get('icon')?.markAsDirty();
        } else if (ctrl === 'image') {
          this.formServicio.controls['image'].setValue(result.split(',')[1])
          this.formServicio.get('image')?.markAsDirty();
        }
      })
      .catch(err => console.log(err))
  }

  imageBlob(event: any) {
    const files: FileList = event.target.files;
    const file: File = files[0];

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(file);
    })
  }

  updateCaracteristicas() {
    this.cargando = true
    const servicio: any = {};
    if (this.verificaModificacion('titulo')) {
      servicio.titulo = this.formServicio.value.titulo;
    }
    if (this.verificaModificacion('texto')) {
      servicio.texto = this.formServicio.value.texto;
    }
    if (this.verificaModificacion('icon')) {
      servicio.icon = this.formServicio.value.icon;
    }
    if (this.verificaModificacion('image')) {
      servicio.image = this.formServicio.value.image;
    }

    this.serviciosService.updateServicio(servicio, this.formServicio.value.id)
      .subscribe((resp) => {
        console.log(resp)
        this.cargando = false;
        Swal.fire('', 'Servicio actualizado con éxito', 'success')
        this.dialogRef.close({
          result: true
        });
      }, (error) => {
        console.log(error)
        Swal.fire('', 'Error al actualizar servicio', 'error')
        this.cargando = false;
      })
  }

  verificaModificacion(campo: string) {
    if (this.formServicio.get(campo)!.dirty) {
      return true;
    }else {
      return false;
    }
  }

  gestionarCaracteristicas() {
    const caracteristicas = this.formServicio.value.caracteristicas
    const id = this.formServicio.value.id
    const dialogRef = this.dialog.open(ModalCaracteristicasComponent, {
      data: { caracteristicas, id },
      minWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result) {
        this.dialogRef.close({
          result: true
        })
      }
    });
  }

  agregarCaracteristica() {
    const caracteristicasFormArray = this.formServicio.get('caracteristicas') as FormArray;
    caracteristicasFormArray.push(this.fb.control(''));
  }

  eliminarCaracteristica(index: number) {
    const caracteristicasFormArray = this.formServicio.get('caracteristicas') as FormArray;
    caracteristicasFormArray.removeAt(index);
  }

}
