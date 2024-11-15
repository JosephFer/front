import { Component, input, OnDestroy, OnInit, output, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetSalasService } from '../../servicios/api/salas.service';
import { CinesService } from '../../servicios/api/cines.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TiposComidasService } from '../../servicios/api/tipos-comidas.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css',
})
export class EliminarComponent implements OnInit, OnDestroy {
  columns: string[] = [];
  data: any[] = [];
  contexto: string = '';
  errorMessage: string | null = null;
  paginaActual: number = 1;
  limite: number = 10;
  totalElementos: number = 0;
  selectedRecord: any;
  fueEliminado:boolean = false;
  isLoading: WritableSignal<boolean> = signal(true);
  constructor(
    private route: ActivatedRoute,
    private getSalasService: GetSalasService,
    private getCinesService: CinesService,
    private toast:ToastrService,
    private dialog:MatDialog,
    private tiposComidaService:TiposComidasService
  ) {}

  ngOnInit(): void {
    this.contexto = this.route.snapshot.parent?.routeConfig?.path || '';

    switch (this.contexto) {
      case 'rooms':
        this.columns = ['#', 'Capacidad', '# Cine'];
        // this.getSalas();
      break;

      case 'cine':
        this.columns = ['#', 'nombre', '# Ubicacion'];
        this.getCines();
      break;

      case 'tiposComida':
        this.columns = ['#', 'nombre', 'descripcion'];
        this.getTiposComidas();
      break;
    }
  }

  ngOnDestroy(): void {}

  eliminado(x:boolean){
    if(x){
      this.isLoading.set(true);
      setTimeout(()=>{
        this.contexto = this.route.snapshot.parent?.routeConfig?.path || '';

        switch (this.contexto) {
          case 'rooms':
            // this.getSalas();
          break;
    
          case 'cine':
         
            this.getCines();
          break;
    
          case 'tiposComida':
            this.getTiposComidas();
          break;
        }
      },1500);
    }
  }
  cambiarPagina(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.getCines();
  }

  eliminarCine(item: any) {
    this.selectedRecord = item;
    if (!item?.idCine) {
      this.toast.error('Error al tratar de eliminar', 'Error!');
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: true,
        enterAnimationDuration: '650ms',
        exitAnimationDuration: '450ms',
      });
      dialogRef
        .afterClosed()
        .pipe(
          filter((x) => x),
          switchMap(() =>
            this.getCinesService.deleteCines(item!.idCine)
          )
        )
        .subscribe(
          (response) => {
            if (response.borradoSinMiedo) {
              this.toast.success(response.respuesta, 'Realizado');
              this.isLoading.set(true);
              setTimeout(()=>{
                this.getCines();
              },1500);
            } else {
              this.toast.error(response.respuesta, 'No se pudo hacer :((');
            }
          },
          (isError: HttpErrorResponse) => {
            if (isError) {
              this.toast.error(isError.error.message, isError.statusText);
            }
          }
        );
    }
  }

  eliminarTipoComida(item: any) {
    this.selectedRecord = item;
    if (!item?.idTipoComida) {
      this.toast.error('Error al tratar de eliminar', 'Error!');
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: true,
        enterAnimationDuration: '650ms',
        exitAnimationDuration: '450ms',
      });
      dialogRef
        .afterClosed()
        .pipe(
          filter((x) => x),
          switchMap(() =>
            this.tiposComidaService.delete(item!.idTipoComida)
          )
        )
        .subscribe(
          (response) => {
            if (response.borradoSinMiedo) {
              this.toast.success(response.respuesta, 'Realizado');
              this.isLoading.set(true);
              setTimeout(()=>{
                this.getTiposComidas();
              },1500);
            } else {
              this.toast.error(response.respuesta, 'No se pudo hacer :((');
            }
          },
          (isError: HttpErrorResponse) => {
            if (isError) {
              this.toast.error(isError.error.message, isError.statusText);
            }
          }
        );
    }
  }
  public getCines() {
    this.getCinesService.getCines(this.paginaActual, this.limite).subscribe({
      next: (response: any) => {
        console.log(response);

        this.data = response.cines;
        this.totalElementos = response.totalCines;
        setTimeout(() => {
          this.isLoading.set(false);
        }, 1400);
      }
    });
  }

  public getTiposComidas() {
    this.tiposComidaService.getTiposComidas(this.paginaActual, this.limite).subscribe({
      next: (response: any) => {
        console.log(response);

        this.data = response.resultado;
        this.totalElementos = response.totalComidas;
        setTimeout(() => {
          this.isLoading.set(false);
        }, 1400);
      }
    });
  }

}
