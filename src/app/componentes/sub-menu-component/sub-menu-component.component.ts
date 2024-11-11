import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sub-menu-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './sub-menu-component.component.html',
  styleUrl: './sub-menu-component.component.css'
})
export class SubMenuComponentComponent {
  @Input() titulo: string = '';
}
