import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/api/movies/movies.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../interface/movies';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Genre } from '../../interface/genre';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'] // Corrected from styleUrl to styleUrls
})
export class AddEditProductComponent implements OnInit {

  genres: Genre[] = [];

  movie: Movie = {
    nombrePelicula: '',
    duracionPelicula: '',
    idGenero: 0
  };

  constructor(
    private movieServ: MoviesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.movieServ.getAllGenres().subscribe((data: Genre[]) => {
      this.genres = data;
    });
  }

  onNoClick(): void {
    this.router.navigate(['/']);
  }

  addMovie(): void {
    this.movieServ.addMovie(this.movie).subscribe({
      next: () => {
        this.snackBar.open('Película creada exitosamente', 'Cerrar', {
          panelClass: ['snackbar'],
          duration: 3000
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackBar.open('Error al crear la película', 'Cerrar', {
          panelClass: ['snackbar'],
          duration: 3000
        });
      }
    });
  }
}