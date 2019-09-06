const MQTT = require("async-mqtt")
const conn = require("./src/database/connection")
const db = require("./src/database")

const bucket = conn.cluster.openBucket("bbta3_bams_suramadu_test")

const client = MQTT.connect("mqtt://bbta3.bppt.go.id:9621", {
    username: process.env.BAMS_USER,
    password: process.env.BAMS_PWD
})

const n = 8  // pisah setiap 8 karakter
const onMessage = async (topic) => {
    try {
        await client.subscribe("BAMS")
        if (topic.payload) {
            const node = topic.payload.toString().slice(0, 3)
            const timestamp = parseInt(topic.payload.toString().slice(3, 11), 16) * 1000
            const raw_sensor = topic.payload.toString().slice(11, topic.payload.toString().length)
            let sensor = []

            for (let index = 11; index <= raw_sensor.length + n; index += n) {
                const sensor_item_raw = topic.payload.toString().slice(index, index + n)
                const sensor_item = Buffer.from(sensor_item_raw, 'hex').readFloatBE(0)
                sensor.push(sensor_item)

                db.insertSensor(timestamp, bucket)
            }

            console.log(node, timestamp, sensor.length, '\n')
        }
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

client.on("packetreceive", onMessage)
