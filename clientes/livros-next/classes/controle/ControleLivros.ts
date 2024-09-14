import Livro from '../modelo/Livro';

const baseURL = "http://localhost:3030/livros";

class ControleLivro {
  async obterLivros(): Promise<Livro[]> {
    try {
      const resposta = await fetch(baseURL);
      const livrosJSON = await resposta.json();

      const livros: Livro[] = livrosJSON.map((livroJSON: { _id: string; codEditora: number; titulo: string; resumo: string; autores: string[]; }) => ({
        codigo: livroJSON._id,
        codEditora: livroJSON.codEditora,
        titulo: livroJSON.titulo,
        resumo: livroJSON.resumo,
        autores: livroJSON.autores
      }));

      return livros;
    } catch (erro) {
      console.log(`Erro ao obter livros: ${erro}`);
      throw new Error("Erro ao obter livros.");
    }
  }

  async incluir(livro: Livro): Promise<boolean> {
    try {
      const resposta = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(livro)
      });
  
      return resposta.ok;
    } catch (erro) {
      console.log(`Erro ao incluir livro: ${erro}`);
      throw new Error("Erro ao incluir livro.");
    }
  }

  async excluir(codigo: string): Promise<boolean> {
    try {
      const resposta = await fetch(`${baseURL}/${codigo}`, { method: "DELETE" });

      return resposta.ok;
    } catch (erro) {
      console.log(`Erro ao excluir livro: ${erro}`);
      throw new Error("Erro ao excluir livro.");
    }
  }
}

export default ControleLivro;
