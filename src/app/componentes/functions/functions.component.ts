import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Funcion } from '../../interface/Function';
import { Sala } from '../../interface/Sala';
import { Horario } from '../../interface/Horario';
import { FunctionService } from '../../services/api/functions/function.service';
import { MoviesService } from '../../services/api/movies/movies.service';
import { Movie } from '../../interface/movies';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-functions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {
  funciones: Funcion[] = [];
  salas: Sala[] = [];
  horarios: Horario[] = [];
  movies: Movie[] = [];
  funcionesConDetalles: any[] = [];

  constructor(private functionService: FunctionService, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      funciones: this.functionService.getFunciones(),
      salas: this.functionService.getSalas(),
      horarios: this.functionService.getHorarios(),
      movies: this.moviesService.getAllMovies()
    }).subscribe(({ funciones, salas, horarios, movies }) => {
      this.funciones = funciones;
      this.salas = salas;
      this.horarios = horarios;
      this.movies = movies;
      this.mapFuncionesConDetalles();
    });
  }

  mapFuncionesConDetalles(): void {
    if (this.funciones.length && this.salas.length && this.horarios.length && this.movies.length) {
      this.funcionesConDetalles = this.funciones.map(funcion => {
        const sala = this.salas.find(s => s.idSala === funcion.idSala);
        const horario = this.horarios.find(h => h.idHorario === funcion.idHorario);
        const movie = horario ? this.movies.find(m => m.idPelicula === horario.idPelicula) : null;
        return {
          ...funcion,
          movie: movie ? movie.nombrePelicula : 'Película no encontrada',
          sala: sala ? sala.idSala : 'Sala no encontrada',
          horario: horario ? horario.hora : 'Horario no encontrado'
        };
      });
    }
  }
}
