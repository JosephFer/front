import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { PersonasService } from '../../services/api/personas.service';
import { Personas } from '../../interface/Personas';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent implements OnInit {
  
  private personasService = Inject(PersonasService);

  persons_array: Personas[] = [];
  personsChunks: Personas[][] = [];

  constructor(){}

  ngOnInit() {
    this.fetchPersons();
  }

  fetchPersons() {
    this.personasService.getAllPersons().subscribe((data: Personas[]) => {
      this.persons_array = data;
      this.chunkPersons();
      console.log(this.persons_array);
    });
  }

  chunkPersons(): void{
    for (let i = 0; i < this.persons_array.length; i += 5) {
      this.personsChunks.push(this.persons_array.slice(i, i + 5));
  }
}
}
