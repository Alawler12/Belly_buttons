// event listener: when an event occurs on the page, such as selection of a dropdown menu option, the updatePage() function is triggered.
d3.selectAll("body").on("change", updatePage);

function updatePage() {
  // uses select al to select dropdown menu, which has an id of selectOption
  var dropdownMenu = d3.selectAll("#selectOption").node();
  // the id of the drop down menu is assigned to a variable
  var dropdownMenuID = dropdownMenu.id;
  //whenever a dropdown option is selected, it's value is assigned to slectedOption
  var selectedOption = dropdownMenu.value;

  //when the function is triggered, the id value of the dropdown, as well as the option, are printed to the console
  console.log(dropdownMenuID);
  console.log(selectedOption);
};