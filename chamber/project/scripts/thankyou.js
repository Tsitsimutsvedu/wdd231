const homeButton = document.querySelector(".return-to-home");

//when homeButton is pressed, go to index.html
homeButton.addEventListener("click", function() {
    window.location.href = "index.html";
});


//populate submission details
const url = window.location.href;
const formSection = document.querySelector('#form-section');

let dataObj = {};

//Divide url for content by splitting in half and keeping after the "?"
const urlContent = decodeURIComponent(url.split("?")[1]);

//Split urlContent by "&" to get all the form data into a list
var urlContentList = urlContent.split("&");

//foreach function that takes a list as a parameter, splits each item in the list by the =, and makes an object where the first half of the split is the key and the second half is the value
urlContentList.forEach(function(data){
    //split data and place in dataObj
    var splitItem = data.split("=");
    dataObj[splitItem[0]] = splitItem[1].replace(/\+/g, ' ');

    //use replace method to replace + symbols with spaces. already replaced other special characters like @ with the decodeURIComponent method.
    console.log(splitItem[1]);
});

console.log(dataObj);

//create and append data to DOM
let cName = document.createElement("h3");
let description = document.createElement("p");
let partyLevel = document.createElement("p");
let partySize = document.createElement("p");
let adventures = document.createElement("p");

cName.innerHTML = `${dataObj['campaignName']}`;
description.innerHTML = `${dataObj['description']}`;
partyLevel.innerHTML = `Party Level: ${dataObj['partyLevel']}`;
partySize.innerHTML = `Party Size: ${dataObj['partySize']}`;
adventures.innerHTML = `Adventure Acount: ${dataObj['adventureCount']}`

formSection.appendChild(cName);
formSection.appendChild(description);
formSection.appendChild(partyLevel);
formSection.appendChild(partySize);
formSection.appendChild(adventures);



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