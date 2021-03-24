import {
  wrapper,
  refresh,
  rotateArrows,
  languageSelect,
  celsiusInput,
  celsiusBox,
  fahrenheitInput,
  fahrenheitBox,
  input,
  microphone,
  searchButton,
  place,
  dateData,
  details,
  cloud,
  degree,
  day,
  latit,
  longit,
  locationToken,
  yandexKey,
  mapToken,
  accessKey,
  body,
} from './constants.js';

import {
  init,
  generateElements,
  setAttribute,
  setInnerHTML,

} from './gen.js';

import {
  fullWeek,
  weekENData,
  weekRUData,
  weekBYData,
  weekEN,
  weekRU,
  weekBY,
  monthEN,
  monthRU,
  monthBY,
  weatherTypeEN,
  weatherTypeRU,
  weatherTypeBE,

} from './translator.js';


init();

const en = document.getElementById('EN');
const ru = document.getElementById('RU');
const by = document.getElementById('BY');


// Geolocation

async function getMyPosition() {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${locationToken}`);
    const location = await response.json();
    return location;
  } catch (err) {
    alert(err);
  }
  return 0;
}

function coordinatesConverter(coordinate) {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
  return `${degrees}° ${minutes}' ${seconds}'' `;
}

function setCoordinates(latitude, longitude) {
  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 9,
  });
  latit.innerHTML = `Latitude: ${coordinatesConverter(latitude)}`;
  longit.innerHTML = `Longitude: ${coordinatesConverter(longitude)}`;
}

// Weather

async function getWeatherInfo(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location.city}&lang=ua&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27`);
    const weatherData = await response.json();
    return weatherData;
  } catch (err) {
    alert(err);
  }
  return 0;
}

// Background

async function getBackgroundImage(weatherT) {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${weatherT}&client_id=${accessKey}`);
    const backgroundImageData = await response.json();
    return backgroundImageData;
  } catch (err) {
    console.log(err);
    alert('Default image loaded. API requests overflown (');
    setAttribute(wrapper, 'style', 'background-image: url(\'../assets/default.jpg\')');
  }
  return 0;
}

// Generate data

function generateWeatherInfo(fullPlace, degreeT, iconT, weatherT, feelsLikeT, windT, humidityT) {
  place.innerHTML = fullPlace;
  degree.innerHTML = `${degreeT}°`;
  const description = [weatherT, `FEELS LIKE: ${feelsLikeT}°`, `WIND: ${windT} m/s`, `HUMIDITY: ${humidityT} %`];
  generateElements(description, details, 'div');
  setInnerHTML(description, details);
  setAttribute(cloud, 'src', iconT);
}

function generateThreeDayInfo(degreeThree, iconThree) {
  const now = new Date();
  const dates = [fullWeek[now.getDay()], fullWeek[now.getDay() + 1], fullWeek[now.getDay() + 2]];
  Array.from(day).forEach((el, index) => {
    el.children[0].innerHTML = dates[index];
    el.children[1].innerHTML = `${degreeThree[index]}°`;
    el.children[2].setAttribute('src', iconThree[index]);
  });
}

function getData(data) {
  const fullPlace = (`${data.city.name}, ${data.city.country}`).toUpperCase();
  const degreeT = Math.ceil(data.list[0].main.temp);
  const degreeTommorow = Math.ceil(data.list[1].main.temp);
  const degreeAfterTommorow = Math.ceil(data.list[2].main.temp);
  const degreAfterAfterTomorrow = Math.ceil(data.list[3].main.temp);
  const degreeThree = [degreeTommorow, degreeAfterTommorow, degreAfterAfterTomorrow];
  const iconT = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
  const iconThree = [`https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`, `https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`, `https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`];
  const weatherT = (data.list[0].weather[0].main).toUpperCase();
  const feelsLikeT = Math.ceil(data.list[0].main.feels_like);
  const windT = Math.ceil(data.list[0].wind.speed);
  const humidityT = data.list[0].main.humidity;
  const latitude = data.city.coord.lat;
  const longitude = data.city.coord.lon;
  rotateArrows.classList.add('fa-spin');
  getBackgroundImage(weatherT).then((weather) => {
    const backgroundImage = weather.urls.full;
    setAttribute(wrapper, 'style', `background-image: url(${backgroundImage})`);
    rotateArrows.classList.remove('fa-spin');
  });
  generateWeatherInfo(fullPlace, degreeT, iconT, weatherT, feelsLikeT, windT, humidityT);
  generateThreeDayInfo(degreeThree, iconThree);
  setCoordinates(latitude, longitude);
}

