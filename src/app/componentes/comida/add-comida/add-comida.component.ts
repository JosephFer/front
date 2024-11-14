import { Component } from '@angular/core';
import { Comida } from '../../../interface/comida';
import { ComidaService } from '../../../services/api/comida/comida.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-comida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-comida.component.html',
  styleUrl: './add-comida.component.css'
})
export class AddComidaComponent {
  nuevaComida : Comida = {
    idMenu : 0,
    precio : 0,
    cantidadDisponible : 0,
    idComida : 0,
    idCine : 0
  }

  constructor(private comidaService : ComidaService) {}

  crearComida() {
    this.comidaService.addComida(this.nuevaComida).subscribe(
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
