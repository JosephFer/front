import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/api/movies/movies.service';
import { Movie } from '../../../interface/movies';
import { NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Genre } from '../../../interface/genre';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})
export class EditMovieComponent implements OnInit {

  genres: Genre[] = [];
  constructor(private movieService: MoviesService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  movie: Movie = {
    idPelicula: 0,
    nombrePelicula: '',
    duracionPelicula: '',
    idGenero: 0,
  }

  id: number | undefined;

  ngOnInit(): void {
    this.getGenres();
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      if (this.id) {
        this.getMovies(this.id);
      }
    });
  }

  getMovies(id: number): void {
    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.movie = this.movies.find(movie => movie.idPelicula === id)!;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  genre: Genre[] = [];
  movies: Movie[] = [];


  getGenres(): void {
    this.movieService.getAllGenres().subscribe({
      next: (data) => {
        this.genres = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onNoClick(): void {
    this.router.navigate(['/movies']);
  }

  deleteMovie(): void {
    console.log(this.id);
    this.movieService.deleteMovie(this.id!).subscribe({
      next: (data) => {
        this.snackBar.open('Película eliminada exitosamente', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        this.snackBar.open('Error al eliminar la pelicula', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
      }
    });
  }

  editMovie(): void {
    this.movieService.editMovie(this.movie).subscribe({
      next: (data) => {
        this.snackBar.open('Película editada exitosamente', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        this.snackBar.open('Error al editar la pelicula', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
      }
    }
    );
  }
}
