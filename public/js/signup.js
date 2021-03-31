let userObject = {};

const userNameDiv = document.getElementById('user-name-div');
const profilePicDiv = document.getElementById('profile-picture-div')
const userAboutDiv = document.getElementById('user-about-div');
const userSignupDiv = document.getElementById('user-signup-div');

const imgInput = document.getElementById("profile-picture");

// navigator.getCurrentPoss
function getUsersLocation(event) {
  window.navigator.geolocation.getCurrentPosition((pos, err) => {
    if (err) {
      console.log(err);
      return;
    }
    userObject.latitude = parseFloat(pos.coords.latitude.toPrecision(8));
    userObject.longitude = parseFloat(pos.coords.longitude.toPrecision(8));
  });
};

function userNameFormHandler(event) {
  event.preventDefault();
  let firstName = document.getElementById('user-firstname').value.trim();
  let lastName = document.getElementById('user-lastname').value.trim();
  let allowLocation = document.getElementById('location').checked;

  if (firstName && lastName && allowLocation) {
    userObject.first_name = firstName;
    userObject.last_name = lastName;

    userNameDiv.classList.add('d-none');
    profilePicDiv.classList.remove('d-none');

    console.log(userObject);
  } else {
    if (!firstName) document.querySelector('label[for="user-firstname"]').classList.add("text-danger");
    if (!lastName) document.querySelector('label[for="user-lastname"]').classList.add("text-danger");
    if (!allowLocation) document.querySelector('label[for="location"]').classList.add("text-danger");
  }
}

function profilePictureFormHandler(event) {
  event.preventDefault();
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dly1i5lwp/image/upload'
  const CLOUDINARY_UPLOAD_PRESET = 'z8p6o8pb'
  const file = imgInput.files[0];
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  if (file) {

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        userObject.profile_picture_src = data.url
        profilePicDiv.classList.add('d-none');
        userAboutDiv.classList.remove('d-none');
      })
      .catch(err => console.log(err));
  } else {
    alert('please upload a file!');
  }
}

function userAboutFormHandler(event) {
  event.preventDefault();

  const age = document.getElementById('user-age').value;
  const description = document.getElementById('user-bio').value;
  const gender = document.getElementById('user-gender').value;
  const interested_in_f = document.getElementById('female').checked;
  const interested_in_m = document.getElementById('male').checked;
  const interested_in_o = document.getElementById('non-binary').checked;

  if (age && description && gender && (interested_in_f || interested_in_m || interested_in_o)) {

    userObject.age = age;
    userObject.description = description;
    userObject.gender = gender;
    userObject.interested_in_f = interested_in_f;
    userObject.interested_in_m = interested_in_m;
    userObject.interested_in_o = interested_in_o;
    userAboutDiv.classList.add('d-none');
    userSignupDiv.classList.remove('d-none');
  }
  else {
    alert('Please fill out the entire form');
  }
}

function userSignupFormHandler(event) {
  //add code to get info to userObject.property (see Insomnia Signup Route)
  event.preventDefault();

  const email = document.getElementById('user-email').value.trim();
  const password = document.getElementById('user-password').value;

  userObject.email = email;
  userObject.password = password;

  if (email && password) {
    createUser();
  } else {
    alert('enter an email and password');
  }
};

function createUser() {
  fetch('api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObject)
  })
    .then(res => {
      if (res.ok) {
        console.log('success')
        window.location.href = '/dashboard';
      }
    })
    .catch(err => {
      console.log(err);
    });
};

// create user age options
const ageSelectEl = document.getElementById("user-age")

function addAgeOptions() {
  for (let i = 18; i < 110; i++) {
    const optionEl = document.createElement('option');
    optionEl.value = i;
    optionEl.textContent = i;
    ageSelectEl.add(optionEl);
  }
}

document.getElementById('user-name-form').addEventListener('submit', userNameFormHandler);
document.getElementById('user-name-form').addEventListener('submit', getUsersLocation);
document.getElementById('user-about-form').addEventListener('submit', userAboutFormHandler);
document.getElementById('user-signup-form').addEventListener('submit', userSignupFormHandler);
document.getElementById('profile-picture-form').addEventListener('submit', profilePictureFormHandler);

addAgeOptions();


function handlePermission() {
  navigator.permissions.query({name:'geolocation'}).then(function(result) {
    if (result.state == 'granted') {
      report(result.state);
    } else if (result.state == 'prompt') {
      report(result.state);
      navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
    } else if (result.state == 'denied') {
      report(result.state);
    }
    result.onchange = function() {
      report(result.state);
    }
  });
}

function report(state) {
  console.log('Permission ' + state);
}

handlePermission();