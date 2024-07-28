"use strict"
import './style.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import todoItems from './todo-items';
import todoProjects from './todo-projects';
import DOM from './DOM';

const Items = new todoItems();
const Project = new todoProjects();
const DOMHandle = new DOM();

function connectDOMAddProjects() {
    const projectBtn = document.querySelector(".add-project");
    const dialog = document.querySelector("[add-project]");
    const confirmAdd = document.querySelector("#add-project");
    const cancelAdd = document.querySelector("#cancel-project");
    const projectTxt = document.querySelector("#project-name");
    projectBtn.addEventListener("click", () => {
        dialog.showModal();
    })
    confirmAdd.addEventListener("click", (e) => {
        if(projectTxt.value) {
            if(Project.addProject(projectTxt.value)) {
                DOMHandle.createProject(projectTxt.value);
                localStorage.setItem("myProjects", JSON.stringify(Project.projects)); // add to storage
                projectTxt.value = "";
                dialog.close();
            }
        }
    })
    cancelAdd.addEventListener("click", () => {
        projectTxt.value = "";
        dialog.close();
    })
}

function connectDOMAddItems() {
    const itemBtn = document.querySelector(".add-item");
    const dialog = document.querySelector("[add-item]");
    const confirmAdd = document.querySelector("#add-item");
    const cancelAdd = document.querySelector("#cancel-item");
    const titleTxt = document.querySelector("#item-title");
    const descriptionTxt = document.querySelector("#item-description");
    const dateTxt = document.querySelector("#item-date");
    const priorityTxt = document.querySelector("#item-priority");
    const projectTxt = document.querySelector("#item-project");
    itemBtn.addEventListener("click", () => {
        dialog.showModal();
    })
    confirmAdd.addEventListener("click", (e) => {
        if(titleTxt.value && descriptionTxt.value && projectTxt.value) {
            if(Items.addItem(titleTxt.value, descriptionTxt.value, dateTxt.value, priorityTxt.value)) {
                if(Project.insertItem(projectTxt.value, Items.getItem(titleTxt.value))) {
                    localStorage.setItem("myProjects", JSON.stringify(Project.projects)); // add items to project storage
                    DOMHandle.appendItem(Items.getItem(titleTxt.value), projectTxt.value);
                    titleTxt.value = "";
                    descriptionTxt.value = "";
                    projectTxt.value = "";
                    DOMHandle.crossItemListener();
                    dialog.close();
                }
                else {
                    Items.removeItem(titleTxt.value);
                }
            }
            localStorage.setItem("myItems", JSON.stringify(Items.items)); // add to storage
        }
    })
    cancelAdd.addEventListener("click", () => {
        titleTxt.value = "";
        descriptionTxt.value = "";
        projectTxt.value = "";
        dialog.close();
    })
}

function connectDOMDelProjects() {
    const delBtn = document.querySelector(".sidebar");
    delBtn.addEventListener("click", (e) => {
        if(e.target.closest(".delBtn") != null) {
            if(e.target.closest(".delBtn").classList.value == "delBtn") {
                let projectName = e.target.closest(".delBtn").dataset.value.split('-')[0];
                let project = Project.getProject(projectName);
                let itemNames = [];
                for(let i = 0; i < project.items.length; i++) {
                    itemNames.push(project.items[i].title);
                }
                Items.removeItems(itemNames);
                Project.removeProject(projectName);
                localStorage.setItem("myProjects", JSON.stringify(Project.projects)); // remove from storage
                DOMHandle.removeProject(projectName);
            }
        }
    })
}

function connectDOMDelItems() {
    const delBtn = document.querySelector(".sidebar");
    delBtn.addEventListener("click", (e) => {
        if(e.target.closest(".delBtnItem") != null) {
            if(e.target.closest(".delBtnItem").classList[0] == "delBtnItem") {
                let itemName = e.target.closest(".delBtnItem").dataset.value.split('-')[0];
                let projectName = e.target.closest(".delBtnItem").classList[1].split('-')[0];
                Project.removeItem(projectName, itemName);
                DOMHandle.removeItem(Items.getItem(itemName), projectName);
                Items.removeItem(itemName);
                localStorage.setItem("myItems", JSON.stringify(Items.items)); // remove from storage
                localStorage.setItem("myProjects", JSON.stringify(Project.projects));
            }
        }
    })
}

function startWeb() {
    if(!localStorage.getItem("myProjects")) {
        Project.addProject("Default");
        DOMHandle.createProject("Default");
    }
    else {
        let myProjects = JSON.parse(localStorage.getItem("myProjects"));
        let myItems = JSON.parse(localStorage.getItem("myItems"));
        DOMHandle.restoreStorage(myProjects);
        Project.projects = myProjects;
        Items.items = myItems;
    }

    connectDOMAddProjects();
    connectDOMAddItems();
    connectDOMDelProjects();
    connectDOMDelItems();
}

startWeb();