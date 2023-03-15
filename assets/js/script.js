// save reference to important DOM elements
var timeDisplayEl = $('#time-display');
var serviceDisplayEl = $('#service-display');
var serviceModalEl = $('#service-modal');
var serviceFormEl = $('#service-form');
var serviceNameInputEl = $('#service-name-input');
var serviceTypeInputEl = $('#service-type-input');
var serviceRateInputEl = $('#service-rate-input');
var dueDateInputEl = $('#due-date-input');


// handle displaying the time
function displayTime() {
  var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

// handle printing project data to the page
function printServiceData(name, type, serviceRate, dueDate) {
  var serviceRowEl = $('<tr>');

  var serviceNameTdEl = $('<td>').addClass('p-2').text(name);

  var serviceTypeTdEl = $('<td>').addClass('p-2').text(type);

  var rateTdEl = $('<td>').addClass('p-2').text(serviceRate);

  var dueDateTdEl = $('<td>').addClass('p-2').text(dueDate);

  var daysToDate = moment(dueDate, 'MM/DD/YYYY').diff(moment(), 'days');
  var daysLeftTdEl = $('<td>').addClass('p-2').text(daysToDate);

  var totalEarnings = calculateTotalEarnings(serviceRate);

  // You can also chain methods onto new lines to keep code clean
  var totalTdEl = $('<td>')
    .addClass('p-2')
    .text('$' + totalEarnings);

  var deleteServiceBtn = $('<td>')
    .addClass('p-2 delete-project-btn text-center')
    .text('X');

  // By listing each `<td>` variable as an argument, each one will be appended in that order
  serviceRowEl.append(
    serviceNameTdEl,
    serviceTypeTdEl,
    rateTdEl,
    dueDateTdEl,
    daysLeftTdEl,
    totalTdEl,
    deleteServiceBtn
  );

  serviceDisplayEl.append(serviceRowEl);

  serviceModalEl.modal('hide');
}

function calculateTotalEarnings(rate) {
  var dailyTotal = rate;
  var total = dailyTotal;
  return total;
}

function handleDeleteService(event) {
  console.log(event.target);
  var btnClicked = $(event.target);
  btnClicked.parent('tr').remove();
}

// handle service form submission
function handleServiceFormSubmit(event) {
  event.preventDefault();

  var serviceName = serviceNameInputEl.val().trim();
  var serviceType = serviceTypeInputEl.val().trim();
  var serviceRate = serviceRateInputEl.val().trim();
  var dueDate = dueDateInputEl.val().trim();

  printServiceData(serviceName, serviceType, serviceRate, dueDate);

  serviceFormEl[0].reset();
}

serviceFormEl.on('submit', handleServiceFormSubmit);
serviceDisplayEl.on('click', '.delete-service-btn', handleDeleteService);
dueDateInputEl.datepicker({ minDate: 1 });

setInterval(displayTime, 1000);


var formEl = $('#services-form');
var nameInputEl = $('#service-name');
var dateInputEl = $('#datepicker');
var servicesListEl = $('#services-list');

var printServices = function (name, date) {
  var listEl = $('<li>');
  var listDetail = name.concat(' on ', date);
  listEl.addClass('list-group-item').text(listDetail);
  listEl.appendTo(servicesListEl);
};

var handleFormSubmit = function (event) {
  event.preventDefault();

  var nameInput = nameInputEl.val();
  var dateInput = dateInputEl.val();

  if (!nameInput || !dateInput) {
    console.log('You need to fill out the form!');
    return;
  }

  printServices(nameInput, dateInput);

  // resets form
  nameInputEl.val('');
  dateInputEl.val('');
};

formEl.on('submit', handleFormSubmit);

// Autocomplete widget
$(function () {
  var servicesNames = [
    'Wash and Cut',
    'Highlight',
    'Color and Trim',
    'Permanent Wave',
    'Straightener',
    'Relaxer',
    'Womens Cuts',
    'Mens Cuts',
    'Childrens Cuts',
    'Specialty Haircutting',
    'All Over Color',
    'Color Retouch',
    'Partial Foil Highlights',
    'Full Foil',
    'Face Frame Highlights',
    'Balayage/Foilayage',
    'Double Process Color',
    'Color Correction: Priced By Consultation Only',
  ];
  $('#service-name').autocomplete({
    source: servicesNames,
  });
});

// Datepicker widget
$(function () {
  $('#datepicker').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});








// Re-usable functionality
// function getApi() {

  // Set up the Fetch
//   var requestURL = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY";
// }

//   function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: 37.7749, lng: -122.4194},
//         zoom: 8
//       });
//   }




