import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  cars: any = [];
  carsService = inject(CarsService);

  ngOnInit() {

    this.carsService.lista().subscribe({
      next: (cars: any) => {
        this.cars = cars;
      },
      error: (error: any) => {
        console.error(error);
      }
    });


    this.cars = [
      { name: 'Ferrari', type: 'Hatch', year: 2022, pricePerDay: 1000000 },
      { name: 'Lamborghini',  type: 'Sedan', year: 2020, pricePerDay: 2000000 },
      { name: 'Bugatti',  type: 'SUV', year: 2024, pricePerDay: 3000000 },
    ];
  }
}
