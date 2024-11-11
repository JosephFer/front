import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetSalasService } from '../../servicios/api/salas.service';
import { ActivatedRoute } from '@angular/router';
import { GetCinesService } from '../../servicios/api/cines.service';


@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [],
  providers:[],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit, OnDestroy{
  columns: string[] = [];
  data: any[] = [];
  contexto:string = '';
  isLoading:boolean = true;
  errorMessage: string | null = null;
  paginaActual: number = 1;
  limite: number = 10;
  totalElementos: number = 0;
  constructor(private route: ActivatedRoute, private getSalasService:GetSalasService, private getCinesService:GetCinesService){};

  ngOnInit(): void {
     this.contexto = this.route.snapshot.parent?.routeConfig?.path || '';
     
     if(this.contexto === 'rooms'){
        this.columns = ["#", "Capacidad", "# Cine"];
        this.getSalas();
     }else if(this.contexto === 'cine'){
        this.columns = ["#", "nombre", "# Ubicacion"];
        this.getCines();
     }
  }

  ngOnDestroy(): void {
      
  }

  public getSalas(){
    this.getSalasService.getSalas().subscribe({
      next: (response: any)=>{
        console.log(response);
  
        this.data = response;
      },
      error: (error: string)=>{
        this.errorMessage = error;
        this.isLoading = false;
      }
    })
    };

  public getCines(){
    this.getCinesService.getCines(this.paginaActual, this.limite).subscribe({
      next: (response: any)=>{
        console.log(response);

        this.data = response.cines; 
        this.totalElementos = response.totalCines;

      }, error: (error: string)=>{
        this.errorMessage = error;
        this.isLoading = false;
      }

    });
  }

  cambiarPagina(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.getCines();
  }
}
