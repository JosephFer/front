import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PersonasService } from '../../services/api/personas.service';
import { Personas } from '../../interface/Personas';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {
  
}
