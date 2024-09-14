import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ControleEditora from "@/classes/controle/ControleEditora";
import Livro from "@/classes/modelo/Livro";
import { Menu } from "@/componentes/Menu";
import ControleLivro from "@/classes/controle/ControleLivros";

const controleEditora = new ControleEditora();
const controleLivros = new ControleLivro();

const LivroDados: NextPage = () => {
    const opcoes = controleEditora.getEditoras().map((editora) => ({
        value: editora.codEditora,
        text: editora.nome
    }))

    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [autores, setAutores] = useState("");
    const [codEditora, setCodEditora] = useState(opcoes[0]?.value);

    const router  = useRouter();

    const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(evento.target.value));
    }
    
    const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const novoLivro: Livro = {
            codigo: "",
            titulo,
            resumo,
            autores: autores.split("\n"),
            codEditora
        }

        await controleLivros.incluir(novoLivro).then(() => {
            try {
                router.push("/LivroLista");
            }
            catch (erro) {
                console.log(`Erro ao incluir livro: ${erro}`);
            }
            
        });
    }

    return (
        <div className="container-fluid">
            <Head>
                <title>Loja Next | Cadastro de Livro</title>
            </Head>
            <Menu />
            <main className="main m-3">
                <h1 className="h1 mb-5 mt-4">Cadastro de Livro</h1>
                <form onSubmit={incluir}>
                    <div className="form-group">
                        <label htmlFor="titulo">Título</label>
                        <input type="text" id="titulo" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="resumo">Resumo</label>
                        <textarea id="resumo" className="form-control" value={resumo} onChange={(e) => setResumo(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="autores">Autores (um por linha)</label>
                        <textarea id="autores" className="form-control" value={autores} onChange={(e) => setAutores(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="editora">Editora</label>
                        <select id="editora" className="form-control" value={codEditora} onChange={tratarCombo}>
                            { opcoes.map((opcao) => (
                                <option key={opcao.value} value={opcao.value}>
                                    { opcao.text }
                                </option>
                            )) }
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Incluir Livro</button>
                </form>
            </main>
        </div>
    );
}

export default LivroDados;
