let userObject = {};

const userNameDiv = document.getElementById('user-name-div');
const userAboutDiv = document.getElementById('user-about-div');
const userSignupDiv = document.getElementById('user-signup-div');

function userNameFormHandler(event) {
    event.preventDefault();
    const firstName = document.getElementById('user-firstname').value.trim();
    const lastName = document.getElementById('user-lastname').value.trim();

    if (firstName && lastName) {
        userObject.first_name = firstName;
        userObject.last_name = lastName;

        userNameDiv.classList.add('d-none');
        userAboutDiv.classList.remove('d-none');

        console.log(userObject);
    } else {
        document.querySelector('label[for="user-firstname"]').classList.add("text-danger");
        document.querySelector('label[for="user-lastname"]').classList.add("text-danger");
    }
}

function userAboutFormHandler(event) {
    //add code to get info to userObject.property (see Insomnia Signup Route)
    event.preventDefault();

    const age = document.getElementById('user-age').value;
    const description = document.getElementById('user-bio').value;
    const profile_picture_src = document.getElementById('user-photo-url').value;
    const gender = document.getElementById('user-gender').value;
    const interested_in_f = document.getElementById('female').checked;
    const interested_in_m = document.getElementById('male').checked;
    const interested_in_o = document.getElementById('non-binary').checked;

    if (age && description && profile_picture_src && gender && (interested_in_f || interested_in_m || interested_in_o)) {

        userObject.age = age;
        userObject.description = description;
        userObject.profile_picture_src = profile_picture_src;
        userObject.gender = gender;
        userObject.interested_in_f = interested_in_f;
        userObject.interested_in_m = interested_in_m;
        userObject.interested_in_o = interested_in_o;

        userAboutDiv.classList.add('d-none');
        userSignupDiv.classList.remove('d-none');

    } else {
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
                console.log('sucsess')
            }

            // window.location.replace('/dashboard');
        })
        .catch(err => {
            console.log(err);
        });
};

// navigator.getCurrentPoss
function getUsersLocation() {
    navigator.geolocation.getCurrentPosition((pos, err) => {
        if (err) {
            console.log(err);
            return;
        }
        userObject.latitude = parseFloat(pos.coords.latitude.toPrecision(8));
        userObject.longitude = parseFloat(pos.coords.longitude.toPrecision(8));
    });
};

document.getElementById('user-name-form').addEventListener('submit', userNameFormHandler);
document.getElementById('user-about-form').addEventListener('submit', userAboutFormHandler);
document.getElementById('user-signup-form').addEventListener('submit', userSignupFormHandler);

getUsersLocation();