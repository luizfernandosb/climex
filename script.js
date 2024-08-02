const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const result = document.getElementById("result-container");

searchBtn.addEventListener("click", function buscaCidade() {
  const search = document.getElementById("search");

  loader.style.visibility = "visible";

  // API
  const API_KEY = "532b0bde70a3ba2e73962d04b4402abc";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${API_KEY}&lang=pt_br`;

  const fetchWeather = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const climateID = data.weather[0].id;
      let climateImg;

      // verificação da temperatura
      if (climateID === 800) {
        climateImg = `cloudy`;
      } else if (climateID > 199 && climateID <= 232) {
        climateImg = `thunder-rain`;
      } else if (climateID > 299 && climateID <= 321) {
        climateImg = `rain`;
      } else if (climateID > 499 && climateID <= 531) {
        climateImg = `rain`;
      } else if (climateID > 599 && climateID <= 622) {
        climateImg = `snowfall`;
      } else if (climateID > 800 && climateID <= 804) {
        climateImg = `cloudy`;
      } else {
        return;
      }

      const tempCelsius = parseInt(data.main.temp - 273.15);
      const windSpeed = parseInt(data.wind.speed * 3.6);

      // função para deixar a primeira letra maiúscula
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      const locality = search.value;
      const capitalizeLocality = capitalizeFirstLetter(locality);

      // resultado
      result.innerHTML = `
      <p class="local-name">${capitalizeLocality}</p>
        <img src="${climateImg}.png" alt="" />
        <span class="temp">${tempCelsius}°C</span>
        <div class="status" id="status">
          <p>Vel. Vento: ${windSpeed}Km/h | Humidade: ${data.main.humidity}%</p>
        </div>`;
    })
    .catch((error) => {
      result.innerHTML = `<p class="error">Ops... não encontramos o local desejado.</p>`;
    });

  const delay = new Promise((resolve) => setTimeout(resolve, 2000));

  Promise.all([fetchWeather, delay]).finally(() => {
    loader.style.visibility = "hidden";
    search.value = '';
  });
});
