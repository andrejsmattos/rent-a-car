import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  httpClient = inject(HttpClient);
  pathUrl = "https://66d377bb184dce1713d0436a.mockapi.io/api/v1";
  favoritos: any[] = [];
  private favoritosSubject = new BehaviorSubject<any[]>(this.getFavoritosFromLocalStorage());
  favoritos$ = this.favoritosSubject.asObservable();


  constructor() {
    this.carregarFavoritos();
  }

  lista(): Observable<any[]>  {
    return this.httpClient.get<any[]>(`${this.pathUrl}/cars`);
  }

  busca(id: number){
    return this.httpClient.get(`${this.pathUrl}/cars/${id}`);
  }

  carregarFavoritos() {
    const isFavorito = localStorage.getItem('favoritos');
    this.favoritos = isFavorito ? JSON.parse(isFavorito) : [];
  }

  marcarFavorito(cars: any[]) {
    cars.forEach((car: any) => {
      car.isFavorito = this.favoritos.some(
        (favorito: any) => favorito.id === car.id
      );
    });
  }

  favoritar(car: any){
    let isFavorito = localStorage.getItem('favoritos');
    if(isFavorito){
      let favoritos = JSON.parse(isFavorito);
      favoritos.push(car);
      localStorage.setItem('favoritos',JSON.stringify(favoritos));
      this.favoritosSubject.next(favoritos);
      alert('Carro favoritado com sucesso');
    } else {
      localStorage.setItem('favoritos', "[]");
      this.favoritar(car);
    }
  }

  contarFavoritos(): number {
    return this.getFavoritosFromLocalStorage().length;
  }

  private getFavoritosFromLocalStorage(): any[] {
    const favoritos = localStorage.getItem('favoritos');
    return favoritos ? JSON.parse(favoritos) : [];
  }

}
