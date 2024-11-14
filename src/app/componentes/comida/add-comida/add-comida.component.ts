import { Component } from '@angular/core';
import { Menu } from '../../../interface/menu';
import { ComidaService } from '../../../services/api/comida/comida.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-comida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-comida.component.html',
  styleUrl: './add-comida.component.css'
})
export class AddComidaComponent {

  nuevoMenu : Menu = {
    idMenu : 0,
    precio : 0,
    cantidadDisponible : 0,
    idComida : 0,
    idCine : 0
  }

  constructor(private comidaService : ComidaService, private location: Location) {}

  volver() : void {
    this.location.back();
  }

  crearMenu() {
    this.comidaService.addComida(this.nuevoMenu).subscribe(
      response => {
        console.log('Comida creada:', response);
        // Aquí puedes hacer algo después de crear la comida, como mostrar un mensaje o limpiar el formulario
      },
      error => {
        console.error('Error al crear la comida:', error);
      }
    );
  }
}
