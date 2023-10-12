// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")
const crypto = require('crypto');
// the client ID lets kafka know who's producing the messages
const clientId = "mock-up-kafka-producer-client"
// we can define the list of brokers in the cluster
const brokers = ["kafka:9093"]
// this is the topic to which we want to write messages
const topic = "uas-detection-log"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

// random uuid for drone id
let uuid = crypto.randomUUID();

// we define an async function that writes a new message each second
const produce = async () => {
	await producer.connect()
	let i = 0;
    let p = 0;
    let long = 43.47917401;
    let lat = -116.22918106;

	// after the produce has connected, we start an interval timer
	setInterval(async () => {
		try {
			// send a message to the configured topic with
			// the key and value formed from the current value of `i`
			await producer.send({
				topic,
                acks: 1,
				messages: [
                    {
                        key: String(i),
                        value: `{ "uasid": "${uuid}", "lon": "${long + p}", "lat": "${lat}"}`,
                    },
                    // {
                    //     key: String(i + 1),
                    //     value: "this is message " + (i + 1),
                    // },
                    // {
                    //     key: String(i + 2),
                    //     value: "this is message " + (i + 2),
                    // },
                ],
			})

			// if the message is written successfully, log it and increment `i`
			console.log("writes: ", i)
            p = p + .001;
			i++
		} catch (err) {
			console.error("could not write message " + err)
		}
	}, 1000)
}

module.exports = produce;