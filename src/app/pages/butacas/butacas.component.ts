import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {  } from '../../servicios/api/tipos-comidas.service';
import { ButacasService } from '../../servicios/api/butacas.service';
import { SpinnerComponent } from '../../componentes/spinner/spinner.component';
import { ComidaCardComponent } from '../../componentes/comida-card/comida-card.component';

@Component({
  selector: 'app-butacas',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, ComidaCardComponent],
  templateUrl: './butacas.component.html',
  styleUrl: './butacas.component.css'
})
export class ButacasComponent implements OnInit, OnDestroy{
  paginaActual: number = 1;
  limite: number = 10;
  totalElementos: number = 0;
  mensaje:string = "cargando";
  public butacas: WritableSignal<any[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);

  constructor(private butacasService:ButacasService){};

  ngOnInit(): void {
    this.Obtenertodo();  
  }

  ngOnDestroy(): void {
      
  }

  Obtenertodo() {
    this.butacasService.getButacas(this.paginaActual, this.limite).subscribe(x=>{
      this.butacas.set(x.butacas);
      this.totalElementos = x.totalButacas
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
