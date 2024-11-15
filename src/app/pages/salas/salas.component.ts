import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SubMenuComponentComponent } from '../../componentes/sub-menu-component/sub-menu-component.component';
import { GetSalasService } from '../../servicios/api/salas.service';
import { ListarComponent } from '../../componentes/listar/listar.component';

@Component({
  selector: 'app-salas',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MenuComponent, SubMenuComponentComponent],
  templateUrl: './salas.component.html',
  styleUrl: './salas.component.css'
})
export class SalasComponent{
}
