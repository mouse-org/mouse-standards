//
// Step 2: Creating Charts from the Data
// We're using jQuery's `get()`, which loads data from the server using a HTTP GET request. Now, we're also using
// the jQuery plugin, [Gridster](http://gridster.net/), that allows building intuitive draggable layouts from elements
// spanning multiple columns and provides an API. In gridster() we specify that each chart container in our grid will
// have a 5px margin, specified with the option `widget_margins` and setting the container size to be 255x155 with 
// `widget_base_dimensions`. There are many other options though, see their [documentation](http://gridster.net/#documentation)
// for more detail. This is put into the `section` element with `id` 'charts' in our `index.html` file. We're
// using [Google Charts](https://developers.google.com/chart/) to visualize the data we've retrieved from the Google Sheet.
// You can create a chart image with just values in a URL, which you treat like any normal image, displaying it using a
// standard HTML `img` element. So, for the rest of `client.js`, we're just processing the data we got from '/charts'.
// This is done by looping through the data, row by row. Then for each column we get the value the cell contained and
// add it to our `String` variable, `dataStr`. Ultimately, we construct the URL of the Google Chart using the string
// of extracted values. `rarray` values 0 and 1 contain the data from columns A and B of our Google Sheet, in which
// we specify the Google Chart type and the title we're giving our chart. Finally, we put the `img` HTML into the
// Gridster `add_widget` method. So what we end up populating `<section id="charts">` with is a grid of `span` elements,
// which are the chart containers that each has an `img` inside that has all of the data specified in its URL.
//
// The last stage is to display the dashboard, see `views/index.html`.
//
$(function() {
  var title = $( "#title" ).html();
  var section;
  var list;
  $.get('/charts', function(data) {
    if ($( "#title" ).html().indexOf("By Standard")){
      var dataString = "<ul>";
      for (var i = 0; i < Object.keys(data["2"]).length; i++){
        if (data["2"][i]){
          dataString
            += "<li class='alignment-item'><strong class='standard'>"
            + data["2"][i]["value"]
            + "</strong><ul class='project-list'>";
          for (var j = 2; j < Object.keys(data).length; j ++) {
            if (data[j][i]){
              if (data[j][i]["value"] === "X"){
                dataString += "<li>" + data[j]["1"]["value"] + "</li>";
              }      
            }   
          }
          dataString += "</ul></li>";
        } else {
          console.log("No data");
        }
        
      }
      dataString += "</ul>";
      $( "#standards" ).html(dataString);
      $( ".project-list").hide();
    }
    if ($( "#title" ).html().indexOf("By Project")){
      var dataString = "<ul>";
      for (var i = 2; i < Object.keys(data).length; i++){
        if (data[i]){
          if (data[i]["1"]){
            dataString
              += "<li class='alignment-item'><strong class='project'>"
              + data[i]["1"]["value"]
              + "</strong><ul class='standard-list'>";
            for(var j = 0; j < Object.keys(data["2"]).length; j++){
              if (data[i][j]){
                if (data[i][j]["value"] === "X"){
                  dataString += "<li>" + data["2"][j]["value"] + "</li>";
                }
              }
            }
            dataString += "</ul></li>";
          }
        }

      }
      dataString += "</ul>";
      $( "#projects" ).html(dataString);
      $( ".project-list").hide();
      $( ".standard-list").hide();
    }
    $( ".standard").click(function() {
      $( this ).siblings().toggle();
    });
    $( ".project").click(function() {
      $( this ).siblings().toggle();
    });

  });
});