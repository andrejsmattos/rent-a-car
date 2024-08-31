import { Routes } from '@angular/router';
import { ListCarsComponent } from './pages/list-cars/list-cars.component';
import { DetailCarComponent } from './pages/detail-car/detail-car.component';

export const routes: Routes = [

  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: ListCarsComponent },
  { path: 'lista/:id', component: DetailCarComponent },

];
