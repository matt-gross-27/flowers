$(document).ready(function () { });
let savedUsers;

const template = `
<div class="col-sm-6 col-md-4">
  <div class="card mb-3 user-card" data-user="{{id}}">
    <img src="{{profile_picture_src}}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{first_name}} {{last_name}}, {{age}}</h5>
      <p class="card-text">{{description}}</p>
      {{#if sentFlowers}}
      <em>Flowers sent</em>
      {{else}}
      <a href="#" class="btn btn-primary send-flowers">Send Flowers</a>
      {{/if}}
    </div>
  </div>
</div>`;

let currentUser;

async function init() {
  const user = await $.get('/api/users/current-user');
  currentUser = user;
  showUsers();
}

init();

const hbTemplate = Handlebars.compile(template);

const flowersSent = user => !currentUser.sent_flowers_to.find(({ id }) => id == user.id);
const loadUsers = (users) => {
  savedUsers = users;
  /*savedUsers = users.map(user => {
      if (currentUser.sent_flowers_to.find(({ id }) => id == user.id)) {
          user.sentFlowers = true;
      }
      return user;
  }) */

  const filteredUsers = users
    /*.filter(flowersSent)*/
    .map(user => hbTemplate(user))
  $('.user-list').html(filteredUsers.length ?
    filteredUsers :
    'There are no users around you ');

}

$('#filter-btn').on('click', async function (event) {
  event.preventDefault();
  const form = $('#filter-form');


  const filters = form.serialize() +
    '&latitude=37.08929000' +
    '&longitude=-119.38289000';

  showUsers(filters);
  saveUserPreferences(form);

  const modal = $('#exampleModal').modal('hide');
})

async function showUsers(filters) {
  const url = filters ? `/api/filter?${filters}` : '/api/users'
  const users = await $.get(url);

  loadUsers(users);
}

async function saveUserPreferences(form) {
  const data = form.serializeArray()
    .reduce((acum, { name, value }) => {
      try {
        acum[name] = JSON.parse(value);
      } catch (error) {
        acum[name] = value;
      }
      return acum;
    }, {});

  const resp = await $.ajax({
    url: '/api/users',
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({
      id: currentUser.id,
      ...data,
      interested_in_m: Boolean(data['interested_in_m']),
      interested_in_f: Boolean(data['interested_in_f']),
      interested_in_o: Boolean(data['interested_in_o']),
    }),
  });

  currentUser = resp.user;
}

$('[name=distance]').on('input', function () {
  $('#distance').html($(this).val() + ' miles');
})

$(document).on('click', '.send-flowers ', async function (event) {
  event.preventDefault();

  // const recipient_id = $(this).closest('.user-card').data('user');
  const recipient_id = $(this).attr("value");
  console.log(recipient_id);

  currentUser = await $.ajax({
    url: '/api/users/send-flowers',
    method: 'PUT',
    data: { recipient_id }
  });

  loadUsers(savedUsers);
});

