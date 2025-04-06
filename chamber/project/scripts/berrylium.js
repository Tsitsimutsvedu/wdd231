const homeButton = document.querySelector(".return-to-home");

//when homeButton is pressed, go to index.html
homeButton.addEventListener("click", function() {
    window.location.href = "index.html";
});


//DND API fetch section and populating elements
const ironGolem = "monsters/iron-golem";
const ironGolemModal = document.getElementById("hover-iron-golem");

async function getAPIData(path) {
  const response = await fetch(`https://www.dnd5eapi.co/api/${path}`);
  const data = await response.json();
  return data;
}

async function createStatBlock(stats, element) {
  //create elements
  const Name = document.createElement('p');
  const Health = document.createElement('p');
  const ArmorClass = document.createElement('p');
  const Speed = document.createElement('p');
  const Str = document.createElement('p');
  const Dex = document.createElement('p');
  const Con = document.createElement('p');
  const Int = document.createElement('p');
  const Wis = document.createElement('p');
  const Cha = document.createElement('p');


  //populate elements
  Name.innerHTML = `${stats.name} Stats`;
  Health.innerHTML = `HP: ${stats.hit_points}`;
  ArmorClass.innerHTML = `Armor Class: ${stats.armor_class[0].value}`;
  Speed.innerHTML = `Speed: ${stats.speed.walk}`;
  Str.innerHTML = `Strength: ${stats.strength}`;
  Dex.innerHTML = `Dexterity: ${stats.dexterity}`;
  Con.innerHTML = `Constitution: ${stats.constitution}`;
  Int.innerHTML = `Intelligence: ${stats.intelligence}`;
  Wis.innerHTML = `Wisdom: ${stats.wisdom}`;
  Cha.innerHTML = `Charisma: ${stats.charisma}`;
  

  //append elements
  element.appendChild(Name);
  element.appendChild(Str);
  element.appendChild(Health);
  element.appendChild(Dex);
  element.appendChild(ArmorClass);
  element.appendChild(Con);
  element.appendChild(Speed);
  element.appendChild(Int);
  element.appendChild(Wis);
  element.appendChild(Cha);
  

}

getAPIData(ironGolem).then((ironGolemStats) => {
  console.log(ironGolemStats)
  createStatBlock(ironGolemStats, ironGolemModal);
})



//open dialog form
const dialogue = document.querySelector("#campaign-submission-dialog");

function openDialogue() {
    const button = document.querySelector("#campaign-form-button");
    
    if (button !== null && dialogue !== null) {
      button.addEventListener("click", () => {
        dialogue.showModal();
      });
    }
    else
    {
      console.error(`Error: ${button} or ${dialogue} element not found.`);
    }
}

openDialogue();

//close and submit dialog form

function closeDialogue() {
    const button = document.querySelector("#submit-campaign");
    
    if (button !== null && dialogue !== null) {
        button.addEventListener("click", () => {
          dialogue.close();
        });
      }
      else
      {
        console.error(`Error: ${buttonId} or ${dialogueId} element not found.`);
      }
}


//getDates
const cYearElement = document.getElementById("currentyear"); 
const lastModElement = document.getElementById("lastModified");

if (cYearElement) {
    const currentYear = new Date().getFullYear();
    cYearElement.textContent = currentYear;
}

if (lastModElement) {
    const modified = new Date(document.lastModified);
    lastModElement.textContent = "last modified: " + modified;
}