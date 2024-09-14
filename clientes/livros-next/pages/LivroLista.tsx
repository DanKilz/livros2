import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { LinhaLivro } from "@/componentes/LinhaLivro";
import { Menu } from "@/componentes/Menu";
import Livro from "@/classes/modelo/Livro";
import ControleLivros from "@/classes/controle/ControleLivros";

const controleLivros = new ControleLivros();

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        if (!carregado) {
            controleLivros.obterLivros().then((dados) => {
                setLivros(dados);
                setCarregado(true);
            });
        }
    }, [carregado]);

    const excluir = async (codigo: string) => {
        controleLivros.excluir(codigo).then(() => {
            setCarregado(false);
        });
    }

    return (
        <div className="container-fluid">
            <Head>
                <title>Loja Next | Listagem de Livros</title>
            </Head>

            <Menu />
            
            <main className="main m-3">
                <h1 className="h1 mb-5 mt-4 ">Listagem de Livros</h1>
                <table className="table table-striped ">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro, index) => (
                            <LinhaLivro key={index} livro={livro} excluir={() => excluir(livro.codigo)} />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default LivroLista;
