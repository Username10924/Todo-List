class DOM {
    constructor() {}

appendItem = function(item, projectName) {
    //Append to sidebar project
    const ul = document.querySelector(`[data-value='${projectName}-ul']`);
    const itemContainer = document.createElement("div");
    itemContainer.classList.toggle("item");
    ul.appendChild(itemContainer);
    const priority = document.createElement("div");
    priority.textContent = "𝌠";
    priority.classList.toggle(item.priority);
    itemContainer.appendChild(priority);
    itemContainer.dataset.value = `${item.title}-sidebar`; //identifier
    const li = document.createElement("li");
    li.textContent = item.title;
    itemContainer.appendChild(li);
    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
    delBtn.dataset.value = `${item.title}-btn`;
    delBtn.classList.add("delBtnItem");
    delBtn.classList.add(`${projectName}-delBtnProject`);
    itemContainer.appendChild(delBtn); //This will be used to identify individual buttons from DOM

    //Append to content project (Main page)
    const projectList = document.querySelector(`[data-value='${projectName}-container']`);
    const projectListItem = document.createElement("div");
    projectListItem.classList.toggle("project-list-item");
    projectListItem.dataset.value = `${item.title}-content`; //identifier
    projectList.appendChild(projectListItem);
    const hr = document.createElement("hr");
    hr.dataset.value = `${item.title}-hr`;
    projectList.appendChild(hr);
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.id = item.title;
    todoCheckbox.name = item.title
    todoCheckbox.classList.toggle("checkbox");
    projectListItem.appendChild(todoCheckbox);
    const listInfo = document.createElement("div");
    listInfo.classList.toggle("list-info");
    const itemLabel = document.createElement("label");
    const infoLabel = document.createElement("label");
    itemLabel.setAttribute("for", item.title);
    infoLabel.setAttribute("for", item.title);
    itemLabel.textContent = item.title;
    infoLabel.textContent = item.dueDate + ", " + item.description;
    projectListItem.appendChild(listInfo);
    listInfo.appendChild(itemLabel);
    listInfo.appendChild(infoLabel);
}

removeItem = function(item, projectName) {
    //Remove from sidebar
    const itemContainer = document.querySelector(`[data-value='${item.title}-sidebar']`);
    const ul = document.querySelector(`[data-value='${projectName}-ul']`);
    ul.removeChild(itemContainer);

    //Remove from content (Main page)
    const projectList = document.querySelector(`[data-value='${projectName}-container']`);
    const projectListItem = document.querySelector(`[data-value='${item.title}-content']`);
    projectList.removeChild(projectListItem);
    const hr = document.querySelector(`[data-value='${item.title}-hr']`);
    projectList.removeChild(hr);
}

createProject = function(name) {
    //Append to sidebar
    const sideBar = document.querySelector(".sidebar");
    const project = document.createElement("div");
    project.classList.toggle("project");
    const projectHeader = document.createElement("div");
    projectHeader.classList.toggle("project-header");
    const projectName = document.createElement("h3");
    projectName.textContent = name;
    projectHeader.appendChild(projectName);
    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
    delBtn.dataset.value = `${name}-title-btn`;
    delBtn.classList.add("delBtn");
    projectHeader.appendChild(delBtn); //This will be used to identify individual buttons from DOM
    project.appendChild(projectHeader);
    project.dataset.value = name; // This will be used to identify individual projects from DOM
    const ul = document.createElement("ul");
    ul.dataset.value = `${name}-ul`; // Append todo items here
    project.appendChild(ul);
    sideBar.appendChild(project);

    //Append content (Main page)
    const content = document.querySelector(".content");
    const projectList = document.createElement("div");
    projectList.classList.toggle("project-list");
    projectList.dataset.value = `${name}-container`;
    const projectListTitleContainer = document.createElement("div");
    projectListTitleContainer.classList.toggle("project-list-title");
    const projectListTitle = document.createElement("h3");
    projectListTitle.textContent = name;
    const hr = document.createElement("hr");
    content.appendChild(projectList);
    projectList.appendChild(projectListTitleContainer);
    projectListTitleContainer.appendChild(projectListTitle);
    projectList.appendChild(hr);
}

restoreStorage = function(projects) {
    for(let i = 0; i < projects.length; i++) {
        this.createProject(projects[i].name);
        for(let j = 0; j < projects[i].items.length; j++) {
            this.appendItem(projects[i].items[j], projects[i].name)
            this.crossItemListener();
        }
    }
}

removeProject = function(name) {
    //Remove from sidebar
    const sideBar = document.querySelector(".sidebar");
    const project = document.querySelector(`[data-value='${name}']`);
    sideBar.removeChild(project);

    //Remove from content (Main page)
    const content = document.querySelector(".content");
    const projectList = document.querySelector(`[data-value='${name}-container']`);
    content.removeChild(projectList);
}

crossItemSwitch = function(target) {
    const label = document.querySelectorAll(`label[for='${target.id}']`);
    if(target.checked) {
        label[0].style.textDecoration = "line-through";
        label[1].style.textDecoration = "line-through";
        return "crossed";
    }
    else {
        label[0].style.textDecoration = "";
        label[1].style.textDecoration = "";
        return "uncrossed";
    }
}

// Needs to be called after every item added
crossItemListener = function() {
    let inputHandle = document.querySelectorAll("[type='checkbox']");
    inputHandle = Array.from(inputHandle);
    for(let i = 0; i < inputHandle.length; i++) {
        inputHandle[i].addEventListener("click", (e) => {
            this.crossItemSwitch(e.target);
        })
    }
}

// add event listner methods for [additem, addproject][removeitem, removeproject] in index.js since data will be handled in event listeners
}

export default DOM;