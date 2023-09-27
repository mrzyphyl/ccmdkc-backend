const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your Name']
    },
    appointmentTicketNo: {
        type: String,
        required: [true, 'Please add your Ticket Number']
    },
    appointmentTime: {
        type: String,
        required: [true, 'Please add Time Slot']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Appointment', appointmentSchema)