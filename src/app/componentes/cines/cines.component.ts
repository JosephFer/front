import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubMenuComponentComponent } from "../sub-menu-component/sub-menu-component.component";
import { RouterOutlet } from '@angular/router';
import { GetCinesService } from '../../servicios/api/cines.service';

@Component({
  selector: 'app-cines',
  standalone: true,
  imports: [SubMenuComponentComponent, RouterOutlet],
  templateUrl: './cines.component.html',
  styleUrl: './cines.component.css'
})
export class CinesComponent{
 

  
}
