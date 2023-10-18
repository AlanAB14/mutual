import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/client/services/servicios.service';
import { Servicio } from 'src/app/core/interfaces/servicio.interface';
import { ModalEditComponent } from '../../components/modal-edit/modal-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {
  cargandoData: boolean = true;
  servicios!: Servicio[];

  constructor(private serviciosService: ServiciosService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getServices()
  }

  getServices() {
  this.cargandoData = true;
    this.serviciosService.getServicios()
      .subscribe(services => {
        this.servicios = services;
        console.log(this.servicios)
        this.cargandoData = false
      })
  }

  openDialog(servicio: Servicio): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
       data: { servicio },
       minWidth: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      if (result) {
        this.getServices()
      }
    });
  }


}
