import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatIconModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  carsService = inject(CarsService);
  qtdFavoritos: number = 0;

  ngOnInit() {
    this.carsService.favoritos$.subscribe(favoritos => {
      this.qtdFavoritos = favoritos.length;
    });
  }
}
