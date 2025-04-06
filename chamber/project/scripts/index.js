const campaignsUrl = "./data/campaigns.json";
const campaignSection = document.getElementById('campaign-list-section');
const compactToggle = document.getElementById("compact-checkbox");

//extract campaign data from json
async function getcampaignData() {
    const response = await fetch(campaignsUrl);
    const campaigns = await response.json();
    return campaigns;


  }

  async function displayCompactCampaigns() {
    const campaigns = await getcampaignData();

    campaignSection.innerHTML = "";

    //key for compact view
    const nameHeader = document.createElement('h4');
    const averageStartPartyLevelHeader = document.createElement('h4');
    const averagePartySizeHeader = document.createElement('h4');
    const adventureCountHeader = document.createElement('h4');

    nameHeader.innerHTML = "Campaign Name";
    averageStartPartyLevelHeader.innerHTML = "Average Party Level";
    averagePartySizeHeader.innerHTML = "Average Party Size";
    adventureCountHeader.innerHTML = "Adventure Count";

    const campaignCardHeader = document.createElement('div');
    campaignCardHeader.classList.add('compact-campaign-card');

    campaignCardHeader.appendChild(nameHeader);
    campaignCardHeader.appendChild(averageStartPartyLevelHeader);
    campaignCardHeader.appendChild(averagePartySizeHeader);
    campaignCardHeader.appendChild(adventureCountHeader);

    campaignSection.appendChild(campaignCardHeader);

    campaigns.forEach(campaign => {
        //create and populate a DOM element for each variable
        const campaignCard = document.createElement('div');
        campaignCard.className = 'compact-campaign-card';

        const campaignNameElement = document.createElement('a');
        campaignNameElement.innerHTML = `<h3>${campaign.name}<\h3>`;
        campaignNameElement.href = campaign.filePath;
        campaignNameElement.className = 'campaign-name';
        campaignCard.appendChild(campaignNameElement);

        //create and populate <p> DOM elements for remaining three
        const averageStartPartyLevelElement = document.createElement('p');
        averageStartPartyLevelElement.innerHTML = campaign.averageStartPartyLevel;
        averageStartPartyLevelElement.className = 'campaign-stat';

        const averagePartySizeElement = document.createElement('p');
        averagePartySizeElement.innerHTML = campaign.averagePartySize;
        averagePartySizeElement.className = 'campaign-stat';

        const adventureCountElement = document.createElement('p');
        adventureCountElement.innerHTML = campaign.adventureCount;
        adventureCountElement.className = 'campaign-stat';

        //append each element for to campaignCard
        campaignCard.appendChild(campaignNameElement);
        campaignCard.appendChild(averageStartPartyLevelElement);
        campaignCard.appendChild(averagePartySizeElement);
        campaignCard.appendChild(adventureCountElement);


        //append the campaign section card to the #campaign-list section in main
        campaignSection.appendChild(campaignCard);
    });
}

async function displayFullCampaigns() {
    const campaigns = await getcampaignData();

    campaignSection.innerHTML = " ";

    campaigns.forEach(campaign => {
        //create and populate a DOM element for each variable
        const campaignCard = document.createElement('div');
        campaignCard.className = 'full-campaign-card';

        const campaignNameElement = document.createElement('a');
        campaignNameElement.innerHTML = `<h3>${campaign.name}<\h3>`;
        campaignNameElement.href = campaign.filePath;
        campaignNameElement.className = 'campaign-name';
        campaignCard.appendChild(campaignNameElement);

        const campaignDescriptionElement = document.createElement('p');
        campaignDescriptionElement.innerHTML = campaign.description;
        campaignDescriptionElement.className = 'campaign-description';
        campaignCard.appendChild(campaignDescriptionElement);

        const averageStartPartyLevelElement = document.createElement('p');
        averageStartPartyLevelElement.innerHTML = `Average Start Party Level: ${campaign.averageStartPartyLevel}`;
        campaignCard.appendChild(averageStartPartyLevelElement);
        
        const averagePartySizeElement = document.createElement('p');
        averagePartySizeElement.innerHTML = `Average Party Size: ${campaign.averagePartySize}`;
        campaignCard.appendChild(averagePartySizeElement);
        
        const adventureCountElement = document.createElement('p');
        adventureCountElement.innerHTML = `Number of Adventures: ${campaign.adventureCount}`;
        campaignCard.appendChild(adventureCountElement);
        //append the campaign section card to the #campaign-list section in main
        campaignSection.appendChild(campaignCard);
    });
}

function toggleSwitch() {
    if (document.getElementById("compact-checkbox").checked) {
        displayCompactCampaigns();
    } else {
        displayFullCampaigns();
    }
}

displayFullCampaigns();


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