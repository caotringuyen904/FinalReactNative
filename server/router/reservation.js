const {createReservation, getReservations,getReservationByUser, getReservationById, deleteReservation, updateReservation} = require('../controller/reservation.controller')
const requireAuth  = require('../middlewares/requireAuth')
const router = require('express').Router()


router.post('/', requireAuth, createReservation)
router.get('/', getReservations)
router.get('/user', requireAuth, getReservationByUser)
router.get('/:id', getReservationById)
router.delete('/:id', deleteReservation)
router.put('/:id', updateReservation)

module.exports = router
