/* main blocks */

const { body } = document;
const wrapper = document.createElement('div');
const header = document.createElement('header');
const main = document.createElement('main');

/* header */
const switchers = document.createElement('div');
const refresh = document.createElement('button');
const rotateArrows = document.createElement('i');
const languageSelect = document.createElement('select');
const options = languageSelect.children;
const languages = ['EN', 'RU', 'BY'];

/* celsius - fahrenheit switcher */
const selectDegrees = document.createElement('div');
const celsiusLabel = document.createElement('label');
const celsiusInput = document.createElement('input');
const celsiusBox = document.createElement('div');
const celsiusSpan = document.createElement('span');
const fahrenheitLabel = document.createElement('label');
const fahrenheitInput = document.createElement('input');
const fahrenheitBox = document.createElement('div');
const fahrenheitSpan = document.createElement('span');

/* search field */
const search = document.createElement('div');
const input = document.createElement('input');
const microphone = document.createElement('div');
const microphoneImg = document.createElement('img');
const searchButton = document.createElement('button');

/* today weather */
const weatherBlock = document.createElement('div');
const info = document.createElement('div');
const place = document.createElement('h3');
const dateData = document.createElement('div');
const dateInfo = ['week', 'day', 'month', 'hours', 'minutes'];
const infoBlock = document.createElement('div');
const details = document.createElement('div');
const cloud = document.createElement('img');
const degree = document.createElement('h2');
const sideInfo = document.createElement('div');

/* forecast */
const threeDaysInfo = document.createElement('div');
const day = threeDaysInfo.children;
const dayInfo = document.createElement('div');
const days = ['tomorrow', 'after-tomorrow', 'after-after-tomorrow'];

/* map */
const mapBlock = document.createElement('div');
const mapZone = document.createElement('div');
const latit = document.createElement('p');
const longit = document.createElement('p');

/* API Keys */
const locationToken = 'daa042737e765a'; // token from ipinfo.io
const accessKey = 'AZyJ6Ahv5lCJYV27O6uyY4hnZZHIFINjFyOfR6ljyTU'; // access key from openweathermap.org
const mapToken = 'pk.eyJ1IjoibGFya2dyb25pY2siLCJhIjoiY2thcXBvNTNjMDczajJzbHJiYWtpN2NpNiJ9.a9nF6SNio_wyQyLUWA-nPw';
const yandexKey = 'trnsl.1.1.20200509T181254Z.8647e5e32597b463.246a9502ce985836d3e7793f20b7934298eb0214';


export {
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
  locationToken,
  yandexKey,
  mapToken,
  accessKey,

};
