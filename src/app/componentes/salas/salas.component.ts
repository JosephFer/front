import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SubMenuComponentComponent } from '../sub-menu-component/sub-menu-component.component';
import { GetSalasService } from '../../servicios/api/salas.service';
import { ListarComponent } from "../listar/listar.component";

@Component({
  selector: 'app-salas',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MenuComponent, SubMenuComponentComponent, ListarComponent],
  templateUrl: './salas.component.html',
  styleUrl: './salas.component.css'
})
export class SalasComponent{
}
