import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { SalasComponent } from './componentes/salas/salas.component';
import { ListarComponent } from './componentes/listar/listar.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' }, 
    {path: 'home', component: MenuComponent},
    {path: 'rooms', component: SalasComponent, children: 
        [{path: 'listar', component: ListarComponent}]
    },
    {path: 'listar', component: ListarComponent},
    {path: '**', component: ErrorComponent},
    

];
