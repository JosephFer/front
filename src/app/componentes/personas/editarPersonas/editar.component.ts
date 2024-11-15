import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonasService } from '../../../services/api/personas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Personas } from '../../../interface/Personas';
import { Cines } from '../../../interface/Cines';
import { Ubicaciones } from '../../../interface/Ubicaciones';
import { Cargos } from '../../../interface/Cargos';
import { Usuarios } from '../../../interface/Usuarios';
import { UsuariosService } from '../../../services/api/usuarios.service';
import { CineService } from '../../../services/api/cine.service';
import { UbicacionesService } from '../../../services/api/ubicaciones.service';
import { CargoService } from '../../../services/api/cargo.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  
  persona: Personas = {
    idPersona: 0, // ID puede ser auto-generado en el backend
    nombrePersona: '',
    fechaNacimientoPersona: new Date(),
    idUbicacion: 0,
    idCine: 0,
    idCargo: 0,
    idUsuario: 0
  };
  personas_array: Personas[] = [];

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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllCargos();
    this.getAllUbicaciones();
    this.getAllCines();
    this.getAllUsuarios();
    this.route.paramMap.subscribe(params => {
      const id = + params.get('id')!;
      if (id) {
        this.obtenerPersona(id);
      }
    });

  }

  onNoClick(): void {
    this.router.navigate(['/']);
  }
  
  obtenerPersona(idPersona: number): void {
    this.personasService.getAllPersons().subscribe({
      next: (data: Personas[]) => {
        this.personas_array = data;
        this.persona = this.personas_array.find(persona => persona.idPersona === idPersona)!;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editarPersona(): void{
    this.personasService.updatePerson(this.persona).subscribe({
      next: () => {
        this.snackBar.open('Persona editada exitosamente', 'Cerrar', {
          //verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 3000
        });
        this.router.navigate(['/persons']);
      },
      error: (error) => {
        this.snackBar.open('Error al editar la persona', 'Cerrar', {
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
