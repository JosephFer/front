import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cines } from '../../../interface/Cines';
import { CineService } from '../../../services/api/cine.service';

@Component({
  selector: 'app-listar-cine',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-cine.component.html',
  styleUrl: './listar-cine.component.css'
})
export class ListarCineComponent implements OnInit{
  private cinesService: CineService = inject(CineService);
  private page = 1;
  private limit = 10;
  public existenRegistros: boolean = false;

  cines_array: Cines[] = [];
  cinesChunks: Cines[][] = [];

  constructor(){}

  ngOnInit() {
    this.getCinesPaginados();
  }

  getCinesPaginados(): void{
    this.cinesService.
      getPaginationCinema(this.page, this.limit)
      .subscribe((data: Cines[]) => {
        this.cines_array = data;
        this.existenRegistros = data.length === 0;
      });
  }
  
  public siguientePagina():void {
    if(!this.existenRegistros){
      this.page++;
      this.getCinesPaginados();
    }

  }

  public anteriorPagina(): void{
    if(this.page>1){
      this.page--;
      this.getCinesPaginados();
    }
  }


  chunkCines(): void{
    for (let i = 0; i < this.cines_array.length; i += 5) {
      this.cinesChunks.push(this.cines_array.slice(i, i + 5));
  }
}
}
