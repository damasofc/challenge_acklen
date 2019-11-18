const {Builder, By, Key, until} = require('selenium-webdriver');

class BasePage {

    constructor(){
        this.driver = new Builder().forBrowser('chrome').build()
    }
    

    async visit(url){ return await this.driver.get(url); }

    async quit(){ return await this.driver.quit(); }

    async find(elem){
        await this.driver.wait(until.elementLocated(elem),5000);
        return await this.driver.findElement(elem);
    }

    async findAll(elem){
        await this.driver.wait(until.elementLocated(elem,5000));
        return await this.driver.findElements(elem);
    }

    async write(elem, txt){
        return await this.driver.findElement(elem).sendKeys(txt);
    }
}


module.exports = BasePage;