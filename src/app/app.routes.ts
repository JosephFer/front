import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';

import { SalasComponent } from './componentes/salas/salas.component';
import { ListarComponent } from './componentes/listar/listar.component';
import { HomeComponent } from './componentes/home/home.component';
import { MoviesComponent } from './componentes/movies/movies.component';
import { ComidaComponent } from './componentes/comida/comida.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'movies', component: MoviesComponent},
    {path: 'room', component: SalasComponent, children: 
        [{path: 'listar', component: ListarComponent}]
    },
    {path: 'menu', component: ComidaComponent},
    {path: 'listar', component: ListarComponent},
    {path: '**', component: ErrorComponent},
];
