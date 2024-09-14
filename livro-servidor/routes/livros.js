const { obterLivros, incluir, excluir } = require("../modelo/livro-dado");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const livros = await obterLivros();
        res.json(livros);
    }
    catch (erro) {
        console.log(`ERRO: ${erro}`);
        res.status(500).json({ message: "Erro ao obter livros." });
    }
});

router.post("/", async (req, res) => {
    try {
        const novoLivro = req.body;
        await incluir(novoLivro);
        res.status(201).json({ message: "Livro incluído com sucesso!" });
    }
    catch (erro) {
        console.log(`ERRO: ${erro}`);
        res.status(500).json({ message: "Erro ao incluir livro. "});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const codigo = req.params.id;
        await excluir(codigo);
        res.status(200).json({ message: "Livro excluído com sucesso!" });

    }
    catch (erro) {
        console.log(`ERRO: ${erro}`);
        res.status(500).json({ message: "Erro ao excluir livro. "});
    }
});

module.exports = router;
