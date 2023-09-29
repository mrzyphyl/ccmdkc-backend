const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Please add your Name']
    },
    itemDescription: {
        type: String,
        required: [true, 'Please add your Birthday']
    },
    stocksAvailable: {
        type: String,
        required: [true, 'Please add your Sex']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Inventory', inventorySchema)