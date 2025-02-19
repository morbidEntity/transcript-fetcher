const express = require("express");
const cors = require("cors");
const { Transcript } = require("youtube-transcript");

const app = express();
const PORT = process.env.PORT || 18520;

app.use(cors());
app.use(express.json());

app.get("/api/transcript/:videoId", async (req, res) => {
    const videoId = req.params.videoId;
    
    try {
        const transcript = await Transcript.fetchTranscript(videoId);
        res.json({ transcript });
    } catch (error) {
        res.json({ error: "Transcript not available or invalid video ID." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
