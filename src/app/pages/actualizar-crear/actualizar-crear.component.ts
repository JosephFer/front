import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComidasService } from '../../servicios/api/comidas.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../componentes/spinner/spinner.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-crear',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule, 
    MatInputModule,
    MatFormFieldModule, 
    RouterModule, 
    MatButtonModule, 
    SpinnerComponent, 
    CommonModule],
  templateUrl: './actualizar-crear.component.html',
  styleUrl: './actualizar-crear.component.css'
})
export class ActualizarCrearComponent implements OnInit, OnDestroy{
  
  titulo: string = "crear nueva comida";
  private crearComida:any;
  private comida:any;
  isLoading = false;
  mensaje = "consultando los datos de comida";
  public formComida: FormGroup;
  tamPag = 1;
  page = 0;

  esModoEdicion: boolean = false; 

  constructor(private activeRoute:ActivatedRoute, private route:Router, private comidaService:ComidasService, 
    private toast:ToastrService, private fb:FormBuilder){
    this.formComida = this.fb.group({
      nombreComida:['', [Validators.required, Validators.minLength(5)]],
      idTipoComida:['', [Validators.required, Validators.minLength(1)]]
    });
  };

  ngOnInit(): void {
      const id = this.activeRoute.snapshot.paramMap.get('idComida');
      if(id){
        this.isLoading = true;
        this.esModoEdicion = true; // Modo edición activado
        const page = Number(id);
        this.comidaService.getComidas(page, this.tamPag).subscribe(
          (response)=>{
            console.log(id);
            console.log(response);

            this.comida = response.resultado[0];
            this.titulo = "editar datos de la comida";

            console.log("Comida Data:", this.comida);
            this.formComida.patchValue(this.comida);
            setTimeout(() => {
              this.isLoading = false;
            }, 1600);
          },
          (isError:HttpErrorResponse)=>{
            if(isError.status === 404){
              this.toast.error(isError.error.message, isError.statusText);
            }else{
              this.toast.error("Error al obtener la comida", isError.statusText);
            }
            this.isLoading = false;
            this.route.navigate(['Home']);
          }
        );
      }
  }

  ngOnDestroy(): void {
      
  }
  onSubmit(){
    console.log("onSubmit: comida:", this.comida);
    console.log("onSubmit: comida.idComida:", this.comida.idComida);
    console.log("onSubmit: tipo de idComida:", typeof this.comida.idComida);
    if(this.formComida.valid){
      this.esModoEdicion ? this.editarComida() : this.nuevaComida();
    }else{
      this.toast.warning("El formulario no es correcto", "Verifica");
      this.formComida.reset();
    }
  }
  private nuevaComida(){
    this.crearComida = this.formComida.value;
    console.log("creando comida");
    if(this.crearComida){
      this.comidaService.postComidas(this.crearComida).subscribe(
        (response)=>{
          if(response.creado){
            this.toast.success(response.respuesta);
            this.formComida.reset();
            this.route.navigate(['/home']);
          }else{
            this.toast.error(response.respuesta);
          }
        },
        (isError: HttpErrorResponse)=>{
          this.toast.error(isError.error.message, isError.statusText);
          this.formComida.reset();
          this.route.navigate(['/home']);
        }
      )
    }
  }

  private editarComida(){
    this.crearComida = { 
      ...this.formComida.value, 
      idComida: this.comida?.idComida 
   };
    console.log("Editando comida con ID:", this.comida.idComida);  // Verificar si se muestra el ID correcto
    if(this.crearComida){
      this.comidaService.updateComidas(this.crearComida).subscribe(
        (response)=>{
          if(response.actualizado){
            this.toast.success(response.respuesta);
            this.formComida.reset();
            this.route.navigate(['/home']);
          }else{
            this.toast.error(response.respuesta);
          }
        },
        (isError: HttpErrorResponse)=>{
          this.toast.error(isError.error.message, isError.statusText);
          this.formComida.reset();
          this.route.navigate(['/home']);
        }
      )
    }
  }

  invalidForm(campo: string): boolean {
    if (
      this.formComida.get(campo)?.hasError &&
      this.formComida.get(campo)?.touched
    ) {
      return true;
    }
    return false;
  }

  messageError(campo: string): string {
    return `El campo ${campo} no es correcto o está vacío`;
  }
}
