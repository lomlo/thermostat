$(document).ready(function(){
  //I want to display the temperature in the h1
  var thermostat = new Thermostat();
  $('#temperature').text(thermostat.temperature());
  updateThermometer(thermostat.temperature());

  $('#temperature-increase').click(function(){
    thermostat.increase();
    UpdatesTemp();
    UpdatesEnergy();
  });
  $('#temperature-decrease').click(function(){
    thermostat.decrease();
    UpdatesTemp();
    UpdatesEnergy();
  });
  $('#temperature-reset').click(function(){
    thermostat.reset();
    UpdatesTemp();
  });
  $('#powersaving-off').click(function(){
    thermostat.powerSaveOff();
    UpdatesPsm('Off');
  });
  $('#powersaving-on').click(function(){
    thermostat.powerSaveOn();
    UpdatesTemp();
    UpdatesPsm('On');
  });

  function UpdatesTemp(){
    $('#temperature').text(thermostat.temperature());
    updateThermometer(thermostat.temperature());
  };
  function UpdatesPsm(string){
    $('#power-saving-status').text(string);
  };
  function UpdatesEnergy(){
    $("#energy-usage").attr('class', thermostat.energyUsage());
    $("#thermometer-bar").attr('class', thermostat.energyUsage());
  };

  $('#location-form').on('submit', function(event){
    event.preventDefault();
    var query = $(event.currentTarget).serializeArray();
    var autocompleteUrl = "http://autocomplete.wunderground.com/aq";

    $.ajax({
      url: autocompleteUrl,
      jsonp: "cb",
      dataType: "jsonp",
      data: {
        query: query[0].value,
        format: "json"
      },
      success: function(response){
        var data = response.RESULTS;
        $("#location-select select").empty();

        for (var i = 0; i < data.length; i++){
          $("#location-select select").append("<option value=" + data[i].l + ">" + data[i].name + "</option>")
        }
      }
    });

  });

  $('#location-select').on('submit', function(event){
    event.preventDefault();
    var query = $(event.currentTarget).serializeArray();
    var url = "http://api.wunderground.com/api/" + wundergroundID + "/conditions/" + query[0].value + ".json";

    $.get(url, function(data){
      var weather = data.current_observation.weather;
      var temperature = data.current_observation.feelslike_c;
      $('#weather').text(weather + ", " + temperature);
    });
  });

  function updateThermometer(temperature){
    $('#thermometer-bar').height(temperature / 32 * 100 + '%');
  }
});
