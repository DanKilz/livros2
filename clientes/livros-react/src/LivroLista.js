import React, { useState, useEffect } from 'react';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const LinhaLivro = (props) => {
    const { livro, excluir } = props;
    const controleEditora = new ControleEditora();
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
  
    return (
      <tr>
        <td>
          {livro.titulo}
          <br />
          <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>Excluir</button>
        </td>
        <td>{livro.resumo}</td>
        <td>{nomeEditora}</td>
        <td>
          <ul>
            {livro.autores.map((autor, index) => (
              <li key={index}>{autor}</li>
            ))}
          </ul>
        </td>
      </tr>
    );
  };  

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  const controleLivro = new ControleLivro();

  useEffect(() => {
    const obterDados = async () => {
      try {
        const livrosObtidos = await controleLivro.obterLivros();
        setLivros(livrosObtidos);
      }
      catch (erro) {
        console.error(`Erro ao obter livros: ${erro}`);
      }
      finally {
        setCarregado(true);
      }
      
    }
    if (!carregado) {
      obterDados();
    }
  }, [carregado, controleLivro]);

  const excluir = (codigo) => {
    try {
      controleLivro.excluir(codigo)
      .then(() => {
        setLivros(livros.filter(livro => livro.codigo !== codigo));
        setCarregado(false);
      });
    }
    catch (erro) {
      console.error(`Erro ao excluir livro: ${erro}`);
    }
    
  };

  return (
    <main className="p-4">
      <h1>Catálogo de Livros</h1>
      <table class="table table-striped">
        <thead>
          <tr class="table-dark">
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro, index) => (
            <LinhaLivro
              key={index}
              livro={livro}
              excluir={excluir}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
