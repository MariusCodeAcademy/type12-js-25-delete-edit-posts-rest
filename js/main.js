'use strict';
console.log('main.js');

const dummyUsers = [
  { id: 1, name: 'John', age: 24, town: 'London' },
  { id: 2, name: 'Jill', age: 34, town: 'Dublin' },
  { id: 3, name: 'Mike', age: 31, town: 'Capetown' },
  { id: 4, name: 'Serbentautas', age: 18, town: 'Neveronys' },
];

const usersUrl = 'http://localhost:8001/users';

// Taikomes =================================================================
const listEl = document.getElementById('usersList');

async function init() {
  const users = await getUsersFromApi(usersUrl);
  generuokSarasoHtml(users);
}
init();

// Functions =================================================================

// parsisiusti users masyva is 'http://localhost:8001/users'

async function getUsersFromApi(url) {
  const resp = await fetch(url);
  const users = await resp.json();
  console.log('users ===', users);
  return users;
}

// sugeneruoti sarasa su createElement
function generuokSarasoHtml(users) {
  listEl.innerHTML = '';
  users.forEach((user) => listEl.append(makeOneLi(user)));
}

function makeOneLi(user) {
  const liEl = document.createElement('li');
  liEl.textContent = `${user.name} is ${user.age} years old. Originally from ${user.town}.`;
  const deleteButtonEl = document.createElement('button');
  deleteButtonEl.textContent = 'Delete';
  deleteButtonEl.addEventListener('click', () => deleteUser(user.id));
  const editButtonEl = document.createElement('button');
  editButtonEl.textContent = 'Edit';
  liEl.append(editButtonEl, deleteButtonEl);
  return liEl;
}

function deleteUser(id) {
  console.log('deleteUser function called', id);
  // nusiusti delete fetch uzklausa ir paziureti rezultata
}

function editUser() {}
