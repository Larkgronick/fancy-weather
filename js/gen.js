import {
  body,
  wrapper,
  header,
  switchers,
  refresh,
  rotateArrows,
  languageSelect,
  languages,
  options,
  selectDegrees,
  celsiusLabel,
  celsiusInput,
  celsiusBox,
  celsiusSpan,
  fahrenheitLabel,
  fahrenheitInput,
  fahrenheitBox,
  fahrenheitSpan,
  search,
  input,
  microphone,
  microphoneImg,
  searchButton,
  main,
  weatherBlock,
  info,
  place,
  dateData,
  dateInfo,
  infoBlock,
  details,
  cloud,
  degree,
  sideInfo,
  threeDaysInfo,
  day,
  dayInfo,
  days,
  mapBlock,
  mapZone,
  latit,
  longit,
} from './constants.js';

function generateElement(parent, element) {
  parent.appendChild(element);
}

function generateElements(arr, parent, type) {
  arr.forEach(() => {
    const child = document.createElement(type);
    generateElement(parent, child);
  });
}

function setAttribute(element, attribute, name) {
  element.setAttribute(attribute, name);
}

function setInnerHTML(arr, parent) {
  const children = Array.from(parent.children);
  children.forEach((el, index) => {
    el.innerHTML = arr[index];
  });
}

function setID(arr, children) {
  arr.forEach((el, index) => {
    children[index].id = el;
  });
}

function generateDays() {
  Array.from(day).forEach((el) => {
    const dayWeek = document.createElement('div');
    const dayDegree = document.createElement('div');
    const dayCloud = document.createElement('img');
    generateElement(el, dayWeek);
    generateElement(el, dayDegree);
    generateElement(el, dayCloud);
    setAttribute(dayWeek, 'class', 'forecast-day');
    setAttribute(dayDegree, 'class', 'forecast-degree');
    setAttribute(dayCloud, 'class', 'forecast-icon');
  });
}


function init() {
  generateElement(body, wrapper);
  generateElement(wrapper, header);
  generateElement(header, switchers);
  generateElement(switchers, refresh);
  generateElement(refresh, rotateArrows);
  generateElement(switchers, languageSelect);

  generateElements(languages, languageSelect, 'option');
  setInnerHTML(languages, languageSelect);

  generateElement(switchers, selectDegrees);
  generateElement(selectDegrees, celsiusLabel);
  generateElement(celsiusLabel, celsiusInput);
  generateElement(celsiusLabel, celsiusBox);
  generateElement(celsiusBox, celsiusSpan);
  generateElement(selectDegrees, fahrenheitLabel);
  generateElement(fahrenheitLabel, fahrenheitInput);
  generateElement(fahrenheitLabel, fahrenheitBox);
  generateElement(fahrenheitBox, fahrenheitSpan);
  generateElement(microphone, microphoneImg);

  generateElement(header, search);
  generateElement(search, input);
  generateElement(search, microphone);
  generateElement(search, searchButton);
  generateElement(wrapper, main);
  generateElements(dateInfo, dateData, 'span');
  generateElement(main, weatherBlock);
  generateElement(weatherBlock, info);
  generateElement(info, place);
  generateElement(info, dateData);
  generateElement(info, infoBlock);
  generateElement(infoBlock, degree);
  generateElement(infoBlock, sideInfo);
  generateElement(sideInfo, cloud);
  generateElement(sideInfo, details);
  generateElement(info, dayInfo);
  generateElement(weatherBlock, threeDaysInfo);
  generateElements(days, threeDaysInfo, 'div');

  setID(days, day);
  generateDays();

  generateElement(main, mapBlock);
  generateElement(mapBlock, mapZone);
  generateElement(mapBlock, latit);
  generateElement(mapBlock, longit);

  setAttribute(wrapper, 'class', 'wrapper');
  setAttribute(switchers, 'class', 'switchers');

  setAttribute(refresh, 'class', 'buttonload');
  setAttribute(rotateArrows, 'class', 'fa fa-refresh');

  setID(languages, options);

  setAttribute(celsiusInput, 'type', 'radio');
  setAttribute(celsiusInput, 'name', 'radio');
  setAttribute(celsiusBox, 'class', 'celsius box');

  setAttribute(fahrenheitInput, 'type', 'radio');
  setAttribute(fahrenheitInput, 'name', 'radio');
  setAttribute(fahrenheitBox, 'class', 'fahrenheit box');

  setAttribute(search, 'class', 'search');
  setAttribute(input, 'class', 'input');
  setAttribute(input, 'type', 'search');
  setAttribute(input, 'placeholder', 'Input city');
  setAttribute(microphone, 'class', 'microphone active');

  setAttribute(weatherBlock, 'class', 'weather-block');
  setAttribute(dateData, 'class', 'date');
  setAttribute(info, 'class', 'weather-info');
  setAttribute(degree, 'class', 'degree');
  setAttribute(infoBlock, 'class', 'info-block');
  setAttribute(details, 'class', 'details');
  setAttribute(sideInfo, 'class', 'side-info');

  setAttribute(threeDaysInfo, 'class', 'weather-three-days');

  setAttribute(mapBlock, 'class', 'map-block');
  setAttribute(mapZone, 'id', 'map');

  celsiusInput.checked = true;
  searchButton.innerHTML = 'Search';
}

export {
  init,
  generateElement,
  generateElements,
  setAttribute,
  setInnerHTML,

};
