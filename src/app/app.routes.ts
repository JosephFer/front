import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';

import { SalasComponent } from './componentes/salas/salas.component';
import { ListarComponent } from './componentes/listar/listar.component';
import { HomeComponent } from './componentes/home/home.component';
import { MoviesComponent } from './componentes/movies/movies.component';
import { PersonasComponent } from './componentes/personas/personas.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'movies', component: MoviesComponent},
    {   path: 'persons', 
        component: PersonasComponent,
        children: [
            {path: 'listar', component: },
            {path: 'buscar', component: },
            {path: 'agregar', component: },
            {path: 'editar', component: },
            {path: 'borrar', component: },
        ] },
    {path: 'rooms', component: SalasComponent, children: 
        [{path: 'listar', component: ListarComponent}]
    },
    {path: 'listar', component: ListarComponent},
    {path: '**', component: ErrorComponent},
];
