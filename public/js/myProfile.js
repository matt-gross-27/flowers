//Var object storage
let userObject = {};
const userId = document.getElementById('userId').getAttribute("data-attribute-id")

function profileUpdateFormHandler(event) {
  event.preventDefault();
  //1. account settings
  //ADD IMAGE UPLOADER
  userObject.email = document.getElementById('user-email').value.trim();
  
  // const passwordInput = document.getElementById('user-password').value.trim();

  //2. user details

  userObject.first_name = document.getElementById('user-firstname').value.trim();
  userObject.last_name = document.getElementById('user-lastname').value.trim();
  userObject.age = document.getElementById('userAge').value;
  userObject.gender = document.getElementById('user-gender').value;
  userObject.description = document.getElementById('user-bio').value;
  userObject.interested_in_f = document.getElementById('female').checked;
  userObject.interested_in_m = document.getElementById('male').checked;
  userObject.interested_in_o = document.getElementById('non-binary').checked;

  updateUserPhoto();
}

//Load Interest Options
function getInterests() {
  fetch(`${window.location.origin}/api/interests`)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        let input = document.createElement("input");
        let label = document.createElement("label");
        let interestDiv = document.createElement("div");

        input.setAttribute("class", "form-check-input")
        input.setAttribute("type", "checkbox")
        input.setAttribute("name", `interest-${data[i].id}`)
        input.setAttribute("value", `${data[i].id}`)
        input.setAttribute("id", `interest-${data[i].id}`)
        label.setAttribute("for", `interest-${data[i].id}`)
        label.textContent = `${data[i].interest_name}?`
        label.setAttribute("class", "form-check-label")
        interestDiv.setAttribute("class", "form-check")

        interestDiv.appendChild(input)
        interestDiv.appendChild(label)

        document.getElementById("interestContainer").appendChild(interestDiv)
      }
    })
    .then(checkMyInterests)
    .catch(err => console.log(err))
}

function checkMyInterests() {
  fetch(`${window.location.origin}/api/users/${userId}`)
    .then(response => response.json())
    .then(userData => {
      const interestIds = userData.users_interests.map(x => x.id);
      const interestContainer = document.getElementById('interestContainer');
      const inputEls = interestContainer.querySelectorAll("input");

      inputEls.forEach(inputEl => {
        if (interestIds.includes(parseInt(inputEl.value))) {
          inputEl.checked = true;
        }
      })
    })
    .catch(err => console.log(err));
}

function getTurnOffs() {
  fetch(`${window.location.origin}/api/turnoffs`)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      for (let i = 0; i < data.length; i++) {
        let input = document.createElement("input");
        let label = document.createElement("label");
        let turnoffDiv = document.createElement("div");

        input.setAttribute("class", "form-check-input")
        input.setAttribute("type", "checkbox")
        input.setAttribute("name", `turnoff-${data[i].id}`)
        input.setAttribute("value", `${data[i].id}`)
        input.setAttribute("id", `turnoff-${data[i].id}`)
        label.setAttribute("for", `turnoff-${data[i].id}`)
        label.textContent = `${data[i].turnoff_name}?`
        label.setAttribute("class", "form-check-label")
        turnoffDiv.setAttribute("class", "form-check")

        turnoffDiv.appendChild(input)
        turnoffDiv.appendChild(label)

        document.getElementById("turnOffContainer").appendChild(turnoffDiv)
      }
    })
    .then(checkMyTurnoffs)
    .catch(err => console.log(err))
}

//WIP START
function checkMyTurnoffs() {
  fetch(`${window.location.origin}/api/users/${userId}`)
    .then(response => response.json())
    .then(userData => {
      const turnoffIds = userData.users_turnoffs.map(x => x.id);
      const turnoffContainer = document.getElementById('turnOffContainer');
      const inputEls = turnoffContainer.querySelectorAll("input");

      inputEls.forEach(inputEl => {
        if (turnoffIds.includes(parseInt(inputEl.value))) {
          inputEl.checked = true;
        }
      })
    })
    .catch(err => console.log(err));

}
//WIP END

getInterests();
getTurnOffs();

//update userObject data

function updateUserPhoto() {
  //console.log(userObject);
  let pictureInput = document.querySelector("#profile-picture");
  if (pictureInput.files[0]) {
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dly1i5lwp/image/upload'
    const CLOUDINARY_UPLOAD_PRESET = 'z8p6o8pb'
    const file = pictureInput.files[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        userObject.profile_picture_src = data.url

        updateUser();
      })
      .catch(err => console.log(err));
  }

  else {
    let currentPhotoSrc = document.getElementById("currentPhoto").getAttribute("src")
    userObject.profile_picture_src = currentPhotoSrc
    updateUser();
  }
}

function updateUser() {
  fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObject)
  })
    .then(updateUserInterests)
    .then(updateUserTurnoffs)
    .then(res => window.location.reload())
    .catch(err => console.log(err))
};

function updateUserInterests() {
  const interestContainer = document.getElementById('interestContainer');
  const inputEls = interestContainer.querySelectorAll("input");
  const arr = []
  
  inputEls.forEach(inputEl => {
    if (inputEl.checked) {
      arr.push(inputEl.value);
    }
  })
  
  const reqBody = { interest_ids: arr }
  
  if (arr.length) {
    fetch(`/api/users/interests`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })
  }
}

function updateUserTurnoffs() {
  const turnoffContainer = document.getElementById('turnOffContainer');
  const inputEls = turnoffContainer.querySelectorAll("input");
  const arr = []
  
  inputEls.forEach(inputEl => {
    if (inputEl.checked) {
      arr.push(inputEl.value);
    }
  })
  
  const reqBody = {	"turnoff_ids": arr }
  
  if (arr.length) {
    fetch(`/api/users/turnoffs`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })
  }
}

document.getElementById('updateProfilebtn').addEventListener('click', profileUpdateFormHandler);