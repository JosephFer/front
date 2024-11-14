import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { GetSalasService } from '../../services/api/get-salas.service';

@Component({
  selector: 'app-salas',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './salas.component.html',
  styleUrl: './salas.component.css'
})
export class SalasComponent implements OnInit, OnDestroy{
  cineService: any;
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  private salaService = inject(GetSalasService);
  private page = 1;
  private limit = 10;

  cines: any[] = [];
  salas: [] = [];
  headers: string[] = ['ID', 'Nombre Cine', 'ID Ubicación'];

  ngOnInit(): void {
    this.getCinesPagination();
  }

  onBack(): void {
    if (this.page > 1) {
      this.page--;
      this.getCinesPagination();
    }
  }

  onAdd(): void {
    this.page++;
    this.getCinesPagination();
  }

  private getCinesPagination(): void {

    this.cineService
      .getPagination(this.page, this.limit)
      .subscribe((data: any) => {
        data.map((cine: any) => {
          this.cines.push({
            idCine: cine.idCine,
            nombreCine: cine.nombreCine,
            idUbicacion: cine.idUbicacion,
          });
        });
    });
  }
}
