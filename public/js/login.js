const $loginForm = document.querySelector('#login-form');

async function loginFormHandler(event) {
  console.log('Login: ', event);
  event.preventDefault();

  const email = $loginForm.querySelector('#email').value.trim();
  const password = $loginForm.querySelector('#password').value;

  if (email && password) {
    const response = await fetch(`${window.location.origin}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(`incorrect username or password`)
    }
  }
}

$loginForm.addEventListener('submit', loginFormHandler);