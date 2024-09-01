import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarsService } from '../../services/cars.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  cars: any = [];
  carsService = inject(CarsService);
  router = inject(Router);

  ngOnInit() {

    this.carsService.lista().subscribe({
      next: (cars: any) => {
        this.cars = cars;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  redirectTo(idCar: number) {
    console.log(idCar);
    this.router.navigateByUrl(`/lista/${idCar}`);
  }
}
