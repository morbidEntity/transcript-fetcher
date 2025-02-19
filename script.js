function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

async function fetchTranscript() {
    const videoUrl = document.getElementById("videoUrl").value;
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert("Invalid YouTube URL");
        return;
    }

    try {
        const response = await fetch(`/api/transcript/${videoId}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("transcript").innerHTML = `<p style="color: red;">${data.error}</p>`;
        } else {
            document.getElementById("transcript").innerHTML = data.transcript
                .map(line => `<p>[${line.start.toFixed(2)}s] ${line.text}</p>`)
                .join("");
        }
    } catch (error) {
        alert("Failed to fetch transcript.");
    }
}

function extractVideoId(url) {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/) ||
                  url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}
