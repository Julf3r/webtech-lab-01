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

const API_BASE = "http://localhost:3000/api/v1";

function formatPrice(price) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(Number(price));
}

async function fetchApi(path) {
  const response = await fetch(`${API_BASE}${path}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error((data.errors || ["Request failed"]).join(", "));
  }

  return data;
}

async function loadServices() {
  const status = document.querySelector("#services-status");
  const list = document.querySelector("#services-list");

  status.textContent = "Loading services...";
  list.replaceChildren();

  try {
    const services = await fetchApi("/services");

    for (const service of services) {
      const item = document.createElement("li");
      item.textContent = `${service.name} — ${formatPrice(service.price)}`;
      list.appendChild(item);
    }

    status.textContent = services.length ? "" : "No services available.";
  } catch (error) {
    status.textContent = `Could not load services: ${error.message}`;
  }
}

async function searchService(event) {
  event.preventDefault();

  const id = document.querySelector("#service-id").value;
  const result = document.querySelector("#service-result");

  result.textContent = "Searching...";

  try {
    const service = await fetchApi(`/services/${id}`);

    result.textContent =
      `${service.name} — ${formatPrice(service.price)} — ` +
      `Charged on ${service.charged_repairs_count} repairs`;
  } catch (error) {
    result.textContent = error.message;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadServices();
  document.querySelector("#service-search")
    .addEventListener("submit", searchService);
});