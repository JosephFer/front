import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UbicacionesService } from '../../../services/api/ubicaciones.service';
import { Ubicaciones } from '../../../interface/Ubicaciones';
import { CineService } from '../../../services/api/cine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cines } from '../../../interface/Cines';

@Component({
  selector: 'app-editar-cine',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css'
})
export class EditarCineComponent implements OnInit{
  nuevoCine: Cines = {
    idCine: 0,
    nombreCine: '', 
    idUbicacion: 0
  };
  cines_array: Cines[] =[];

  private ubicacionesService: UbicacionesService = inject(UbicacionesService);
  ubicaciones_array: Ubicaciones[] = [];

  constructor(private cineService: CineService, 
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllUbicaciones();
    this.route.paramMap.subscribe(params => {
      const id = + params.get('id')!;
      if (id) {
        this.obtenerCine(id);
      }
    });
  }

  obtenerCine(idCine: number): void {
    this.cineService.getAllCinema().subscribe({
      next: (data: Cines[]) => {
        this.cines_array = data;
        this.nuevoCine = this.cines_array.find(cine => cine.idCine === idCine)!;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onNoClick(): void {
    this.router.navigate(['/']);
  }
  
  editarCine() {
    this.cineService.updateCinema(this.nuevoCine).subscribe({
      next: () => {
        this.snackBar.open('Cine editado exitosamente', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
        this.router.navigate(['/cines']);
      },
      error: (error) => {
        this.snackBar.open('Error al editar el cine', 'Cerrar', {
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
