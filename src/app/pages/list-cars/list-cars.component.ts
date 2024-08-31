import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-list-cars',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './list-cars.component.html',
  styleUrl: './list-cars.component.scss'
})
export class ListCarsComponent {

}
