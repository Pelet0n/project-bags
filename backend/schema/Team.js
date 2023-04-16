const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        q1: {
            type: Number,
            default: 0
        },
        q2: {
            type: Number,
            default: 0
        },q3: {
            type: Number,
            default: 0
        },q4: {
            type: Number,
            default: 0
        },
        sum: {
            type:Number,
            default:0
        }
    })

module.exports = mongoose.model('teams',teamSchema)