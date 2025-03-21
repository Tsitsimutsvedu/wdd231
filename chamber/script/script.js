document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------
    // 1. Hamburger Menu Functionality
    // ----------------------------
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
  
    hamburger.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      mobileNav.classList.toggle("hidden");
    });
  
    // ----------------------------
    // 2. Weather and Forecast API
    // ----------------------------
    const apiKey = "7628821d2985129f91ea402d5e5ef0d2";
    const city = "Buenos Aires";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
    // Fetch current weather
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(
          "weather-description"
        ).textContent = `Weather: ${data.weather[0].description.replace(
          /\b\w/g,
          (char) => char.toUpperCase()
        )}`;
        document.getElementById(
          "temperature"
        ).textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
      });
  
    // Fetch 3-day forecast
    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        let forecastHTML = "";
        for (let i = 0; i < 3; i++) {
          forecastHTML += `
            <div>
              <p>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</p>
              <p>Temp: ${Math.round(data.list[i].main.temp)}°C</p>
            </div>
          `;
        }
        document.getElementById("forecast").innerHTML = forecastHTML;
      });
  
    // ----------------------------
    // 3. Spotlight Members (Gold/Silver Members)
    // ----------------------------
    fetch("data/members.json")
      .then((response) => response.json())
      .then((members) => {
        const spotlightContainer = document.getElementById("spotlight-container");
        const spotlightMembers = members.filter(
          (member) => member.membershipLevel === 2 || member.membershipLevel === 3
        );
        spotlightMembers.sort(() => Math.random() - 0.5);
  
        spotlightMembers.slice(0, 3).forEach((member) => {
          const memberCard = document.createElement("div");
          memberCard.classList.add("member-card");
          memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Membership Level: ${member.membershipLevel === 2 ? "Silver" : "Gold"}</p>
          `;
          spotlightContainer.appendChild(memberCard);
        });
      });
  
    // ----------------------------
    // 4. Directory View Toggle (List/Grid)
    // ----------------------------
    const memberContainer = document.getElementById("memberContainer");
    const toggleViewButton = document.getElementById("toggleView");
  
    if (memberContainer && toggleViewButton) {
      fetch("data/members.json")
        .then((response) => response.json())
        .then((members) => {
          renderMembers(members, "list-view");
  
          // Toggle view event listener
          toggleViewButton.addEventListener("click", () => {
            const currentView = memberContainer.classList.contains("list-view")
              ? "list-view"
              : "grid-view";
            const newView = currentView === "list-view" ? "grid-view" : "list-view";
            memberContainer.classList.remove(currentView);
            memberContainer.classList.add(newView);
            renderMembers(members, newView);
          });
        });
  
      // Function to render members
      function renderMembers(members, view) {
        memberContainer.innerHTML = "";
        members.forEach((member) => {
          const card = document.createElement("div");
          card.className = `member-card ${view}`;
          card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" class="logo">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
          `;
          memberContainer.appendChild(card);
        });
      }
    }
  
    // ----------------------------
    // 5. Form Timestamp and Footer Date
    // ----------------------------
    // Set timestamp value for the form
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
      timestampField.value = new Date().toISOString();
    }
  
    // Set dynamic footer date
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
  
    // ----------------------------
    // 6. Modal Close Functionality
    // ----------------------------
    document.querySelectorAll(".close-modal").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".modal").style.display = "none";
      });
    });
  
    // ----------------------------
    // 7. Thank You Page: Display Submitted Data
    // ----------------------------
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString()) {
      document.getElementById("display-first-name").textContent =
        urlParams.get("first-name");
      document.getElementById("display-last-name").textContent =
        urlParams.get("last-name");
      document.getElementById("display-email").textContent =
        urlParams.get("email");
      document.getElementById("display-phone").textContent =
        urlParams.get("phone");
      document.getElementById("display-business-name").textContent =
        urlParams.get("business-name");
      document.getElementById("display-timestamp").textContent =
        urlParams.get("timestamp");
    }
  
    // ----------------------------
    // 8. Discover Page: Last Visit Message and Dynamic Cards
    // ----------------------------
    const lastVisitMessage = document.getElementById("last-visit-message");
    if (lastVisitMessage) {
      const lastVisit = localStorage.getItem("lastVisit");
      const currentDate = Date.now();
  
      if (!lastVisit) {
        lastVisitMessage.textContent = "Welcome! Let us know if you have any questions.";
      } else {
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
          lastVisitMessage.textContent = "Back so soon! Awesome!";
        } else {
          lastVisitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
        }
      }
  
      localStorage.setItem("lastVisit", currentDate);
    }
  
    const cardsContainer = document.querySelector(".cards-container");
    if (cardsContainer) {
  
      const items = [
        {
          title: "Table Mountain",
          address: "Long St, Capetown",
          description: "Famous for its beautiful views.",
          image: "images/Table-Mountain.jpg"
        },
          {
            "title": "Penguins",
            "address": "Main Road, Capetown",
            "description": "Birds or mammals found on the beach in Capetown.",
            "image": "images/penguins.jpg"
          },
          {
            "title": "Table Mountain Front View",
            "address": "Long Street, Capetown",
            "description": "Beautiful view of the iconic table mountain.",
            "image": "images/Table-Mountain.jpg"
          },
          {
            "title": "Habour House",
            "address": "Main Road, Capetown",
            "description": "Best delicious food made at the Fastfood Grill restuarent.",
            "image": "images/delicious-food.jpg"
          },
          {
            "title": "Sea Point",
            "address": "Main Road, Capetown",
            "description": "Beautiful surbubs surrounding iconic table mountain.",
            "image": "images/table-mountain.jpeg"
          },
          {
            "title": "Cliffton",
            "address": "CLiffton beach, Capetown",
            "description": "One of the beaches in Capetown, South Africa.",
            "image": "images/beach.jpeg"
          },
          {
            "title": "Tour Bus",
            "address": "City Centre, Capetown",
            "description": "Luxurious bus used to transport tourists.",
            "image": "images/tour-bus.jpeg"
          },
          {
            "title": "Fastfoods Dinner",
            "address": "St James, Capetown",
            "description": "Restaurants are found in many places in Capetown.",
            "image": "images/dinner.jpeg"
          }
      ];
  
      function createCard(item) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure>
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        return card;
      }
  
      items.forEach(item => {
        const card = createCard(item);
        cardsContainer.appendChild(card);
      });
    }
  });