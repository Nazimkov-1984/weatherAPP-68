const getRandomNumber = (min, max) => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};
const button = document.querySelector(".search_btn");
const flag = document.querySelector(".flag");
const input = document.querySelector(".input");

document.body.style.backgroundImage = `url(../assets/backgrounds/${getRandomNumber(
  1,
  7
)}.jpg)`;
setInterval(() => {
  document.body.style.backgroundImage = `url(../assets/backgrounds/${getRandomNumber(
    1,
    7
  )}.jpg)`;
}, 5000);

//слушаталь событий - повесить слушатель события на элемент
button.addEventListener("click", (event) => {
  if (input.value !== "") {
    // запрос на сервер
    const city_name = input.value;
    const API_key = "0e3f4c3098c7d2107ce581907ae44eb7";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const countryCode = data.sys.country;
        flag.style.backgroundImage = `url(https://countryflagsapi.com/png/${countryCode})`;
        const results = document.querySelector(".results");
        const temp = document.createElement("div");
        temp.textContent = `Температура ${Number(
          data.main.temp
        ).toFixed()} градусів`;
        temp.style.backgroundColor = "white";
        results.appendChild(temp);
      });
  } else {
    input.classList.toggle("input_error");
  }
});
