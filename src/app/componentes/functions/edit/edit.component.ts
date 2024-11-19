import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Funcion } from '../../../interface/Function';
import { Horario } from '../../../interface/Horario';
import { Sala } from '../../../interface/Sala';
import { FunctionService } from '../../../services/api/functions/function.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-function',
  templateUrl: './edit.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./edit.component.css'] // Asegúrate de que sea 'styleUrls' en plural
})
export class EditComponent implements OnInit {
  funcion: Funcion = { idFuncion: 0, idSala: 0, idHorario: 0 };
  horarios: Horario[] = [];
  salas: Sala[] = [];

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private functionService: FunctionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (isNaN(id)) {
      this.snackBar.open('Invalid function ID', 'Close', { duration: 3000 });
      this.router.navigate(['/']);
      return;
    }

    forkJoin({
      funciones: this.functionService.getFunciones(),
      horarios: this.functionService.getHorarios(),
      salas: this.functionService.getSalas()
    }).subscribe({
      next: ({ funciones, horarios, salas }) => {
        this.funcion = funciones.find((f) => f.idFuncion === id) || { idFuncion: 0, idSala: 0, idHorario: 0 };
        if (!this.funcion) {
          this.snackBar.open('Function not found', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
          return;
        }
        this.horarios = horarios;
        this.salas = salas;
      },
      error: (error) => {
        console.error('Error loading data', error);
        this.snackBar.open('Error loading data', 'Close', { duration: 3000 });
      }
    });
  }

  editFunction(): void {
    console.log(this.funcion);
    this.functionService.updateFunction(this.funcion).subscribe({
      next: (funcion) => {
        this.snackBar.open('Function updated', 'Close', { duration: 3000 });
        this.router.navigate(['/functions']);
      },
      error: (error) => {
        console.error('Error updating function', error);
        this.snackBar.open('Error updating function', 'Close', { duration: 3000 });
      }
    });
  }

  deleteFunction(): void {
    this.functionService.deleteFunction(this.funcion.idFuncion).subscribe({
      next: () => {
        this.snackBar.open('Function deleted', 'Close', { duration: 3000 });
        this.router.navigate(['/functions']);
      },
      error: (error) => {
        console.error('Error deleting function', error);
        this.snackBar.open('Error deleting function', 'Close', { duration: 3000 });
      }
    });
  }

  onNoClick(): void {
    this.router.navigate(['/functions']);
  }
}