const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');


router.get('/', pagoController.getPagos);
router.post('/', pagoController.createPago);
router.delete('/:id', pagoController.deletePago);
router.put('/:id', pagoController.updatePago);

module.exports = router; 