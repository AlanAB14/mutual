import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { PrestamosService } from 'src/app/client/services/prestamos.service';
import { SharedGlobalModule } from 'src/app/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {
  spinnerTable: boolean = true;
  displayedColumns: string[] = ['tipo', 'fecha', 'datos'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private prestamosService: PrestamosService,
    public dialog: MatDialog
  ) {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.prestamosService.getPrestamos()
      .subscribe((resp: any) => {
        this.spinnerTable = true
        console.log(resp)
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerTable = false;
      })
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verPrestamo(prestamoData: any) {
    console.log(prestamoData)
    const dialogRef = this.dialog.open(DialogContent, {
      data: prestamoData
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getFecha(fecha: Date) {
    console.log(fecha)
    console.log(moment(fecha).calendar())
    return moment(fecha).utc().format('DD/MM/YYYY')
  }

  eliminarPrestamo(data: any) {
    console.log(data)
    Swal.fire({
      text: 'Quieres eliminar el registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinnerTable = true
        this.prestamosService.deletePrestamo(data.id)
          .subscribe(resp => {
            this.cargarPrestamos();
            Swal.fire('', 'Registro eliminado con éxito', 'success')
          },
          (error) => {
            Swal.fire('', 'Ocurrió un error al eliminar registro', 'error');
            console.log(error)
          })
      }
    })

  }

}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, SharedGlobalModule, CommonModule],
  styles: [
    `
    td, th {
      padding: .5rem
    }

    .mdc-dialog .mdc-dialog__content {
      padding: 0px 24px 0px 24px;
    }`
  ]
})
export class DialogContent {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  capitalizeTitle(palabra: any) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }
}