'use strict';

let map, mapEvent;

////////////////////////////////////////////////////USING THE GEOLOCATION API ON WEB BROWSER
//Geolocation is used to get the position of a user
//The navigator.geolocation.getCurrentPosition() method takes in two callback functions. The first is the function that would be called if geolocation successfully gets the users position and the second is the one that would be called if geolocation doesnt.
//The first callback function must always have a position parameter. That is what would be used to obtain the user's position
// navigator.geolocation?.getCurrentPosition(
//   function (position) {
//     console.log(position); //This is the object that contains position info
//     const { latitude, longitude } = position.coords;
//     console.log(latitude, longitude);
//     // Creating a map using google maps
//     console.log(`https://www.google.com/maps/@${latitude},${longitude}`); //if you click on this codes result in the console, it will display your position on google map
//   },
//   function () {
//     alert('Could not get your position');
//   }
// );

//////////////////////////////////////////////////////////LEAFLET LIBRARY
// //It is a 3rd party library, just like iono icons, used for displaying interactive maps
// navigator.geolocation?.getCurrentPosition(
//   function (position) {
//     // console.log(position);
//     const { latitude, longitude } = position.coords;
//     //Creating a map
//     //By convention, latitude should come before longitude
//     const coords = [latitude, longitude];

//     // var map = L.map('map').setView([51.505, -0.09], 13); //change var to let and create an element with a 'map' id-- check html file
//     map = L.map('map').setView(coords, 13); //Replace first setView parameter with the coords variable. The second parameter is for the extent of zooming

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       //the url in titleLayer() is used to retrieve the map and set its style. And this-- 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png' --is used to set another style
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     //Responding to click events on a map
//     map.on('click', function (mapE) {
//       console.log(mapE);
//       mapEvent = mapE;
//       form.classList.remove('hidden');
//       inputDistance.focus();
//       //the 'on' method is found in the leaflet's library; it functions as an event listener. The 'on' method's callback function must contain a parameter
//       // console.log(mapEvent);
//     });
//   },
//   function () {
//     alert('Could not get your position');
//   }
// );

// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   //Clearing form
//   inputCadence.value =
//     inputDistance.value =
//     inputDuration.value =
//     inputElevation.value =
//       '';
//   const { lat, lng } = mapEvent.latlng;

//   //creating popup
//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 250,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup', //className is used to apply a css class to the popup so that it can be styled
//       })
//     )
//     .setPopupContent('Workout')
//     .openPopup();
// });

// // Changing the elevation slot to cadence
// inputType.addEventListener('change', function () {
//   inputElevation.closest('.form__row').classList.toggle('.form__row--hidden');
//   inputCadence.closest('.form__row').classList.toggle('.form__row--hidden');
// });

////////////////////////////////////////////////////////////SETTING PROJECT ARCHITECTURE WITH ES6 CLASS
// class App {
//   #map;
//   #mapEvent;

//   constructor() {
//     this._getPosition();
//     form.addEventListener('submit', this._newWorkout.bind(this));
//     inputType.addEventListener('change', this._toggleElevationField);
//   }

//   _getPosition() {
//     navigator.geolocation?.getCurrentPosition(
//       this._loadMap.bind(this),
//       function () {
//         alert('Could not get your position');
//       }
//     );
//   }

//   _loadMap(position) {
//     const { latitude, longitude } = position.coords;
//     const coords = [latitude, longitude];

//     this.#map = L.map('map').setView(coords, 13);

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);

//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     this.#mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//    // console.log(this.#mapEvent);
//   }

//   _toggleElevationField() {
//     inputElevation.closest('.form__row').classList.toggle('.form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('.form__row--hidden');
//   }

//   _newWorkout(e) {
//     e.preventDefault();
//     inputCadence.value =
//       inputDistance.value =
//       inputDuration.value =
//       inputElevation.value =
//         '';
//     const { lat, lng } = this.#mapEvent.latlng;

