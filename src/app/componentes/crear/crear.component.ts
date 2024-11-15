import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CinesService } from '../../servicios/api/cines.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { TiposComidasService } from '../../servicios/api/tipos-comidas.service';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    SpinnerComponent,
    CommonModule,
  ],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
})
export class CrearComponent implements OnInit, OnDestroy {
  titulo: string = 'crear cine';
  private crearCine: any;
  private crearTipoComdida: any;
  public formCine: FormGroup;
  public formTiposComidas: FormGroup;
  contexto: string = '';

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private cineService: CinesService,
    private tiposComdiaService: TiposComidasService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.formCine = this.fb.group({
      nombreCine: ['', [Validators.required, Validators.minLength(5)]],
      idUbicacion: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.formTiposComidas = this.fb.group({
      nombreTipoComida: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.contexto = this.activeRoute.snapshot.parent?.routeConfig?.path || '';
    if (this.contexto == 'tiposComida') {
      this.titulo = 'crear un nuevo tipo de comida';
    }
  }

  ngOnDestroy(): void {}

  onSubmit() {
    if (this.contexto === 'tiposComida') {
      if (this.formTiposComidas.valid) {
        this.nuevoTiposComidas();
      } else {
        this.toast.warning('El formulario de tipos de comida no es correcto', 'Verifica');
        this.formTiposComidas.reset();
      }
    } else if (this.contexto === 'cine') {
      if (this.formCine.valid) {
        this.nuevoCine();
      } else {
        this.toast.warning('El formulario de cine no es correcto', 'Verifica');
        this.formCine.reset();
      }
    }
  }

  private nuevoCine() {
    this.crearCine = this.formCine.value;
    console.log('creando comida');
    if (this.crearCine) {
      this.cineService.postCines(this.crearCine).subscribe(
        (response) => {
          if (response.creado) {
            this.toast.success(response.respuesta, 'Realizado');
            this.formCine.reset();
            this.route.navigate(['/cine']);
          } else {
            this.toast.error(response.respuesta, ':(');
          }
        },
        (isError: HttpErrorResponse) => {
          this.toast.error(isError.error.message, isError.statusText);
          this.formCine.reset();
          this.route.navigate(['/cine']);
        }
      );
    }
  }

  private nuevoTiposComidas() {
    this.crearTipoComdida = this.formTiposComidas.value;
    if (this.crearTipoComdida) {
      this.tiposComdiaService.postTiposComidas(this.crearTipoComdida).subscribe(
        (response) => {
          if (response.creado) {
            this.toast.success(response.respuesta, 'Realizado');
            this.formTiposComidas.reset();
            this.route.navigate(['/tiposComida']);
          } else {
            this.toast.error(response.respuesta, ':(');
          }
        },
        (isError: HttpErrorResponse) => {
          this.toast.error(isError.error.message, isError.statusText);
          this.formTiposComidas.reset();
          this.route.navigate(['/tiposComida']);
        }
      );
    }
  }
}
