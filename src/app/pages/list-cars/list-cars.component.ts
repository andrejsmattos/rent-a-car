import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CarsService } from '../../services/cars.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-cars',
  standalone: true,
  imports: [
    CardComponent,
    MatFormFieldModule,
    MatLabel,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './list-cars.component.html',
  styleUrl: './list-cars.component.scss',
})
export class ListCarsComponent {
  carros: any[] = [];
  resultadoBusca: any[] = [];
  carrosService = inject(CarsService);

  buscaCarroForm = new FormGroup({
    buscaInput: new FormControl('')
  });

  ngOnInit(){
    this.carrosService.lista().subscribe({
      next: (data: any) => {
        console.log("Dados recebidos da API:", data);
        let favoritos = JSON.parse(localStorage.getItem('favoritos') ?? "[]");
        data.forEach((carro: any) => {
          carro.favorito = favoritos.some((favorito: any) => favorito.id === carro.id);
        });
        this.carros = data; // Armazena todos os carros no início
      },
      error: (error) => {
        console.error("Erro ao recuperar informações de veículos:", error);
      }
    });
  }

  buscaCarro() {
    const buscaInput = this.buscaCarroForm.value.buscaInput?.trim();
    console.log("Valor de buscaInput:", buscaInput);

    if (buscaInput) {
      // Filtrar localmente usando os dados já carregados
      this.resultadoBusca = this.carros.filter(
        (carroBuscado: { name: string; type: string }) => {
          const isMesmoNome =
            carroBuscado.name?.toLowerCase()?.includes(buscaInput.toLowerCase());
          const isMesmoTipo =
            carroBuscado.type?.toLowerCase()?.includes(buscaInput.toLowerCase());
          return isMesmoNome || isMesmoTipo;
        }
      );

      console.log("Resultados da busca:", this.resultadoBusca);

      this.resultadoBusca.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );

      if (this.resultadoBusca.length === 0) {
        alert('Não foram encontrados veículos com este modelo ou tipo.');
        this.carros = []; // Limpa a lista se nenhum carro for encontrado
      } else {
        this.carros = this.resultadoBusca; // Atualiza a lista para mostrar apenas os resultados da busca
      }
    } else {
      // Se a busca estiver vazia, mostrar todos os carros novamente
      this.carrosService.lista().subscribe((data: any) => {
        this.carros = data;
      });
      alert('A lista de veículos foi recarregada.');
    }
  }


    //   this.carrosService.lista().subscribe((data) => {
    
    //     this.carros = data;
    //     this.resultadoBusca = this.carros.filter(
    //       (carroBuscado: { name: string; type: string }) => {
    //         const isMesmoNome =
    //         carroBuscado.name?.toLowerCase()?.includes(buscaInput.toLowerCase());
    //         const isMesmoTipo = carroBuscado.type?.includes(buscaInput);
    //         return isMesmoNome || isMesmoTipo;
    //       }
    //     );
    //     this.resultadoBusca.sort((a: any, b: any) =>
    //       a.name.localeCompare(b.name)
    //     );
    //     if (this.resultadoBusca.length === 0) {
    //       alert('Não foram encontrados veículos com este modelo ou tipo.');
    //     }
    //     this.carros = this.resultadoBusca;
    //   });
    // } else {
    //   this.carrosService.lista().subscribe((data) => {
    //     this.carros = data;
    //   });
    //   alert('A lista de veículos foi recarregada.');
    // }

}
