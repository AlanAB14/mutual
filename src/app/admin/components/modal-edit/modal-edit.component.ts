import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent {

  formServicio = this.fb.group({

    id: [ this.data.servicio.id ],
    titulo: [ this.data.servicio.titulo ?? '' ],
    texto: [ this.data.servicio.texto ?? '' ],
    caracteristicas: [ this.data.servicio.caracteristicas ?? '' ],
    icon: [ this.data.servicio.icon ?? '' ],
    image: [ this.data.servicio.image ?? '' ],

  })

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadFile( event: any, ctrl: string ) {
    this.imageBlob( event )
      .then( (result: any) => {
        if ( ctrl === 'icon' ) {
          this.formServicio.controls['icon'].setValue(result.split(',')[1])
        }else if( ctrl === 'image' ){
          this.formServicio.controls['image'].setValue(result.split(',')[1])
        }
      })
      .catch( err => console.log(err) )
  }

  imageBlob(event: any) {
    const files: FileList = event.target.files;
    const file: File = files[0];

    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(file);
    })
    
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
