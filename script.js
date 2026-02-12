function calculateFlames() {
  let name1 = document.getElementById("flameName1").value.toLowerCase().replace(/\s/g, "");
  let name2 = document.getElementById("flameName2").value.toLowerCase().replace(/\s/g, "");

  if (!name1 || !name2) {
    alert("Please enter both names!");
    return;
  }

  let combined = name1 + name2;

  for (let char of name1) {
    if (name2.includes(char)) {
      combined = combined.replace(char, "");
      name2 = name2.replace(char, "");
    }
  }

  let count = combined.length;
  let flames = ["Friends 🤝", "Lovers 💕", "Affection 🥰", "Marriage 💍", "Enemies 😤", "Soulmates ✨"];

  let index = count % flames.length;
  document.getElementById("flameResult").innerText = flames[index];
}

function calculateLove() {
  let name1 = document.getElementById("loveName1").value;
  let name2 = document.getElementById("loveName2").value;

  if (!name1 || !name2) {
    alert("Enter both names!");
    return;
  }

  let score = (name1.length * name2.length +
              name1.charCodeAt(0) +
              name2.charCodeAt(0)) % 101;
            

  let message = "";

  if (score <= 30) message = "Hmm... maybe just friends 😅";
  else if (score <= 60) message = "There’s something there 👀";
  else if (score <= 85) message = "Sparks are flying 🔥";
  else message = "A match made in heaven 💖";

  document.getElementById("loveResult").innerText =
    score + "% - " + message;
}


function predictLove() {
  let predictions = [
    "YES!! Do it 💕",
    "Wait for the right moment 🌸",
    "Maybe drop hints first 😉",
    "Focus on yourself 👑",
    "It’s destiny ✨"
  ];

  let randomIndex = Math.floor(Math.random() * predictions.length);
  document.getElementById("predictResult").innerText =
    predictions[randomIndex];
}
