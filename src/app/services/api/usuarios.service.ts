import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../../interface/Usuarios';
import { GET_ALL_USUARIOS } from '../../utilities/domains/usuarios/usuarios_URLs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  public getAllUsers(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(GET_ALL_USUARIOS);
  }
}
