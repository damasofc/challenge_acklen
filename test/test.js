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
      
        it('Has Text', async () => {
            var res = await page.hasTextElements();
            res.should.be.a('number');
  
        });

        it('Selected Element', async () => {
          await page.selectParkingLot('Economy');
          var res = await page.getSelectedParkingLot();
          res.should.equal('Economy');

      });
      
  })

