//Require Variables

const { response } = require('express')
const express=require('express')
const app=express()
const MongoClient=require('mongodb').MongoClient
const PORT=8005
require('dotenv').config()
//MongoClient.connect(connectionStr,  {useUnifiedTopology:true, useNewUrlParser: true})
//Connect to Mongo
let db,
dbConnectionStr=process.env.DB_STRING
dbName='DragonBall-API'

MongoClient.connect(dbConnectionStr)
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db=client.db()
})
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get('/',(request,response)=>{
    db.collection('DragonBall-API.Chiatzo-Info').find().toArray()
    .then(data => {
        let nameList=data.map(item=>item.arc)
        console.log(nameList)
        response.render('index.ejs',{info:nameList})
    })
    .catch(error =>console.log(error))

})

app.post('/api', (request,response)=>{

    
})

app.put('/updateEntry', (request,response)=>{

})

app.delete('/deleteEntry', (request,response) =>{

})
app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on ${PORT}`)
})
