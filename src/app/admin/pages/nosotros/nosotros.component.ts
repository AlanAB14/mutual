import { Component, OnInit } from '@angular/core';
import { NosotrosService } from 'src/app/client/services/nosotros.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {
  muestraNosotros: boolean = false;
  spinner: boolean = false;
  nosotros: any;

  constructor(private nosotrosService: NosotrosService) { }

  ngOnInit(): void {
    this.getNosotros();
  }

  getNosotros() {
    this.spinner = true;
    this.muestraNosotros = false;
    this.nosotrosService.getNosotrosContent()
      .subscribe(resp => {
        console.log(resp)
        this.nosotros = resp
        this.spinner = false;
        this.muestraNosotros = true;
      })
  }

  updateNosotros(campo: string, id: number, campoDato: string) {
    Swal.fire({
      title: `${this.capitalizarPrimeraLetra(campo)}`,
      showCancelButton: true,
      html:
        '<div class="inputs-ta-swal">' +
        `<textarea id="swal-input1">${campoDato}</textarea>` +
        '<div>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1')
        ]
      }
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed && (result.value[0].value !== '')) {
        if (result.value[0].value !== campoDato) {
          this.spinner = true;
          this.muestraNosotros = false;
          const body: any = {};
          const nombrePropiedad = campo;
          body[nombrePropiedad] = result.value[0].value;
          console.log(body)
          this.nosotrosService.updateNosotros(body, id)
            .subscribe(resp => {
              this.getNosotros()
              Swal.fire('', `${this.capitalizarPrimeraLetra(campo)} editado con éxito`, 'success');
            },
              (error) => {
                Swal.fire('', 'Ocurrió un error al editar campo', 'error');
                console.log(error)
              })
        } else {
          Swal.close();
        }
      } else {
        Swal.close();
      }
    })
  }

  updateNosotrosVideo(ctrl: string, event: any, id: number) {
    this.imageBlob(event)
      .then((result: any) => {
        let body = {
          video: result.split(',')[1]
        }
        this.spinner = true;
        this.muestraNosotros = false;
        this.nosotrosService.updateNosotros(body, id)
          .subscribe(resp => {
            this.getNosotros()
            Swal.fire('', 'Video editado con éxito', 'success')
          },
            (error) => {
              console.log(error)
              Swal.fire('', 'Ocurrió un error al editar video', 'error');
            })
      })
      .catch(err => {
        console.log(err)
        Swal.fire('', 'Ocurrió un error al editar video', 'error');
      })
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

  capitalizarPrimeraLetra(cadena: string) {
    if (cadena.length === 0) {
      return cadena;
    }
    const primeraLetraMayuscula = cadena.charAt(0).toUpperCase();
    const restoDeLaCadena = cadena.slice(1);

    return primeraLetraMayuscula + restoDeLaCadena;
  }



}
