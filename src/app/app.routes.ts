import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { SalasComponent } from './componentes/salas/salas.component';
import { ListarComponent, ListarComponent as listarMovies } from './componentes/listar/listar.component';
import { HomeComponent } from './componentes/home/home.component';
import { MoviesComponent } from './componentes/movies/movies.component';
import { PersonasComponent } from './componentes/personas/personas.component';
import { CinesComponent } from './componentes/cines/cines.component';

//Componentes de Personas
import { ListarComponent as listarPersonas } from './componentes/personas/listarPersonas/listar.component';
import { AgregarComponent as agregarPersonas } from './componentes/personas/agregarPersonas/agregar.component';
import { EditarComponent as editarPersonas } from './componentes/personas/editarPersonas/editar.component';
import { BorrarComponent as borrarPersonas } from './componentes/personas/borrarPersonas/borrar.component';

//Componentes de Cines
import { ListarCineComponent, ListarCineComponent as listarCines } from './componentes/cines/listar-cine/listar-cine.component';
import { AgregarCineComponent } from './componentes/cines/agregar-cine/agregar-cine.component'; 
import { EditarCineComponent } from './componentes/cines/editar-cine/editar-cine.component'; 
import { BorrarCineComponent } from './componentes/cines/borrar-cine/borrar-cine.component'; 

import { ComidaComponent } from './componentes/comida/comida.component';
import { AddEditProductComponent } from './componentes/add_movie_component/add-edit-product.component';
import { AddComidaComponent } from './componentes/comida/add-comida/add-comida.component';
import { EditMovieComponent } from './componentes/movies/edit-movie/edit-movie.component';
import { UpdateComidaComponent } from './componentes/comida/update-comida/update-comida.component';
import { FunctionsComponent } from './componentes/functions/functions.component';
import { EditComponent } from './componentes/functions/edit/edit.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'movies', component: MoviesComponent},
    { path: 'add', component: AddEditProductComponent },
    { path: 'edit/:id', component: EditMovieComponent },
    {path: 'rooms', component: SalasComponent, children: 
        [{path: 'listar', component: listarMovies}]
    },
    {path: 'persons', component: PersonasComponent, children:
        [{path: 'listar', component: listarPersonas},
         {path: 'agregar', component: agregarPersonas},
         {path: 'editar/:id', component: editarPersonas},
         {path: 'borrar/:id', component: borrarPersonas}
        ]
    },
    {path: 'menu', component: ComidaComponent},
    {path: 'cines', component: CinesComponent, children:[
        {path: 'listar', component: ListarCineComponent},
        {path: 'agregar', component: AgregarCineComponent},
        {path: 'editar/:id', component: EditarCineComponent},
        {path: 'borrar/:id', component: BorrarCineComponent},
    ]},
    {path: 'menu/add', component: AddComidaComponent},
    {path : 'menu/edit/:idMenu', component: UpdateComidaComponent},
    {path: 'listar', component: ListarComponent},
    {path: 'functions',component: FunctionsComponent},
    {path: 'functions/edit/:id', component: EditComponent},
    {path: '**', component: ErrorComponent},
];

