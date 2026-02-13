const FLAMES_RESULTS = ["Friends 🤝", "Lovers 💕", "Affection 🥰", "Marriage 💍", "Enemies 😤", "Soulmates ✨"];

function getFlamesIndex(name1, name2) {
  name1 = name1.toLowerCase().replace(/\s/g, "");
  name2 = name2.toLowerCase().replace(/\s/g, "");

  let combined = name1 + name2;

  for (let char of name1) {
    if (name2.includes(char)) {
      combined = combined.replace(char, "");
      name2 = name2.replace(char, "");
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

  // Trigger Animations
  const results = document.querySelectorAll(".card p");
  results.forEach(result => {
    result.classList.remove("pop-in");
    void result.offsetWidth; // Trigger reflow
    result.classList.add("pop-in");
  });

  const flamesRes = calculateFlames(name1, name2);
  const loveRes = calculateLove(name1, name2);
  const predictRes = predictLove(name1, name2);

  // Results are calculated locally. No data is sent to any server.
}

function calculateFlames(name1, name2) {
  let index = getFlamesIndex(name1, name2);
  let result = FLAMES_RESULTS[index];
  document.getElementById("flameResult").innerText = result;
  return result;
}


function calculateLove(name1, name2) {
  let flamesIndex = getFlamesIndex(name1, name2);
  let score = 0;
  let message = "";

  // Base score ranges based on FLAMES result
  // Friends: 40-59, Lovers: 80-94, Affection: 60-79, Marriage: 95-99, Enemies: 0-29, Soulmates: 100

  // Add some variance based on names so it's not always the exact same number for the category
  let variance = (name1.length + name2.length) % 15;

  switch (flamesIndex) {
    case 0: // Friends
      score = 40 + variance;
      message = "Good friends! 👫";
      break;
    case 1: // Lovers
      score = 80 + variance;
      message = "Deeply in love! 💘";
      break;
    case 2: // Affection
      score = 60 + variance;
      message = "Sweet affection! 🍭";
      break;
    case 3: // Marriage
      score = 95 + (variance % 5);
      message = "Put a ring on it! 💍";
      break;
    case 4: // Enemies
      score = 0 + variance * 2; // 0-28 range roughly
      message = "Total war! ⚔️";
      break;
    case 5: // Soulmates
      score = 100;
      message = "Perfect match! 🌟";
      break;
  }

  if (score > 100) score = 100;

  document.getElementById("loveResult").innerText = score + "% - " + message;
  return score;
}


function predictLove(name1, name2) {
  let flamesIndex = getFlamesIndex(name1, name2);
  let prediction = "";

  switch (flamesIndex) {
    case 0: // Friends
      prediction = "Not yet! Build the friendship first 💛";
      break;
    case 1: // Lovers
      prediction = "YES! Go for it! They are waiting! 💌";
      break;
    case 2: // Affection
      prediction = "Maybe drop a subtle hint first 😉";
      break;
    case 3: // Marriage
      prediction = "It is your destiny! Confess now! 💍";
      break;
    case 4: // Enemies
      prediction = "Better keep it a secret for now... 😬";
      break;
    case 5: // Soulmates
      prediction = "Absolutely! The stars verify it! ✨";
      break;
  }

  document.getElementById("predictResult").innerText = prediction;
  return prediction;
}