const dataFields = Array.from(dateData.children);
function initClock(offset) {
  const now = new Date();
  const hourDiff = offset / 3600;
  const timeZoneDiff = hourDiff * 60 + now.getTimezoneOffset();
  const offsetTime = new Date(now.getTime() + timeZoneDiff * 60 * 1000);
  const hours = offsetTime.getHours();
  const minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  if (en.selected) {
    dataFields[0].innerHTML = `${weekENData[now.getDay()]} `;
    dataFields[2].innerHTML = `${monthEN[now.getMonth()]} `;
  }
  if (ru.selected) {
    dataFields[0].innerHTML = `${weekRUData[now.getDay()]} `;
    dataFields[2].innerHTML = `${monthRU[now.getMonth()]} `;
  }
  if (by.selected) {
    dataFields[0].innerHTML = `${weekBYData[now.getDay()]} `;
    dataFields[2].innerHTML = `${monthBY[now.getMonth()]} `;
  }

  dataFields[1].innerHTML = `${now.getDate()} `;
  dataFields[3].innerHTML = `${hours}:`;
  dataFields[4].innerHTML = minutes;
  setTimeout(initClock(offset), 1000);
}

window.onload = getMyPosition().then((location) => {
  getWeatherInfo(location).then((data) => {
    getData(data);
    const offset = data.city.timezone;
    initClock(offset);
  });
});

/* celsius to fahrenheit converter */

function fahrConverter() {
  let allDegrees = Array.from(document.getElementsByClassName('forecast-degree'));
  allDegrees.unshift(degree);
  const degrees = allDegrees.map((el) => el.innerHTML.substring(0, el.innerHTML.length - 1));
  if (celsiusInput.checked) {
    const fahrDegrees = degrees.map((el) => Math.round(parseFloat(el) * (9 / 5) + 32).toString());
    allDegrees = allDegrees.map((el, index) => { el.innerHTML = `${fahrDegrees[index]}°`; });
  }
}

function celsConverter() {
  let allDegrees = Array.from(document.getElementsByClassName('forecast-degree'));
  allDegrees.unshift(degree);
  const degrees = allDegrees.map((el) => el.innerHTML.substring(0, el.innerHTML.length - 1));
  if (fahrenheitInput.checked) {
    const celsDegrees = degrees.map((el) => Math.round((parseFloat(el) - 32) * (5 / 9)).toString());
    allDegrees = allDegrees.map((el, index) => { el.innerHTML = `${celsDegrees[index]}°`; });
  }
}

celsiusBox.addEventListener('click', celsConverter);
fahrenheitBox.addEventListener('click', fahrConverter);

/* weather search */

async function searchWeather() {
  const searchValue = input.value;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&lang=ua&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27`);
    const weatherData = await response.json();
    if (weatherData.message !== 0) {
      alert(weatherData.message);
    }
    return weatherData;
  } catch (err) {
    alert(err); // Error handling!
  }
  return 0;
}

function refreshData() {
  en.selected = true;
  searchWeather().then((data) => {
    details.innerHTML = '';
    getData(data);
    const offset = data.city.timezone;
    initClock(offset);
  });
}

searchButton.addEventListener('click', refreshData);

window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    refreshData();
  }
});

let currentLang = 'en';
async function getTranslation(selectedLang) {
  const city = place.innerHTML.substr(0, place.innerHTML.length - 4);
  const urlWord = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexKey}&text=${city}&lang=${currentLang}-${selectedLang}`;
  const resWord = await fetch(urlWord);
  const dataWord = await resWord.json();
  const translation = dataWord.text[0].toUpperCase();
  currentLang = selectedLang;
  return translation;
}

/* refresh page */

function newBackground() {
  const weather = details.children[0].innerHTML;
  rotateArrows.classList.add('fa-spin');
  getBackgroundImage(weather).then((data) => {
    const backgroundImage = data.urls.full;
    setAttribute(wrapper, 'style', `background-image: url(${backgroundImage})`);
    rotateArrows.classList.remove('fa-spin');
  });
}

refresh.addEventListener('click', newBackground);

/* translate page */

function findElement(arrEN, arrRU, arrBE, element) {
  const searchResult = [];
  const a = arrEN.indexOf(element);
  searchResult.push(a);
  const b = arrRU.indexOf(element);
  searchResult.push(b);
  const c = arrBE.indexOf(element);
  searchResult.push(c);
  function getElement(el) {
    return el >= 0;
  }
  const result = searchResult.find(getElement);
  return result;
}

