// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "mock-up-kafka-consumer-client"
// we can define the list of brokers in the cluster
const brokers = ["kafka:9093"]
// this is the topic to which we want to write messages
const topic = "uas-detection-log"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive
const consumer = kafka.consumer({
	groupId: clientId,
	minBytes: 5,
	maxBytes: 1e6,
	// wait for at most 3 seconds before receiving new data
	maxWaitTimeInMs: 3000,
})

let data = [];

const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic, fromBeginning: true })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			console.log({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
            })
            data.push({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
            })
		},
	})
}

const getData = () =>{
    return data;
}

module.exports = {consume, getData};
