const app =  require("./index");
const connect = require("./configs/db")
app.listen("3008", async () => {
    try {
        await connect();
        console.log("listening port 3008");
    } catch (error) {
        console.log(error.message);
    }
});