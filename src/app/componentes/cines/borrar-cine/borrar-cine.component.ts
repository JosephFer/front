import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cines } from '../../../interface/Cines';
import { CineService } from '../../../services/api/cine.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-borrar-cine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './borrar-cine.component.html',
  styleUrl: './borrar-cine.component.css'
})
export class BorrarCineComponent implements OnInit {
  nuevoCine: Cines = {
    idCine: 0,
    nombreCine: '',
    idUbicacion: 0
  };

  cines_array: Cines[] = [];
  idCine: number | undefined;

  constructor(private cineService: CineService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = + params.get('id')!;
      if (id) {
        this.idCine = id;
        this.obtenerCine(id);
      }
    });
  }

  onNoClick(): void {
    this.router.navigate(['/cines']);
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

  borrarCine(): void {
    console.log(this.idCine);
    this.cineService.deleteCinema(this.idCine!).subscribe({
      next: (data: Cines) => {
        this.snackBar.open('Cine eliminado exitosamente', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
        this.router.navigate(['/cines/listar']);
      },
      error: (error) => {
        this.snackBar.open('Error al eliminar el cine', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
      }
    });
  }
}
