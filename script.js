function generateSession() {
  const sets = parseInt(document.getElementById("sets").value);
  const reps = parseInt(document.getElementById("reps").value);
  const sessionArea = document.getElementById("sessionArea");
  sessionArea.innerHTML = "";

  for (let s = 1; s <= sets; s++) {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.innerText = `Sett ${s}`;
    fieldset.appendChild(legend);

    for (let r = 1; r <= reps; r++) {
      const label = document.createElement("label");
      label.innerText = `Løp ${r}: `;
      const inputTid = document.createElement("input");
      inputTid.type = "number";
      inputTid.step = "0.01";
      inputTid.placeholder = "Tid (sek)";
      inputTid.className = "tid";

      const inputKommentar = document.createElement("input");
      inputKommentar.type = "text";
      inputKommentar.placeholder = "Kommentar";
      inputKommentar.className = "kommentar";

      fieldset.appendChild(label);
      fieldset.appendChild(inputTid);
      fieldset.appendChild(inputKommentar);
      fieldset.appendChild(document.createElement("br"));
    }

    sessionArea.appendChild(fieldset);
  }
}

function saveSession() {
  const sets = document.querySelectorAll("#sessionArea fieldset");
  let logg = "";

  sets.forEach((sett, sIndex) => {
    logg += `Sett ${sIndex + 1}:\n`;
    const tider = sett.querySelectorAll(".tid");
    const kommentarer = sett.querySelectorAll(".kommentar");

    let sum = 0;
    let count = 0;
    let best = null;

    tider.forEach((tidInput, rIndex) => {
      const tid = parseFloat(tidInput.value);
      const kommentar = kommentarer[rIndex].value;

      if (!isNaN(tid)) {
        sum += tid;
        count++;
        if (best === null || tid < best) best = tid;
      }

      logg += `  Løp ${rIndex + 1}: ${!isNaN(tid) ? tid.toFixed(2) + "s" : "–"} ${kommentar ? "– " + kommentar : ""}\n`;
    });

    if (count > 0) {
      const snitt = (sum / count).toFixed(2);
      logg += `  ➤ Snitt: ${snitt}s | Beste: ${best.toFixed(2)}s\n`;
    }
  });

  document.getElementById("logOutput").innerText = logg;
}

function exportCSV() {
  const sets = document.querySelectorAll("#sessionArea fieldset");
  let csv = "Sett,Løp,Tid (sek),Kommentar\n";

  sets.forEach((sett, sIndex) => {
    const tider = sett.querySelectorAll(".tid");
    const kommentarer = sett.querySelectorAll(".kommentar");

    tider.forEach((tidInput, rIndex) => {
      const tid = tidInput.value || "";
      const kommentar = kommentarer[rIndex].value || "";
      csv += `${sIndex + 1},${rIndex + 1},${tid},${kommentar}\n`;
    });
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "sprint_økt.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
