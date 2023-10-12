const express = require('express');
const clientId = "CLIENT";
const path = require('path');
const { Kafka } = require('kafkajs')
var cors = require('cors')
const app = express(),
      bodyParser = require("body-parser");
      port = 80;

const fs = require('fs');

const produce = require("./producer.js");
const consumer = require('./consumer.js');

// call the `produce` function and log an error if it occurs
produce().catch((err) => {
	console.error("error in producer: ", err)
})

// start the consumer, and log any errors
consumer.consume().catch((err) => {
	console.error("error in consumer: ", err)
})


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../standpoint/build')));

app.get('/api/messages', (req, res) => {
  console.log('api/ called!')
  let data = consumer.getData()
  
  data = JSON.stringify(data);
  console.log("this is data return");
  console.log(data);
  res.send(data);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../standpoint/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});