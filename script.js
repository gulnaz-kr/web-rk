let users = localStorage.getItem('users');
if (!users) users = [];
else users = JSON.parse(users);

function checkLogout() {
  let user = localStorage.getItem('user');
  if (!user) return;
  user = JSON.parse(user);
  const find = users.find((u) => u.email === user.email && u.password === user.password);
  if (!find) {
    localStorage.removeItem('user');
    return;
  }
  window.location.href = 'index.html';
}

function checkLogin() {
  let user = localStorage.getItem('user');
  if (!user) window.location.href = 'login.html';
  else {
    user = JSON.parse(user);
    const find = users.find((u) => u.email === user.email && u.password === user.password);
    if (find) return;
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }
}

function setupRegister() {
  const registerForm = document.getElementById('register-form');
  registerForm.addEventListener('submit', register);
}

function register(event) {
  event.preventDefault();
  const registerForm = document.getElementById('register-form');
  const error = document.getElementById('error');
  const name = registerForm.elements.username.value;
  const email = registerForm.elements.email.value;
  const password = registerForm.elements.password.value;
  const user = { name, email, password };
  const isRegistered = users.some((v) => v.email === email);
  if (isRegistered) {
    error.style.display = 'block';
  } else {
    users.push(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'index.html';
  }
}

function setupLogin() {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', login);
}

function login(event) {
  event.preventDefault();
  const loginForm = document.getElementById('login-form');
  const errorNoMatch = document.getElementById('error-nomatch');
  const errorNoReg = document.getElementById('error-noreg');
  const email = loginForm.elements.email.value;
  const password = loginForm.elements.password.value;
  const find = users.find((v) => v.email === email);
  if (!find) {
    errorNoReg.style.display = 'block';
  } else {
    if (find.password !== password) {
      errorNoMatch.style.display = 'block';
      return;
    }
    localStorage.setItem('user', JSON.stringify(find));
    window.location.href = 'index.html';
  }
}

function setupContent() {
  const username = document.getElementById('username');
  const user = JSON.parse(localStorage.getItem('user'));
  username.innerHTML = user.name;

  const insert = document.getElementById('content');
  fetch('content.json', { method: 'GET' })
    .then((response) => response.json())
    .then((content) => {
      content.forEach((movie) =>
        insert.insertAdjacentHTML(
          'beforeend',
          `
            <div class="col-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="${movie.image}"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">${movie.name}</h5>
                  <p class="card-text">${movie.description}</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
      `,
        ),
      );
    });
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}
