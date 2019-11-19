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

    async getSelectedParkingLot(){
        var elemSel = await this.find(By.name('ParkingLot'));
        return await elemSel.getAttribute('value');
    }

    async selectParkingLot(value){
        await this.find(By.css('select#ParkingLot>option[value=\"'+value+'\"]')).then(async (r) => {
            await r.click();
        })
    }
    async getSelectedInitDay(){
        var elemSel = await this.find(By.name('StartingDate'));
        return await elemSel.getAttribute('value');
    }

    async getSelectedLeaveDay(){
        var elemSel = await this.find(By.name('LeavingDate'));
        return await elemSel.getAttribute('value');
    }

    async setInitDay(d,m,y){
        await this.write(By.name('StartingDate'),`${m}/${d}/${y}`);
    }
    async setLeaveDay(d,m,y){
        await this.write(By.name('LeavingDate'),`${m}/${d}/${y}`);
    }
    async getStartTime(){
        var elemSel = await this.find(By.name('StartingTime'));
        return await elemSel.getAttribute('value');
    }
    async getLeaveTime(){
        var elemSel = await this.find(By.name('LeavingTime'));
        return await elemSel.getAttribute('value');
    }

    async setStartTime(h,m){
        await this.write(By.name('StartingTime'),`${h}:${m}`);
    }
    async setLeaveTime(h,m){
        await this.write(By.name('LeavingTime'),`${h}:${m}`);
    }

    async clickCalculate(){
        await this.find(By.name('Submit')).then(async (r) => {
            await r.click();
        })
    }

}

module.exports = HomePage;