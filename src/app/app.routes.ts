import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { SalasComponent } from './componentes/salas/salas.component';

import { CinesComponent } from './componentes/cines/cines.component';
import { ListarComponent } from './componentes/listar/listar.component';
import { CrearComponent } from './componentes/crear/crear.component';
import { ComidasComponent } from './componentes/comidas/comidas.component';
import { TiposComidasComponent } from './componentes/tipos-comidas/tipos-comidas.component';

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

    {path: 'tipoComida', component: TiposComidasComponent},

    {path: 'listar', component: ListarComponent},
    {path: '**', component: ErrorComponent},
    

];
