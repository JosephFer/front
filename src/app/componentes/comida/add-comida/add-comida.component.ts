import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-comida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-comida.component.html',
  styleUrl: './add-comida.component.css'
})
export class AddComidaComponent {
  addMovie() {
    throw new Error('Method not implemented.');
  }

}
