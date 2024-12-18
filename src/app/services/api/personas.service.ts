import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personas } from '../../interface/Personas';
import { CREATE_PERSONS, DELETE_PERSONS, GET_ALL_PERSONS, GET_PERSONS_PAGE, UPDATE_PERSONS } from '../../utilities/domains/persons/PERSONS_URls';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http:HttpClient){}

  public getAllPersons(): Observable<Personas[]> {
    return this.http.get<Personas[]>(GET_ALL_PERSONS);
  }


  public getPaginationPersons(page: number, size: number): Observable<Personas[]> {
    return this.http.get<Personas[]>(
      GET_PERSONS_PAGE + `?page=${page}&limit=${size}`
    );
  }

  public addPerson(persona: Personas): Observable<Personas> {
    return this.http.post<Personas>(CREATE_PERSONS, persona);
  }

  public updatePerson(persona: Personas): Observable<Personas>{
    return this.http.put<Personas>(UPDATE_PERSONS, persona);
  }

  public deletePerson(id: number): Observable<Personas> {
    console.log(`${DELETE_PERSONS}/${id}`);
    return this.http.delete<Personas>(`${DELETE_PERSONS}/${id}`);
  }
}
