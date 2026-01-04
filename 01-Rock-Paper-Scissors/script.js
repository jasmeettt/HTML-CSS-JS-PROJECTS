const container = document.querySelector(".container");
let userResult = document.querySelector(".user-result img");
let cpuResult = document.querySelector(".cpu-result img");
let result = document.querySelector(".result");
let optionImages = document.querySelectorAll(".option-image");

let cpuImages = [
  "./Images/rock.png",
  "./Images/paper.png",
  "./Images/scissors.png",
];

const choices = ["R", "P", "S"];

optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "./Images/rock.png"
    result.textContent = "Playing..."


    //checking if index matches and then removing the active class.
    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active");
    });

    container.classList.add("start")

    //setting a timeout for the process to take its time
    let time = setTimeout(()=>{

    container.classList.remove("start")

      //getting the image src
    //user image
    let imgSrc = image.querySelector("img").src;
    userResult.src = imgSrc;

    //cpu image
    let randomNumber = Math.floor(Math.random() * 3);
    cpuResult.src = cpuImages[randomNumber];

    //getting the values from the user and cpu as R,P,S
    let userValue = choices[index];
    let cpuValue = choices[randomNumber];

    //objext with all possible out comes
    let outcomes = {
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

    //looking up the outcomes based on the cpu and user value
    let outcomeValue = outcomes[userValue + cpuValue];

    //display result
    result.textContent = userValue === cpuValue ? "Match Draw" : `${outcomeValue} Won !!`
    },2500)
  });
});
