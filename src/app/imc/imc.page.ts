import { Component } from '@angular/core';
import { Location } from '@angular/common'; // Adicionando importação do Location

@Component({
  selector: 'app-imc',
  templateUrl: './imc.page.html',
  styleUrls: ['./imc.page.scss'],
})
export class ImcPage {
  altura: number = 0; 
  peso: number = 0; 
  imc: string = '0'; 
  resultadoIMC: string = ''; 
  showGrid: boolean = false;

  constructor(private location: Location) {} 

  toggleGrid() {
    this.showGrid = !this.showGrid;}

  goBack() {
    this.location.back();
  }

  calcularIMC() {
    // Verificar se a altura é válida (diferente de vazio)
    if (this.altura) {
      // Converter a altura para número (em centímetros)
      const alturaNumerica = parseFloat(this.altura.toString());
  
      // Calcular o IMC com a altura em centímetros (converter para metros)
      const alturaMetros = alturaNumerica / 100;
      const imcNumerico = this.peso / (alturaMetros * alturaMetros);
      this.imc = imcNumerico.toFixed(1);
  
      // Atualizar o resultado do IMC
      this.resultadoIMC = this.obterDescricaoIMC(parseFloat(this.imc));
    } else {
      // Se a altura for vazia, definir o IMC como zero e o resultado como vazio
      this.imc = '0';
      this.resultadoIMC = '';
    }
  }
  
  
  
  
  obterDescricaoIMC(imc: number): string {
    if (imc < 18.5) {
      return 'Magreza';
    } else if (imc < 24.9) {
      return 'Peso normal';
    } else if (imc < 29.9) {
      return 'Sobrepeso';
    } else if (imc < 39.9) {
      return 'Obesidade';
    } else {
      return 'Obesidade Grave';
    }
  }

  limparCampos() {
    this.altura = 0;
    this.peso = 0;
    this.imc = '0'; 
    this.resultadoIMC = '';
  }
}
