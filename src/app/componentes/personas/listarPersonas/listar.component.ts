import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Personas } from '../../../interface/Personas';
import { PersonasService } from '../../../services/api/personas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {

  private personasService: PersonasService = inject(PersonasService);
  private page = 1;
  private limit = 10;
  public existenRegistros: boolean = false;

  persons_array: Personas[] = [];
  personsChunks: Personas[][] = [];

  constructor(){}

  ngOnInit() {
    this.getPersonasPaginado();
  }

  getPersonasPaginado(): void{
    this.personasService
      .getPaginationPersons(this.page, this.limit)
      .subscribe((data: Personas[]) => {
        this.persons_array = data;
        this.existenRegistros = data.length === 0;
      });
  }
  
  public siguientePagina():void {
    if(!this.existenRegistros){
      this.page++;
      this.getPersonasPaginado();
    }

  }

  public anteriorPagina(): void{
    if(this.page>1){
      this.page--;
      this.getPersonasPaginado();
    }
  }


  chunkPersons(): void{
    for (let i = 0; i < this.persons_array.length; i += 5) {
      this.personsChunks.push(this.persons_array.slice(i, i + 5));
  }
}
}
