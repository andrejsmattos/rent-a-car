import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarsService } from '../../services/cars.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface Car {
  name: string;
  year: string;
  type: string;
  pricePerDay: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    RouterLink,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() car?: Car;

  cars: any = [];
  carsService = inject(CarsService);
  router = inject(Router);
  favoritos: any = [];


  ngOnInit() {
    this.carsService.lista().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.carsService.carregarFavoritos();
        this.carsService.marcarFavorito(this.cars);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  redirectTo(idCar: number) {
    this.router.navigateByUrl(`/lista/${idCar}`);
  }
}
