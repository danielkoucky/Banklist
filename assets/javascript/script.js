//  BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//Elements;
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//LECTURES
containerMovements.innerHTML = "";
const dispmove = (move, sorted = false) => {
  const sortedmovemetns = sorted ? move.slice().sort((a, b) => a - b) : move;

  console.log(sorted);
  sortedmovemetns.forEach((v, k) => {
    let depowith = v;
    v > 0 ? (depowith = "deposit") : (depowith = "withrow");
    /* console.log(depowith); */
    const transactionType = v > 0 ? "deposit" : "withrew";

    containerMovements.insertAdjacentHTML(
      "afterbegin",
      `<div class="movements__row">
          <div class="movements_type movements_type--${transactionType}">${
        k + 1
      } ${transactionType}</div>

          <div class="movements__value">${v}</div>
        </div>`
    );
  });
};

/////////////////////transfertotal
const transfertotal = function (test) {
  balance = test.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${balance}€`;
  balanceText = 0.012 * balance;
  labelSumInterest.textContent = `${balanceText}€`;

  ///////////////////////transfer sum in out and intereset
  const incomess = test.movements
    .filter((f, k) => f > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = incomess;

  const withdrewss = test.movements
    .filter((h) => h < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = Math.abs(withdrewss);

  console.log(test);
};
//////////////////////all functions

const updataui = function (acc) {
  dispmove(acc.movements);
  transfertotal(acc);
};
///////////////////////////shortname
accounts.forEach((accc) => {
  const shortname1 = accc.owner
    .toLowerCase()
    .split(" ")
    .map((acc1) => acc1[0])
    .join("");
  accc.shortname = shortname1;
});
console.log(accounts);
let test;

//////////////////////////////////login function
function clickedfunction(e) {
  test = accounts.find(
    (a) =>
      a.shortname === inputLoginUsername.value &&
      a.pin == Number(inputLoginPin.value)
  );

  if (test) {
    inputLoginUsername.value = inputLoginPin.value = "";
    containerApp.style.opacity = 1;
    labelWelcome.textContent = test.owner;

    updataui(test);
  } else {
    containerApp.style.opacity = 0;
  }

  e.preventDefault();
}

//////////////////////////////// sending money

function sendmoney(e) {
  containerMovements.innerHTML = "";
  e.preventDefault();
  let reciever = accounts.find((a) => a.shortname === inputTransferTo.value);
  console.log(Number(inputTransferAmount.value));
  if (
    Number(inputTransferAmount.value) > 0 &&
    Number(inputTransferAmount.value) < Number(balance) &&
    test.shortname != inputTransferTo.value
  ) {
    reciever.movements.push(Number(inputTransferAmount.value));

    test.movements.push(Number(-inputTransferAmount.value));
  } else {
    alert("You are poor!");
  }
  updataui(test);
  console.log(balance);
}

//////////////////////////loan

function loan(e) {
  containerMovements.innerHTML = "";
  e.preventDefault();
  if (Number(inputLoanAmount.value)) {
    test.movements.push(Number(inputLoanAmount.value));
    updataui(test);
  } else {
    alert("You can not get the loan!");
  }
}

////////////////////////////////////close account
let test1 = undefined;
function closeAccount(e) {
  e.preventDefault();
  test1 = accounts.find(
    (a) =>
      a.shortname === inputCloseUsername.value &&
      a.pin == Number(inputClosePin.value)
  );

  if (test1) {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started";
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputCloseUsername.value = "";
    inputClosePin.value = "";
    updataui(test);
  } else {
    // alert("Wrong details.");
  }
}

btnTransfer.addEventListener("click", sendmoney);

btnLoan.addEventListener("click", loan);
btnClose.addEventListener("click", closeAccount);
btnLogin.addEventListener("click", clickedfunction);

//////////////////flat mehtod
// const arr = [[1, 2, 3], [4, 5, 6, 7], 5, 6, 82, 8];
// console.log(arr.flat());

// const arrdeep = [[1, 2, 3], [4, 5, 6, 7], 5, 6, 82, 8];

// const accuontmovements = accounts.map((acc) => acc.movements);
// // console.log(accuontmovements);
// const allmovements = accuontmovements.flat();
// // console.log(allmovements);
// const accuontmovementsaddition = allmovements.reduce(
//   (acc, mov) => acc + mov,
//   0
// );
// console.log(accuontmovementsaddition);

// //////////////////////for shortcut

// const overallbalance = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallbalance);

// ////////////////////more shortcut with mapflat

// const overallbalance1 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallbalance);

// ////////////////////////////////sorting
// console.log(movements);
// // return < 0,
// // movements.sort((a, b) => {
// //   if (a > b) return -55;
// //   if (b < a) return 55;
// // });
// movements.sort((a, b) => b - a);

// console.log(movements);

/////////////////////////////////////btn for sort
const movements = [430, 1000, 700, 50, 90];
console.log(movements);

////////// if sorting method returns the greater value then zero return < 0 , a,b( keep order)
// return > 0 , b , (switch order)

// movements.sort((a, b) => a - b);
// movements.sort((a, b) => b - a);
// console.log(movements);
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  containerMovements.innerHTML = "";
  dispmove(test.movements, !sorted);
  sorted = !sorted;
});

////////////////////////////////////////numbers
// console.log(3 + +"3");
// let a = "23";
// let b = Number(a);
// let b = +a;

// console.log(typeof b);
//////////////////////paring
// let a = Number.parseInt("100px", 10);
////////////////floating
// let a = Number.parseFloat("2.4px");
// console.log(a);

///////////////////////isNaN
// console.log(isNaN(23 / 0));
// console.log(isNaN(23));
// console.log(isNaN(+"20"));

//////////////////////////is fininite
// console.log(isFinite("14"));
// console.log(isFinite(23 / 0));
//

///////////////////////////is integer
/////////////////////math
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(2 + 2 * 4);
// DMAS
// console.log(3 ** 3);
// it means times
/////////////////////////////////////////max
// console.log(5, 4, 2, 6, 8, 10);
// console.log(Math.max(5, 4, 2, 6, 8, 11, 10));

///////////////////////////////min
////////////////////////////pi
// console.log(Math.PI * Number.parseFloat("10px") ** 2);

//////////////////////////////////////////////
// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomint = (min, max) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;

// console.log(randomint(10, 20));

// it gives number 0 and 1 through random the min max give number between min max and last we add min
//////////////////////////math round rounding of
/////////////////////////math trunc is to be not roung but telling number without decimal
///////////////////math ceil round of if decimal occur like 23.1 then show 24

// console.log(Math.ceil(23.9 ))
/////////////////math.floor remove decimal and shows the actual number

////////////////////////////rounding decimal
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.74567).toFixed(2));
/////////////////////////to fixed showse us the how many decimal numebr we want

//////////////after that we have to use to fixed in project

////////////////////////if you wnat to print large number of data then use  n

// console.log(5435156416156416116314161n)
// otherwise it shows the specific data
// bigint meands biginteger
// console.log(BigInt(5435156416156416116314161));

//////////////////////////////////createing date
// const now = new Date();
// // it shows the current date
// console.log(now);
// ///this shows manuual age
// console.log(new Date("December 24,2015"));
// // changing the time and data
// console.log(2037, 10, 19, 15, 23, 5);
// ////////////////////////////////all date properties
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// // also get data and days hoours get seconds and hours

// ///////////////////////////////////international standered time
// console.log(future.toISOString());

// ///////////////////////also you set year

// future.setFullYear(2040);
// console.log(future);
const now = new Date();
const month = (now.getMonth() + 1).toString().padStart(3, 111); // Ensure month is two digits
const nownow = now
  .toLocaleDateString()
  .replaceAll(".", "/")
  .split(" ")
  .join("");

console.log(nownow);

// labelDate.textContent = nownow.replaceAll(".", "/").split(" ").join("");
