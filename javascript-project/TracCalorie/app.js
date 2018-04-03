
//Item Controller
const ItemCtrl = (function(id, name, calories){

    //item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure/ State
    const data = {
         items: [/*
           {id: 0, name: "Steak Dinner", calories: 1200},
            {id: 1, name: "Cookie", calories: 400},
            {id: 2, name: "Eggs", calories: 300}*/
        ],
        currentItem: null,
        totalCalories: 0
    }

    //public methods
    return{
        getItems: function(){
            return data.items;
        },
        addItem: function(name, calories){
            let ID;
            ID = data.items.length > 0 ? data.items[data.items.length-1].id + 1 : 0;
            calories = parseInt(calories);
            const newItem = new Item(ID,name,calories);
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id){
            let found = null;
            data.items.forEach(item => {
                if(item.id === id ){
                    found = item;
                }
            })

            return found;
        },

        updateItem: function(name, calories){
            calories = parseInt(calories);
            let found = null;

            data.items.forEach(item =>{
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;

                    found = item;
                }
            })

            return found;
        },

        deleteItem: function(id){
          data.items.splice(id,1);
        },

        deleteAllItems: function(){
            data.items=[];
        },

        logData: function(){
            return data;
        }
    }


})();

//UI Controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: "#item-list",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        clearBtn: ".clear-btn",
        backBtn: ".back-btn",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        totalCalories: ".total-calories"
    }


    return{

        populateItemList(items){
            let html = "";
            items.forEach(item => {
                html +=`<li class="collection-item" id="item-${item.id}">
                <strong>Cookie: </strong>
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`
            });

            //insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html ;
        },

        getItemInput: function(){
            return{
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: function(item){
            document.querySelector(UISelectors.itemList).style.display="block";
            const li = document.createElement("li");
            li.className = "collection-item";
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>`
            
            document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend",li);

        },

        deleteListItem: function(id){
            const itemId = `#item-${id}`;
            document.querySelector(itemId).remove();
            UICtrl.updateTotalCalories(ItemCtrl.logData().totalCalories,0);

        },

        updateListItem: function(item){
            const id = `#item-${item.id}`
            document.querySelector(id).innerHTML=`<strong>${item.name}: </strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`
        },

        clearInputs: function(){
            document.querySelector(UISelectors.itemNameInput).value="";
            document.querySelector(UISelectors.itemCaloriesInput).value="";
        },

        hideList:function(){
            document.querySelector(UISelectors.itemList).style.display="none";
        },

        addTotalCalories: function(calorieVal){
            document.querySelector(UISelectors.totalCalories).textContent = parseInt(document.querySelector(UISelectors.totalCalories).textContent) + calorieVal;
        },
        updateTotalCalories: function(totalCalorie, updatedCalorieVal){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalorie + updatedCalorieVal;
        },

        clearAllItem: function(){
            document.querySelectorAll(".collection-item").forEach(item => {
                item.remove();
            });
     
            document.querySelector(UISelectors.totalCalories).textContent = 0;
        },

        clearEditState: function(){
            UICtrl.clearInputs();
            document.querySelector(UISelectors.updateBtn).style.display="none";
            document.querySelector(UISelectors.deleteBtn).style.display="none";
            document.querySelector(UISelectors.backBtn).style.display="none";
            document.querySelector(UISelectors.addBtn).style.display="inline";
        },

        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display="inline";
            document.querySelector(UISelectors.deleteBtn).style.display="inline";
            document.querySelector(UISelectors.backBtn).style.display="inline";
            document.querySelector(UISelectors.addBtn).style.display="none";
        },

        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.logData().currentItem.name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.logData().currentItem.calories;
            ItemCtrl.logData().totalCalories = parseInt(document.querySelector(UISelectors.totalCalories).textContent) - ItemCtrl.logData().currentItem.calories;
        },

        getSelectors: function(){
            return UISelectors;
        }
    }

})();

//App Controller
const App = (function(ItemCtrl, UICtrl){

    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener("click",itemAddSubmit);

        //disable submit on enter
        document.addEventListener("keypress", e =>{

            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
            
        });

        //Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener("click",itemEditClick);

        //update item event
        document.querySelector(UISelectors.updateBtn).addEventListener("click",itemUpdateSubmit);

        //update item event
        document.querySelector(UISelectors.backBtn).addEventListener("click",clearEditStateSubmit);

        //update item event
        document.querySelector(UISelectors.deleteBtn).addEventListener("click",itemDeleteSubmit);

        //clear all event
        document.querySelector(UISelectors.clearBtn).addEventListener("click",clearAllSubmit);
    }


    const itemAddSubmit = function(e){

        //get form input from ui controller
        const input = UICtrl.getItemInput();

        if(input.name !== "" && input.calories !==""){
           const newItem = ItemCtrl.addItem(input.name, input.calories);

            UICtrl.addListItem(newItem);
            UICtrl.clearInputs()
            UICtrl.addTotalCalories(newItem.calories);
        }

        e.preventDefault();
    }

    const itemEditClick = function(e){
        if(e.target.classList.contains("edit-item")){
            const listId = parseInt((e.target.parentNode.parentNode.id).substring(5));

            const itemToEdit = ItemCtrl.getItemById(listId);
            
            ItemCtrl.logData().currentItem = itemToEdit;
            UICtrl.showEditState();
            UICtrl.addItemToForm();

        }

        e.preventDefault();
    }

    const itemUpdateSubmit = function(e){
        //get item input
        const input = UICtrl.getItemInput();

        const updateItem = ItemCtrl.updateItem(input.name, input.calories);

        UICtrl.updateListItem(updateItem);
        UICtrl.updateTotalCalories(ItemCtrl.logData().totalCalories,ItemCtrl.logData().currentItem.calories);
        UICtrl.clearEditState();

        e.preventDefault();
    }

    const clearEditStateSubmit = function(e){
        UICtrl.clearEditState();

        e.preventDefault();
    }

    const itemDeleteSubmit = function(e){
        const currentItemID = ItemCtrl.logData().currentItem.id;
        ItemCtrl.deleteItem(currentItemID);

        UICtrl.deleteListItem(currentItemID);

        if(document.querySelectorAll(".collection-item").length === 0){
            UICtrl.hideList();
        }

        UICtrl.clearEditState();


        e.preventDefault();
    }

    const clearAllSubmit = function(e){
        ItemCtrl.deleteAllItems();
        
       UICtrl.clearAllItem();

       UICtrl.hideList();

        e.preventDefault();
    }


    //pulic methods
    return{
        init: function(){
            UICtrl.clearEditState();
            const items = ItemCtrl.getItems();
            if(items.length === 0 ) {
                UICtrl.hideList();
            }else{
                UICtrl.populateItemList(items);
            }

            //load event listeners
            loadEventListeners();


        }
    }


})(ItemCtrl, UICtrl);

App.init();

