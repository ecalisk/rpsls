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
  // Manipulate to correct format: first letter capital only
  let chatInput = chatInputElement.value;
  let playerChoice =
    chatInput.charAt(0).toUpperCase() + chatInput.slice(1).toLowerCase();
  return playerChoice;
}

/* func: Compare choices & evaluate winner */
function evaluateWinner(computerChoice, playerChoice) {
  // func: Standardize winner announcement
  let announceWinner = (
    winningChoice,
    losingChoice,
    defeatAction,
    winnerName
  ) => {
    //func: if tie -announce tie, or else update userWinCount or opponentWinCunt based on the determined winner,
    if (winnerName == "tie") {
      return `bastelfreak: It's a tie!`;
    } else if (winnerName == "JackFrost") {
      opponentWinCount++;
    } else {
      userWinCount++;
    }

    return `bastelfreak: ${winningChoice} ${defeatAction} ${losingChoice}! ${winnerName} won!`;
  };

  /* GAME RULES */
  switch (true) {
    // Tie check
    case computerChoice == playerChoice:
      return announceWinner(computerChoice, playerChoice, "beats", "tie");
    // Scissors cuts Paper
    case computerChoice == "Scissors" && playerChoice == "Paper":
      return announceWinner(computerChoice, playerChoice, "cuts", "JackFrost");
    case playerChoice == "Scissors" && computerChoice == "Paper":
      return announceWinner(
        playerChoice,
        computerChoice,
        "cuts",
        `${nickname}`
      );
    // Paper covers Rock
    case computerChoice == "Paper" && playerChoice == "Rock":
      return announceWinner(
        computerChoice,
        playerChoice,
        "covers",
        "JackFrost"
      );
    case playerChoice == "Paper" && computerChoice == "Rock":
      return announceWinner(
        playerChoice,
        computerChoice,
        "covers",
        `${nickname}`
      );
    // Rock crushes Lizard
    case computerChoice == "Rock" && playerChoice == "Lizard":
      return announceWinner(
        computerChoice,
        playerChoice,
        "crushes",
        "JackFrost"
      );
    case playerChoice == "Rock" && computerChoice == "Lizard":
      return announceWinner(
        playerChoice,
        computerChoice,
        "crushes",
        `${nickname}`
      );
    // Lizard poisons Spock
    case computerChoice == "Lizard" && playerChoice == "Spock":
      return announceWinner(
        computerChoice,
        playerChoice,
        "poisons",
        "JackFrost"
      );
    case playerChoice == "Lizard" && computerChoice == "Spock":
      return announceWinner(
        playerChoice,
        computerChoice,
        "poisons",
        `${nickname}`
      );
    // Spock smashes Scissors
    case computerChoice == "Spock" && playerChoice == "Scissors":
      return announceWinner(
        computerChoice,
        playerChoice,
        "smashes",
        "JackFrost"
      );
    case playerChoice == "Spock" && computerChoice == "Scissors":
      return announceWinner(
        playerChoice,
        computerChoice,
        "smashes",
        `${nickname}`
      );
    // Scissors decapitates Lizard
    case computerChoice == "Scissors" && playerChoice == "Lizard":
      return announceWinner(
        computerChoice,
        playerChoice,
        "decapitates",
        "JackFrost"
      );
    case playerChoice == "Scissors" && computerChoice == "Lizard":
      return announceWinner(
        playerChoice,
        computerChoice,
        "decapitates",
        `${nickname}`
      );
    // Lizard eats Paper
    case computerChoice == "Lizard" && playerChoice == "Paper":
      return announceWinner(computerChoice, playerChoice, "eats", "JackFrost");
    case playerChoice == "Lizard" && computerChoice == "Paper":
      return announceWinner(
        playerChoice,
        computerChoice,
        "eats",
        `${nickname}`
      );
    // Paper disproves Spock
    case computerChoice == "Paper" && playerChoice == "Spock":
      return announceWinner(
        computerChoice,
        playerChoice,
        "disproves",
        "JackFrost"
      );
    case playerChoice == "Paper" && computerChoice == "Spock":
      return announceWinner(
        playerChoice,
        computerChoice,
        "disproves",
        `${nickname}`
      );
    // Spock vaporizes Rock
    case computerChoice == "Spock" && playerChoice == "Rock":
      return announceWinner(
        computerChoice,
        playerChoice,
        "vaporizes",
        "JackFrost"
      );
    case playerChoice == "Spock" && computerChoice == "Rock":
      return announceWinner(
        playerChoice,
        computerChoice,
        "vaporizes",
        `${nickname}`
      );
    // (and as it always has) Rock crushes Scissors
    case computerChoice == "Rock" && playerChoice == "Scissors":
      return announceWinner(
        computerChoice,
        playerChoice,
        "crushes",
        "JackFrost"
      );
    case playerChoice == "Rock" && computerChoice == "Scissors":
      return announceWinner(
        playerChoice,
        computerChoice,
        "crushes",
        `${nickname}`
      );
    default:
      return `bastelfreak: Your move is off ${nickname}!`;
  }
}

