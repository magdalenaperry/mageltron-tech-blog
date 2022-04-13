const loginEl = document.querySelector('#login');
// const signupLink = document.querySelector('#link-signup');
const signUpEl = document.querySelector('#signup');
// signUpEl.style.display = 'none';

const showSignUp = function (){
  loginEl.style.display = 'none';
  signUpEl.style.display = 'block';
}






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
      // console.log(response);
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

      if (response.ok) {
        document.location.replace('/');
      } else if (password.length < 8) {
        alert('password length is less than 8 characters')
      } else {
        alert('Failed to sign up.');
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// document
// .getElementById('link-signup')
// .addEventListener('click', showSignUp);

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
