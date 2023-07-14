global.root = __dirname;
const server = require("./express")();
const { port } = require("./config");
const { queryExecution, queryMultiExecution } = require("./Database");


const PORT = process.env.PORT || port;

server.listen(PORT, async () => {
    global.queryExecution = queryExecution;
    global.queryMultiExecution = queryMultiExecution;
    // try{
    // const rows  = await queryExecution(`select * from users`);
    // console.log(rows)
    // }
    // catch(err)
    // {
    //     console.log("ERROR:",err.message)
    // }
    console.log("server is runnung:", PORT)

})

