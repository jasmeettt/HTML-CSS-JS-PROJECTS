const container = document.querySelector(".container");
let userResult = document.querySelector(".user-result img");
let cpuResult = document.querySelector(".cpu-result img");
let result = document.querySelector(".result");
let optionImages = document.querySelectorAll(".option-image");

optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    //checking if index matches and then removing the active class.
    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active");
    });

    //getting the image src
    //user image
    let imgSrc = image.querySelector("img").src;
    userResult.src = imgSrc;

    //cpu image
    let randomNumber = Math.floor(Math.random() * 3);
    let cpuImages = [
      "./Images/rock.png",
      "./Images/paper.png",
      "./Images/scissors.png",
    ];
    cpuResult.src = cpuImages[randomNumber];

    //getting the values from the user and cpu as R,P,S
    let userValue = ["R", "P", "S"][index];
    let cpuValue = ["R", "P", "S"][randomNumber];
    console.table(userValue,cpuValue)
  });
});
