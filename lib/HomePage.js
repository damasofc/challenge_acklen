var BasePage = require("./BasePage");
const {Builder, By, Key, until} = require('selenium-webdriver');
var faker = require('faker');

class HomePage extends BasePage{

    constructor(){
        super();
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
        await this.clearElement(By.name('StartingDate'));
        await this.write(By.name('StartingDate'),`${m}/${d}/${y}`);
    }
    async setLeaveDay(d,m,y){
        await this.clearElement(By.name('LeavingDate'));
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
        await this.clearElement(By.name('StartingTime'));
        await this.write(By.name('StartingTime'),`${h}:${m}`);
    }
    async setLeaveTime(h,m){
        await this.clearElement(By.name('LeavingTime'));
        await this.write(By.name('LeavingTime'),`${h}:${m}`);
    }

    async clickCalculate(){
        await this.find(By.name('Submit')).then(async (r) => {
            await r.click();
        })
    }

    async getParkingCost(){
        var price = await this.find(By.css('span.SubHead>b'));
        var str = await price.getAttribute('innerText');
        return parseInt(str.substring(1));
    }

    async getDuration(){
        var price = await this.find(By.css('span.BodyCopy>b'));
        var str = await price.getAttribute('innerText');
        var arrStr = str.substring(9).split(' ');
        return ({
            days: parseInt(arrStr[0]),
            hours: parseInt(arrStr[2]),
            minutes: parseInt(arrStr[4])
        });
    }

}

module.exports = HomePage;