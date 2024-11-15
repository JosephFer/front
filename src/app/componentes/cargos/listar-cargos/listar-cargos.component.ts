import { Component, inject, OnInit } from '@angular/core';
import { CargoService } from '../../../services/api/cargo.service';
import { Cargos } from '../../../interface/Cargos';

@Component({
  selector: 'app-listar-cargos',
  standalone: true,
  imports: [],
  templateUrl: './listar-cargos.component.html',
  styleUrl: './listar-cargos.component.css'
})
export class ListarCargosComponent implements OnInit {

  private cargosUsuarios: CargoService = inject(CargoService);
  private page = 1;
  private limit = 10;
  public existenRegistros: boolean = false;

  cargos_array: Cargos[] = [];

  constructor(){}

  ngOnInit() {
    this.getCargosPaginado();
  }

  getCargosPaginado(): void{
    this.cargosUsuarios
      .getPaginationCargos(this.page, this.limit)
      .subscribe((data: Cargos[]) => {
        this.cargos_array = data;
        this.existenRegistros = data.length === 0;
      });
  }
  
  public siguientePagina():void {
    if(!this.existenRegistros){
      this.page++;
      this.getCargosPaginado();
    }

  }

  public anteriorPagina(): void{
    if(this.page>1){
      this.page--;
      this.getCargosPaginado();
    }
  }

}
