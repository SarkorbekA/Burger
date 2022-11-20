const product = {
    plainBurger:{
        name:'Гамбургер простой',
        price: 10000,
        kcall:500,
        amount:0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall1(){
            return this.kcall * this.amount;
        }
    },
    freshBurger:{
        name:'Гамбургер FRESH',
        price: 20500,
        kcall: 1000,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall1(){
            return this.kcall * this.amount;
        }
    },   
    freshCombo:{
        name:'FRESH COMBO',
        price: 31900,
        kcall: 1500,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall1(){
            return this.kcall * this.amount;
        }
    }
}

const extraProduct = {
    doubleMayonnaise:{
        name:'Двойной майонез',
        price: 500,
        kcall:50
    },
    lettuce:{
        name:'Салатный лист',
        price: 400,
        kcall:5
    },
    cheese:{
        name:'Сыр',
        price: 1500,
        kcall:1000
    }
}

const btnPluseOrMinus = document.querySelectorAll('.main__product-btn');
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
const addCart = document.querySelector('.addCart');

for (let i = 0; i < btnPluseOrMinus.length; i++){
    btnPluseOrMinus[i].addEventListener('click', function() {
        PluseOrMinus(this)
    })
}
function PluseOrMinus(element) {
    let parentID = element.closest('.main__product').getAttribute('id');
    let out = element.closest('.main__product').querySelector('.main__product-num');
    let price = element.closest('.main__product').querySelector('.main__product-price span');
    let kcall = element.closest('.main__product').querySelector('.main__product-call span');
if (element.getAttribute('data-symbol') == '+' && product[parentID].amount < 10) {
    product[parentID].amount++;
}
else if(element.getAttribute('data-symbol') == '-' && product[parentID].amount > 0) {
    product[parentID].amount--;
}
out.innerHTML = product[parentID].amount;
price.innerHTML = product[parentID].summ;
kcall.innerHTML = product[parentID].Kcall1;
}



const cherckExtraProduct = document.querySelectorAll('.main__product-checkbox');
for(let i = 0; i < cherckExtraProduct.length; i++){
    cherckExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this);
    })
}

function addExtraProduct(el) {
    const parent = el.closest('.main__product');
    const parentId = parent.getAttribute('id');
    
    product[parentId][el.getAttribute('data-extra')] = el.checked;

    const kcall = parent.querySelector('.main__product-call span');
    const price = parent.querySelector('.main__product-price span');
    const elDataInfo = el.getAttribute('data-extra');
if (product[parentId][elDataInfo] == true) {
    product[parentId].kcall += extraProduct[elDataInfo].kcall;
    product[parentId].price += extraProduct[elDataInfo].price;
}
else{
    product[parentId].kcall -= extraProduct[elDataInfo].kcall;
    product[parentId].price -= extraProduct[elDataInfo].price;
}
price.innerHTML = product[parentId].summ;
kcall.innerHTML = product[parentId].Kcall1;
}
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptWindowOut = document.querySelector('.receipt__window-out');
let arrProduct = [];
let totalName = '';
let totalPrice = 0;
let totalKcall = 0;
let totalAmount = 0;
addCart.addEventListener('click', function() {
    for(const key in product){ 
        const productObj = product[key];
        if(productObj.amount > 0){
            arrProduct.push(productObj);
            for(const newKey in productObj){
                // console.log(productObj[newKey]);
                if(productObj[newKey] === true){
                    productObj.name += '\n' +  extraProduct[newKey].name;
                }
            }
        }
        productObj.price = productObj.summ;
        productObj.kcall = productObj.Kcall1;
        productObj.amount = productObj.amount;
    }
    
    for (let i = 0; i < arrProduct.length; i++) {
        const el = arrProduct[i];
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += '\n' + el.name + '\n';
        totalAmount += el.amount;
    }

    receiptWindowOut.innerHTML = `Вы купили: \n ${totalName} \n \n Калларийность: ${totalKcall} \n \n Стоимость покупки: ${totalPrice} сумм \n \n Колучество: ${totalAmount} штук`;

    receipt.style.display = 'flex';
    
    setTimeout(function() {
        receipt.style.opacity = '10';
    }, 100);
    setTimeout(function() {
        receiptWindow.style.top = '10%';
    }, 500);
})
