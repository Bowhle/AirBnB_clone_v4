/* global $ */
$(document).ready(function () {
  const selectedAmenities = {}; // Store selected amenities

  // Listen for checkbox changes
  $('.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName; // Add amenity
    } else {
      delete selectedAmenities[amenityId]; // Remove amenity
    }

    // Update h4 text with selected amenities
    const amenityList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenityList || '\u00A0'); // Use non-breaking space if empty
  });

  // Request API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available'); // Add class if OK
    } else {
      $('#api_status').removeClass('available'); // Remove class if not OK
    }
  });

  // Send request to places_search API and display places
  function fetchPlaces() {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',  // Correct URL for the places_search endpoint
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (places) {
        // Clear previous places
        $('.places').empty();

        // Loop through the results and add articles
        places.forEach(function (place) {
          const article = $('<article></article>');
          article.append(`<h2>${place.name}</h2>`);
          article.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
          article.append(`<div class="max_guest">${place.max_guest} Guest(s)</div>`);
          article.append(`<div class="number_rooms">${place.number_rooms} Room(s)</div>`);
          article.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`);
          article.append(`<p class="description">${place.description}</p>`);

          // Append the article to the places section
          $('.places').append(article);
        });
      },
      error: function () {
        console.log('Error fetching places');
      }
    });
  }

  // Call fetchPlaces when document is ready
  fetchPlaces();
});
