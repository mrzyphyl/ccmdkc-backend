const express  = require('express')
const { 
    getRecords, 
    postRecords, 
    getOneRecord, 
    getMultipleRecords, 
    deltRecord
} = require('../controllers/PatientRecordsController')
const { addMedicalHistory } = require('../controllers/MedicalHistoryController')
const router = express.Router()

router.route('/').get(getRecords).post(postRecords)

router.route('/:id').get(getOneRecord).delete(deltRecord)

router.route('/:ids').get(getMultipleRecords)

router.route('/:id/medical-history').put(addMedicalHistory)

module.exports = router