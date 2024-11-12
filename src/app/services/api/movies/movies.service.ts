import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../../../interface/movies'; // Adjust the path as necessary
import { Observable } from 'rxjs/internal/Observable';
import { GET_ALL_MOVIES } from '../../../utilities/domains/movies/MOVIES_URLs';

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
   
}