//     L.marker([lat, lng])
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 250,
//           autoClose: false,
//           closeOnClick: false,
//           className: 'running-popup',
//         })
//       )
//       .setPopupContent('Workout')
//       .openPopup();
//   }
// }

// const app = new App();
// console.log(app);

//////////////////////////////////////////////////////MANAGING WORKOUT DATA; CREATING CLASSES
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, long]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    //pace(min/km)
    this.pace = this.duration / this.distance;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    //speed(km/hr)
    this.speed = this.distance / (this.duration / 60);
  }
}

// const run1 = new Runninng([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

// //////////////////////////////////////////////////APPLICATION ARCHITECTURE
// class App {
//   #map;
//   #mapEvent;

//   constructor() {
//     this._getPosition();
//     form.addEventListener('submit', this._newWorkout.bind(this));
//     inputType.addEventListener('change', this._toggleElevationField);
//   }

//   _getPosition() {
//     navigator.geolocation?.getCurrentPosition(
//       this._loadMap.bind(this),
//       function () {
//         alert('Could not get your position');
//       }
//     );
//   }

//   _loadMap(position) {
//     const { latitude, longitude } = position.coords;
//     const coords = [latitude, longitude];

//     this.#map = L.map('map').setView(coords, 13);

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);

//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     this.#mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   }

//   _toggleElevationField() {
//     inputElevation.closest('.form__row').classList.toggle('.form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('.form__row--hidden');
//   }

//   _newWorkout(e) {
//     e.preventDefault();
//     const type = inputType.value;
//     const distance = +inputDistance.value;
//     const duration = +inputDuration.value;
//     const { lat, lng } = this.#mapEvent.latlng;

//     L.marker([lat, lng])
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 250,
//           autoClose: false,
//           closeOnClick: false,
//           className: 'running-popup',
//         })
//       )
//       .setPopupContent('Workout')
//       .openPopup();

//     inputCadence.value =
//       inputDistance.value =
//       inputDuration.value =
//       inputElevation.value =
//         '';
//   }
// }
// const app = new App();

/////////////////////////////////////////
//APPLICATION ARCHITECTURE
/////////////////////////////////////////////////////////////CREATING A NEW WORKOUT
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// class App {
//   #map;
//   #mapEvent;
//   #workouts = [];
//   #mapZoomLevel = 13;

//   constructor() {
//     this._getPosition();
//     form.addEventListener('submit', this._newWorkout.bind(this));
//     inputType.addEventListener('change', this._toggleElevationField);
//     containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
//   }

//   _getPosition() {
//     navigator.geolocation?.getCurrentPosition(
//       this._loadMap.bind(this),
//       function () {
//         alert('Could not get your position');
//       }
//     );
//   }

//   _loadMap(position) {
//     const { latitude, longitude } = position.coords;
//     const coords = [latitude, longitude];

//     this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);

//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     this.#mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   }

//   _hideForm() {
//     //Empty Inputs
//     //prettier-ignore
//     inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';

//     //Hide form and remove animation
//     form.style.dsiplay = 'none';
//     form.classList.add('hidden');
//     setTimeout(() => (form.style.dsiplay = 'grid'), 1000);
//   }

//   _toggleElevationField() {
//     inputElevation.closest('.form__row').classList.toggle('.form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('.form__row--hidden');
//   }

//   _newWorkout(e) {
//     e.preventDefault();
//     //Helper functions
//     const validInputs = (...inputs) =>
//       inputs.every(inp => Number.isFinite(inp)); //'every' is an array method that is used to match all the values in an array to a certain condition. If the result of every match returns true, the code will return the value 'true'
//     const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//     //1. Get data from form
//     const type = inputType.value;
//     const distance = +inputDistance.value;
//     const duration = +inputDuration.value;
//     const { lat, lng } = this.#mapEvent.latlng;
//     let workout;

//     //2. if workout is runnig, create a running object
//     if (type === 'running') {
//       const cadence = +inputCadence.value;
//       //check if data is valid
//       if (
//         !validInputs(distance, duration, cadence) ||
//         !allPositive(distance, duration, cadence)
//       )
//         return alert('Inputs have to be positive numbers!');

