const AddUserBtn = document.getElementById("add-user");
const DoubleMnyBtn = document.getElementById("double");
const ShowMillionairesBtn = document.getElementById("show-millionaires");
const SortBtn = document.getElementById("sort");
const CalculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });


  updateDOM();
};

const showMillionaires =()  => {
    const millionaires = data.filter(user => user.money > 1000000);

    if (millionaires.length === 0) {
        alertify.notify("There are no millionaires in the data.");
      } else {
        alertify.notify(`There are ${millionaires.length} millionaires in the data.`);
      }
      
  
    updateDOM();
  }

const sortMillionaires = () => {
   const millionaires = data.sort((a, b) => {
    return b.money - a.money;
  });
  if (millionaires.length === 0) {
    alertify.notify("There are no millionaires in the data.");
  } else {
    alertify.notify("Millionaires sorted successfully!");
  }

  updateDOM();
};
const deleteUser = (name)  => {
  data = data.filter(user => user.name !== name);
  updateDOM();
}


// Calculate the total wealth
const calculateWealth = () => {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
      wealth
    )}</strong></h3>`;
    main.appendChild(wealthEl);
    alertify.notify(`Total Wealth: ${formatMoney(wealth)}`);
  }
  
  // Add new obj to data arr
  function addData(obj) {
    data.push(obj);
  
    updateDOM();
  }
  
  // Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `
      <strong>${item.name}</strong> ${formatMoney(item.money)}
      <i class="material-icons delete-btn" onclick="deleteUser('${item.name}')">delete</i>
    `;
    main.appendChild(element);
  });
}

  
  // Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatMoney = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  
  AddUserBtn .addEventListener('click', getRandomUser);
  DoubleMnyBtn.addEventListener('click', doubleMoney);
  ShowMillionairesBtn.addEventListener('click', showMillionaires);
  SortBtn.addEventListener('click', sortMillionaires);
  CalculateWealthBtn.addEventListener('click', calculateWealth);