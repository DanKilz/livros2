import { Injectable } from '@angular/core';
import { Editora } from './editora';

@Injectable({
  providedIn: 'root'
})

export class ControleEditoraService {
  editoras: Array<Editora> = [
    { codEditora: 1, nome: "Alta Books" },
    { codEditora: 2, nome: "Pearson" },
    { codEditora: 3, nome: "Addison Wesley" }
  ];

  constructor() { }

  getNomeEditora(codEditora: number): string {
    const editora = this.editoras.filter(editora => editora.codEditora === codEditora)[0];
    return editora.nome;
  }

  getEditoras(): Array<Editora> {
    return this.editoras;
  }
}
