const {Builder, By, Key, until} = require('selenium-webdriver');

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var HomePage = require('../lib/HomePage');

function elapsed(d,h,m){
  return ({
    days: d,
    hours: h,
    minutes: m
  });
}

//function evaluate if the cost is 0 when inserting the same date and hour in entry and leaving
async function checkCost(type,page){
  await page.selectParkingLot(type);
  await page.clickCalculate();      
  let cost = await page.getParkingCost();
  cost.should.be.equal(0,`${type}Entering the same date and hour for the entry and leaving generate a cost`);
}

describe('Parking Cost and Time Elapsed Tests', () => {
        let page;
        before( async () => {
          page = await new HomePage();
          await page.visit('http://www.shino.de/parkcalc/');
          
        });
      
        after( async () => {
          await page.quit();
        });

        it('Input the same Entry and Leaving date and same entry and leaving hour, should print 0 cost ', async () => {
          let dayInit = {d: 55, m: 20, y: 2019};
          let startAndEndTime = {h:50, m:96};
          await page.setInitDay(dayInit.d,dayInit.m,dayInit.y);
          await page.setLeaveDay(dayInit.d,dayInit.m,dayInit.y);
          await page.setStartTime(startAndEndTime.h,startAndEndTime.m);
          await page.setLeaveTime(startAndEndTime.h,startAndEndTime.m);
          
          await checkCost('Valet',page);
          await checkCost('Long-Garage',page);
          await checkCost('Long-Surface',page);
          await checkCost('Economy',page);
          await checkCost('Short',page);
  
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
          expect(timeElapsed).to.eql(elapsed(0,5,0))


          await page.setLeaveTime(20,31);
          await page.clickCalculate();
          price = await page.getParkingCost()
          timeElapsed = await page.getDuration();
          price.should.equal(18);
          expect(timeElapsed).to.eql(elapsed(0,5,1))

          await page.setLeaveDay(18,11,2019);
          await page.clickCalculate();
          price = await page.getParkingCost();
          timeElapsed = await page.getDuration();
          price.should.equal(36);
          expect(timeElapsed).to.eql(elapsed(1,5,1))


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
        expect(timeElapsed).to.eql(elapsed(0,1,0))


        await page.selectParkingLot('Short');
        await page.setLeaveTime(16,31);
        await page.clickCalculate();
        price = await page.getParkingCost()
        timeElapsed = await page.getDuration();
        price.should.equal(3);
        expect(timeElapsed).to.eql(elapsed(0,1,1))

        await page.selectParkingLot('Short');
        await page.setLeaveDay(18,11,2019);
        await page.clickCalculate();
        price = await page.getParkingCost();
        timeElapsed = await page.getDuration();
        price.should.equal(27);
        expect(timeElapsed).to.eql(elapsed(1,1,1))

        await page.selectParkingLot('Short');
        await page.setLeaveDay(18,11,2019);
        await page.setLeaveTime(17,01);
        await page.clickCalculate();
        price = await page.getParkingCost();
        timeElapsed = await page.getDuration();
        price.should.equal(28);
        expect(timeElapsed).to.eql(elapsed(1,1,31))
    });

    it('Economy Lot Parking Rates', async () => {
      await page.selectParkingLot('Economy');
      await page.setInitDay(17,11,2019);
      await page.setLeaveDay(17,11,2019);
      await page.setStartTime(15,30);
      await page.setLeaveTime(16,00);
      await page.clickCalculate();
      let price = await page.getParkingCost()
      var timeElapsed = await page.getDuration();
      price.should.equal(2);
      expect(timeElapsed).to.eql(elapsed(0,0,30))


      await page.selectParkingLot('Economy');
      await page.setLeaveTime(16,31);
      await page.clickCalculate();
      price = await page.getParkingCost()
      timeElapsed = await page.getDuration();
      price.should.equal(4);
      expect(timeElapsed).to.eql(elapsed(0,1,1))

      await page.selectParkingLot('Economy');
      await page.setLeaveDay(18,11,2019);
      await page.clickCalculate();
      price = await page.getParkingCost();
      timeElapsed = await page.getDuration();
      price.should.equal(13);
      expect(timeElapsed).to.eql(elapsed(1,1,1))

      await page.selectParkingLot('Economy');
      await page.setLeaveDay(18,11,2019);
      await page.setLeaveTime(09,00);
      await page.clickCalculate();
      price = await page.getParkingCost();
      timeElapsed = await page.getDuration();
      price.should.equal(9);
      expect(timeElapsed).to.eql(elapsed(0,17,30))

      await page.selectParkingLot('Economy');
      await page.setLeaveDay(24,11,2019);
      await page.setLeaveTime(15,30);
      await page.clickCalculate();
      price = await page.getParkingCost();
      timeElapsed = await page.getDuration();
      price.should.equal(54);
      expect(timeElapsed).to.eql(elapsed(7,0,0))

      await page.selectParkingLot('Economy');
      await page.setLeaveDay(24,11,2019);
      await page.setLeaveTime(15,31);
      await page.clickCalculate();
      price = await page.getParkingCost();
      timeElapsed = await page.getDuration();
      price.should.equal(56);
      expect(timeElapsed).to.eql(elapsed(7,0,1))

      await page.selectParkingLot('Economy');
      await page.setLeaveDay(31,11,2019);
      await page.setLeaveTime(15,31);
      await page.clickCalculate();
      price = await page.getParkingCost();
      timeElapsed = await page.getDuration();
      price.should.equal(110);
      expect(timeElapsed).to.eql(elapsed(14,0,1))
  });

  it('Long-Term Surface Parking Rates', async () => {
    await page.selectParkingLot('Long-Surface');
    await page.setInitDay(17,11,2019);
    await page.setLeaveDay(17,11,2019);
    await page.setStartTime(15,30);
    await page.setLeaveTime(16,00);
    await page.clickCalculate();
    let price = await page.getParkingCost()
    var timeElapsed = await page.getDuration();
    price.should.equal(2);
    expect(timeElapsed).to.eql(elapsed(0,0,30))


    await page.selectParkingLot('Long-Surface');
    await page.setLeaveTime(16,31);
    await page.clickCalculate();
    price = await page.getParkingCost()
    timeElapsed = await page.getDuration();
    price.should.equal(4);
    expect(timeElapsed).to.eql(elapsed(0,1,1))

    await page.selectParkingLot('Long-Surface');
    await page.setLeaveDay(18,11,2019);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(14);
    expect(timeElapsed).to.eql(elapsed(1,1,1))

    await page.selectParkingLot('Long-Surface');
    await page.setLeaveDay(18,11,2019);
    await page.setLeaveTime(09,00);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(10);
    expect(timeElapsed).to.eql(elapsed(0,17,30))

    await page.selectParkingLot('Long-Surface');
    await page.setLeaveDay(24,11,2019);
    await page.setLeaveTime(15,30);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(60);
    expect(timeElapsed).to.eql(elapsed(7,0,0))

    await page.selectParkingLot('Long-Surface');
    await page.setLeaveDay(24,11,2019);
    await page.setLeaveTime(15,31);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(62);
    expect(timeElapsed).to.eql(elapsed(7,0,1))

    await page.selectParkingLot('Long-Surface');
    await page.setLeaveDay(31,11,2019);
    await page.setLeaveTime(15,31);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(122);
    expect(timeElapsed).to.eql(elapsed(14,0,1))
  });

  it('Long-Term Garage Parking Rates', async () => {
    await page.selectParkingLot('Long-Garage');
    await page.setInitDay(17,11,2019);
    await page.setLeaveDay(17,11,2019);
    await page.setStartTime(15,30);
    await page.setLeaveTime(16,00);
    await page.clickCalculate();
    let price = await page.getParkingCost()
    var timeElapsed = await page.getDuration();
    price.should.equal(2);
    expect(timeElapsed).to.eql(elapsed(0,0,30))


    await page.selectParkingLot('Long-Garage');
    await page.setLeaveTime(16,31);
    await page.clickCalculate();
    price = await page.getParkingCost()
    timeElapsed = await page.getDuration();
    price.should.equal(4);
    expect(timeElapsed).to.eql(elapsed(0,1,1))

    await page.selectParkingLot('Long-Garage');
    await page.setLeaveDay(18,11,2019);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(16);
    expect(timeElapsed).to.eql(elapsed(1,1,1))

    await page.selectParkingLot('Long-Garage');
    await page.setLeaveDay(18,11,2019);
    await page.setLeaveTime(09,00);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(12);
    expect(timeElapsed).to.eql(elapsed(0,17,30))

    await page.selectParkingLot('Long-Garage');
    await page.setLeaveDay(24,11,2019);
    await page.setLeaveTime(15,30);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(72);
    expect(timeElapsed).to.eql(elapsed(7,0,0))

    await page.selectParkingLot('Long-Garage');
    await page.setLeaveDay(24,11,2019);
    await page.setLeaveTime(15,31);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(74);
    expect(timeElapsed).to.eql(elapsed(7,0,1))

    await page.selectParkingLot('Long-Garage');
    await page.setLeaveDay(31,11,2019);
    await page.setLeaveTime(15,31);
    await page.clickCalculate();
    price = await page.getParkingCost();
    timeElapsed = await page.getDuration();
    price.should.equal(146);
    expect(timeElapsed).to.eql(elapsed(14,0,1));
  });

      
})

