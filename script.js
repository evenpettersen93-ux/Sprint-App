function calculateSprint() {
  const speed = parseFloat(document.getElementById("speed").value);
  const distance = parseInt(document.getElementById("distance").value);
  if (isNaN(speed) || speed <= 0) {
    document.getElementById("sprintResult").innerText = "Skriv inn gyldig hastighet.";
    return;
  }
  const speedMs = speed * 1000 / 3600;
  const time = distance / speedMs;
  document.getElementById("sprintResult").innerText = 
    `Tid på ${distance}m: ${time.toFixed(2)} sekunder`;
}

function convertToTempo() {
  const speed = parseFloat(document.getElementById("speed").value);
  if (isNaN(speed) || speed <= 0) {
    document.getElementById("tempoResult").innerText = "Skriv inn gyldig km/t.";
    return;
  }
  const tempo = 60 / speed;
  const min = Math.floor(tempo);
  const sec = Math.round((tempo - min) * 60);
  document.getElementById("tempoResult").innerText = `Tempo: ${min} min ${sec} sek per km`;
}

function convertToKmt() {
  const min = parseFloat(document.getElementById("tempoMin").value);
  const sec = parseFloat(document.getElementById("tempoSec").value);
  if (isNaN(min) || isNaN(sec)) {
    document.getElementById("tempoResult").innerText = "Skriv inn gyldig tempo.";
    return;
  }
  const totalMin = min + sec / 60;
  const speed = 60 / totalMin;
  document.getElementById("tempoResult").innerText = `Hastighet: ${speed.toFixed(2)} km/t`;
}

const logList = document.getElementById("logList");
function addLog() {
  const type = document.getElementById("sessionType").value;
  const time = parseFloat(document.getElementById("sessionTime").value);
  const note = document.getElementById("sessionNote").value;
  if (isNaN(time)) return;

  const now = new Date().toLocaleTimeString();
  const entry = document.createElement("li");
  entry.innerText = `${type}: ${time.toFixed(2)}s – ${note} (${now})`;
  logList.appendChild(entry);

  document.getElementById("sessionTime").value = "";
  document.getElementById("sessionNote").value = "";
}