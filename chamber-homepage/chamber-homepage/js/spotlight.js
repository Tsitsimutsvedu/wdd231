const members = [
    // Add your member data here (same as in members.json)
];

function displaySpotlights() {
    const spotlightDiv = document.getElementById('spotlight-cards');
    const goldSilverMembers = members.filter(member => member.membership === 'Gold' || member.membership === 'Silver');
    const selectedMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${member.membership}</p>
        `;
        spotlightDiv.appendChild(card);
    });
}

displaySpotlights();