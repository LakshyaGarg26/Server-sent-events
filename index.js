const app = require("express")();

app.get("/", (req,res) => res.send("hello world!"));

app.get("/stream", (req,res) => {

    res.setHeader("Content-Type", "text/event-stream");
    
    send(res);
   
})


let i = 0;
function send(res){
    res.write("data: " + `hellooo!${i++}\n\n`);

    setTimeout(()=> send(res), 5000)
}
app.listen(8080)
console.log("Listening to 8080")