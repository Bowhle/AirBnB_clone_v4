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
});
