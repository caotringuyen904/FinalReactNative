const  mongoose = require('mongoose')
const reservationModel = require('../model/reservation.model')



const createReservation = async (req, res) => {
    try { 
        const data = req.body
        console.log('data:', data)

        const userID = req.user
        console.log('userID:', userID)

       
       const reservation = await reservationModel.create({
            ...data,
            restaurant: data.id,
            user: userID
        });

        return res.status(200).json({ message: "Reservation created", reservation });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.find()
        .populate({
            path: 'restaurant',
            select: 'name address location images phone active'
        })
        return res.status(200).json({ message: 'Get reservation success', reservations })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getReservationByUser = async (req, res) => {
    try {
        const userID = req.user
        const reservations = await reservationModel.find({ user: userID })
        .populate({
            path: 'restaurant',
            select: 'name address location images phone active'
        })
        return res.status(200).json({ message: 'Get reservation success', reservations })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const getReservationById = async (req, res) => {
    const { id } = req.params
    try {
        const reservation = await reservationModel.findById(id).populate('user').populate('restaurant')
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found. 404' })
        }
        return res.status(200).json({ message: 'Get reservation success', reservation })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error, 500' })
    }
}

const deleteReservation = async (req, res) => {
    const { id } = req.params
    try {
        const reservation = await reservationModel.findByIdAndDelete(id)
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' })
        }
        return res.status(200).json({ message: 'Reservation deleted', reservation })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const updateReservation = async (req, res) => {
    const { id } = req.params
    try {
        const reservation = await reservationModel.findByIdAndUpdate(id, req.body)
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' })
        }
        return res.status(200).json({ message: 'Reservation updated', reservation })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    createReservation,
    getReservations,
    getReservationByUser,
    getReservationById,
    deleteReservation,
    updateReservation
};
