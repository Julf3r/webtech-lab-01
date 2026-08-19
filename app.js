const projects = [
    {
        name: "Gravitational Simulation",
        language: "C++",
        category: "Systems"
    },
    {
        name: "Hitori",
        language: "JavaScript",
        category: "Web"
    },
    {
        name: "Peer Evaluation Tool",
        language: "Python",
        category: "Automation"
    },
    {
        name: "Personal Portfolio",
        language: "JavaScript",
        category: "Web"
    },
    {
        name: "Minigrep",
        language: "Rust",
        category: "CLI"
    },
    {
        name: "Text encryption",
        language: "C",
        category: "CLI"
    }
];

const projectList = document.querySelector("#project-list");
console.log(projectList); //debugging

function renderProjects(projectsToRender) {
    projectList.textContent = "";

    projectsToRender.forEach((project) => {
        const article = document.createElement("article");

        const title = document.createElement("h3");
        title.textContent = project.name;

        const language = document.createElement("p");
        language.textContent = "Language: " + project.language;

        const category = document.createElement("p");
        category.textContent = "Category: " + project.category;

        article.append(title, language, category);
        projectList.append(article);
    });

    if (projectsToRender.length === 0) {
        const article = document.createElement("article");
        const noProjectsItem = document.createElement("p");
        noProjectsItem.textContent = "No projects found";
        article.appendChild(noProjectsItem);
        projectList.appendChild(article);
    }
}

renderProjects(projects);

const projectFilter = document.querySelector("#project-filter");
const suggestionsList = document.querySelector("#suggestions");
const filterButton = document.querySelector("#filter-button");


projectFilter.addEventListener("input", (event) => {
    const filterValue = event.target.value.toLowerCase();
    
    suggestionsList.innerHTML = ""; // Clear previous suggestions

    if (filterValue === "") return; // Exit if the input is empty

    const matches = projects.filter((project) => {
        return project.name.toLowerCase().includes(filterValue) ||
               project.language.toLowerCase().includes(filterValue) ||
               project.category.toLowerCase().includes(filterValue);
    });

    if (matches.length === 0) {
        const noMatchItem = document.createElement("li");
        noMatchItem.textContent = "No matches found";
        suggestionsList.appendChild(noMatchItem);
        filterButton.disabled = true;
    }

    matches.forEach((match) => {
    const suggestionItem = document.createElement("li");
    suggestionItem.textContent = match.category + " - " + match.name + " (" + match.language + ")";

    suggestionItem.addEventListener("click", () => {
        projectFilter.value = match.name;
        suggestionsList.innerHTML = "";
    });

    suggestionsList.appendChild(suggestionItem);
    });
    filterButton.disabled = false;
    renderProjects(matches);
});

filterButton.addEventListener("click", () => {
    projectFilter.value = "";
    suggestionsList.innerHTML = "";
    renderProjects(projects);
    filterButton.disabled = true; // Disable the button after clicking
});

const states = ["light-theme", "dark-theme"];

const nextState = currentState => {
    const currentIndex = states.indexOf(currentState);
    return states[(currentIndex + 1) % states.length];
};

const body = document.querySelector("body");
const darkModeToggle = document.querySelector("#dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    const newState = nextState(body.dataset.theme);

    body.dataset.theme = newState;

    body.classList.remove(...states);
    body.classList.add(newState);
});

body.dataset.theme = "light-theme";
body.classList.add("light-theme");