import { Component, inject, OnInit } from '@angular/core';
import { Personas } from '../../../interface/Personas';
import { PersonasService } from '../../../services/api/personas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CargoService } from '../../../services/api/cargo.service';
import { Cargos } from '../../../interface/Cargos';
import { UbicacionesService } from '../../../services/api/ubicaciones.service';
import { Ubicaciones } from '../../../interface/Ubicaciones';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule],
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

  ngOnInit(): void {
    this.getAllCargos();
    this.getAllUbicaciones();
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

  constructor(private personasService: PersonasService, private router: Router) {}

  agregarPersona() {
    this.personasService.addPerson(this.nuevaPersona).subscribe(
      (response) => {
        console.log('Persona agregada con éxito:', response);
        this.router.navigate(['/listar']);
      },
      (error) => {
        console.error('Error al agregar persona:', error);
      }
    );
  }
}
