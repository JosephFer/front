import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { CinesService } from '../../servicios/api/cines.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TiposComidasService } from '../../servicios/api/tipos-comidas.service';

@Component({
  selector: 'app-editar',
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
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
})
export class EditarComponent implements OnInit,OnDestroy{
  titulo: string = 'editar nueva butaca';
  private crearCine: any;
  cine: any;
  private crearTipoComdida: any;
  tiposComida: any;
  public formTiposComidas: FormGroup;
  public formCine: FormGroup;
  contexto: string = '';
  tamPag = 1;
  page = 0;

  constructor(  
    private route: Router,
    private cineService: CinesService,
    private tiposComidaService:TiposComidasService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private activeRoute:ActivatedRoute
  ) {
    this.formCine = this.fb.group({
      nombreCine: ['', [Validators.required, Validators.minLength(5)]],
      idUbicacion: ['', [Validators.required, Validators.minLength(1)]],
      idCine: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.formTiposComidas = this.fb.group({
      nombreTipoComida: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      idTipoComida: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.contexto = this.activeRoute.snapshot.parent?.routeConfig?.path || '';
    if (this.contexto == 'tiposComida') {
      this.titulo = 'editar un tipo de comida';
    }
  }

ngOnDestroy(): void {
    
}

onSubmit(){
  if (this.contexto === 'tiposComida') {
    if (this.formTiposComidas.valid) {
      this.editarTiposComida();
    } else {
      this.toast.warning('El formulario de tipos de comida no es correcto', 'Verifica');
      this.formTiposComidas.reset();
    }
  } else if (this.contexto === 'cine') {
    if (this.formCine.valid) {
      this.editarCine();
    } else {
      this.toast.warning('El formulario de cine no es correcto', 'Verifica');
      this.formCine.reset();
    }
  }
  }

  private editarCine(){
    this.crearCine = { 
      ...this.formCine.value, 
   };
    if(this.crearCine){
      this.cineService.updateCines(this.crearCine).subscribe(
        (response)=>{
          if(response.actualizado){
            this.toast.success(response.respuesta, "Realizado");
            this.formCine.reset();
            this.route.navigate(['/cine']);
          }else{
            this.toast.error(response.respuesta, ":(");
          }
        },
        (isError: HttpErrorResponse)=>{
          this.toast.error(isError.error.message, isError.statusText);
          this.formCine.reset();
          this.route.navigate(['/cine']);
        }
      )
    }
  }

  private editarTiposComida(){
    this.crearTipoComdida = { 
      ...this.formTiposComidas.value, 
   };
    if(this.crearTipoComdida){
      this.tiposComidaService.update(this.crearTipoComdida).subscribe(
        (response)=>{
          if(response.actualizado){
            this.toast.success(response.respuesta, "Realizado");
            this.formCine.reset();
            this.route.navigate(['/tiposComida']);
          }else{
            this.toast.error(response.respuesta, ":(");
          }
        },
        (isError: HttpErrorResponse)=>{
          this.toast.error(isError.error.message, isError.statusText);
          this.formCine.reset();
          this.route.navigate(['/tiposComida']);
        }
      )
    }
  }
}
