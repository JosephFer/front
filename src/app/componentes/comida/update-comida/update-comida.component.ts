import { Menu } from '../../../interface/menu';
import { Component, OnInit } from '@angular/core';
import { ComidaService } from '../../../services/api/comida/comida.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-comida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-comida.component.html',
  styleUrl: './update-comida.component.css'
})
export class UpdateComidaComponent implements OnInit{
  
  menuActualizado : Menu = {
    idMenu : 0,
    precio : 0,
    cantidadDisponible : 0,
    idComida : 0,
    idCine : 0
  }

  router: any;

  constructor(private comidaService : ComidaService, 
              private location: Location, 
              private snackBar : MatSnackBar,
              private route: ActivatedRoute) {}

  volver() : void {
    this.location.back();
  }

  ngOnInit(): void {
    // Obtener el parámetro 'idMenu' de la URL y asignarlo a menuActualizado.idMenu
    const idMenu = Number(this.route.snapshot.paramMap.get('idMenu'));
    if (!isNaN(idMenu)) {
      this.menuActualizado.idMenu = idMenu;
    } else {
      this.snackBar.open('ID de menú no válido', 'Cerrar', {
        verticalPosition: 'top',
        duration: 3000
      });
      this.router.navigate(['/']);
    }

    console.table(this.menuActualizado);
  } 

  onNoClick(): void {
    this.router.navigate(['/']);
  }

  updateMenu(): void {
    this.comidaService.updateComida(this.menuActualizado).subscribe({
      next: (response) => {
        this.snackBar.open('Menu actualizado exitosamente', 'Cerrar', {
          verticalPosition: 'top',
          duration: 3000
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackBar.open('Error al actualizar el menu', 'Cerrar', {
          //verticalPosition: 'top',
          duration: 3000
        });
      }
    });
  }


}
