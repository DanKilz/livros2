import Livro from '../modelo/Livro';

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
  _id: String | null;
  codEditora: number;
  titulo: String;
  resumo: String;
  autores: String[];
}

class ControleLivro {
  async obterLivros(): Promise<Livro[]> {
    try {
      const resposta = await fetch(baseURL);
      const livrosJSON = await resposta.json();

      const livros: Livro[] = livrosJSON.map((livroJSON: { _id: any; codEditora: any; titulo: any; resumo: any; autores: any; }) => ({
        id: livroJSON._id,
        codEditora: livroJSON.codEditora,
        titulo: livroJSON.titulo,
        resumo: livroJSON.resumo,
        autores: livroJSON.autores
      }));

      return livros;
    }
    catch (erro) {
      console.log(`Erro ao obter livros: ${erro}`);
      throw new Error("Erro ao obter livros.");
    }

  }

  async incluir(livro: Livro): Promise<boolean> {
    const novoLivro: LivroMongo = {
      _id: null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    }

    try {
      const resposta = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLivro)
      });
  
      return resposta.ok;
    }
    catch (erro) {
      console.log(`Erro ao incluir livro: ${erro}`);
      throw new Error("Erro ao incluir livro.");
    }
  }

  async excluir(codigo: String): Promise<boolean> {
    try {
      const resposta = await fetch(`${baseURL}/${codigo}`, { method: "DELETE" });

      return resposta.ok;
    }
    catch (erro) {
      console.log(`Erro ao excluir livro: ${erro}`);
      throw new Error("Erro ao excluir livro.");
    }
  }
}

export default ControleLivro;
