'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// APP CLASS
/**
 * Class to manage all the events on the current map
 */
class APP {
  //PRIVATE PROPERTIES
  #map;
  #mapEvent;

  constructor() {
    // Get navigator.geolocation position and show the map in that position
    this.#getPosition();

    // EVENT LISTENERS
    // This keyword will point to FORM
    // Need to bind to the object
    // Show a marker popup of the current workout
    form.addEventListener('submit', this.#newWorkout.bind(this));

    // Toggle between elevation field in form
    inputType.addEventListener('change', this.#toggleElevationField);
  }

  // PRIVATE METHODS
  // Get geolocation
  /**
   * Get current position given by the navigator and show the map in those coords
   */
  #getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        // Bind this keyword to the current object
        this.#loadMap.bind(this),
        // FAIL to get position from navigator
        function () {
          alert('Could not get your position.');
        }
      );
  }

  // Load map given current geolocation
  /** Load LEAFLET map in the given position
   *
   * @param {*} position position given by navigator.geolocation
   */
  #loadMap(position) {
    const { latitude: lat, longitude: lng } = position.coords;
    const coords = [lat, lng];

    // THIRD PARTY LIBRARY LEAFLET
    // Copy links to header
    this.#map = L.map('map', {
      closePopupOnClick: false,
    }).setView(coords, 13);

    // Change style (google street layer)
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 13,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(this.#map);

    // EVENT LISTENER on map leaflet
    // This keyword points to map
    // Bind to the current object
    // Show form when the map is clicked
    this.#map.on('click', this.#showForm.bind(this));
  }

  /**Show form by removing hidden class of the form
   *
   * @param {*} mapE map event (to get click coordinates from)
   */
  #showForm(mapE) {
    form.classList.remove('hidden');
    // FOCUS ON
    this.#mapEvent = mapE;
    inputDistance.focus();
  }

  /**
   * Toggle between elevation and cadence
   */
  #toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  /** Create a new marker in the clicked corrds once form is submitted
   *
   * @param {*} event is submit
   */
  #newWorkout(event) {
    event.preventDefault();

    // Clear input fields
    inputDistance.value =
      inputElevation.value =
      inputDuration.value =
      inputCadence.value =
        '';

    // Show marker in those coords
    // bindPopup(L.popup({options}))
    // Display marker
    // Coords of click event
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout.')
      .openPopup();
  }
}

// Initializing App
const app = new APP();

// WORKOUT CLASSES
