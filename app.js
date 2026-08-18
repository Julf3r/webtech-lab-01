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
    }
];

const projectList = document.querySelector("#project-list");
console.log(projectList);

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
}

renderProjects(projects);