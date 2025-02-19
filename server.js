const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/transcript/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    
    try {
        const response = await axios.get(`https://youtube-transcript-api-url/${videoId}`);
        res.json(response.data);
    } catch (error) {
        res.json({ error: "Transcript not available or invalid video ID" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
