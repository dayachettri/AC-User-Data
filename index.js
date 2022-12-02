let data = [];
let count = 0;
let show;

const nameInput = document.querySelector('.name-input');
const panInput = document.querySelector('.pan-input');
const ageInput = document.querySelector('.age-input');
const qualInput = document.querySelector('.qual-input');
const form = document.querySelector('.input-data');
const userData = document.querySelector('.user-data');
const searchInput = document.querySelector('#search-input');
const select = document.querySelector('#sort');

// Load from local storage
window.addEventListener('load', function () {
  show = JSON.parse(localStorage.getItem('data'));
  console.log(show);
  userData.innerHTML = '';
  for (let i = 0; i < show.length; i++) {
    userData.innerHTML += `
  <ul>
    <li><span>NAME:</span>${show[i].name}</li>
    <li><span>PAN:</span>${show[i].pan}</li>
    <li><span>AGE:</span>${show[i].age}</li>
    <li><span>DEGREE:</span>${show[i].qual}</li>
  </ul> `;
  }
});

// Create user data
const createUser = function (e) {
  e.preventDefault();
  const myHTML = `
  <ul data-id="${count}">
    <li><span>NAME:</span>${nameInput.value}</li>
    <li><span>PAN:</span>${panInput.value}</li>
    <li><span>AGE:</span>${ageInput.value}</li>
    <li><span>DEGREE:</span>${qualInput.value}</li>
  </ul>  
`;
  const myFragment = document.createRange().createContextualFragment(myHTML);
  userData.appendChild(myFragment);
  const user = {
    name: nameInput.value,
    pan: panInput.value,
    age: ageInput.value,
    qual: qualInput.value,
    id: count++,
  };
  data.push(user);
  localStorage.setItem('data', JSON.stringify(data));
  form.reset();
};

// Delete function (working but not used)
// const deleteUser = e => {
//   data.forEach((item, index) => {
//     if (e.target.parentElement.dataset.id == data[index].id) {
//       data.splice(index, 1);
//       e.target.parentElement.remove();
//     }
//   });
// };

// Function to render searched user data
let filteredData = [...data];
const displayUser = () => {
  if (filteredData.length < 1) {
    userData.innerHTML = `<h6>Sorry, no user matched your search</h6>`;
    return;
  }
  userData.innerHTML = filteredData.map(data => {
    const { name, pan, age, qual } = data;
    return `
  <ul>
    <li><span>NAME:</span>${name}</li>
    <li><span>PAN:</span>${pan}</li>
    <li><span>AGE:</span>${age}</li>
    <li><span>DEGREE:</span>${qual}</li>
  </ul> `;
  });
  // .join();
};

// Add event listener to searchinput and render according to the searched value
searchInput.addEventListener('keyup', e => {
  e.preventDefault();
  const inputValue = searchInput.value;
  filteredData = data.filter(data => {
    return data.pan.includes(inputValue);
  });
  displayUser();
});

// SORT DATA
// sort Data Ascending
const sortDataAscending = function () {
  data.sort(function (a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

// Sort Data Descending
const sortDataDescending = function () {
  data.sort(function (a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
};

// render sorted data
const renderSortedData = function (e) {
  userData.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    userData.innerHTML += `
  <ul>
    <li><span>NAME:</span>${data[i].name}</li>
    <li><span>PAN:</span>${data[i].pan}</li>
    <li><span>AGE:</span>${data[i].age}</li>
    <li><span>DEGREE:</span>${data[i].qual}</li>
  </ul> `;
  }
};

// add event handler select input and accordingly sort and render
select.addEventListener('change', function (e) {
  e.preventDefault();
  if (select.value === 'A-Z') {
    sortDataAscending();
    renderSortedData();
  }
  if (select.value === 'Z-A') {
    sortDataDescending();
    renderSortedData();
  }
});

form.addEventListener('submit', createUser);
// userData.addEventListener('click', deleteUser);