//       workout = new Running([lat, lng], distance, duration, cadence);
//     }

//     //3. if workout is cycling, create a cycling object
//     if (type === 'cycling') {
//       const elevation = +inputElevation.value;
//       //check if data is valid
//       if (
//         !validInputs(distance, duration, elevation) ||
//         !allPositive(distance, duration)
//       )
//         return alert('Inputs have to be positive numbers!');

//       workout = new Cycling([lat, lng], distance, duration, elevation);
//     }

//     //4. add new object to workout array
//     this.#workouts.push(workout);

//   }

// }
// const app = new App();

/////////////////////////////////////////////////////////////////CREATING WORKOUT TABS and MOVING TO MARKER ON THEIR CLICK
// class App {
//   #map;
//   #mapEvent;
//   #workouts = [];
//   #mapZoomLevel = 13;

//   constructor() {
//     this._getPosition();
//     form.addEventListener('submit', this._newWorkout.bind(this));
//     inputType.addEventListener('change', this._toggleElevationField);
//     containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
//   }

//   _getPosition() {
//     navigator.geolocation?.getCurrentPosition(
//       this._loadMap.bind(this),
//       function () {
//         alert('Could not get your position');
//       }
//     );
//   }

//   _loadMap(position) {
//     const { latitude, longitude } = position.coords;
//     const coords = [latitude, longitude];

//     this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);

//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     this.#mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   }

//   _hideForm() {
//     //Empty Inputs
//     //prettier-ignore
//     inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';

//     //Hide form and remove animation
//     form.style.dsiplay = 'none';
//     form.classList.add('hidden');
//     setTimeout(() => (form.style.dsiplay = 'grid'), 1000);
//   }

//   _toggleElevationField() {
//     inputElevation.closest('.form__row').classList.toggle('.form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('.form__row--hidden');
//   }

//   _newWorkout(e) {
//     e.preventDefault();
//     //Helper functions
//     const validInputs = (...inputs) =>
//       inputs.every(inp => Number.isFinite(inp)); //'every' is an array method that is used to match all the values in an array to a certain condition. If the result of every match returns true, the code will return the value 'true'
//     const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//     //1. Get data from form
//     const type = inputType.value;
//     const distance = +inputDistance.value;
//     const duration = +inputDuration.value;
//     const { lat, lng } = this.#mapEvent.latlng;
//     let workout;

//     //2. if workout is runnig, create a running object
//     if (type === 'running') {
//       const cadence = +inputCadence.value;
//       //check if data is valid
//       if (
//         !validInputs(distance, duration, cadence) ||
//         !allPositive(distance, duration, cadence)
//       )
//         return alert('Inputs have to be positive numbers!');

//       workout = new Running([lat, lng], distance, duration, cadence);
//     }

//     //3. if workout is cycling, create a cycling object
//     if (type === 'cycling') {
//       const elevation = +inputElevation.value;
//       //check if data is valid
//       if (
//         !validInputs(distance, duration, elevation) ||
//         !allPositive(distance, duration)
//       )
//         return alert('Inputs have to be positive numbers!');

//       workout = new Cycling([lat, lng], distance, duration, elevation);
//     }

//     //4. add new object to workout array
//     this.#workouts.push(workout);

//     //5. render workout on map as marker
//     this._renderWorkoutMarker(workout); //there's no need to bind the 'this' keyword here because we are using the 'this' keyword to call the method

//     //render workout on list
//     this._renderWorkout(workout);

//     //hide form and clear input fields
//     this._hideForm();
//   }

//   _renderWorkoutMarker(workout) {
//     L.marker(workout.coords)
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 250,
//           autoClose: false,
//           closeOnClick: false,
//           className: `${workout.type}-popup`,
//         })
//       )
//       .setPopupContent(
//         `${workout.type === 'running' ? '🏃‍♂️' : '🚴'} ${workout.description}`
//       )
//       .openPopup();
//   }

