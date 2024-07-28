"use strict"


class todoProjects {
    constructor() {
        this.projects = [];
    }

    checkProject = function(name) {
        for(let i = 0; i < this.projects.length; i++)
            if(this.projects[i].name.toLowerCase() == name.toLowerCase())
                return i;
        return -1;
    }

    getProject = function(name) {
        return this.projects[this.checkProject(name)];
    }

    checkProjectItem = function(project, item) {
        let n = this.checkProject(project);
        if(n != -1)
            for(let i = 0; i < this.projects[n].items.length; i++)
                if(this.projects[n].items[i].title.toLowerCase() == item.title.toLowerCase()) // 
                    return i;
        return -1;
    }

    addProject = function(name) {
        // project name needs to be unique
        if(this.checkProject(name) != -1)
            return false;
        
        this.projects.push({name: name, items: []}); // test?
        return true;
    }

    removeProject = function(project) {
        const i = this.checkProject(project);

        if(i != -1) {
            this.projects.splice(i, 1);
            return true;
        }

        return false;
    }

    insertItem = function(project, item) {
        if(this.checkProject(project) != -1 && this.checkProjectItem(project, item) == -1) {
            this.projects[this.checkProject(project)].items.push(item);
            return true;
        }
        return false;
    }

    removeItem = function(projectName, itemName) {
        let project = this.projects[this.checkProject(projectName)];
        for(let i = 0; i < project.items.length; i++) {
            if(project.items[i].title.toLowerCase() == itemName)
                project.items.splice(i, 1);
        }
    }
}

export default todoProjects;