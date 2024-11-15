import { Component } from '@angular/core';
import { Menu } from '../../../interface/menu';
import { ComidaService } from '../../../services/api/comida/comida.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  constructor(private comidaService : ComidaService, private location: Location, private snackBar : MatSnackBar, private router : Router) {}

  volver() : void {
    this.location.back();
  }

  onNoClick(): void {
    this.router.navigate(['/']);
  }

  crearMenu(): void {
    this.comidaService.addComida(this.nuevoMenu).subscribe({
      next: (response) => {
        this.snackBar.open('Menu creado exitosamente', 'Cerrar', {
          verticalPosition: 'top',
          duration: 3000
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackBar.open('Error al crear la película', 'Cerrar', {
          //verticalPosition: 'top',
          duration: 3000
        });
      }
    });
  }
}
