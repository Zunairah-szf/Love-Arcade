const FLAMES_RESULTS = ["Friends 🤝", "Lovers 💕", "Affection 🥰", "Marriage 💍", "Enemies 😤", "Soulmates ✨"];

function getFlamesIndex(name1, name2) {
  let n1 = name1.toLowerCase().replace(/\s/g, "");
  let n2 = name2.toLowerCase().replace(/\s/g, "");
  let combined = n1 + n2;

  for (let char of n1) {
    if (n2.includes(char)) {
      combined = combined.replace(char, "");
      n2 = n2.replace(char, "");
    }
  }
  return combined.length % FLAMES_RESULTS.length;
}

function revealDestiny() {
  let name1 = document.getElementById("name1").value;
  let name2 = document.getElementById("name2").value;

  if (!name1 || !name2) {
    alert("Please enter both names first! 💖");
    return;
  }

  const flamesIndex = getFlamesIndex(name1, name2);
  
  // Update FLAMES
  const flamesText = FLAMES_RESULTS[flamesIndex];
  document.getElementById("flameResult").innerText = flamesText;

  // Update Love Calculator
  let variance = (name1.length + name2.length) % 15;
  let score = 0;
  let loveMsg = "";

  const scores = [
    { s: 40 + variance, m: "Good friends! 👫" },    // Friends
    { s: 80 + variance, m: "Deeply in love! 💘" },   // Lovers
    { s: 60 + variance, m: "Sweet affection! 🍭" }, // Affection
    { s: 95 + (variance % 5), m: "Put a ring on it! 💍" }, // Marriage
    { s: 0 + variance * 2, m: "Total war! ⚔️" },    // Enemies
    { s: 100, m: "Perfect match! 🌟" }               // Soulmates
  ];

  score = scores[flamesIndex].s > 100 ? 100 : scores[flamesIndex].s;
  loveMsg = scores[flamesIndex].m;
  document.getElementById("loveResult").innerText = `${score}% - ${loveMsg}`;

  // Update Prediction
  const predictions = [
    "Not yet! Build the friendship first 💛",
    "YES! Go for it! They are waiting! 💌",
    "Maybe drop a subtle hint first 😉",
    "It is your destiny! Confess now! 💍",
    "Better keep it a secret for now... 😬",
    "Absolutely! The stars verify it! ✨"
  ];
  document.getElementById("predictResult").innerText = predictions[flamesIndex];
}
