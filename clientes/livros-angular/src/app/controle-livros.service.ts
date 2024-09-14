import { Injectable } from '@angular/core';
import { Livro } from './livro';

const baseURL: string = "http://localhost:3030/livros";

interface LivroMongo {
  _id: string | null,
  codEditora: number,
  titulo: string,
  resumo: string,
  autores: string[]
}

@Injectable({
  providedIn: 'root'
})

export class ControleLivrosService {
  constructor() { }

  async obterLivros(): Promise<Array<Livro>> {
    try {
      const resposta = await fetch(baseURL, { method: "GET" });
      const livrosMongo: Array<LivroMongo> = await resposta.json();

      const livros: Array<Livro> = livrosMongo.map(livro => ({
        codigo: livro._id ?? "",
        codEditora: livro.codEditora,
        titulo: livro.titulo,
        resumo: livro.resumo,
        autores: livro.autores
      }));

      return livros;
    }
    catch (erro) {
      console.error(`Erro ao obter livros: ${erro}`);
      return []
    }
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    }

    try {
      const resposta = fetch(baseURL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(livroMongo) });

      return (await resposta).ok;
    }
    catch (erro) {
      console.error(`Erro ao inluir livro: ${erro}`);

      return false;
    }
  }

  async excluir(codigo: string): Promise<boolean> {
    try {
      const resposta = await fetch(`${baseURL}/${codigo}`, { method: "DELETE" });

      return resposta.ok;
    }
    catch (erro) {
      console.error(`Erro ao exluir livro: ${erro}`);
      return false;
    }
  }
}
