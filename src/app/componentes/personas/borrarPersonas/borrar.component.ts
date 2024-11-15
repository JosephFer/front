import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../../services/api/personas.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Personas } from '../../../interface/Personas';

@Component({
  selector: 'app-borrar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './borrar.component.html',
  styleUrl: './borrar.component.css'
})
export class BorrarComponent implements OnInit {

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

  id: number | undefined;

  constructor(private personasService: PersonasService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = + params.get('id')!;
      if (id) {
        this.id=id;
        this.obtenerPersona(id);
      }
    });
  }

  onNoClick(): void {
      this.router.navigate(['/persons']);
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

    borrarPersona(): void {
      console.log(this.id);
      this.personasService.deletePerson(this.id!).subscribe({
        next: (data:Personas) => {
          this.snackBar.open('Persona Eliminada exitosamente', 'Cerrar', {
            //verticalPosition: 'top',
            panelClass: ['snackbar'],
            duration: 3000
          });
          this.router.navigate(['/persons/listar']);
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar la persona', 'Cerrar', {
            //verticalPosition: 'top',
            panelClass: ['snackbar'],
            duration: 3000
          });
        }
      });
    }
}
