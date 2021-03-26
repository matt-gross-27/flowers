$(document).ready(function() {
});

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

$('#filter-form').on('submit', async function(event) {
    event.preventDefault();
    
    const filters = $(this).serialize();

    console.log('Searching with filter:', filters || 'no filters');

    const users = await $.get(`/api/users?${filters}`);

    console.log('Results:', users);
    loadUsers(users);
})