$(document).ready(function() {});

const template = `
<div class="col-sm-4">
    <div class="card mb-3">
        <img src="{{profile_picture_src}}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{email}}</h5>
            <p class="card-text">{{first_name}} {{last_name}}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
</div>`;

const hbTemplate = Handlebars.compile(template);

const loadUsers = (users) => {
    $('.user-list').html(users.map(user => hbTemplate(user)));
}

$('#filter-btn').on('click', async function(event) {
    event.preventDefault();

    const filters = $('#filter-form').serialize() +
        '&latitude=37.08929000' +
        '&longitude=-119.38289000';

    console.log('Searching with filter:', filters || 'no filters');

    const users = await $.get(`/api/filter?${filters}`);

    console.log('Results:', users);
    loadUsers(users);
})

$('[name=distance]').on('input', function() {
    $('#distance').html($(this).val() + ' miles');
})