//   _renderWorkout(workout) {
//     let html = `
//     <li class="workout workout--${workout.type}" data-id="${workout.id}">
//       <h2 class="workout__title">${workout.description}</h2>
//       <div class="workout__details">
//         <span class="workout__icon">${
//           workout.type === 'running' ? '🏃‍♂️' : '🚴'
//         }</span>
//         <span class="workout__value">${workout.distance}</span>
//         <span class="workout__unit">km</span>
//       </div>
//       <div class="workout__details">
//         <span class="workout__icon">⏱</span>
//         <span class="workout__value">${workout.duration}</span>
//         <span class="workout__unit">min</span>
//       </div>`;

//     if (workout.type === 'running')
//       html += `
//       <div class="workout__details">
//         <span class="workout__icon">⚡️</span>
//         <span class="workout__value">${workout.pace.toFixed(1)}</span>
//         <span class="workout__unit">min/km</span>
//       </div>
//       <div class="workout__details">
//         <span class="workout__icon">🦶🏼</span>
//         <span class="workout__value">${workout.cadence}</span>
//         <span class="workout__unit">spm</span>
//       </div>
//     </li>
//     `;

//     if (workout.type === 'cycling')
//       html += `
//         <div class="workout__details">
//           <span class="workout__icon">⚡️</span>
//           <span class="workout__value">${workout.speed.toFixed(1)}</span>
//           <span class="workout__unit">km/h</span>
//         </div>
//         <div class="workout__details">
//           <span class="workout__icon">⛰</span>
//           <span class="workout__value">${Worklet.elevationGain}</span>
//           <span class="workout__unit">m</span>
//         </div>
//       </li>
//     `;

//     form.insertAdjacentHTML('afterend', html);
//   }

//   _moveToPopup(e) {
//     const workoutEl = e.target.closest('.workout');

//     if (!workoutEl) return;

//     const workout = this.#workouts.find(
//       work => work.id === workoutEl.dataset.id
//     );
//     //Study leaflet's documentation: method for moving to marker
//     this.#map.setView(workout.coords, this.#mapZoomLevel, {
//       animate: true,
//       pan: {
//         duration: 1,
//       },
//     });
//     //using the public interface
//     workout.click();
//   }
// }
// const app = new App();

///////////////////////////////////////////////////////////////////WORKINHG WITH LOCAL STORAGE
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;

  constructor() {
    //Get user's position
    this._getPosition();

    //Get data from local storage
    this._getLocalStorage();

    //Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    navigator.geolocation?.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert('Could not get your position');
      }
    );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));

    if (localStorage.length == 0) {
      return;
    }

    //Rendering workout markers with the data retreived from the local storage
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';

    form.style.dsiplay = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.dsiplay = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    console.log(type, distance, duration);
    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    this.#workouts.push(workout);

    this._renderWorkoutMarker(workout);

    this._renderWorkout(workout);

    this._hideForm();

    //Putting the workouts' array in the local storage
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 250,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;

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

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // workout.click();
  }

  _setLocalStorage() {
    //USing the localStorage API
    //Storing data in the localStorage API
    localStorage.setItem('workouts', JSON.stringify(this.#workouts)); //the setItem method takes in two values; the first value is the key, which will be used to retrieve the data, and the second value is the data stored in the form of a string. To convert any type of object to a string, we can use 'JSON.stringify(obj)'
    //Note: don't use local storage to store large amounts of data
  }

  _getLocalStorage() {
    //Getting data that you stored in the local storage
    const data = JSON.parse(localStorage.getItem('workouts')); //to do the above, input the key you used in storing the data. note: this data is returned as a string, so you have to convertit to an object with 'JSON.parse'
    //Note: when you convert objects to strings then back to objects, they lose their prototype chain

    if (localStorage.length == 0) {
      return;
    }

    //Generating tabs and markers: check the _loadMap method for marker rendering; the reason why it is done there is that markers cannot be set when the map has not been created
    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  //Removing items from localStorage
  reset() {
    localStorage.removeItem('workouts'); // use the items key to do this
    //reloading page with the location object
    location.reload;
  }
}
const app = new App();
