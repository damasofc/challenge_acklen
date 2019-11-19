const {Builder, By, Key, until} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');

var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var HomePage = require('../lib/HomePage');


describe('Parking Cost Calculator Tests', () => {
        let page;
        before( async () => {
          page = await new HomePage();
          await page.visit('http://www.shino.de/parkcalc/');
          
        });
      
        after( async () => {
          await page.quit();
        });

        it('Selected Element', async () => {
          await page.selectParkingLot('Economy');
          var res = await page.getSelectedParkingLot();
          await page.setInitDay(17,11,2019);
          await page.setLeaveDay(17,11,2019);
          await page.setStartTime(18,30);
          await page.setLeaveTime(22,30);
          await page.clickCalculate();
          console.log(await page.getParkingCost());


      });
      
  })

