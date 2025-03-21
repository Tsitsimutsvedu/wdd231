// Course Data
const courses = [
    { code: 'CSE 110', name: 'Programming Building Blocks', credits: 3, completed: true },
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 3, completed: true },
    { code: 'CSE 111', name: 'Programming with Functions', credits: 3, completed: false },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 3, completed: false },
    { code: 'CSE 210', name: 'Programming with Classes', credits: 3, completed: true },
    { code: 'WDD 231', name: 'Frontend Development', credits: 3, completed: false }
];

// Display Courses
function displayCourses(filter = 'all') {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';

    const filteredCourses = filter === 'all' ? courses : courses.filter(course => course.code.startsWith(filter.toUpperCase()));

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.classList.add(course.completed ? 'completed' : 'incomplete');
        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
        `;
        courseList.appendChild(card);
    });

    // Update Total Credits
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    const creditDisplay = document.createElement('p');
    creditDisplay.textContent = `Total Credits: ${totalCredits}`;
    courseList.appendChild(creditDisplay);
}

// Filter Buttons
document.getElementById('all').addEventListener('click', () => displayCourses('all'));
document.getElementById('cse').addEventListener('click', () => displayCourses('cse'));
document.getElementById('wdd').addEventListener('click', () => displayCourses('wdd'));

// Initial Load
displayCourses();