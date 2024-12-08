const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || "mongodb+srv://agungMq135:agungmq135@cluster0.h9eyb.mongodb.net/sensor_data?retryWrites=true&w=majority&appName=Cluster0";
let isConnected = false;

// Fungsi untuk memastikan koneksi hanya dilakukan sekali
async function connectToDatabase() {
    if (isConnected) return;
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = true;
    console.log("MongoDB connected successfully");
}

// Schema dan Model untuk data sensor
const sensorSchema = new mongoose.Schema({
    gasLevel: Number,
    timestamp: { type: Date, default: Date.now }
});

// Gantilah nama collection di sini menjadi "sensor_data"
const SensorData = mongoose.model('mq135', sensorSchema);

module.exports = async (req, res) => {
    await connectToDatabase();

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
    } else if (req.method === "GET") {
        try {
            // Ambil semua data dari collection sensor_data
            const data = await SensorData.find();

            res.status(200).json(data);
        } catch (error) {
            console.error("Error while retrieving data:", error);
            res.status(500).json({ error: "Failed to retrieve data" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};
