const updateCommentHandler = async function (event){
  console.log('hi')
};

const deleteCommentHandler = async function (event){
  console.log('yo')
};



// async function newFormHandler(event) {
//   event.preventDefault();
//   const comment_body = document.querySelector('#comment_body').value.trim();
//   // need user_id, and post_id to successfully post!
//   const post_id = window.location.toString().split('/')[4];
//   const user_id = 3
//   console.log(post_id);

//   const response = await fetch(`/updatecomment`, {
//     method: 'POST',
//     body: JSON.stringify({
//       comment_body,
//       post_id,
//       user_id

//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   if (response.ok) {
//     console.log(response)
//     document.location.replace(`/posts/${post_id}`);
//   } else {
//     alert('Failed to add comment');
//   }
// }

document.querySelector('.update-comment').addEventListener('submit', updateCommentHandler);
document.querySelector('.delete-comment').addEventListener('submit', deleteCommentHandler);
