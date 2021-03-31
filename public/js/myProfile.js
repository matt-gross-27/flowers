//Var object storage
let userObject = {};

function profileUpdateFormHandler(event) {
  event.preventDefault();
  //1. account settings
  //ADD IMAGE UPLOADER
  userObject.email = document.getElementById('user-email').value.trim();
  userObject.password = document.getElementById('user-password').value.trim();

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

    .catch(err => console.log(err))
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

    .catch(err => console.log(err))
}

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
  let userId = document.getElementById('userId').getAttribute("data-attribute-id")
  fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObject)
  })
    .then(res => {
      window.location.reload();
    })

    .catch(err => {
      console.log(err);
    })
};



document.getElementById('updateProfilebtn').addEventListener('click', profileUpdateFormHandler);