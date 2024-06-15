import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())
app.use(cors())

const db = new pg.Client({
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASEPORT
})
db.connect()
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
            await db.query('INSERT INTO todolist(task) VALUES($1)', [data])
        } catch (error) {
            console.log(error)
        }
        res.send(await getTasks())
    }catch(err){
        console.log(err)
    }
    
})

app.delete("/",async (req, res) => {
    const id = Number(req.query.id);
    console.log(id)
    db.query('DELETE FROM todolist WHERE id=$1', [id])
    res.send(await getTasks())
    
}) 


async function getTasks() {
    try {
        const tasks = await db.query("SELECT * FROM todolist")
        return tasks.rows
    } catch (error) {
        console.log(error)
    }
}
const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log("node server running successfully")
})

