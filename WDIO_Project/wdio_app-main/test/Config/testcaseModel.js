const mongoose=require('mongoose')
const testSchema = new mongoose.Schema({

  username: { type: String },

  password: { type: String },
  testcasefixturesteps:{type:Object}
})




module.exports = mongoose.model('testCaseFix', testSchema)
