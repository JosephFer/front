import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComidaService } from '../../services/api/comida/comida.service';
import { Menu } from '../../interface/menu';

@Component({
  selector: 'app-comida',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comida.component.html',
  styleUrl: './comida.component.css'
})
export class ComidaComponent implements OnInit{    

  private comidaService = inject(ComidaService);    
  com_array : Menu[] = [];
  comidaChunks: Menu[][] = [];    

  constructor(){    

  }    

  ngOnInit(): void {
    this.fetchComida();
  }

  fetchComida():void{
    this.comidaService.getAllComida().subscribe((data) => {
      this.com_array = data;
      this.chunkComida();
      console.log(this.com_array);
    });
  }

  chunkComida():void{
    for (let i = 0; i < this.com_array.length; i += 5) {
      this.comidaChunks.push(this.com_array.slice(i, i + 5));
    }
  }
}
