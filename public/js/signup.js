let userObject = {}

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
}


function userSignupFormHandler(event) {
    //add code to get info to userObject.property (see Insomnia Signup Route)

    createUser();
}

function createUser() {
    fetch('api/users', {
            method: 'POST',
            headers: 'application/json',
            body: JSON.stringify(userObject)
        })
        .then(res => {
            //add code here
        })
        .catch(err => {
            //add code here
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