function translate() {
  let selectedLang;
  const ch = details.children;
  const weather = details.children[0].innerHTML;
  const weatherIndex = findElement(weatherTypeEN, weatherTypeRU, weatherTypeBE, weather);
  const degreeTod = ch[1].innerHTML.substr(ch[1].innerHTML.length - 3, ch[1].innerHTML.length - 1);
  const wind = ch[2].innerHTML.substr(ch[2].innerHTML.length - 6, ch[2].innerHTML.length - 1);
  const humidity = ch[3].innerHTML.substr(ch[3].innerHTML.length - 5, ch[3].innerHTML.length - 1);
  const crdLat = latit.innerHTML.substr(latit.innerHTML.length - 13, latit.innerHTML.length - 1);
  const crdLon = longit.innerHTML.substr(longit.innerHTML.length - 13, longit.innerHTML.length - 1);

  const afterDays = Array.from(document.getElementsByClassName('forecast-day'));
  const tomorrow = afterDays[0].innerHTML;
  const afterTomorrow = afterDays[1].innerHTML;
  const tomorrowIndex = findElement(weekEN, weekRU, weekBY, tomorrow);
  const afterTomorrowIndex = findElement(weekEN, weekRU, weekBY, afterTomorrow);
  const afterAfterTomorrow = afterDays[2].innerHTML;
  const afterAfterTomorrowIndex = findElement(weekEN, weekRU, weekBY, afterAfterTomorrow);

  const today = dataFields[0].innerHTML.substr(0, dataFields[0].innerHTML.length - 1);
  const todayIndex = findElement(weekENData, weekRUData, weekBYData, today);
  const month = dataFields[2].innerHTML.substr(0, dataFields[2].innerHTML.length - 1);
  const monthIndex = findElement(monthEN, monthRU, monthBY, month);


  if (en.selected) {
    selectedLang = 'en';

    dataFields[0].innerHTML = `${weekENData[todayIndex]} `;
    dataFields[2].innerHTML = `${monthEN[monthIndex]} `;


    details.children[0].innerHTML = weatherTypeEN[weatherIndex];
    details.children[1].innerHTML = `FEELS LIKE: ${degreeTod}`;
    details.children[2].innerHTML = `WIND: ${wind}`;
    details.children[3].innerHTML = `HUMIDITY: ${humidity}`;

    latit.innerHTML = `Latitude: ${crdLat}`;
    longit.innerHTML = `Longitude: ${crdLon}`;

    afterDays[0].innerHTML = weekEN[tomorrowIndex];
    afterDays[1].innerHTML = weekEN[afterTomorrowIndex];
    afterDays[2].innerHTML = weekEN[afterAfterTomorrowIndex];
  }
  if (ru.selected) {
    selectedLang = 'ru';

    dataFields[0].innerHTML = `${weekRUData[todayIndex]} `;
    dataFields[2].innerHTML = `${monthRU[monthIndex]} `;

    details.children[0].innerHTML = weatherTypeRU[weatherIndex];
    details.children[1].innerHTML = `ОЩУЩАЕТСЯ КАК: ${degreeTod}`;
    details.children[2].innerHTML = `ВЕТЕР: ${wind}`;
    details.children[3].innerHTML = `ВЛАЖНОСТЬ: ${humidity}`;

    latit.innerHTML = `Широта: ${crdLat}`;
    longit.innerHTML = `Долгота: ${crdLon}`;

    afterDays[0].innerHTML = weekRU[tomorrowIndex];
    afterDays[1].innerHTML = weekRU[afterTomorrowIndex];
    afterDays[2].innerHTML = weekRU[afterAfterTomorrowIndex];
  }
  if (by.selected) {
    selectedLang = 'be';

    dataFields[0].innerHTML = `${weekBYData[todayIndex]} `;
    dataFields[2].innerHTML = `${monthBY[monthIndex]} `;

    details.children[0].innerHTML = weatherTypeBE[weatherIndex];
    details.children[1].innerHTML = `АДЧУВАЕЦЦА ЯК: ${degreeTod}`;
    details.children[2].innerHTML = `ВЕЦЕР: ${wind}`;
    details.children[3].innerHTML = `ВIЛЬГОТНАСЦЬ: ${humidity}`;

    latit.innerHTML = `Шырата: ${crdLat}`;
    longit.innerHTML = `Даўгата: ${crdLon}`;

    afterDays[0].innerHTML = weekBY[tomorrowIndex];
    afterDays[1].innerHTML = weekBY[afterTomorrowIndex];
    afterDays[2].innerHTML = weekBY[afterAfterTomorrowIndex];
  }
  getTranslation(selectedLang).then((translation) => {
    place.innerHTML = `${translation} ${place.innerHTML.substr(place.innerHTML.length - 4, place.innerHTML.length - 1)}`;
  });
}

languageSelect.addEventListener('change', translate);


/* speech recognition */

microphone.addEventListener('click', () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.start();
  if (microphone.className === 'microphone active') {
    input.value = 'name the city and wait';
    recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript).join('');
      input.value = transcript;
    });
    setTimeout(refreshData, 3000);
  } else {
    recognition.abort();
  }

  microphone.classList.toggle('active');
});
