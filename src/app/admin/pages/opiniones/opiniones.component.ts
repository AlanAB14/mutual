import { Component, OnInit } from '@angular/core';
import { DicenService } from 'src/app/client/services/dicen.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss']
})
export class OpinionesComponent implements OnInit {
  opiniones: any;
  spinner: boolean = false;
  muestraOpiniones: boolean = false;
  constructor(private dicenService: DicenService) { }

  ngOnInit(): void {
    this.getDicen();
  }

  getDicen() {
    this.spinner = true;
    this.muestraOpiniones = false
    this.dicenService.getDicen()
      .subscribe(resp => {
        console.log(resp)
        this.opiniones = resp;
        this.spinner = false;
        this.muestraOpiniones = true
      })
  }

  updateOpinion(campo: string, id: number, campoDato: string) {
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
          const body: any = {};
          const nombrePropiedad = campo;
          body[nombrePropiedad] = result.value[0].value;
          console.log(body)
          this.spinner = true;
          this.muestraOpiniones = false
          this.dicenService.updateDicen(body, id)
            .subscribe(resp => {
              this.getDicen()
              Swal.fire('','Opinión editada con éxito', 'success')
            },
              (error) => {
                Swal.fire('', 'Ocurrió un error al editar opinion', 'error');
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

  updateOpinionImage(ctrl: string, event: any, id: number) {
    this.imageBlob(event)
      .then((result: any) => {
        let body = {
          imagen: result.split(',')[1]
        }
        this.spinner = true;
        this.muestraOpiniones = false;
        this.dicenService.updateDicen(body, id)
          .subscribe( resp => {
            this.getDicen()
            Swal.fire('','Opinión editada con éxito', 'success')
          },
          (error) => {
            console.log(error)
            Swal.fire('', 'Ocurrió un error al editar opinion', 'error');
          })
      })
      .catch(err =>  {
        console.log(err)
        Swal.fire('', 'Ocurrió un error al editar opinion', 'error');
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
