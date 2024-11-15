import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';

import { SalasComponent } from './componentes/salas/salas.component';
import { ListarComponent as listarMovies } from './componentes/listar/listar.component';
import { HomeComponent } from './componentes/home/home.component';
import { MoviesComponent } from './componentes/movies/movies.component';
import { PersonasComponent } from './componentes/personas/personas.component';


import { ListarComponent as listarPersonas } from './componentes/personas/listarPersonas/listar.component';
import { BuscarComponent as buscarPersonas} from './componentes/personas/buscarPersonas/buscar.component';
import { AgregarComponent as agregarPersonas } from './componentes/personas/agregarPersonas/agregar.component';
import { EditarComponent as editarPersonas } from './componentes/personas/editarPersonas/editar.component';
import { BorrarComponent as borrarPersonas } from './componentes/personas/borrarPersonas/borrar.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'movies', component: MoviesComponent},
    {   path: 'persons', 
        component: PersonasComponent,
        children: [
            {path: 'listar', component: listarPersonas},
            {path: 'buscar', component: buscarPersonas},
            {path: 'agregar', component: agregarPersonas},
            {path: 'editar', component: editarPersonas},
            {path: 'borrar', component: borrarPersonas},
        ] },
    {path: 'rooms', component: SalasComponent, children: 
        [{path: 'listar', component: listarMovies}]
    },
    {path: 'listar', component: listarMovies},
    {path: '**', component: ErrorComponent},
];
