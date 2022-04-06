async function newFormHandler(event) {
  event.preventDefault();
  const comment_body = document.querySelector('#comment_body').value.trim();
  // need user_id, and post_id to successfully post!
  const response = await fetch(`/api/comments/newcomment`, {
    method: 'POST',
    body: JSON.stringify({
      // title,
      comment_body
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    console.log(response)
    document.location.replace('/api/comments');
  } else {
    alert('Failed to add comment');
  }
}

document.querySelector('.add-comment').addEventListener('submit', newFormHandler);