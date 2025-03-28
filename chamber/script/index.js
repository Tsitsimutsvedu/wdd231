const weatherIcon = document.querySelector("#weather-icon");
const temperature = document.querySelector("#temperature");
const description =  document.querySelector("#description");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

const myKey = "f4c562fd7bdac3e7508459ec00325754"
const lat = "33.75"
const lon = "-84.39"

const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`
const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`


function unixTo24HourClock(unixTime) {
    const date = new Date(unixTime * 1000); // Convert Unix time to milliseconds
    const hours = date.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if needed
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if needed
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Get seconds and pad with leading zero if needed
    return `${hours}:${minutes}:${seconds}`; // Format as HH:MM:SS
}

async function weatherApiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayWeatherResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }


const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");

const memberUrl = "./data/members.json";

async function forecastApiFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
          const forecastData = await response.json();
          console.log(forecastData)
          displayForecastResults(forecastData);
        } else {
            throw Error(await response.text());
        }
      } catch (error) {
          console.log(error);
      }
}

weatherApiFetch();
forecastApiFetch();

function displayWeatherResults(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const iconDesc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', iconDesc);
    temperature.innerHTML = `Temp: ${data.main.temp}&deg;F`;
    description.innerHTML = `${data.weather[0].description}`;
    sunrise.innerHTML = `Sunrise: ${unixTo24HourClock(data.sys.sunrise)}`;
    sunset.innerHTML = `Sunset: ${unixTo24HourClock(data.sys.sunset)}`;

}

function displayForecastResults(data) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const tomorrow = (date.getDay()) +1;
    const dayAfterTomorrow = (date.getDay()) +2;

    day1.innerHTML = `Today: ${data.list[0].main.temp}`;
    day2.innerHTML = `${daysOfWeek[tomorrow]}: ${data.list[6].main.temp}`;
    day3.innerHTML = `${daysOfWeek[dayAfterTomorrow]}: ${data.list[14].main.temp}`;

}



const memberSection = document.querySelector("#business-cards");

async function getMemberData() {
    const response = await fetch(memberUrl);
    const members = await response.json();
    return members;
  }
  
  async function displayPrivilegeMembers() {
    const members = await getMemberData();
    const privilegeMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
    const totalCard = window.innerWidth < 575 ? 2 : 3;
  
    for (let i = 0; i < totalCard; i++) {
      const randomIndex = Math.floor(Math.random() * privilegeMembers.length);
      const member = privilegeMembers[randomIndex];
  
      const memberCard = document.createElement("section");
      const memberName = document.createElement("h4");
      const memberLogo = document.createElement("img");
      const memberPhone = document.createElement("p");
      const memberAddress = document.createElement("p");
      const memberLink = document.createElement("a");
      const memberLevel = document.createElement("p");
  
      memberCard.classList.add("cards");
  
      memberName.innerHTML = member.name;
      memberLogo.src = member.image;
      memberLogo.setAttribute('alt', `${member.name} logo`);
      memberPhone.innerHTML = member.phone;
      memberAddress.innerHTML = member.address;
      memberLink.href = member.website;
      memberLink.innerHTML = "Visit Website";
      memberLevel.innerHTML = `Membership Level: ${member.membershipLevel}`;
  
      memberCard.appendChild(memberName);
      memberCard.appendChild(memberLogo);
      memberCard.appendChild(memberPhone);
      memberCard.appendChild(memberAddress);
      memberCard.appendChild(memberLink);
      memberCard.appendChild(memberLevel);
  
      memberSection.appendChild(memberCard);

      //prevent duplicate members in memberSection
      privilegeMembers.splice(randomIndex, 1);
    }
  }

displayPrivilegeMembers();