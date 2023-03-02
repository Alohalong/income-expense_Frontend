const balance = document.getElementById("balance");
const money_plus = document.getElementById("money_plus");
const money_minus = document.getElementById("money_minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dataTransaction = [
//   { id: 1, text: "snack", amount: -100 },
//   { id: 2, text: "rent", amount: -3000 },
//   { id: 3, text: "salary", amount: +18000 },
//   { id: 4, text: "freelane", amount: +2000 },
// ];

let transaction = []

function init() {
  list.innerHTML = ''
  transaction.forEach(addToDoList);
  calculateMoney()
}

function addToDoList(transaction) {
  const symbol = transaction.amount < 0 ? "-" : "+";
  const status = transaction.amount < 0 ? "minus" : "plus";
  const items = document.createElement("li");
  const result = formatNumber(Math.abs(transaction.amount))
  items.classList.add(status);
  items.innerHTML = `${transaction.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transaction.id})">x</button>`;
  list.appendChild(items);
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function autoID(){
    return Math.floor(Math.random() * 1000000)
}

function calculateMoney() {
  const amounts = transaction.map((transaction) => transaction.amount);
  // คำนวนยอดคงเหลือ
  const total = amounts.reduce((result, items) => result + items, 0).toFixed(2);
  console.log(total);
  // คำนวนรายรับ
  const income = amounts
    .filter((items) => items > 0)
    .reduce((result, items) => result + items, 0)
    .toFixed(2);
  console.log(income);
  //รายจ่าย
  const expense = amounts
    .filter((items) => items < 0)
    .reduce((result, items) => result + items, 0)
    .toFixed(2);
  console.log(expense);

  balance.innerText = `฿` + formatNumber(total);
  money_minus.innerText = `฿`+ formatNumber(expense);
  money_plus.innerText = `฿`+ formatNumber(income);
}

function removeData(id){
    transaction = transaction.filter(transaction=>transaction.id !== id)
    init()
}


function addTransaction(e){
    e.preventDefault()
    if(text.value.trim() === '' || amount.value.trim()  === ''){
        alert("กรุณาป้อนข้อมูลให้ครบ")
    }else{
        const data ={
            id:autoID(),
            text:text.value,
            amount:+amount.value
        }
        
        transaction.push(data)
        // console.log(transaction)
        addToDoList(data)
        calculateMoney()
        text.value = ''
        amount.value = ''
    }
}

form.addEventListener('submit',addTransaction)
init();