/* Read chat input, event handle send button, initiate counters  */
const chatInputBox = document.querySelector("#chat-input");
const chatInputElement = chatInputBox.querySelector("input");
const btnSend = document.querySelector("#btn-send");
let validRoundCount = 0;
let userWinCount = 0;
let opponentWinCount = 0;
btnSend.addEventListener("click", sendMessage);

/* RETRIEVE NICKNAME & CHANNEL NAME*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nickname = urlParams.get("nickname");
const channel = urlParams.get("channel");

/* UPDATE PREVIOUS MESSAGES WITH NICKNAME*/
const previousMessages = document.getElementById("previous-messages");
const listItems = previousMessages.getElementsByTagName("li");
for (let i = 0; i < listItems.length; i++) {
  let listItem = listItems[i];
  if (listItem.textContent.includes("USER")) {
    listItem.textContent = listItem.textContent.replace(/USER/g, nickname);
  }
  listItem.innerHTML = makeFirstWordGreen(listItem.textContent);
}

/* Update channel name */
const chatHeader = document.querySelector("#chat-header");
const h2 = chatHeader.querySelector("h2");
h2.textContent = `IRC | #${channel}`;

/* func: Scroll chat log to the bottom */
const chatMessages = document.getElementById("chat-messages");
function scrollToBottom() {
  // alert("test!");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* func: Wrap the first word of a string in span and give it class 'green' */
function makeFirstWordGreen(str) {
  const words = str.split(" ");
  const firstWord = words[0];
  const firstWordWithColor = '<span class="green">' + firstWord + "</span>";
  words[0] = firstWordWithColor;
  const newStr = words.join(" ");
  return newStr;
}

/* MAIN */
function sendMessage() {
  //Get opponent & user choices, evaluate choices
  const userMessage = document.createElement("li");
  userMessage.textContent = getPlayerChoice();
  const opponentMessage = document.createElement("li");
  opponentMessage.textContent = getComputerChoice();
  const evaluation = evaluateWinner(
    opponentMessage.textContent,
    userMessage.textContent
  );

  // Append choices to previous messages
  userMessage.textContent = `${nickname}: ` + userMessage.textContent;
  userMessage.innerHTML = makeFirstWordGreen(userMessage.textContent);
  previousMessages.appendChild(userMessage);
  opponentMessage.textContent = "JackFrost: " + opponentMessage.textContent;
  opponentMessage.innerHTML = makeFirstWordGreen(opponentMessage.textContent);
  previousMessages.appendChild(opponentMessage);

  // Create referee feedback
  const refereeEvaluation = document.createElement("li");
  previousMessages.appendChild(refereeEvaluation);

  // If it's not a tie or invalid move; count the round
  if (
    evaluation != `bastelfreak: Your move is off ${nickname}!` &&
    evaluation != `bastelfreak: It's a tie!`
  ) {
    validRoundCount++;
  }

  // Give referee feedback - What happened? Who won the round? Should the referee initiate another round or congratulate the winner?
  if (validRoundCount >= 3) {
    btnSend.disabled = true; // three valid rounds -> disable send button
    let gameWinner = userWinCount > opponentWinCount ? nickname : "JackFrost";
    refereeEvaluation.textContent = `${evaluation} We have a game winner! Congrats ${gameWinner}!`;
  } else {
    refereeEvaluation.textContent = `${evaluation} Another round.. Ready go!`;
  }
  refereeEvaluation.innerHTML = makeFirstWordGreen(
    refereeEvaluation.textContent
  );

  // Empty chat input box before next use
  chatInputElement.value = "";
  scrollToBottom();
}
