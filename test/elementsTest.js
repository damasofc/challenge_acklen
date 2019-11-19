const {Builder, By, Key, until} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var HomePage = require('../lib/HomePage');

describe('Elements Tests', () => {
        let page;
        before( async () => {
          page = await new HomePage();
          await page.visit('http://www.shino.de/parkcalc/');
          
        });
      
        after( async () => {
          await page.quit();
        });

        it('After Calculate click, doesn\'t change entered values', async () => {
            let parkingType = 'Short';
            let initDay = {d: 17, m: 11, y: 2019};
            let leaveDay = {d: 19, m: 11, y: 2019};
            let startAndEndTime = {h:15, m:30};
            await page.selectParkingLot(parkingType);
            await page.setInitDay(initDay.d,initDay.m,initDay.y);
            await page.setLeaveDay(leaveDay.d,leaveDay.m,leaveDay.y);
            await page.setStartTime(startAndEndTime.h,startAndEndTime.m);
            await page.setLeaveTime(startAndEndTime.h,startAndEndTime.m);
            await page.clickCalculate();
            
            let selParking = await page.getSelectedParkingLot();
            let selInitDay = await page.getSelectedInitDay();
            let selLeaveDay = await page.getSelectedLeaveDay();
            let selStartTime = await page.getStartTime();

            selInitDay.should.equal(`${initDay.m}/${initDay.d}/${initDay.y}`);
            selLeaveDay.should.equal(`${leaveDay.m}/${leaveDay.d}/${leaveDay.y}`);
            selParking.should.equal(parkingType);
            startAndEndTime.should.equal(`${startAndEndTime.h}:${startAndEndTime.m}`);

      });

      it('Dates Input accepts only numbers or \'/\' ', async () => {
        let dayInit = {d: 17, m: 'once', y: 2019};
        let startAndEndTime = {h:15, m:30};
        await page.setInitDay(dayInit.d,dayInit.m,dayInit.y);
        await page.setLeaveDay(dayInit.d,dayInit.m,dayInit.y);
        await page.setStartTime(startAndEndTime.h,startAndEndTime.m);
        await page.setLeaveTime(startAndEndTime.h,startAndEndTime.m);
        await page.clickCalculate();
        
        let selInitDay = await page.getSelectedInitDay();
        let selLeaveDay = await page.getSelectedLeaveDay();

        const regexEval = new RegExp("^([0-9]|\/)+$");
        expect(regexEval.test(selInitDay)).to.be.true;

  });
      
})

