const asyncHandler = require('express-async-handler')
const Records = require('../models/PatientRecordsModel')


//Add Medical History
//@route PUT /api/user/:id/medical-history
//@access Public
const addMedicalHistory = asyncHandler (async (req, res) => {
    const records = await Records.findById(req.params.id)

    if(!records){
        res.status(400)
        throw new Error('No Records found')
    }
    
    const medical_id = req.params?.medicalId
    try {
        //Add Medical History
        const medical = {
            medicalId: medical_id,
            allergies: req.body.medicalHistory.allergies,
            diagnosis: req.body.medicalHistory.diagnosis,
            bloodPressure: req.body.medicalHistory.bloodPressure,
            temperature: req.body.medicalHistory.temperature,
            surgeries: req.body.medicalHistory.surgeries,
            createdAt: req.body.medicalHistory.createdAt
        }

        const updatedMedical = await Records.findByIdAndUpdate( req.params.id, req.body,
            {new: true},
            {_id: medical_id},
            {$push: {medicalHistory: medical}},
        )

        res.status(200).json(updatedMedical)
    } catch (error) {
        res.status(400)
        throw new Error('Cant Add Medical History')
    }
})


module.exports = {
    addMedicalHistory,
}