const connectToDatabase = require('./connectdb');
const SensorData = require('./SensorModel'); // Import model

/**
 * Handler untuk GET: Mengambil semua data sensor dari database
 */
module.exports = async (req, res) => {
    try {
        await connectToDatabase(); // Koneksi database
        const data = await SensorData.find(); // Ambil semua data
        res.status(200).json(data); // Kirim respons berupa data
    } catch (error) {
        console.error("Error while retrieving data:", error);
        res.status(500).json({ error: "Failed to retrieve data" });
    }
};
