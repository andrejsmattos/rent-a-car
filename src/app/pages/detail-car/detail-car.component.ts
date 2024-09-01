import { Component, inject } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-detail-car',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './detail-car.component.html',
  styleUrl: './detail-car.component.scss'
})
export class DetailCarComponent {

  carsService = inject(CarsService);
  activatedRoute = inject(ActivatedRoute);
  car: any = {};

  ngOnInit(){
    this.activatedRoute.params.subscribe({
      next: (params: any)=>{
        this.carsService.busca(params.id).subscribe({
          next: (data)=>{
            this.car = data;
          },
          error:(error)=>{ console.log("Erro do detail",error) }
        })
      },
      error:(error)=>{ console.log("Erro do params",error) },
    })

  }
  favoritarCarro(){};
}
