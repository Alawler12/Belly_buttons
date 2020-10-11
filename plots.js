// // reads json file and prints it to the console
// d3.json("samples.json").then(function(data){
//     console.log(data);
// });

// //extract the wash frequency for each person in the array
// d3.json("samples.json").then(function(data){
//     wfreq = data.metadata.map(person => person.wfreq);
//     console.log(wfreq);
// });

// //sort wash frequency in desceding order
// d3.json("samples.json").then(function(data){
//     wfreq = data.metadata.map(person =>
// person.wfreq).sort((a,b) => b - a);
//     console.log(wfreq);
// });

// //delete null values from the wash frequency array
// d3.json("samples.json").then(function(data){
//     wfreq = data.metadata.map(person =>
// person.wfreq).sort((a,b) => b - a);
//     filteredWfreq = wfreq.filter(element => element !=
// null);
//     console.log(filteredWfreq);
// });

// // display metadata for any individual in the dataset
// d3.json("samples.json").then(function(data){
//     firstPerson = data.metadata[0];
//     Object.entries(firstPerson).forEach(([key, value]) =>
//       {console.log(key + ': ' + value);});
// });



function init() {
    data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
    Plotly.newPlot("plot", data);
  };
  
  d3.selectAll("#dropdownMenu").on("change", updatePlotly);
  function updatePlotly() {
    var dropdownMenu = d3.select("#dropdownMenu");
    var dataset = dropdownMenu.property("value");
  
    var xData = [1, 2, 3, 4, 5];
    var yData = [];
  
    if (dataset === 'dataset1') {
      yData = [1, 2, 4, 8, 16];
    };
  
    if (dataset === 'dataset2') {
      yData = [1, 10, 100, 1000, 10000];
    };
  
    var trace = {
      x: [xData],
      y: [yData],
    };
    Plotly.restyle("plot", trace);
  };
  
  init();