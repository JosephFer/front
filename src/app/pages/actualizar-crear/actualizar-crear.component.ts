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
  private crearComida?:any;
  private comida?:any;
  isLoading = false;
  mensaje = "consultando los datos de comida";
  public formComida: FormGroup;
  tamPag = 1;
  page = 0;

  constructor(private activeRoute:ActivatedRoute, private route:Router, private comidaService:ComidasService, 
    private toast:ToastrService, private fb:FormBuilder){
    this.formComida = this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(5)]],
      tipo:['', [Validators.required, Validators.minLength(5)]]
    });
  };

  ngOnInit(): void {
      const id = this.activeRoute.snapshot.paramMap.get('idComida');
      if(id){
        this.isLoading = true;
        const page = Number(id);
        this.comidaService.getComidas(page, this.tamPag).subscribe(
          (response)=>{
            this.comida = response.resultado;
            this.titulo = "Editar datos de la comida";
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
    if(this.formComida.valid){
      this.comida?.idComida ? this.editarComida(): this.nuevaComida;
    }else{
      this.toast.warning("El formulario no es correcto", "Verifica");
      this.formComida.reset();
    }
  }
  private nuevaComida(){
    this.crearComida = this.formComida.value;
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
    this.crearComida = this.formComida.value;
    if(this.crearComida){
      this.comidaService.updateComidas(this.comida!.idComida,this.crearComida).subscribe(
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
}
