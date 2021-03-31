async function sendFlowersHandler(event) {
  const reqBody = {}
  reqBody.recipient_id = event.target.getAttribute('data-attribute-id');

  let res = await fetch(`${window.location.origin}/api/users/send-flowers`, {
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

document.querySelectorAll('.send-flowers-btn').forEach(btn => btn.addEventListener('click', sendFlowersHandler));