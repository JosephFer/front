import { Component } from '@angular/core';
import { SubMenuComponentComponent } from "../../componentes/sub-menu-component/sub-menu-component.component";

@Component({
  selector: 'app-tipos-comidas',
  standalone: true,
  imports: [SubMenuComponentComponent],
  templateUrl: './tipos-comidas.component.html',
  styleUrl: './tipos-comidas.component.css'
})
export class TiposComidasComponent {

}
