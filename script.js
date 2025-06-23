const phrases = [
  "[CALLSIGN], cleared for takeoff runway 22",
  "[CALLSIGN], contact tower on 118.7",
  "[CALLSIGN], line up and wait runway 04",
  "[CALLSIGN], taxi to holding point via Alpha and Bravo"
];

async function generateCommands() {
  const callsign = document.getElementById("callsign").value.trim().toUpperCase();
  const commandList = document.getElementById("commandList");
  commandList.innerHTML = "";

  for (const template of phrases) {
    const text = template.replace("[CALLSIGN]", callsign);
    const audioUrl = await generateAudio(text);

    const div = document.createElement("div");
    div.innerText = text;

    const btn = document.createElement("button");
    btn.innerText = "▶️ Play";
    btn.onclick = () => new Audio(audioUrl).play();

    div.appendChild(btn);
    commandList.appendChild(div);
  }
}

async function generateAudio(text) {
  const response = await fetch("/.netlify/functions/generateAudio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: text })
  });

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
