const express = require('express')
const router = express.Router()
const controlador = require('../controladores/controlador-produtos')
const validadorDeCookie = require("../middlewares/validadorDeCookie")

router.get('', validadorDeCookie, controlador.listProdutos)
router.get('produtos/:id', validadorDeCookie, controlador.getProduto)
router.post('', validadorDeCookie, controlador.createProduto)
router.post('/:id', validadorDeCookie, controlador.updateProduto)
router.delete('/:id', validadorDeCookie, controlador.deleteProduto)

module.exports = router;