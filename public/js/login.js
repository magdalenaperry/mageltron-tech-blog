const loginFormHandler = async (event) => {
  try {
    event.preventDefault();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      };
    };
  } catch (err) {
    console.log(err);
  }
};


// SIGN UP ---UPDATED
const signupFormHandler = async (event) => {
  try {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response)

      if (response.ok) {
        document.location.replace('/');
      } else if (password.length < 8) {
        console.log('password length is less than 8')
        // password is too short or same email is used
      } else {
        alert('Failed to sign up.');
      }
    }
  } catch (err) {
    console.log(err);
  }
};



document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler, console.log('heyy'));

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler, console.log('sup'));