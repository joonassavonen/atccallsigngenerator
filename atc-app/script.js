
async function generateCommands() {
  const callsign = document.getElementById("callsign").value.toUpperCase();
  const container = document.getElementById("commands");

  // Clear previous commands to avoid duplicates
  container.innerHTML = "";

  const phrases = [
    `${callsign}, cleared for takeoff runway 22`,
    `${callsign}, line up and wait runway 04`,
    `${callsign}, contact tower on 118.7`,
    `${callsign}, taxi to holding point via Alpha and Bravo`,
  ];

  for (const phrase of phrases) {
    const div = document.createElement("div");
    div.textContent = phrase;

    const button = document.createElement("button");
    button.textContent = "▶️ Play";
    button.onclick = async () => {
      const response = await fetch("/.netlify/functions/generateAudio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: phrase }),
      });
      const arrayBuffer = await response.arrayBuffer();
      const audioBlob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    };

    div.appendChild(button);
    container.appendChild(div);
  }
}
