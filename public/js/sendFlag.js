async function sendFlagHandler(event) {
  const reqBody = {}
  reqBody.recipient_id = event.target.getAttribute('data-attribute-id');

  let res = await fetch(`${window.location.origin}/api/users/flag`, {
    method: 'PUT',
    body: JSON.stringify(reqBody),
    headers: { 'Content-Type': "application/json" }
  });

  if (res.ok) {
    document.location.reload();
  } else {
    console.log(res.statusText);
  }
}

document.querySelectorAll('.send-flag-btn').forEach(btn => btn.addEventListener('click', sendFlagHandler));