import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../../../interface/movies'; // Adjust the path as necessary
import { Observable } from 'rxjs/internal/Observable';
import { CREATE_MOVIE, DELETE_MOVIE, GET_ALL_MOVIES, UPDATE_MOVIE } from '../../../utilities/domains/movies/MOVIES_URLs';
import { Genre } from '../../../interface/genre';
import { GET_ALL_GENDERS } from '../../../utilities/domains/genders/generURLs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<Movie[]> {
    const r = this.http.get<Movie[]>(GET_ALL_MOVIES);
    console.log(r);
    return r;
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(GET_ALL_GENDERS);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(CREATE_MOVIE, movie);
  }

  editMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(UPDATE_MOVIE, movie);
  }

  deleteMovie(id: number): Observable<Movie> {
    console.log(`${DELETE_MOVIE}/${id}`);
    return this.http.delete<Movie>(`${DELETE_MOVIE}/${id}`);
  }
   
}


