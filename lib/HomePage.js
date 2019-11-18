var BasePage = require("./BasePage");
const {Builder, By, Key, until} = require('selenium-webdriver');
var faker = require('faker');

class HomePage extends BasePage{

    constructor(){
        super();
    }

    async hasTextElements(){
        var elems = await this.findAll(By.tagName('p'));
        return elems.length;
    }

}

module.exports = HomePage;