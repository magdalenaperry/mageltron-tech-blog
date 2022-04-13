async function newFormHandler(event) {
  event.preventDefault();
  const comment_body = document.querySelector('#comment_body').value.trim();
  const post_id = window.location.toString().split('/')[4];

  const response = await fetch(`/newcomment`, {
    method: 'POST',
    body: JSON.stringify({
      comment_body,
      post_id,

    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace(`/posts/${post_id}`);
  } else {
    alert('Failed to add comment');
  }
}

document.querySelector('.add-comment').addEventListener('submit', newFormHandler);