import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SubMenuComponentComponent } from '../sub-menu-component/sub-menu-component.component';
import { GetSalasService } from '../../services/api/get-salas.service';

@Component({
  selector: 'app-salas',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MenuComponent, SubMenuComponentComponent],
  templateUrl: './salas.component.html',
  styleUrl: './salas.component.css'
})
export class SalasComponent implements OnInit, OnDestroy{
  private salaService = inject(GetSalasService);
  private page = 1;
  private limit = 10;
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
    this.cines = [];
    this.cineService
      .getPagination(this.page, this.limit)
      .subscribe((data) => {
        data.map((cine) => {
          this.cines.push({
            idCine: cine.idCine,
            nombreCine: cine.nombreCine,
            idUbicacion: cine.idUbicacion,
          });
        });
      });
  }
}
