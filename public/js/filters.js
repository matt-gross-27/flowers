$(document).ready(function () { });

let savedUsers;

// HANDLE BARS TEMPLATE FOR ONE CARD
const hbTemplate = Handlebars.compile(`
  <div class="col-12 col-md-6 col-lg-4 col-xl-3">
    <div class="card mb-3 user-card" data-user="{{id}}">
      <img class="search-img" src="{{profile_picture_src}}" class="card-img-top" alt="...">
      <div class="card-body">
        <div class="card-body-text">

        <h5 class="card-title">{{first_name}} {{last_name}}, {{age}}</h5>
        <p class="card-text">
          

          {{description}} <br />
          {{#if users_interests.length}} <strong>Interests:</strong><span class="csl-wrap">{{#each users_interests}}<span class="csl">{{interest_name}}</span>{{/each}}</span><br />{{/if}}
          {{#if users_turnoffs.length}} <strong>Turnoffs:</strong><span class="csl-wrap">{{#each users_turnoffs}}<span class="csl">{{turnoff_name}}</span>{{/each}}</span><br />{{/if}}
        </p>

        </div>
        <button data-attribute-id="{{id}}" id="send-flowers-{{id}}"
                class="btn btn-primary mt-3 w-100 send-flowers-btn" title="Send Flowers"
        >
          Send Flowers 🌹
        </button>
      </div>
    </div>
  </div>`
);

let currentUser;

function loadPreferences() {
  $('input:checkbox').each(function () {
    $(this).attr('checked', currentUser[$(this).attr('id')])
    showFilteredUsers();
  })
}

(async function init() {
  const user = await $.get('/api/users/current-user');
  currentUser = user;

  loadPreferences();
})()

const flowersSent = user => !currentUser.sent_flowers_to.find(({ id }) => id == user.id);

const renderUsers = async (users) => {
  savedUsers = users;

  const filteredUsers = users.map(user => hbTemplate(user))

  const loadRes = await $('.user-list').html(filteredUsers.length ? filteredUsers : 'There are no users around you ');

  let clickedId;

  if (loadRes) {
    // init send flowers buttons
    $('.send-flowers-btn').click(async function () {
      clickedId = this.getAttribute('data-attribute-id');

      const fetchRes = await fetch(`/api/users/send-flowers`, {
        method: 'PUT',
        body: JSON.stringify({ recipient_id: clickedId }),
        headers: { 'Content-Type': "application/json" }
      });

      if (fetchRes.ok) {        
        const data = await fetchRes.json()
        const myMatches = data.user_matches.map(obj => obj.id);
        
        if (myMatches.includes(parseInt(clickedId))) {
          alert(`😀🌹😀 Its a Match! 😀🌹😀`)
          location.replace('/dashboard');
        } else {
          showFilteredUsers();
        }
      } else {
        alert(fetchRes.statusText);
      }
    })
  }
}

async function showFilteredUsers(event) {
  event && event.preventDefault();
  const form = $('#filter-form');

  const { latitude, longitude } = currentUser;

  const filters = form.serialize()
    .replace(/interested_in_\w/g, 'gender') +
    `&latitude=${latitude}` +
    `&longitude=${longitude}`;

  getUsers(filters);
  savePreferences(form);

  $('#exampleModal').modal('hide');
}

$('#filter-btn').on('click', showFilteredUsers)

async function getUsers(filters) {
  const url = filters ? `/api/filter?${filters}` : '/api/users'
  let users = await $.get(url);

  // filter out users whom I have sent flowers/blocks/flags or sent me blocks/flags
  users = users.filter(p => {
    return [
      ...p.sent_block_to,
      ...p.received_block_from,
      ...p.sent_flag_to,
      ...p.received_flag_from,
      ...p.received_flowers_from,
    ]
      .map(u => u.id)
      .includes(currentUser.id) === false
  });

  // only show users who are interested in my gender
  
  users = users.filter(p => {
    return p[`interested_in_${currentUser.gender}`] === true
  });

  renderUsers(users);
}

async function savePreferences(form) {
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