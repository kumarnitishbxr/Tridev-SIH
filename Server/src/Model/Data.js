const {Schema, default: mongoose} = require('mongoose')




const dataSchema = new Schema({


    

},{timestamps: true})


const Data = mongoose.model('data', dataSchema)
module.exports = Data