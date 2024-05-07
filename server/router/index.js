const router = require('express').Router()

const restaurantRouter = require('./restaurant')
const reservationRouter = require('./reservation')
const userRoutes = require("./userRoutes");

router.use('/restaurant', restaurantRouter)
router.use('/reservation', reservationRouter)
router.use("/auth", userRoutes);

module.exports = router