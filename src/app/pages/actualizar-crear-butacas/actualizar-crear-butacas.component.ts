import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../componentes/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ButacasService } from '../../servicios/api/butacas.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-crear-butacas',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule, 
    RouterModule, 
    MatButtonModule, 
    SpinnerComponent, 
    CommonModule
  ],
  templateUrl: './actualizar-crear-butacas.component.html',
  styleUrl: './actualizar-crear-butacas.component.css'
})
export class ActualizarCrearButacasComponent implements OnInit, OnDestroy{

  titulo: string = "crear nueva butaca";
  private crearButaca:any;
  private butaca:any;
  isLoading = false;
  mensaje = "consultando los datos de la butaca";
  public formButaca: FormGroup;
  tamPag = 1;
  page = 0;

  esModoEdicion: boolean = false; 

  constructor(private activeRoute:ActivatedRoute, private route:Router, private butacaService:ButacasService, 
    private toast:ToastrService, private fb:FormBuilder){
    this.formButaca = this.fb.group({
      fila:['', [Validators.required, Validators.minLength(1)]],
      columna:['', [Validators.required, Validators.minLength(1)]],
      idSala:['', [Validators.required, Validators.minLength(1)]]  
    });
  };

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('idButaca');
    if(id){
      this.isLoading = true;
      this.esModoEdicion = true; // Modo edición activado
      const page = Number(id);
      this.butacaService.getButacas(page, this.tamPag).subscribe(
        (response)=>{
          console.log(id);
          console.log(response);
          this.butaca= response.butacas[0];
          this.titulo = "editar datos de la butaca";

          console.log("butaca Data:", this.butaca);
          this.formButaca.patchValue(this.butaca);
          setTimeout(() => {
            this.isLoading = false;
          }, 1600);
        },
        (isError:HttpErrorResponse)=>{
          if(isError.status === 404){
            this.toast.error(isError.error.message, isError.statusText);
          }else{
            this.toast.error("Error al obtener la butaca", isError.statusText);
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
    if(this.formButaca.valid){
      this.esModoEdicion ? this.editarButaca() : this.nuevaButaca();
    }else{
      this.toast.warning("El formulario no es correcto", "Verifica");
      this.formButaca.reset();
    }
  }
  private nuevaButaca(){
    this.crearButaca = this.formButaca.value;
    console.log("creando butaca");
    if(this.crearButaca){
      this.butacaService.postButacas(this.crearButaca).subscribe(
        (response)=>{
          if(response.creado){
            this.toast.success(response.respuesta, "Realizado");
            this.formButaca.reset();
            this.route.navigate(['/home']);
          }else{
            this.toast.error(response.respuesta, ":(");
          }
        },
        (isError: HttpErrorResponse)=>{
          this.toast.error(isError.error.message, isError.statusText);
          this.formButaca.reset();
          this.route.navigate(['/home']);
        }
      )
    }
  }

  private editarButaca(){
    this.crearButaca = { 
      ...this.formButaca.value, 
      idButaca: this.butaca?.idButaca 
   };
    console.log("Editando butaca con ID:", this.butaca.idButaca);  // Verificar si se muestra el ID correcto
    if(this.crearButaca){
      this.butacaService.updateButacas(this.crearButaca).subscribe(
        (response)=>{
          if(response.actualizado){
            this.toast.success(response.respuesta, "Realizado");
            this.formButaca.reset();
            this.route.navigate(['/home']);
          }else{
            this.toast.error(response.respuesta, ":(");
          }
        },
        (isError: HttpErrorResponse)=>{
          this.toast.error(isError.error.message, isError.statusText);
          this.formButaca.reset();
          this.route.navigate(['/home']);
        }
      )
    }
  }

}
