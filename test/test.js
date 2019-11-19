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

        it('Valet Parking Rates', async () => {
          await page.selectParkingLot('Valet');
          await page.setInitDay(17,11,2019);
          await page.setLeaveDay(17,11,2019);
          await page.setStartTime(15,30);
          await page.setLeaveTime(20,30);
          await page.clickCalculate();
          let price = await page.getParkingCost()
          var timeElapsed = await page.getDuration();
          price.should.equal(12);
          timeElapsed.days.should.equal(0);
          timeElapsed.hours.should.equal(5);
          timeElapsed.minutes.should.equal(0);


          await page.setLeaveTime(20,31);
          await page.clickCalculate();
          price = await page.getParkingCost()
          timeElapsed = await page.getDuration();
          price.should.equal(18);
          timeElapsed.days.should.equal(0);
          timeElapsed.hours.should.equal(5);
          timeElapsed.minutes.should.equal(1);

          await page.setLeaveDay(18,11,2019);
          await page.clickCalculate();
          price = await page.getParkingCost();
          timeElapsed = await page.getDuration();
          price.should.equal(36);
          timeElapsed.days.should.equal(1);
          timeElapsed.hours.should.equal(5);
          timeElapsed.minutes.should.equal(1);


      });

      it('Short-Term Parking Rates', async () => {
        await page.selectParkingLot('Short');
        await page.setInitDay(17,11,2019);
        await page.setLeaveDay(17,11,2019);
        await page.setStartTime(15,30);
        await page.setLeaveTime(16,30);
        await page.clickCalculate();
        let price = await page.getParkingCost()
        var timeElapsed = await page.getDuration();
        price.should.equal(2);
        timeElapsed.days.should.equal(0);
        timeElapsed.hours.should.equal(1);
        timeElapsed.minutes.should.equal(0);


        await page.selectParkingLot('Short');
        await page.setLeaveTime(16,31);
        await page.clickCalculate();
        price = await page.getParkingCost()
        timeElapsed = await page.getDuration();
        price.should.equal(3);
        timeElapsed.days.should.equal(0);
        timeElapsed.hours.should.equal(1);
        timeElapsed.minutes.should.equal(1);

        await page.selectParkingLot('Short');
        await page.setLeaveDay(18,11,2019);
        await page.clickCalculate();
        price = await page.getParkingCost();
        timeElapsed = await page.getDuration();
        price.should.equal(27);
        timeElapsed.days.should.equal(1);
        timeElapsed.hours.should.equal(1);
        timeElapsed.minutes.should.equal(1);

        await page.selectParkingLot('Short');
        await page.setLeaveDay(18,11,2019);
        await page.setLeaveTime(17,01);
        await page.clickCalculate();
        price = await page.getParkingCost();
        timeElapsed = await page.getDuration();
        price.should.equal(28);
        timeElapsed.days.should.equal(1);
        timeElapsed.hours.should.equal(1);
        timeElapsed.minutes.should.equal(31);


    });
      
  })

