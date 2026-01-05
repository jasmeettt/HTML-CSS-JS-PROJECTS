const container = document.querySelector(".container");
let userResult = document.querySelector(".user-result img");
let cpuResult = document.querySelector(".cpu-result img");
let result = document.querySelector(".result");
let optionImages = document.querySelectorAll(".option-image");
let userScore = document.querySelector(".user-score");
let cpuScore = document.querySelector(".cpu-score");
let drawScore = document.querySelector(".draw-score");
let autoBtn = document.querySelector(".auto");
let resetBtn = document.querySelector(".reset");


let cpuImages = [
  "./Images/rock.png",
  "./Images/paper.png",
  "./Images/scissors.png",
];

const choices = ["R", "P", "S"];

const score ={
  user: 0,
  cpu: 0,
  draw: 0,
};

const savedScore = localStorage.getItem("rps-score");

if (savedScore) {
  const parsedScore = JSON.parse(savedScore);
  score.user = parsedScore.user;
  score.cpu = parsedScore.cpu;
  score.draw = parsedScore.draw;
  updateUI();
}

let isAutoPlaying = false;
let autoPlayInterval = null;
let roundTimeout = null;

optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    //clicked button
    optionImages.forEach((img) => img.classList.remove("active"));
    image.classList.add("active");

    //start game
    playRound(index);
  });
});

function playRound(userIndex) {
  if (roundTimeout) {
    clearInterval(roundTimeout);
    roundTimeout = null;
  }

  //reset visuals
  userResult.src = "./Images/rock.png";
  cpuResult.src = "./Images/rock.png";
  result.textContent = "Playing...";
  container.classList.add("start");

  //delay animation
  const time = setTimeout(() => {
    container.classList.remove("start");

    //user choice
    userResult.src = cpuImages[userIndex];

    //cpu choice
    const randomNumber = Math.floor(Math.random() * 3);
    cpuResult.src = cpuImages[randomNumber];

    //decide winner
    const userValue = choices[userIndex];
    const cpuValue = choices[randomNumber];

    //object taht will contain the outcomes
    const outcomes = {
      RR: "Draw",
      RP: "Cpu",
      RS: "User",
      PP: "Draw",
      PS: "Cpu",
      PR: "User",
      SS: "Draw",
      SR: "Cpu",
      SP: "User",
    };

    //outcome value
    const outcomeValue = outcomes[userValue + cpuValue];

    //show Result
    result.textContent =
      userValue === cpuValue ? "Match Draw" : `${outcomeValue} Won!!`;

    //score updating
    // if (outcomeValue === "User") {
    //   score.user++;
    // } else if (outcomeValue === "Cpu") {
    //   score.cpu++;
    // }else{
    //   score.draw++
    // }

    const scoreMap = {
      User: "user",
      Cpu: "cpu",
      Draw: "draw",
    };


    if (scoreMap[outcomeValue]) {
  score[scoreMap[outcomeValue]]++;
}
    localStorage.setItem("rps-score", JSON.stringify(score))
    updateUI();

    console.log(score);
  }, 1800);
}

//ui update
function updateUI() {
  userScore.textContent = `User: ${score.user}`;
  cpuScore.textContent = `Cpu: ${score.cpu}`;
  drawScore.textContent = `Draws: ${score.draw}`;
}

//auto play functionality
autoBtn.addEventListener("click", () => {
  if (!isAutoPlaying) {
    startAutoPlay();
  } else {
    stopAutoPlay();
  }
});

function startAutoPlay() {
  isAutoPlaying = true;
  autoBtn.textContent = "Stop";
  container.classList.add("autoplay");

  autoPlayInterval = setInterval(() => {
    const userRandomIndex = Math.floor(Math.random() * 3);
    playRound(userRandomIndex);
  }, 2400);
}
function stopAutoPlay() {
  isAutoPlaying = false;
  autoBtn.textContent = "Auto";
container.classList.remove("autoplay");

  clearInterval(autoPlayInterval);
  autoPlayInterval = null;
}

//Reset functionality
resetBtn.addEventListener("click", resetGame);

function resetGame() {
  if (isAutoPlaying) {
    stopAutoPlay();
  }

  //scorereset
  score.user = 0;
  score.cpu = 0;
  score.draw = 0;

  //update ui again
  updateUI();

  //result text
  result.textContent = "Let's Play";

  //image reset
  userResult.src = "./Images/rock.png";
  cpuResult.src = "./Images/rock.png";

  //remove start from container
  container.classList.remove("start")

  //remove active selction 
  optionImages.forEach(img => img.classList.remove("active"))

  //localStorage
  localStorage.removeItem("rps-score");

}
