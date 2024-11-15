import { Component, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { GetSalasService } from '../../servicios/api/salas.service';
import { ActivatedRoute } from '@angular/router';
import { CinesService } from '../../servicios/api/cines.service';
import { TiposComidasService } from '../../servicios/api/tipos-comidas.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [SpinnerComponent],
  providers: [],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent implements OnInit, OnDestroy {
  columns: string[] = [];
  data: any[] = [];
  contexto: string = '';
  isLoading: WritableSignal<boolean> = signal(true);
  paginaActual: number = 1;
  limite: number = 10;
  totalElementos: number = 0;
  mensaje:string = "cargando";
  constructor(
    private route: ActivatedRoute,
    private getSalasService: GetSalasService,
    private getCinesService: CinesService,
    private tiposComidaService:TiposComidasService
  ) {}

  ngOnInit(): void {
    this.contexto = this.route.snapshot.parent?.routeConfig?.path || '';

    switch (this.contexto) {
      case 'rooms':
        this.columns = ['#', 'Capacidad', '# Cine'];
        this.getSalas();
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



  public getSalas() {
    this.getSalasService.getSalas().subscribe({
      next: (response: any) => {
        console.log(response);

        this.data = response;
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

  cambiarPagina(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.contexto = this.route.snapshot.parent?.routeConfig?.path || '';
    if(this.contexto === 'tiposComida'){
      this.getTiposComidas();
    }else if(this.contexto === 'cine'){
      this.getCines();
    }
  }
}
