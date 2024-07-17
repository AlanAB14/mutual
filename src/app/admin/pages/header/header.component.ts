import { Color, MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS, NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';
import interact from 'interactjs';
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
          data: { header },
          width: '100vw',
          maxWidth: '100vw',
          height: '100vh',
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
    const dialogRef = this.dialog.open(HeaderDialog, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
    });

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
  imports: [MatDialogModule, NgxMatColorPickerModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatIconModule, EditorModule],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  styles: [
    `.btn-guardar {
      background-color: var(--verde-oscuro)!important;
      color: white;

    }

    .imagen-field {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      mat-label {
        margin-right: .5rem;
        color: black;
      }
    }
    .header-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .header-box {
        position: relative;
        width: 100%;

        .header-title-box {
          position: absolute;
          cursor: move;
          user-select: none;
          top: 0;
          left: 0;

        }
      }

      .header-dialog-image {
        width: 100%;
        height: 100%;
        user-select: none;
      }

      .color-picker-disabled {
        ::ng-deep .mdc-text-field {
          background-color: grey!important
        }

        * {
          pointer-events: none!important;
        }
        
        ::ng-deep * {
          pointer-events: none!important;
        }
      }
    }
  `
  ]
})
export class HeaderDialog implements OnInit {
  cargando: boolean = false;
  x = 0;
  y = 0;

  public editorConfigTitle = {
    height: 250,
    menubar: true,
    plugins: 'advlist autolink lists link image charmap preview anchor',
    toolbar: 'undo redo  | formatselect | bold italic | \
      alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    content_style: 'body { font-family: Rodfat, sans-serif;}',
    setup: (editor: any) => {
      editor.on('init', () => {
        editor.setContent(this.formHeader.value.titulo);
      });
    },
    file_picker_callback: (callback: any, value: any, meta: any) => {
      if (meta.filetype === 'image') {
        // Aquí estableces la URL predeterminada de la imagen
        const defaultImageUrl = 'assets/icons/ic_header_verde.png';
        callback(defaultImageUrl, { 
          alt: 'Default Image',
          width: '20',
        });
      }
    }
  };

  public editorConfigSubtitle = {
    height: 250,
    menubar: true,
    plugins: 'advlist autolink lists link image charmap preview anchor',
    toolbar: 'undo redo  | formatselect | bold italic | \
      alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    content_style: 'body { font-family: Rodfat, sans-serif;}',
    setup: (editor: any) => {
      editor.on('init', () => {
        editor.setContent(this.formHeader.value.subtitulo);
      });
    },
    file_picker_callback: (callback: any, value: any, meta: any) => {
      if (meta.filetype === 'image') {
        // Aquí estableces la URL predeterminada de la imagen
        const defaultImageUrl = 'assets/icons/ic_header_blanco.png';
        callback(defaultImageUrl, { 
          alt: 'Default Image',
          width: '20',
        });
      }
    }
  };

  tituloTransform = '';

  formHeader: FormGroup = this.fb.group({
    id: [this.data?.header?.id] ?? undefined,
    header_name: [this.data?.header?.header_name ?? '', Validators.required],
    titulo: [this.data?.header?.titulo ?? ''],
    subtitulo: [this.data?.header?.subtitulo ?? ''],
    image: [this.data?.header?.image ?? '', Validators.required],
    titulo_posicion_x: [this.data?.header?.titulo_posicion_x ?? ''],
    titulo_posicion_y: [this.data?.header?.titulo_posicion_y ?? '']
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    private elRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    console.log(this.data);

    interact('#draggable').draggable({
      listeners: {
        move: (event) => {
          const target = event.target;
          const container = document.querySelector('.header-box');

          if (container) {
            // Obtener las posiciones actuales
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // Obtener las dimensiones del contenedor
            const containerRect = container.getBoundingClientRect();

            // Calcular la posición en porcentaje
            const xPercent = (x / containerRect.width) * 100;
            const yPercent = (y / containerRect.height) * 100;

            // Aplicar las posiciones en porcentaje
            target.style.left = `${xPercent}%`;
            target.style.top = `${yPercent}%`;

            // Actualizar atributos data-x y data-y
            target.setAttribute('data-x', x.toString());
            target.setAttribute('data-y', y.toString());

            // Actualizar el formulario con las nuevas posiciones
            this.formHeader.patchValue({
              titulo_posicion_x: xPercent.toFixed(2),
              titulo_posicion_y: yPercent.toFixed(2)
            });

            // Mostrar las posiciones en porcentaje
            console.log(`X: ${xPercent.toFixed(2)}%, Y: ${yPercent.toFixed(2)}%`);
          }
        }
      },
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: '.header-box',
          endOnly: true
        })
      ]
    });
  }

  updateHeader() {
    console.log(this.formHeader.value)
    if (this.formHeader.value.header_name === '' || this.formHeader.value.image === '') {
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

  get iconColorControl(): FormControl {
    return this.formHeader.get('icon_color') as FormControl;
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
