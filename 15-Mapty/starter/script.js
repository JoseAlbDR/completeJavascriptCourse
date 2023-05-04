'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// WORKOUT CLASSES
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); // Unique identifier

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, long]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this.setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this.setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.6, 24, 178);
// const cycle1 = new Cycling([39, -12], 30, 95, 525);

/////////////////////////
// APP CLASS
/**
 * Class to manage all the events on the current map
 */
class App {
  //PRIVATE PROPERTIES
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoom = 15;

  constructor() {
    // Get navigator.geolocation position and show the map in that position
    this.#getPosition();

    // Get data from local storage
    this.#getLocalStorage();

    // EVENT LISTENERS
    // This keyword will point to FORM
    // Need to bind to the object
    // Show a marker popup of the current workout
    form.addEventListener('submit', this.#newWorkout.bind(this));

    // Toggle between elevation field in form
    inputType.addEventListener('change', this.#toggleElevationField);

    // Goto popup
    containerWorkouts.addEventListener('click', this.#moveToPopup.bind(this));
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
    }).setView(coords, this.#mapZoom);

    // Change style (google street layer)
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(this.#map);

    // EVENT LISTENER on map leaflet
    // This keyword points to map
    // Bind to the current object
    // Show form when the map is clicked
    this.#map.on('click', this.#showForm.bind(this));

    // Render every workout
    this.#workouts.forEach(work => {
      this.#renderWorkoutMarker(work);
    });
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

  #hideForm() {
    // Empty inputs
    inputDistance.value =
      inputElevation.value =
      inputDuration.value =
      inputCadence.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
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
    const checkValid = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const checkPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check is data is valid
      if (
        !checkValid(distance, duration, cadence) ||
        !checkPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !checkValid(distance, duration, elevation) ||
        !checkPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this.#renderWorkoutMarker(workout);

    // Render workout on list
    this.#renderWorkout(workout);

    // Hide form + clear input fields
    this.#hideForm();

    // Set local storage to all workouts
    this.#setLocalStorage();
  }

  // Show marker in those coords
  // bindPopup(L.popup({options}))
  // Display marker
  // Coords of click event
  #renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  #renderWorkout(workout) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

    if (workout.type === 'running')
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
            </div>
          </li>
            `;

    if (workout.type === 'cycling')
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⛰</span>
              <span class="workout__value">${workout.elevationGain}</span>
              <span class="workout__unit">m</span>
            </div>
          </li>
            `;
    form.insertAdjacentHTML('afterend', html);
  }

  #moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    // Guard clause
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // Goto popup
    this.#map.setView(workout.coords, this.#mapZoom, {
      animate: true,
      pan: { duration: 1 },
    });
  }

  // Save to local storage
  #setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  // Load from local storage
  #getLocalStorage() {
    // Get data from local storage
    const data = JSON.parse(localStorage.getItem('workouts'));

    // Guard clause
    if (!data) return;

    // Load the data
    this.#workouts = data;

    // Render every workout
    this.#workouts.forEach(work => {
      this.#renderWorkout(work);
    });
  }

  reset() {
    // Remove data from local storage
    localStorage.removeItem('workouts');

    // Reload the page
    location.reload();
  }
}

// Initializing App
const app = new App();

// TODO
// EDIT, DELETE, DELETE ALL
// SORT BY CERTAIN FIELD
// REBUILD OBJECT FROM LOCAL STORAGE

// POSITION DE MAP TO SHOW ALL WORKOUTS
// DRAW LINES AND SHAPES INSTEAD OF JUST POINTS
// GEOCODE LOCATION
// DISPLAY WEATHER
