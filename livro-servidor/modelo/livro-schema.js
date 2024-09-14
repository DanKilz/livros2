const banco = require("./conexao");
const LivroSchema = new banco.Schema({
    /*
    _id: {
        type: banco.Schema.Types.ObjectId
    },
    */
    // O campo _id foi excluído para que o MongoDB posso gerenciar automaticamente a criação de ids para os documentos.
    titulo: {
        type: String,
        required: true
    },
    codEditora: {
        type: Number,
        required: true
    },
    resumo: {
        type: String,
        required: true
    },
    autores: {
        type: [String],
        required: true
    }
});

const Livro = banco.model("livros", LivroSchema);

module.exports = Livro;
