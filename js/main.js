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
const editFormEl = document.forms[0];

async function init() {
  getUsersAndGenerateList();
}
init();

//  Event Listeners

editFormEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { id, name, town, age } = editFormEl.elements;
  const updatedUserObj = {
    name: name.value,
    town: town.value,
    age: age.value,
  };
  const resp = await fetch(`${usersUrl}/${id.value}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUserObj),
  });
  console.log('resp ===', resp);
  // jei resp. ok

  getUsersAndGenerateList();
});

// Functions =================================================================

async function getUsersAndGenerateList() {
  const users = await getUsersFromApi(usersUrl);
  generuokSarasoHtml(users);
}

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
  editButtonEl.addEventListener('click', () => editUser(user));
  liEl.append(editButtonEl, deleteButtonEl);
  return liEl;
}

async function deleteUser(id) {
  console.log('deleteUser function called', id);
  // nusiusti delete fetch uzklausa ir paziureti rezultata
  const resp = await fetch(`${usersUrl}/${id}`, {
    method: 'DELETE',
  });
  console.log('resp ===', resp);
  if (resp.ok) {
    console.log('istrinta sekmingai');
    getUsersAndGenerateList();
  }
}

function editUser(userObj) {
  console.log('editUser userObj ===', userObj);
  // supildom formos laukus editinimui
  editFormEl.elements.name.value = userObj.name;
  editFormEl.elements.age.value = userObj.age;
  editFormEl.elements.town.value = userObj.town;
  editFormEl.elements.id.value = userObj.id;
  editFormEl.dataset.id = userObj.id;
}
