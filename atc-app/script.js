
async function generateCommands() {
  const callsign = document.getElementById("callsign").value.toUpperCase();
  const container = document.getElementById("commands");

  const phrases = [
    `, cleared for takeoff runway 2 2`,
    `, line up and wait runway 04`,
    `, contact tower on 118 decimal 7`,
    `, taxi to holding point via Alpha and Bravo`
  ];

  container.innerHTML = "";

  for (const phrase of phrases) {
    const fullText = callsign + phrase;
    const div = document.createElement("div");
    div.textContent = fullText;

    const button = document.createElement("button");
    button.textContent = "Play 🔊";
    button.className = "play-button";
    button.onclick = async () => {
      const res = await fetch("/.netlify/functions/generateAudio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: fullText })
      });
      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    };

    div.appendChild(button);
    container.appendChild(div);
  }
}
