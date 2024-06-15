import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())
app.use(cors())

mongooseConnect().catch(err => {
    console.log(err)
})
async function mongooseConnect() {
    await mongoose.connect("mongodb://127.0.0.1:27017/tasks")
}


const taskSchema = new mongoose.Schema({
    task: String
})
const Task = mongoose.model("task", taskSchema);

app.get("/", async (req, res) => {
    try {
        res.send(await getTasks())
    }catch (err){
        console.log(err)
    }
})
app.post("/task", async (req, res) => {
    let data = await req.body.task;
    try {
        try {
            const task = new Task({
                task: data
            })
            await task.save();
        } catch (error) {
            console.log(error)
        }
        res.send(await getTasks())
    }catch(err){
        console.log(err)
    }
    
})

app.delete("/",async (req, res) => {
    const id = req.query.id;
    console.log(id)
    await Task.deleteOne({_id: id})
    res.send(await getTasks())
    
}) 


async function getTasks() {
    try {
        const tasks = await Task.find()
        return tasks
    } catch (error) {
        console.log(error)
    }
}
const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log("node server running successfully")
})

