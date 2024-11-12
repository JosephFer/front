import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/api/movies/movies.service';
import { Movie } from '../../interface/movies';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  private movieService = inject(MoviesService);
  mov_array: Movie[] = [];
  movieChunks: Movie[][] = [];

  constructor() {

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
