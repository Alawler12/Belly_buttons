function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Add each key and value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Create the buildCharts function.
function buildCharts(sample) {
  // Load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // Create a variable that holds the samples array. 
    var samples = data.samples;
    console.log(data);
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    
    //  Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var cultureIds = result.otu_ids;
    var cultureLabels = result.otu_labels;
    var cultureValues = result.sample_values;

    // Create the yticks for the bar chart.
    var yticks = cultureIds.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Create the trace for the bar chart.
    var barData = [
      {
        y: yticks,
        x: cultureValues.slice(0, 10).reverse(),
        text: cultureLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        }
      ];

    // Create the layout for the bar chart.

    var barLayout = {
      title: {text: "<b>Top 10 Bacteria Cultures Found", font: { size: 20 }},
      font: { color: "navy", family: "Arial" },
      margin: { t: 30, l: 150 }
      };

    // Use Plotly to plot the data with the layout. 
   Plotly.newPlot("bar", barData, barLayout);
    
    // Create the trace for the bubble chart.
    var bubbleData = [{
      x: cultureIds,
      y: cultureValues,
      text: cultureLabels,
      mode: "markers",
      marker:{
        color: cultureIds,
        colorscale: 'Jet',
        type: 'heatmap',
        size: cultureValues
        }
      }
    ];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {text: "<b>Bacteria Cultures Per Sample", font: { size: 24 }},
      font: { color: "navy", family: "Arial" },
      xaxis: {title: "OTU ID"},
      showlegend: false,
      hovermode: "closest"  
      
    };

    // Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    // Create a variable that holds the first sample in the metadata array.
    var results = resultArray[0];

    // Create a variable that holds the washing frequency.
    var bellyRub = parseFloat(results.wfreq);
    

    // Create the trace for the gauge chart.
    var gaugeData = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: bellyRub,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week", font: { size: 24 } },
        delta: { reference: 10},
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
          bar: { color: "navy" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "black",
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "gold" },
            { range: [6, 8], color: "limegreen" },
            { range: [8, 10], color: "green" }
          ],
        }
      }
     
      ];
      
    // Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      font: { color: "navy", family: "Arial" }
       
      };
  
    // Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  });
}

