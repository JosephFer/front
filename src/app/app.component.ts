import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SalasComponent } from './componentes/salas/salas.component';
import { HttpClient } from '@angular/common/http';
import { ListarComponent } from './componentes/listar/listar.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { SidebarComponent } from "./componentes/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'is_02_ahi';
}
