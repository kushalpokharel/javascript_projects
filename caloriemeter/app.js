//storage controller

//item controller
const ItemCtrl = (function(){

  //item constructor
  const item = function(id,name,calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //data structure / state
  const data = {
    items:[
      {id:0,name:'Steak Dinner', calories:1200},
      {id:1,name:'Cookies', calories:500},
      {id:2,name:'Eggs', calories:400}
    ],
    currentItem: null,
    totalCalories: 0
  }

  //public methods
    return{
    getItems: function(){
      return data.items
    },

    addItems: function(name,calories){
      
      if(data.items.length>0){
        ID = data.items[data.items.length-1].id+1;
      }
      else{
        ID=0;
      }

      console.log(calories);
      calories = parseInt(calories);

      newItem = new item(ID,name,calories);

      data.items.push(newItem);

      console.log(data);

      return newItem;
    },

    returnItems: function(){
      return data;
    },

    getTotalCalories: function(){
      let total = 0;

      data.items.forEach(function(item){
        total +=item.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
    },

    getElementById: function(id){
      let found;
      data.items.forEach(function(item){

        if(item.id === id){
          // console.log('yes');
          // console.log(item);
          found = item;
        }
      
      });
      return found;
    },

    setCurrentItem : function(item){
      data.currentItem = item;
    },

    getCurrentItem: function(){
        return data.currentItem;
    },

    updateItem: function(name,calorie){
      calorie = parseInt(calorie);

      let found =null;

      data.items.forEach(function(item){
        if(item.id===data.currentItem.id){
          item.name = name;
          item.calories = calorie;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(){
      let index;
      data.items.forEach(function(item,ind){
        if(item.id===data.currentItem.id){
          index = ind;
        }
      });
      console.log(index);
      data.items.splice(index,1);
    },
    clearAll: function(){
      data.items = [];
    }
  }

})();

//ui controller
const UICtrl = (function(){

  const UISelectors={
    itemList: "#item-list",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemName: '#item-name',
    itemCalories: '#item-calorie',
    totalCalories: '.total-calories',
    collectionItem:'.collection-item',
    clearBtn:'.clear-btn'
  }

  return{
    populateItemList: function(items){
      let html ="";
      items.forEach(function(item){
        html += `<li class ="collection-item" id="item-${item.id}"> 
        <strong>${item.name}: </strong> <em>${item.calories} calories</em>  
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
        </li>`;
      });
      const list = document.querySelector(UISelectors.itemList);
      list.innerHTML = html;
    },

    getSelectors: function(){
      return UISelectors;
    },

    getInput: function(){
      //console.log(document.querySelector(UISelectors.itemCalories).value);
      return{
        name:document.querySelector(UISelectors.itemName).value,
        calorie:document.querySelector(UISelectors.itemCalories).value,
      }
    },

    addItems: function(item){

      document.querySelector(UISelectors.itemList).style.display = 'block';

      const li = document.createElement('li');
      li.className ='collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} calories</em>  
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;

      const list = document.querySelector(UISelectors.itemList);
      list.appendChild(li);

    },
    clearInput: function(){
      document.querySelector(UISelectors.itemName).value='';
      document.querySelector(UISelectors.itemCalories).value='';
    },

    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function(total){
      document.querySelector(UISelectors.totalCalories).textContent = `${total}`;
    },

    addState: function(){
      document.querySelector(UISelectors.addBtn).style.display='inline';
      document.querySelector(UISelectors.updateBtn).style.display='none';
      document.querySelector(UISelectors.deleteBtn).style.display='none';
      document.querySelector(UISelectors.backBtn).style.display='none';
    },
    updateState: function(){
      document.querySelector(UISelectors.addBtn).style.display='none';
      document.querySelector(UISelectors.updateBtn).style.display='inline';
      document.querySelector(UISelectors.deleteBtn).style.display='inline';
      document.querySelector(UISelectors.backBtn).style.display='inline';
    },
    setFields: function(){
      // console.log(ItemCtrl.getCurrentItem().name);
      document.querySelector(UISelectors.itemName).value=ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCalories).value=ItemCtrl.getCurrentItem().calories;
    },
    updateItem: function(newItem){
      const li = document.querySelector(`#item-${newItem.id}`);
      li.innerHTML = ` <strong>${newItem.name}: </strong> <em>${newItem.calories} calories</em>  
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      
    },
    deleteItem: function(){
      const li = document.querySelector(`#item-${ItemCtrl.getCurrentItem().id}`);
      li.remove();
    },
    clearAll: function(){
      const li = document.querySelectorAll(`.collection-item`);
      li.forEach(function(eachli){
        eachli.remove();
      });
      UICtrl.hideList();
    }
  }

})();

//app controller

const App = (function(ItemCtrl,UICtrl){

  //listen to events
  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAdd);
    const collLists = document.querySelectorAll(UISelectors.collectionItem);
    collLists.forEach(function(elem){
      elem.addEventListener('click',editItem);
    });

    //disable submit on enter
    document.addEventListener('keypress',function(e){
      if(e.keyCode ===13){
        e.preventDefault();
        return false;
      }
    });
    document.querySelector(UISelectors.updateBtn).addEventListener('click',updateItem);
    
    document.querySelector(UISelectors.deleteBtn).addEventListener('click',deleteItem);

    document.querySelector(UISelectors.backBtn).addEventListener('click',backClick);

    document.querySelector(UISelectors.clearBtn).addEventListener('click',clearClick);
  }

  //add item
  const itemAdd  = function(e){

    const inp = UICtrl.getInput();

    //if only both fields are given we add it to the list

    if(inp.name!='' && inp.calorie!=''){
      //console.log(inp.calories);

      const newItem = ItemCtrl.addItems(inp.name,inp.calorie);
      UICtrl.addItems(newItem);

      const totalCalories = ItemCtrl.getTotalCalories();
      //console.log(totalCalories);
      UICtrl.showTotalCalories(totalCalories);

      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  //edit state item
  const editItem = function(e){
    // console.log(e.target);
    if(e.target.classList.contains('edit-item')){
      // console.log('yes');
      // console.log(e.target.parentElement.parentElement);
      UICtrl.updateState();

      const listId = e.target.parentElement.parentElement.id.split('-');
      const lid = parseInt(listId[1]);
      // console.log(lid);
      
      const itemToEdit = ItemCtrl.getElementById(lid);
      // console.log(itemToEdit);

      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.setFields();
    }
  }

  //when update button is clicked
  const updateItem = function(){

    const item = UICtrl.getInput();
    const updated = ItemCtrl.updateItem(item.name,item.calorie);

    UICtrl.updateItem(updated);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    backClick();
  }

  //for back button
  const backClick = function(e){
    UICtrl.addState();
    UICtrl.clearInput();
  }

  //delete item
  const deleteItem = function(){

    ItemCtrl.deleteItem();

    UICtrl.deleteItem();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    backClick();
  }

  const clearClick = function(e){

    ItemCtrl.clearAll();
    UICtrl.clearAll();
    // const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(0);
  }
  //return public methods
  
  return{
    init: function(){
      console.log('initailizing app...');
      UICtrl.addState();
      const items = ItemCtrl.getItems();

      if(items.length === 0)
        UICtrl.hideList();
      else{
        const tot = ItemCtrl.getTotalCalories();
        UICtrl.populateItemList(items);
        UICtrl.showTotalCalories(tot);
      }
      loadEventListeners();

      console.log(ItemCtrl.returnItems());
    }
  }
})(ItemCtrl,UICtrl);

App.init();