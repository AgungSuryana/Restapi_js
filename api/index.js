const postSensorHandler = require('./PostSensor');
const getSensorHandler = require('./GetSensor');

/**
 * Entry point untuk menangani berbagai request
 */
module.exports = async (req, res) => {
    if (req.method === "POST") {
        await postSensorHandler(req, res); // Delegasikan ke PostSensor.js
    } else if (req.method === "GET") {
        await getSensorHandler(req, res); // Delegasikan ke GetSensor.js
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};
