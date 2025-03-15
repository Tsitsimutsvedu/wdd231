// Embedded JSON Data
const members = [
    {
        "name": "Company A",
        "address": "123 Main St, City, Country",
        "phone": "+123 456 7890",
        "website": "https://companya.com",
        "image": "company-a.png",
        "membership": "Gold"
    },
    {
        "name": "Company B",
        "address": "456 Elm St, City, Country",
        "phone": "+123 456 7891",
        "website": "https://companyb.com",
        "image": "company-b.png",
        "membership": "Silver"
    },
    {
        "name": "Company C",
        "address": "789 Oak St, City, Country",
        "phone": "+123 456 7892",
        "website": "https://companyc.com",
        "image": "company-c.png",
        "membership": "Member"
    },
    {
        "name": "Company D",
        "address": "101 Pine St, City, Country",
        "phone": "+123 456 7893",
        "website": "https://companyd.com",
        "image": "company-d.png",
        "membership": "Gold"
    },
    {
        "name": "Company E",
        "address": "202 Maple St, City, Country",
        "phone": "+123 456 7894",
        "website": "https://companye.com",
        "image": "company-e.png",
        "membership": "Silver"
    },
    {
        "name": "Company F",
        "address": "303 Cedar St, City, Country",
        "phone": "+123 456 7895",
        "website": "https://companyf.com",
        "image": "company-f.png",
        "membership": "Member"
    },
    {
        "name": "Company G",
        "address": "404 Birch St, City, Country",
        "phone": "+123 456 7896",
        "website": "https://companyg.com",
        "image": "company-g.png",
        "membership": "Gold"
    }
];

// Display Members
function displayMembers(view = 'grid') {
    const directory = document.getElementById('member-directory');
    if (!directory) {
        console.error('Element with ID "member-directory" not found');
        return;
    }

    directory.innerHTML = '';
    directory.className = view === 'grid' ? '' : 'list-view';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${member.membership}</p>
        `;
        directory.appendChild(card);
    });
}

// Toggle View
document.getElementById('grid-view')?.addEventListener('click', () => {
    displayMembers('grid');
});

document.getElementById('list-view')?.addEventListener('click', () => {
    displayMembers('list');
});

// Initial Load
displayMembers();