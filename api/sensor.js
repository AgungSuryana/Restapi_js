const mongoose = require('mongoose');

// Koneksi ke MongoDB (gunakan variabel lingkungan untuk URI)
const dbURI = process.env.MONGODB_URI || "mongodb+srv://agungMq135:agungmq135@cluster0.h9eyb.mongodb.net/sensor_data?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Schema dan Model untuk data sensor
const sensorSchema = new mongoose.Schema({
    gasLevel: Number,
    timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('mq135', sensorSchema);

// Fungsi serverless handler
module.exports = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { gasLevel } = req.body;

            if (gasLevel === undefined) {
                return res.status(400).json({ error: "Data tidak lengkap" });
            }

            const newSensorData = new SensorData({ gasLevel });
            await newSensorData.save();

            res.status(200).json({ message: "Data berhasil disimpan" });
        } catch (error) {
            console.error("Error while saving data:", error);
            res.status(500).json({ error: "Failed to save data" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};