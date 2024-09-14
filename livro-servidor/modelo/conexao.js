const banco = require("mongoose");
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

banco.connect("mongodb://localhost:27017/livraria", options)
    .then(() => console.log("Conectado ao MongoDB com sucesso!"))
    .catch((erro) => console.log("Erro ao conectar ao MongoDB: ", erro));

module.exports = banco;
