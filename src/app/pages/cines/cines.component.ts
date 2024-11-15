import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubMenuComponentComponent } from '../../componentes/sub-menu-component/sub-menu-component.component'; 
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cines',
  standalone: true,
  imports: [SubMenuComponentComponent, RouterOutlet],
  templateUrl: './cines.component.html',
  styleUrl: './cines.component.css'
})
export class CinesComponent{
 

  
}
