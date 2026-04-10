let gameMode = "";
let team = [];

// ------------------ START FLOW ------------------

function showModes() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("modeSelect").classList.remove("hidden");
}

function startGame(mode) {
  gameMode = mode;
  team = [];

  document.getElementById("modeSelect").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  document.getElementById("modeText").innerText = "Mode: " + mode.toUpperCase();
  updateTeam();
}

// ------------------ SPIN ------------------

function spinWheel() {
  const wheel = document.getElementById("wheel");
  const resultText = document.getElementById("result");

  let deg = Math.floor(Math.random() * 360) + 720;
  wheel.style.transform = `rotate(${deg}deg)`;

  let event = getRandomEvent();

  setTimeout(() => {
    handleEvent(event);
  }, 2000);
}

// ------------------ EVENTS ------------------

function getRandomEvent() {
  let roll = Math.random();

  if (roll < 0.6) {
    return { type: "pokemon", name: getPokemon() };
  } else if (roll < 0.85) {
    return { type: "lose" };
  } else {
    return { type: "nothing" };
  }
}

function handleEvent(event) {
  const resultText = document.getElementById("result");

  if (event.type === "pokemon") {
    if (team.length < 6) {
      team.push(event.name);
      resultText.innerText = "You caught " + event.name + "!";
    } else {
      resultText.innerText = "Team full!";
    }
  }

  if (event.type === "lose") {
    if (team.length > 0) {
      let lost = team.pop();
      resultText.innerText = "You lost " + lost + "!";
    } else {
      resultText.innerText = "No Pokémon to lose!";
    }
  }

  if (event.type === "nothing") {
    resultText.innerText = "Nothing happened...";
  }

  updateTeam();
}

// ------------------ POKEMON ------------------

function getPokemon() {
  if (gameMode === "easy") {
    return randomFrom([
      "Pikachu", "Charmander", "Bulbasaur", "Squirtle"
    ]);
  }

  if (gameMode === "medium") {
    return randomFrom([
      "Gengar", "Snorlax", "Dragonite", "Arcanine"
    ]);
  }

  if (gameMode === "hard") {
    return randomFrom([
      "Mewtwo", "Rayquaza", "Giratina", "Zekrom"
    ]);
  }
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ------------------ UI ------------------

function updateTeam() {
  const teamList = document.getElementById("team");
  teamList.innerHTML = "";

  team.forEach(pokemon => {
    let li = document.createElement("li");
    li.innerText = pokemon;
    teamList.appendChild(li);
  });
}
