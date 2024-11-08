import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListarComponent } from '../listar/listar.component';

@Component({
  selector: 'app-sub-menu-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ListarComponent],
  templateUrl: './sub-menu-component.component.html',
  styleUrl: './sub-menu-component.component.css'
})
export class SubMenuComponentComponent {

}
