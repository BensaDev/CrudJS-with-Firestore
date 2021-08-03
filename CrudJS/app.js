const myTable = document.querySelector('.my-table');
const addForm = document.querySelector('#add-form');
const editForm = document.querySelector('#edit-form');
// Empty fileds
function EmptyFiled(){
  nameP.value = "";
  category.value = "";
  quantity.value = "";
}
// Get All input values
let nameP = document.getElementById("name");
let category = document.getElementById("category");
let quantity = document.getElementById("quantity");
// Get data
// dbRef.collection('products').get().then(snapshot => {
//   snapshot.forEach(doc => renderData(doc));
// })
// RealTime Listenner 
dbRef.collection('products').onSnapshot( snapshot =>
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added'){
      renderData(change.doc);
      console.log('added successfully');
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id ='${change.doc.id}']`);
      myTable.removeChild(tr);
      console.log('removed successfully');
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id ='${change.doc.id}']`);
      myTable.removeChild(tr);
      renderData(change.doc);
      console.log('modified successfully');
    }
  })
)
let id;
// Display data in the table
function renderData(doc) {
  let tr = document.createElement('tr');
  tr.setAttribute('data-id' , doc.id);
  const temp = 
  `<td>${doc.data().Name}</td>
  <td>${doc.data().Category}</td>
  <td>${doc.data().Quantity}</td>
  <td class="td">
  <input type="button" value="Edit" class="btn edit">
  <input type="button" value="Delete" class="btn delete">
  </td>`;
  tr.insertAdjacentHTML('beforeend' , temp);
  myTable.appendChild(tr);
  // Edit Product 
  const editBtn = document.querySelector(`[data-id='${doc.id}'] .edit`);
  editBtn.addEventListener('click' , e => {
    document.getElementById('nameE').value = doc.data().Name;
    document.getElementById('categoryE').value = doc.data().Category;
    document.getElementById('quantityE').value = doc.data().Quantity;
    addForm.classList.add('hide');
    editForm.classList.remove('hide');
  });
  const editSubmit = document.querySelector('.edit-btn');
  editSubmit.addEventListener('click' , e =>{
  id = doc.id;
  dbRef.collection('products').doc(id).update({
    Name: document.getElementById("nameE").value,
    Category: document.getElementById("categoryE").value,
    Quantity: document.getElementById("quantityE").value
  });
  });
  // Delete Product
  const deleteBtn = document.querySelector(`[data-id='${doc.id}'] .delete`);
  deleteBtn.addEventListener('click' , e =>{
  for(let i = 1; i < myTable.rows.length; i++){
  myTable.rows[i].onclick = function(){ EmptyFiled(); }
  } 
  dbRef.collection('products').doc(`${doc.id}`).delete();
  });
}
// Add data 
const btnAdd = document.querySelector('.add-btn');
btnAdd.addEventListener('click' , e =>{
e.preventDefault();
dbRef.collection('products').add({
  Name: document.getElementById("name").value,
  Category: document.getElementById("category").value,
  Quantity: document.getElementById("quantity").value
});
EmptyFiled();
});

  // swal({
  //   title: "Command has been sent!!",
  //   text: "success!",
  //   icon: "success",
  //   // Hide it after 3 seconds 
  //   timer: 3000
  //   });


