let chatForm = document.getElementById("chat-form")

async function sendMessage(event) {
  event.preventDefault()

  const recipient_id = document.location.pathname.split('/')[
    document.location.pathname.split('/').length -1
  ];

  const message_text = document.querySelector("#chat-input").value.trim();

  if (message_text) {
    const res = await fetch(`${window.location.origin}/api/messages/`, {
      method: "POST",
      body: JSON.stringify({ recipient_id, message_text }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      document.location.reload();
    } else {
      alert(res.statusText);
    }
  }
}

chatForm.addEventListener('submit', sendMessage)

$("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);

$("#chat-input").focus();