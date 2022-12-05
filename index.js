import express from "express";
import path from 'path'
import { router } from "./router.js";

const app = express()
const port = process.env.PORT || 6969


app.use('/public', express.static(path.join(path.resolve(), 'public')))


app.get('/',(req,res)=>{
  res.sendFile('src/index.html', {root : path.resolve()})
})
app.get('/api',(req,res)=>{
  res.sendFile('src/api.html', {root : path.resolve()})
})


app.use('/files', router)


app.listen(port, ()=>{
  console.log(`server jalan di port ${port}`)
})