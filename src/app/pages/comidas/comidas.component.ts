import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { SpinnerComponent } from '../../componentes/spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ComidasService } from '../../servicios/api/comidas.service';
import { ComidaCardComponent } from "../../componentes/comida-card/comida-card.component";

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatButtonModule,
    ComidasComponent,
    RouterModule,
    ComidaCardComponent
],
  templateUrl: './comidas.component.html',
  styleUrl: './comidas.component.css'
})
export class ComidasComponent implements OnInit, OnDestroy{
  paginaActual: number = 1;
  limite: number = 10;
  totalElementos: number = 0;
  mensaje:string = "cargando";
  private comidasService = inject(ComidasService);
  public comidas: WritableSignal<any[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.Obtenertodo();
  }

  ngOnDestroy(): void {
     
  }
  Obtenertodo() {
    this.comidasService.getComidas(this.paginaActual, this.limite).subscribe(x=>{
      this.comidas.set(x.resultado);
      this.totalElementos = x.totalComidas
      setTimeout(() => {
        this.isLoading.set(false);
      }, 1400);
    })
  }

  eliminado(x:boolean){
    if(x){
      this.isLoading.set(true);
      setTimeout(()=>{
        this.Obtenertodo();
      },1500);
    }
  }


  cambiarPagina(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.Obtenertodo();
  }
}
