import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/api/movies/movies.service';
import { Movie } from '../../interface/movies';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  private movieService = inject(MoviesService);
  mov_array: Movie[] = [];
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

   editarPelicula(): void {
    console.log('holo');
    // Aquí puedes añadir cualquier otra funcionalidad, como abrir un formulario de edición.
  }
  



  chunkMovies(): void {
    for (let i = 0; i < this.mov_array.length; i += 5) {
      this.movieChunks.push(this.mov_array.slice(i, i + 5));
    }
  }

}
