const {Builder, By, Key, until} = require('selenium-webdriver');

var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
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

        it('After Click Calculate, values entered shouldn\'t change', async () => {
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
            selParking.should.equal(parkingType,"The Parking type changed");
            startAndEndTime.should.equal(`${startAndEndTime.h}:${startAndEndTime.m}`);

      });

      it('Dates Input should accepts only numbers or \'/\' ', async () => {
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
        expect(regexEval.test(selInitDay),"Date accepts different than numbers or / ").to.be.true;

      });

      it('Dates Input should accepts only valids Days and Month', async () => {
        let dayInit = {d: 55, m: 20, y: 2019};
        let startAndEndTime = {h:15, m:30};
        await page.setInitDay(dayInit.d,dayInit.m,dayInit.y);
        await page.setLeaveDay(dayInit.d,dayInit.m,dayInit.y);
        await page.setStartTime(startAndEndTime.h,startAndEndTime.m);
        await page.setLeaveTime(startAndEndTime.h,startAndEndTime.m);
        await page.clickCalculate();
        
        let selInitDay = await page.getSelectedInitDay();
        let arrDate = selInitDay.split('/');

        if (await page.getParkingCost()) {
          assert(parseInt(arrDate[0]) > 0 && parseInt(arrDate[0]) <= 12,"Month has to be a value between 1 and 12");
          assert(parseInt(arrDate[1]) > 0 && parseInt(arrDate[1]) <= 31,"Day has to be a value between 1 and 31");
        }

      });

      it('Hour Input should accepts only numbers or \':\' ', async () => {
        let dayInit = {d: 17, m: 11, y: 2019};
        let startAndEndTime = {h:15, m:'30A'};
        await page.setInitDay(dayInit.d,dayInit.m,dayInit.y);
        await page.setLeaveDay(dayInit.d,dayInit.m,dayInit.y);
        await page.setStartTime(startAndEndTime.h,startAndEndTime.m);
        await page.setLeaveTime(startAndEndTime.h,startAndEndTime.m);
        await page.clickCalculate();
        
        let selStartTime = await page.getStartTime();

        const regexEval = new RegExp("^([0-9]|:)+$");
        expect(regexEval.test(selStartTime),"Hour accepts different than numbers or ':' ").to.be.true;

      });

      it('Hour Input should accepts only valids hours and minutes', async () => {
        let dayInit = {d: 55, m: 20, y: 2019};
        let startAndEndTime = {h:50, m:96};
        await page.setInitDay(dayInit.d,dayInit.m,dayInit.y);
        await page.setLeaveDay(dayInit.d,dayInit.m,dayInit.y);
        await page.setStartTime(startAndEndTime.h,startAndEndTime.m);
        await page.setLeaveTime(startAndEndTime.h,startAndEndTime.m);
        await page.clickCalculate();
        
        let selStartTime = await page.getStartTime();
        let arrhour = selStartTime.split(':');

        if (await page.getParkingCost()) {
          assert(parseInt(arrhour[0]) > 0 && parseInt(arrhour[0]) <= 24,"hour has to be a value between 1 and 24");
          assert(parseInt(arrhour[1]) > 0 && parseInt(arrhour[1]) <= 60,"Minute has to be a value between 1 and 60");
        }

      });

        it('Setting a leaving date or hour before the starting date should show an error', async () => {
          let dayInit = {d: 17, m: 11, y: 2019};
          let startAndEndTime = {h:15, m:30};
          await page.setInitDay(dayInit.d,dayInit.m,dayInit.y);
          await page.setLeaveDay(dayInit.d - 1,dayInit.m,dayInit.y);
          await page.setStartTime(startAndEndTime.h,startAndEndTime.m);
          await page.setLeaveTime(startAndEndTime.h,startAndEndTime.m);
          await page.clickCalculate();

          await page.showError(r => { 
            expect(r,"Error: It doesn't shows the error (DATE)").to.be.true;
          });

          await page.setLeaveDay(dayInit.d,dayInit.m,dayInit.y);
          await page.setLeaveTime(startAndEndTime.h -1 ,startAndEndTime.m);
          await page.clickCalculate();
          await page.showError(r => {
            expect(r,"Error: It doesn't shows the error (HOUR)").to.be.true;
          });

        });
      


      
})

