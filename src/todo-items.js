"use strict"

import { format, formatDistance, formatRelative, subDays } from 'date-fns'
class todoItems {
    constructor() {
        this.items = {
            title: [],
            description: [],
            dueDate: [],
            priority: [],
        }
    }

    checkItem = function(title) {
        for(let i = 0; i < this.items.title.length; i++)
            if(this.items.title[i].toLowerCase() == title.toLowerCase())
                return i;
        return -1;
    }

    addItem = function(title, description, dueDate, priority) {
        // title needs to be unique
        if(this.checkItem(title) != -1)
            return false;
        
        this.items.title.push(title);
        this.items.description.push(description);
        this.items.dueDate.push(dueDate);
        this.items.priority.push(priority);
        return true;
    }

    removeItem = function(title) {
        const i = this.checkItem(title);

        if(i != -1) {
            this.items.title.splice(i, 1);
            this.items.description.splice(i, 1);
            this.items.dueDate.splice(i, 1);
            this.items.priority.splice(i, 1);
            return true;
        }

        return false;
    }

    removeItems = function(titles) {
        for(let i = 0; i < titles.length; i++)
            this.removeItem(titles[i]);
    }

    getItems = function() {
        return this.items;
    }

    getItem = function(name) {
        const n = this.checkItem(name);
        if(n != -1) {
            return {
                title: this.items.title[n],
                description: this.items.description[n],
                dueDate: this.items.dueDate[n],
                priority: this.items.priority[n]
            }
        }
        return undefined;
    }
}

export default todoItems;