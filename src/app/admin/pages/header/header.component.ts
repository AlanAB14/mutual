import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderService } from 'src/app/client/services/header.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'header-page',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderPageComponent implements OnInit {
  header: any[] = [];
  cargandoData: boolean = true;

  constructor(private headerService: HeaderService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHeaders();
  }

  getHeaders() {
    this.cargandoData = true
    this.headerService.getHeaders()
      .subscribe((headers: any) => {
        this.header = headers;
        this.cargandoData = false;
      }, (error) => {
        console.log(error)
        Swal.fire('Ocurrió un error', '', 'error');
        this.cargandoData = false;
      })
  }

  updateDeleteHeader(header: any) {
    Swal.fire({
      text: 'Deseas eliminar o editar el header?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Eliminar'
    }).then((resp) => {
      console.log(resp)
      if (resp.isConfirmed) {
        const dialogRef = this.dialog.open(HeaderDialog, {
          data: { header }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result);
            this.editHeader(result)
          }

        });
      } else if (resp.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          text: 'Estas seguro de eliminar el header?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(resp => {
          if (resp.isConfirmed) {
            this.removeHeader(header.id)
          }
        })
      }
    })
  }

  removeHeader(id: number) {
    this.cargandoData = true;
    this.headerService.removeHeader(id)
      .subscribe(resp => {
        this.cargandoData = false;
        Swal.fire('Header eliminado con éxito', '', 'success');
        this.getHeaders();
      }, (error) => {
        console.log(error)
        Swal.fire('Ocurrió un error', '', 'error');
        this.cargandoData = false;
      })
  }

  editHeader(header: any) {
    this.cargandoData = true;
    this.headerService.updateHeader(header, header.id)
      .subscribe(resp => {
        this.cargandoData = false;
        Swal.fire('Header modificado con éxito', '', 'success');
        this.getHeaders();
      }, (error) => {
        console.log(error)
        Swal.fire('Ocurrió un error', '', 'error');
        this.cargandoData = false;
      })
  }

  postHeader(header: any) {
    this.cargandoData = true;
    this.headerService.addHeader(header)
      .subscribe(resp => {
        this.cargandoData = false;
        Swal.fire('Header agregado con éxito', '', 'success');
        this.getHeaders();
      }, (error) => {
        console.log(error)
        Swal.fire('Ocurrió un error', '', 'error');
        this.cargandoData = false;
      })
  }

  addHeader() {
    const dialogRef = this.dialog.open(HeaderDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.postHeader(result)
      }
    });
  }
}

@Component({
  selector: 'header-dialog',
  templateUrl: 'header-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatIconModule],
  styles: [
    `.btn-guardar {
      background-color: var(--verde-oscuro)!important;
      color: white;

    }
    img {
      width: 10rem;
      height: auto;
      cursor: pointer
    }

    .header-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `
  ]
})
export class HeaderDialog {
  cargando: boolean = false;

  formHeader: FormGroup = this.fb.group({
    id: [this.data?.header?.id] ?? undefined,
    titulo: [this.data?.header?.titulo ?? '', Validators.required],
    image: [this.data?.header?.image ?? ''],
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>) { }

  updateHeader() {
    if (this.formHeader.value.titulo === '' || this.formHeader.value.image === '') {
      this.formHeader.markAllAsTouched()
      return
    }
    if (this.data) {
      const currentImageValue = this.formHeader.get('image')!.value;
      const originalImageValue = this.data.header.image;

      if (currentImageValue === originalImageValue) {
        this.formHeader.removeControl('image');
      }
      this.dialogRef.close(
        this.formHeader.value
      )
    } else {
      this.dialogRef.close(
        this.formHeader.value
      )
    }
  }


  uploadFile(event: any, ctrl: string) {
    this.imageBlob(event)
      .then((result: any) => {
        if (ctrl === 'image') {
          this.formHeader.controls['image'].setValue(result.split(',')[1])
          this.formHeader.get('image')?.markAsDirty();
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
}
