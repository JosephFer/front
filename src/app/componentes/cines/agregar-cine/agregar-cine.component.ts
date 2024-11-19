import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cines } from '../../../interface/Cines';
import { UbicacionesService } from '../../../services/api/ubicaciones.service';
import { Ubicaciones } from '../../../interface/Ubicaciones';
import { CineService } from '../../../services/api/cine.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-cine',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-cine.component.html',
  styleUrl: './agregar-cine.component.css'
})
export class AgregarCineComponent implements OnInit {
  nuevoCine: Cines = {
    idCine: 0,
    nombreCine: '', 
    idUbicacion: 0
  };

  private ubicacionesService: UbicacionesService = inject(UbicacionesService);
  ubicaciones_array: Ubicaciones[] = [];

  constructor(private cineService: CineService, 
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllUbicaciones();
  }

  onNoClick(): void {
    this.router.navigate(['/']);
  }
  
  agregarCine() {
    this.cineService.addCinema(this.nuevoCine).subscribe({
      next: () => {
        this.snackBar.open('Cine creado exitosamente', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
        this.router.navigate(['/cines']);
      },
      error: (error) => {
        this.snackBar.open('Error al crear el cine', 'Cerrar', {
          panelClass: ['snackbar'],
          duration: 3000
        });
      }
    });
  }

  getAllUbicaciones() {
    this.ubicacionesService.getAllLocation().subscribe((data: Ubicaciones[]) =>{
      this.ubicaciones_array = data;
    })
  }

}
