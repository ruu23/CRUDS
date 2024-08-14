let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
let submit = document.getElementById("submit");
let table = document.getElementById('tbody');

//mood
let mood = 'create';

//global variable
let temp;

//console.log(title, price, taxes, ads, discount, total, count, category, search);

//call showData function


// GET TOTAL
function getTotal()
{
  if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#990000';
    total.style.color = 'white'
  }else{
    total.innerHTML = '';
    total.style.background = '#cd4466';
  }
  
}

// CREATE
let products;
  if(localStorage.product != null){
    products = JSON.parse(localStorage.product) //retrieve data and convert from json to object 
  }else{
    products = []
  }

submit.onclick = function(){
  ///DO VALIDATION FIRST
  if ([title.value, price.value, taxes.value, ads.value, discount.value, count.value, category.value].some(value => value !== '')){
  let product = {
    //id: Date.now(),
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML, //bc it is small not input
    count: count.value,
    category: category.value.toLowerCase()
  }
  if(mood === 'create'){
    if(count.value > 1){
      for(let i = 0; i < count.value; i++){
        products.push(product);
      }
    }else{
      products.push(product);
    } //add it to array
  }else if(mood === 'update'){
    products[temp] = product;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display = 'block'
  }
    

  localStorage.setItem('product', JSON.stringify(products)) //convert to json to store it
  clear();
  showData();
  countItems(); 
  
 
}
}

//clear
function clear(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  total.style.background = '#cd4466';
  count.value = '';
  category.value = '';
}

//read
function showData(){
  
  table.innerHTML = '';
  
  
  products.forEach((product, index) => {
    table.innerHTML += `
    <tr>
    <td>${index}</td>
    <td>${product.title}</td>
    <td>${product.price}</td>
    <td>${product.taxes}</td>
    <td>${product.ads}</td>
    <td>${product.discount}</td>
    <td>${product.total}</td>
    
    <td>${product.category}</td>
    <td id="update"><button onclick = "updateData(${index})">Update</button></td>
    <td id="delete"><button onclick="deleteData(${index})">Delete</button></td>
    </tr>`
  });

  let btnDelete = document.getElementById('btn-delete');
  if(products.length > 0){
    btnDelete.innerHTML = `<button onclick = "deleteAll()">Delete All (${products.length})</button>`
  }
}

showData()

//DELETE ONE ITEM
function deleteData(index){
  products.splice(index, 1); //delete from array
  localStorage.product = JSON.stringify(products); //delete from local storage
  showData();
}

//DELETE ALL
function deleteAll(){
  //remove from array
  products.splice(0);
  //remove from local storage
  localStorage.clear();

  showData();
}

///COUNT 

//UPDATE
function updateData(index){
  title.value = products[index].title;
  price.value = products[index].price;
  taxes.value = products[index].taxes;
  ads.value = products[index].ads;
  discount.value = products[index].discount;
  getTotal(); 
  count.style.display = 'none';
  category.value = products[index].category;
  submit.innerHTML =  'update'
  mood = 'update'
  temp = index;
  scroll({
    top: 0,
    behavior: 'smooth'
  })

}
//SEARCH
let searchMood = 'title';

function searchBy(id) {
    if (id === 'title-search') {
      searchMood = 'title';
      search.placeholder = 'search by title'; 
    } else if (id === 'category-search') {
      searchMood = 'category';
      search.placeholder = 'search by category'; 
    }
    search.focus();
    search.value = ""; //after search we remove data
    showData();//and show data again
}


function searchItem(value){
  table.innerHTML = '';
  if(searchMood == 'title'){
    for(let i = 0; i < products.length; i++){
      if(products[i].title.includes(value.toLowerCase())){
          table.innerHTML += `
          <tr>
          <td>${i}</td>
          <td>${products[i].title}</td>
          <td>${products[i].price}</td>
          <td>${products[i].taxes}</td>
          <td>${products[i].ads}</td>
          <td>${products[i].discount}</td>
          <td>${products[i].total}</td>
          
          <td>${products[i].category}</td>
          <td id="update"><button onclick = "updateData(${i})">Update</button></td>
          <td id="delete"><button onclick="deleteData(${i})">Delete</button></td>
          </tr>`;
        
      }
    }
  }else if(searchMood == 'category'){
    for(let i = 0; i <= products.length; i++){
      if(products[i].category.includes(value.toLowerCase())){
        table.innerHTML += `
          <tr>
          <td>${i}</td>
          <td>${products[i].title}</td>
          <td>${products[i].price}</td>
          <td>${products[i].taxes}</td>
          <td>${products[i].ads}</td>
          <td>${products[i].discount}</td>
          <td>${products[i].total}</td>
          
          <td>${products[i].category}</td>
          <td id="update"><button onclick = "updateData(${i})">Update</button></td>
          <td id="delete"><button onclick="deleteData(${i})">Delete</button></td>
          </tr>`;
      }
    }
  }
  
}
