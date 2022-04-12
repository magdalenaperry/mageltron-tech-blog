const createPostBtn = document.querySelector('.create-post');
const createPostEl = document.querySelector('#create-post');
createPostEl.style.display = 'none';

const createPost = function () {
  createPostBtn.style.display = 'none';
  createPostEl.style.display = 'block'
}

async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('#post_title').value.trim();
  const post_body = document.querySelector('#post_body').value.trim();
  const response = await fetch(`/newpost`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_body
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    console.log(response)
    document.location.replace('/posts');
  } else {
    alert('Failed to add post');
  }
}

document.querySelector('.add-post').addEventListener('submit', newFormHandler);
document.querySelector('.create-post').addEventListener('click', createPost);