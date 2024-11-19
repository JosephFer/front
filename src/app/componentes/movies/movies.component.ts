import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from '../../services/api/movies/movies.service';
import { Movie } from '../../interface/movies';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  mov_array: Movie[] = [];
  private dialog: MatDialog = inject(MatDialog);
  private movieService: MoviesService = inject(MoviesService);
  movieChunks: Movie[][] = [];

  constructor() {
  }

  redirectToAdd() {
    window.location.href = 'http://localhost:8071/add';
  }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService.getAllMovies().subscribe((data) => {
      this.mov_array = data;
      this.chunkMovies();
      console.log(this.mov_array);
    });
  }


  chunkMovies(): void {
    for (let i = 0; i < this.mov_array.length; i += 5) {
      this.movieChunks.push(this.mov_array.slice(i, i + 5));
    }
  }

}
