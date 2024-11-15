import { Component, inject, OnInit } from '@angular/core';
import { Personas } from '../../../interface/Personas';
import { PersonasService } from '../../../services/api/personas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CargoService } from '../../../services/api/cargo.service';
import { Cargos } from '../../../interface/Cargos';
import { UbicacionesService } from '../../../services/api/ubicaciones.service';
import { Ubicaciones } from '../../../interface/Ubicaciones';
import { CineService } from '../../../services/api/cine.service';
import { Cines } from '../../../interface/Cines';
import { UsuariosService } from '../../../services/api/usuarios.service';
import { Usuarios } from '../../../interface/Usuarios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent implements OnInit{
  nuevaPersona: Personas = {
    idPersona: 0, // ID puede ser auto-generado en el backend
    nombrePersona: '',
    fechaNacimientoPersona: new Date(),
    idUbicacion: 0,
    idCine: 0,
    idCargo: 0,
    idUsuario: 0
  };

  private cargosService: CargoService = inject(CargoService);
  cargos_array: Cargos[] = [];

  private ubicacionesService: UbicacionesService = inject(UbicacionesService);
  ubicaciones_array: Ubicaciones[] = [];

  private cineService: CineService = inject(CineService);
  cines_array: Cines[] = [];

  private usuariosService: UsuariosService = inject(UsuariosService);
  usuarios_array: Usuarios[] = [];

  constructor(private personasService: PersonasService, 
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllCargos();
    this.getAllUbicaciones();
    this.getAllCines();
    this.getAllUsuarios();

  }

  onNoClick(): void {
    this.router.navigate(['/']);
  }
  
  agregarPersona() {
    this.personasService.addPerson(this.nuevaPersona).subscribe({
      next: () => {
        this.snackBar.open('Persona creada exitosamente', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
        this.router.navigate(['/persons']);
      },
      error: (error) => {
        this.snackBar.open('Error al crear la película', 'Cerrar', {
          panelClass: ['snackbar'],
          duration: 3000
        });
      }
    });
  }

  getAllUsuarios() {
    this.usuariosService.getAllUsers().subscribe((data: Usuarios[]) => {
      this.usuarios_array = data;
    })
  }

  getAllCargos() {
    this.cargosService.getAllCargos().subscribe((data: Cargos[]) =>{
      this.cargos_array = data;
    })
  }

  getAllUbicaciones() {
    this.ubicacionesService.getAllLocation().subscribe((data: Ubicaciones[]) =>{
      this.ubicaciones_array = data;
    })
  }
  getAllCines() {
    this.cineService.getAllCinema().subscribe((data: Cines[]) =>{
      this.cines_array = data;
    })
  }


}
