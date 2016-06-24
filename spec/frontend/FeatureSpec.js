'use strict';

describe('Feature test', function(){
  var thermostat;
  beforeEach(function(){
    thermostat = new Thermostat();
  });

  //Thermostat starts at 20 degrees
  describe('thermostat has a default temperature', function(){
    it('starts at 20 degrees', function(){
      expect(thermostat.temperature()).toEqual(20);
    });
  });
  //You can increase the temperature with the up button
  describe('thermostat can increase temperature', function(){
    it('increases by 1 degree', function(){
      thermostat.increase();
      expect(thermostat.temperature()).toEqual(21);
    });
  });
  //You can decrease temperature with the down button
  describe('thermostat can decrease temperature', function(){
    it('decreases by 1 degree', function(){
      thermostat.decrease();
      expect(thermostat.temperature()).toEqual(19);
    });
  });
  //The minimum temperature is 10 degrees
  describe('thermostat has a minimum temperature', function(){
    it('it has minimum temperature of 10 degrees', function(){
      for(var i = 0; i < 10; i++) {
        thermostat.decrease();
      }
      expect(function(){ thermostat.decrease(); }).toThrowError('Cannot decrease below minimum temperature');
    });
  });

  // If power saving mode is on, the maximum temperature is 25 degrees
  describe('with power saving mode on,', function(){
    it('has a maximum temperature of 25 degrees', function(){
      thermostat.powerSaveOn();
      for(var i = 0; i < 5; i++) {
        thermostat.increase();
      }
      expect(function(){ thermostat.increase(); }).toThrowError('Cannot increase above maximum temperature');
    });
  });
  //If power saving mode is off, the maximum temperature is 32 degrees
  describe('with power saving mode off', function(){
    it('has a maximum temperature of 32 degrees', function(){
      thermostat.powerSaveOff();
      for(var i = 0; i < 12; i++) {
        thermostat.increase();
      }
      expect(function(){ thermostat.increase(); }).toThrowError('Cannot increase above maximum temperature');
    });
  });
  //Power saving mode is on by default
  describe('power saving mode', function(){
    it('is on by default', function(){
      for(var i = 0; i < 5; i++) {
        thermostat.increase();
      }
      expect(function(){ thermostat.increase(); }).toThrowError('Cannot increase above maximum temperature');
    });
  });
  // You can reset the temperature to 20 by hitting the reset button
  describe('reseting temperature', function(){
    it('can be reset to 20 degrees', function(){
      for(var i = 0; i < 5; i++) {
        thermostat.increase();
      }
      thermostat.reset();
      expect(thermostat.temperature()).toEqual(20);
    });
  });
  // The thermostat should colour the display based on energy usage -
  // < 18 is green, < 25 is yellow, otherwise red
  describe('thermostat output changes based on temperature', function(){
    it('outputs "low-usage" when temperature is less than 18', function(){
      thermostat.decrease();
      thermostat.decrease();
      thermostat.decrease();
      expect(thermostat.energyUsage()).toEqual("low-usage");
    });
    it('outputs "medium-usage" when temperature is between than 18 and 24', function(){
      expect(thermostat.energyUsage()).toEqual("medium-usage");
    });
    it('outputs "high-usage" when temperature is greater than 24', function(){
      for(var i = 0; i < 5; i++) {
        thermostat.increase();
      }
      expect(thermostat.energyUsage()).toEqual("high-usage");
    });
  });
});
