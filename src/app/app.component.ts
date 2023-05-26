import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Empleado } from './Interfaces/empleado';
import { EmpleadoService } from './Services/empleado.service';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'nombreCompleto',
    'nombreDepartamento',
    'sueldo',
    'fechaContrato',
    'Acciones',
  ];
  dataSource = new MatTableDataSource<Empleado>();
  constructor(
    private _empleadoService: EmpleadoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  dialogoNuevoEmpleado() {
    this.dialog
      .open(DialogAddEditComponent, {
        disableClose: true,
        width: '500px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'creado') {
          this.mostrarEmpleados();
        }
      });
  }

  mostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  dialogoEditarEmpleado(dataEmpleado: Empleado) {
    this.dialog
      .open(DialogAddEditComponent, {
        disableClose: false,
        width: '500px',
        data: dataEmpleado,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'editado') {
          this.mostrarEmpleados();
        }
      });
  }

  dialogoDelete(dataEmpleado: Empleado) {
    this.dialog
      .open(DialogoDeleteComponent, {
        disableClose: true,
        width: '500px',
        data: dataEmpleado,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'eliminar') {
          this.eliminarEmpleado(dataEmpleado);
        }
      });
  }

  ngOnInit(): void {
    this.mostrarEmpleados();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  mostrarEmpleados() {
    this._empleadoService.getList().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (e) => {
        throw e;
      },
    });
  }
  eliminarEmpleado(empleado: Empleado) {
    this._empleadoService.delete(empleado.idEmpleado).subscribe({
      next:(data)=>{
        this.mostrarAlerta("Empleado eliminado","Listo");
        this.mostrarEmpleados()
      },
      error:(e)=>{throw e}
    });
  }
}
