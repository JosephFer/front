import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';

import { SalasComponent } from './componentes/salas/salas.component';
import { ListarComponent } from './componentes/listar/listar.component';
import { HomeComponent } from './componentes/home/home.component';
import { MoviesComponent } from './componentes/movies/movies.component';



import { ComidaComponent } from './componentes/comida/comida.component';
import { AddEditProductComponent } from './componentes/add_movie_component/add-edit-product.component';
import { AddComidaComponent } from './componentes/comida/add-comida/add-comida.component';

import { EditMovieComponent } from './componentes/movies/edit-movie/edit-movie.component';
import { UpdateComidaComponent } from './componentes/comida/update-comida/update-comida.component';


export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'movies', component: MoviesComponent},
    { path: 'add', component: AddEditProductComponent },
    { path: 'edit/:id', component: EditMovieComponent },
    {path: 'rooms', component: SalasComponent, children: 
        [{path: 'listar', component: ListarComponent}]
    },
    {path: 'menu', component: ComidaComponent},
    {path: 'menu/add', component: AddComidaComponent},
    {path : 'menu/edit/:idMenu', component: UpdateComidaComponent},
    {path: 'listar', component: ListarComponent},
    {path: '**', component: ErrorComponent},
];

