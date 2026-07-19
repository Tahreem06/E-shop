const app = require("./app");
const connectDatabase = require("./db/Database");


//handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Errors ${err.message}`);
    console.log(`Shutting down the server for handling uncaught Exception`);
})

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

//connect db
connectDatabase();

//create server 
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on https//localhost:${process.env.PORT}`)
})

//unhandle promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});