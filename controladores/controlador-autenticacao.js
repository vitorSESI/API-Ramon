
const db = require('../db.json')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) =>{
    try{
        const {email, senha} = req.body; //pegando email e senha
        const lista_clientes = db.clientes

        if (!email || !senha){
            res.send({erro:'email ou senha não enviado'})
        }  //validar se o usuário enviou email e senha
        
        const cliente = lista_clientes.find(
            (cliente) => cliente?.email == email
            )//buscar lista de clientes internamente

        if(!cliente){
            res.status(404).send({error:'not found'})
        }//se o cliente nao existir, responder erro

        const senhaValida = bcrypt.compareSync(senha, cliente.senha)//comparar a senha, com a armazenada
        
        if(!senhaValida){
            res.send({erro:'a senha é invalida'})
        }//se a senha for diferente, retorna erro

        const token = jwt.sign(
        {//corpo do token
            nome: cliente.nome,
            email: cliente.email,
            _id: cliente.id
        },
        process.env.chave_criptografia,//chave de criptografia
        {expiresIn: 1000*60*60*24*365}//tempo de vida para utilizar o token
        )//crianr o toke JWT

        res.cookie("TokenAulBe", token).send({massage:"Ok"})//informar para o navegador que isso é um token e enviar
    }catch(e){
        console.log(e)
    }
}

const logout = async (req, res)=> {

}

module.exports = {login, logout}