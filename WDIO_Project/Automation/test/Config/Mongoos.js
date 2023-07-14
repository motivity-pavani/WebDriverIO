const mongoose=require('mongoose')
const mongodb = `mongodb+srv://ashok:ashok123@cluster0.ixwqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports.db = ()=>{

    return new Promise((resolve)=>{

    mongoose

    .connect(mongodb)

    .then(

        connected => {

            console.log('DB CONNECTED')

            resolve(true)

        },

        err => {

            resolve(false)

            console.log('DB Connecting error :', err.message)

        }

    )

})

}