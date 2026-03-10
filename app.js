let transactions = JSON.parse(localStorage.getItem("transactions")) || []

function save(){
localStorage.setItem("transactions",JSON.stringify(transactions))
}

/* ADD TRANSACTION */

document.getElementById("form")?.addEventListener("submit",function(e){

e.preventDefault()

const text=document.getElementById("text").value
const amount=+document.getElementById("amount").value
const category=document.getElementById("category").value

transactions.push({
id:Date.now(),
text,
amount,
category,
date:new Date()
})

save()

alert("Transaction added!")

})

/* DASHBOARD */

let balance=0
let income=0
let expense=0

transactions.forEach(t=>{
balance+=t.amount
if(t.amount>0) income+=t.amount
else expense+=t.amount
})

document.getElementById("balance")&&(balanceEl=document.getElementById("balance").innerText="₹"+balance)
document.getElementById("income")&&(document.getElementById("income").innerText="₹"+income)
document.getElementById("expense")&&(document.getElementById("expense").innerText="₹"+Math.abs(expense))

/* HISTORY */

const list=document.getElementById("list")

if(list){

transactions.forEach(t=>{

const li=document.createElement("li")

li.innerHTML=`${t.text} (${t.category}) <span>₹${t.amount}</span>`

list.appendChild(li)

})

}

/* AI EXPENSE PREDICTION */

const prediction=document.getElementById("prediction")

if(prediction){

let totalExpense=0
let count=0

transactions.forEach(t=>{
if(t.amount<0){
totalExpense+=Math.abs(t.amount)
count++
}
})

let avg=count?totalExpense/count:0

prediction.innerText="Predicted next expense: ₹"+Math.round(avg)

}

/* MONTHLY BUDGET */

const budget=document.getElementById("budget")

if(budget){

let monthlyBudget=20000

let spent=transactions
.filter(t=>t.amount<0)
.reduce((a,b)=>a+Math.abs(b.amount),0)

budget.innerText="Remaining budget: ₹"+(monthlyBudget-spent)

}

/* SPLITWISE FEATURE */

function splitExpense(){

const members=document.getElementById("members").value.split(",")

const amount=parseFloat(document.getElementById("groupAmount").value)

const each=amount/members.length

document.getElementById("result").innerText="Each pays ₹"+each.toFixed(2)

}
