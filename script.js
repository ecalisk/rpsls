/* func: Randomly generate a computer choice */
function getComputerChoice() {
  let seed = Math.random();

  switch (true) {
    case seed < 0.2:
      return "Rock";
    case seed >= 0.2 && seed < 0.4:
      return "Paper";
    case seed >= 0.4 && seed < 0.6:
      return "Scissors";
    case seed >= 0.6 && seed < 0.8:
      return "Lizard";
    case seed >= 0.8 && seed < 1:
      return "Spock";
  }
}

/* func: Get player choice & correct its format */
function getPlayerChoice() {
  let playerChoice = prompt("What is your play?");

  // Manipulate to correct format: first letter capital only
  playerChoice =
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1).toLowerCase();
  return playerChoice;
}

/* func: Compare choices & evaluate winner */
function evaluateWinner(computerChoice, playerChoice) {
  // func: Standardize winner announcement
  let announceWinner = (
    winningChoice,
    losingChoice,
    defeatAction,
    didPlayerWin
  ) => {
    if (didPlayerWin == "tie") return `It's a ${didPlayerWin}!`;
    return `You ${didPlayerWin}! ${winningChoice} ${defeatAction} ${losingChoice}!`;
  };

  /* GAME RULES */
  switch (true) {
    // Tie check
    case computerChoice == playerChoice:
      return announceWinner(computerChoice, playerChoice, "beats", "tie");
    // Scissors cuts Paper
    case computerChoice == "Scissors" && playerChoice == "Paper":
      return announceWinner(computerChoice, playerChoice, "cuts", "lost");
    case playerChoice == "Scissors" && computerChoice == "Paper":
      return announceWinner(playerChoice, computerChoice, "cuts", "won");
    // Paper covers Rock
    case computerChoice == "Paper" && playerChoice == "Rock":
      return announceWinner(computerChoice, playerChoice, "covers", "lost");
    case playerChoice == "Paper" && computerChoice == "Rock":
      return announceWinner(playerChoice, computerChoice, "covers", "won");
    // Rock crushes Lizard
    case computerChoice == "Rock" && playerChoice == "Lizard":
      return announceWinner(computerChoice, playerChoice, "crushes", "lost");
    case playerChoice == "Rock" && computerChoice == "Lizard":
      return announceWinner(playerChoice, computerChoice, "crushes", "won");
    // Lizard poisons Spock
    case computerChoice == "Lizard" && playerChoice == "Spock":
      return announceWinner(computerChoice, playerChoice, "poisons", "lost");
    case playerChoice == "Lizard" && computerChoice == "Spock":
      return announceWinner(playerChoice, computerChoice, "poisons", "won");
    // Spock smashes Scissors
    case computerChoice == "Spock" && playerChoice == "Scissors":
      return announceWinner(computerChoice, playerChoice, "smashes", "lost");
    case playerChoice == "Spock" && computerChoice == "Scissors":
      return announceWinner(playerChoice, computerChoice, "smashes", "won");
    // Scissors decapitates Lizard
    case computerChoice == "Scissors" && playerChoice == "Lizard":
      return announceWinner(
        computerChoice,
        playerChoice,
        "decapitates",
        "lost"
      );
    case playerChoice == "Scissors" && computerChoice == "Lizard":
      return announceWinner(playerChoice, computerChoice, "decapitates", "won");
    // Lizard eats Paper
    case computerChoice == "Lizard" && playerChoice == "Paper":
      return announceWinner(computerChoice, playerChoice, "eats", "lost");
    case playerChoice == "Lizard" && computerChoice == "Paper":
      return announceWinner(playerChoice, computerChoice, "eats", "won");
    // Paper disproves Spock
    case computerChoice == "Paper" && playerChoice == "Spock":
      return announceWinner(computerChoice, playerChoice, "disproves", "lost");
    case playerChoice == "Paper" && computerChoice == "Spock":
      return announceWinner(playerChoice, computerChoice, "disproves", "won");
    // Spock vaporizes Rock
    case computerChoice == "Spock" && playerChoice == "Rock":
      return announceWinner(computerChoice, playerChoice, "vaporizes", "lost");
    case playerChoice == "Spock" && computerChoice == "Rock":
      return announceWinner(playerChoice, computerChoice, "vaporizes", "won");
    // (and as it always has) Rock crushes Scissors
    case computerChoice == "Rock" && playerChoice == "Scissors":
      return announceWinner(computerChoice, playerChoice, "crushes", "lost");
    case playerChoice == "Rock" && computerChoice == "Scissors":
      return announceWinner(playerChoice, computerChoice, "crushes", "won");
  }
}

/* RETRIEVE NICKNAME & CHANNEL NAME*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nickname = urlParams.get("nickname");
const channel = urlParams.get("channel");

console.log(nickname);
console.log(channel);

/* MAIN GAME LOOP */
