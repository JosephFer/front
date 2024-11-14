import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { SalasComponent } from './pages/salas/salas.component';

import { CinesComponent } from './pages/cines/cines.component';
import { ListarComponent } from './componentes/listar/listar.component';
import { CrearComponent } from './componentes/crear/crear.component';
import { ComidasComponent } from './pages/comidas/comidas.component';
import { TiposComidasComponent } from './pages/tipos-comidas/tipos-comidas.component';
import { ActualizarCrearComponent } from './pages/actualizar-crear/actualizar-crear.component';
import { ButacasComponent } from './pages/butacas/butacas.component';
import { ActualizarCrearButacasComponent } from './pages/actualizar-crear-butacas/actualizar-crear-butacas.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' }, 
    {path: 'home', component: MenuComponent},
    {path: 'rooms', component: SalasComponent, children: 
        [{path: 'listar', component: ListarComponent},  {path:'agregar', component:CrearComponent}],
    },
    {path:'cine', component: CinesComponent, children:
        [{path: 'listar', component: ListarComponent}, {path:'agregar', component:CrearComponent}]
    },
    {path: 'comida', component: ComidasComponent},

    {path: 'nuevo', component:ActualizarCrearComponent},
    {path: 'nuevoB', component:ActualizarCrearButacasComponent},

    {path: 'tipoComida', component: TiposComidasComponent},

    {path: 'editar/:idComida', component:ActualizarCrearComponent},

    {path: 'editarB/:idButaca', component:ActualizarCrearButacasComponent},

    {path: 'listar', component: ListarComponent},

    {path: 'butacas', component: ButacasComponent},
    {path: 'tiposComida', component: TiposComidasComponent},

    {path: '**', component: ErrorComponent},
    

];
