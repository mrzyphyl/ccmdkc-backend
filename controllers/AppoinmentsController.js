const asyncHandler = require('express-async-handler')
const Appointments = require('../models/AppointmentModel')

//Get All Appointments
//@route GET /api/appointment
//@access Public
const getAppointment = asyncHandler (async (req, res) => {
    const appointment = await Appointments.find({Appointments})
    res.status(200).json(appointment)
})

//Get One Appointment
//@route GET /api/appointment/:id
//@access Public
const getOneAppointment = asyncHandler (async (req, res) => {
    const appointment = await Appointments.findById(req.params.id)

    if(!appointment){
        res.status(400)
        throw new Error('Appointment no found')
    }
    
    res.status(200).json(appointment)
})

//Get Multiple Appointments
//@route GET /api/appointment/:ids
//@access Public
const getMultiAppointments = asyncHandler (async (req, res) => {
    const appointment = await Appointments.find({Appointments})
    res.status(200).json(appointment)
})


//Post an Appointment
//@route POST /api/appointment
//@access Public
const postAppointment = asyncHandler (async (req, res) => {
    const { 
        name,
        appointmentTicketNo,
        appointmentTime
     } = req.body

    if(!name && !appointmentTime){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if Appointment exist
    const appointmentExist = await Appointments.findOne({appointmentTime})

    if(appointmentExist){
        res.status(400)
        throw new Error('Timeslot already in use')
    }

    const appointment = await Appointments.create({
        name,
        appointmentTicketNo,
        appointmentTime
    })

    if(appointment){
        res.status(201).json({
            _id: appointment.id,
            name: appointment.name,
            appointmentTicketNo: appointment.appointmentTicketNo,
            appointmentTime: appointment.appointmentTime
        })
    } else {
        res.status(400)
        throw new Error('Cant add Appointment')
    }
})

//Check if an Appointment Timeslot is available
//@route POST /api/appointment/check
//@access Public
const checkAppointment = asyncHandler (async (req, res) => {
    let { appointmentTime } = req.body

    if(!appointmentTime){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if Timeslot is available
    const isAvailable = await Appointments.findOne({appointmentTime})
    if(isAvailable){
        res.status(400)
        throw new Error('Timeslot already in use')
    }
})


//Update an Appointment
//@route PUT /api/appointment/:id
//@access Public
const updateAppointment = asyncHandler (async (req, res) => {
    const appointment = await Appointments.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    const updatedUser = await Appointments.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedUser)
})


//Delete an Appointment
//@route DELETE /api/appointment/:id
//@access Public
const deltAppointment = asyncHandler (async (req, res) => {
    const user = await Appointments.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    await user.deleteOne()

    res.status(200).json({ id: req.params.id})
})


//Delete Multiple Appointments
//@route DELETE /api/appointment/:ids
//@access Public
const deltMultiAppointment = asyncHandler (async (req, res) => {
    const user = await Appointments.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    await User.deleteMany()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getAppointment,
    getOneAppointment,
    getMultiAppointments,
    postAppointment,
    updateAppointment,
    deltAppointment,
    deltMultiAppointment,
    checkAppointment
}