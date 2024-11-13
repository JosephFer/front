import { Component, inject, input, output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastrService } from 'ngx-toastr';
import { ComidasService } from '../../servicios/api/comidas.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ButacasComponent } from '../../pages/butacas/butacas.component';
@Component({
  selector: 'app-comida-card',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatProgressBarModule, 
    MatDividerModule,
    MatIconModule,
    ConfirmDialogComponent,
    RouterLink
  ],
  templateUrl: './comida-card.component.html',
  styleUrl: './comida-card.component.css'
})
export class ComidaCardComponent {
comida = input<any>();

private dialog = inject(MatDialog);

private toast = inject(ToastrService);

private comidaService  = inject(ComidasService);


fueEliminado = output<boolean>();

eliminarCine(){
  if(!this.comida()?.idComida){
    this.toast.error("Error al tratar de eliminar", "Error!");
  }else{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:true,
      enterAnimationDuration:'650ms',
      exitAnimationDuration: '450ms',
    });
    dialogRef.afterClosed().pipe(
      filter((x)=>x),
      switchMap(()=> this.comidaService.deleteComidas(this.comida()!.idComida))
    ).subscribe(response =>{
      if(response.borradoSinMiedo){
        this.toast.success(response.respuesta, 'Realizado');
        this.fueEliminado.emit(true);
      }else{
        this.toast.error(response.respuesta, 'No se pudo hacer :((');
      }

    }, (isError: HttpErrorResponse)=>{
      if(isError){
        this.toast.error(isError.error.message, isError.statusText);
      }
    });
  }
}
}
