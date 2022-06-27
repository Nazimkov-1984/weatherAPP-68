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
}, 10000);

const loader = document.querySelector(".lds-spinner");
loader.style.display = "none";

//слушаталь событий - повесить слушатель события на элемент
button.addEventListener("click", (event) => {
  if (input.value !== "") {
    loader.style.display = "block";
    button.style.disabled = "true";
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
        const toBeTemp = results.querySelector("div");
        if (toBeTemp) {
          results.removeChild(toBeTemp);
        }
        results.appendChild(temp);
        loader.style.display = "none";
        button.style.disabled = "false";
      })
      .catch(() => {
        const results = document.querySelector(".results");
        const temp = document.createElement("div");
        temp.textContent = "Місто не знайдено";
        temp.style.backgroundColor = "white";
        const toBeTemp = results.querySelector("div");
        if (toBeTemp) {
          results.removeChild(toBeTemp);
        }
        results.appendChild(temp);
        input.classList.add("input_error");
        loader.style.display = "none";
        flag.style.backgroundImage = "none";
      });
  } else {
    input.classList.add("input_error");
  }
});

input.addEventListener("click", (e) => {
  input.classList.remove("input_error");
});

