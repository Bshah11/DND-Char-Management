var inventoryTable = document.getElementById('inventoryTable');
var abilitiesTable = document.getElementById('abilitiesTable');
var abilitiesCard = document.getElementById('abilitiesCard');
var abilitySwitch = document.getElementById('showAbilties');
var inventorySwitch = document.getElementById("showInventory");
var removeInventory = document.getElementsByClassName("btn btn-danger btn-sm");
var addToInvent = document.getElementById("addInvent");
var addForm = document.getElementById("addNewItem");
var removeInvent = document.getElementsByClassName("btn btn-danger btn-sm");
var charSavebutton = document.getElementById("charSave");
var charEditButton = document.getElementById("charEdit");
var statBlock = document.getElementById("statBlock");
var charNamePlus = document.getElementById("charNamePlus");
var readByName = document.getElementById("readByName"); // This is the search Button
var searchName = document.getElementById("searchName");
var searchType = document.getElementById("searchType");
var nameChar = document.getElementById("charName");
var classChar = document.getElementById("charClass");
var demoChar = document.getElementById('charDemo');
var addForm = document.getElementById("addInventForm").children
var addFormAbilities = document.getElementById('addActionForm1');
var addToAction = document.getElementById('addAction');
var newCharStart = document.getElementById('charNew');
var newCharSave = document.getElementById('charNewSave');
var classAvailable; // contains all current classes avialble (triggered when a player hit "create new char")
var inventAavailable; //// contains all current inventory items avialble (triggered when a player hit "create new char")
var actionAvailable;
var newClassStart = document.getElementById('classNew');
var newClassSave = document.getElementById("classNewSave");
var newActionStart = document.getElementById('actionNew');
var newActionSave = document.getElementById('actionNewSave');
var newInventoryStart = document.getElementById('inventNewStart');
var newIntenvorySave=  document.getElementById('inventoryNewSave');
var actionclassMapStart =document.getElementById('actionclassMapStart');
var actionclassMapSave = document.getElementById('actionclassMapSave');
var charIventMapStart =  document.getElementById('charInventMapStart');
var charIventMapSave =  document.getElementById('charInventMapSave');
var curCHAR;








abilitySwitch.addEventListener("click", function() {changeCard(1)});
inventorySwitch.addEventListener("click", function() {changeCard(0)});
charEditButton.addEventListener("click", updateChar);
charSavebutton.addEventListener("click", saveChar);
readByName.addEventListener("click", readName);
//addToInvent.addEventListener("click",addInventForm);
//addToAction.addEventListener("click", addActionForm);
newCharStart.addEventListener("click", addNewChar);
newCharSave.addEventListener("click", saveNewChar);
newClassStart.addEventListener("click", addNewClass);
newClassSave.addEventListener("click", saveNewClass);
newActionStart.addEventListener('click', addNewAction);
newActionSave.addEventListener('click', saveNewAction);
newInventoryStart.addEventListener('click', addNewInventory);
newIntenvorySave.addEventListener('click', saveNewInventory);
actionclassMapStart.addEventListener('click', openactionMapper);
actionclassMapSave.addEventListener('click', saveactionMapper);
charIventMapStart.addEventListener('click', openinventMapper)
charIventMapSave.addEventListener('click',  saveinventMapper)


document.addEventListener("DOMContentLoaded", function() {
    classInventpull()
  });


function removeItemDB(e){
    console.log('inside remove itemBD');
    var inventoryObject = e.target.parentElement.parentElement.children; 
    var parNode = e.target.parentElement.parentElement.parentElement;
    console.log(parNode);
    // remove button element
    // inventAavailable current full pull of inventory table including IDs
    // find a way to figure out the iventory id from the target
    // send the request to the DB
    var payload = {};
    payload.charID = String(curCHAR.character_id);
    payload.inventoryID = String(findInventID(inventoryObject[0].innerText));
    var req = new XMLHttpRequest();
    req.open('POST', '/delItem');
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            console.log('inside response');
            var response = JSON.parse(req.responseText);
            document.getElementById('inventoryPack').removeChild(e.target.parentElement.parentElement)
        } else {
            console.log("error in network request: " + req.statusText);
        }});
    console.log(payload);
    req.send(JSON.stringify(payload));
}

function findInventID(nameInvent){
    for (let key in inventAavailable){
        if (inventAavailable[key].name == nameInvent){
            return inventAavailable[key].inventory_id
        }
    }
}

// Server Requests

function addNewChar(e){
    newCharStart.hidden = true;
    newCharSave.hidden = false;
    clearContent();
    classSection();
};


function saveNewChar(){
    console.log("inside sav Char");
    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = nameChar.value;
    payload.class = parseInt(classChar.firstElementChild.value);
    payload.demo = demoChar.value;
    // collect stats
    curNode = statBlock.firstElementChild
    var stats = [];
    while (curNode){
        stats.push(parseInt(curNode.children[1].firstElementChild.value));
        curNode = curNode.nextElementSibling;
    }
    payload.stats = stats;
    console.log(payload);
    req.open('POST', '/addNewChar');
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            console.log('inside response');
            var response = JSON.parse(req.responseText)
            curCHAR = response.char;
            showAbilities(response.actions);
            saveChar();
            newCharStart.hidden = false;
            newCharSave.hidden = true;
        } else {
            console.log("error in network request: " + req.statusText);
        }});
    console.log(payload);
    req.send(JSON.stringify(payload));
}

function addActionForm(e){
    // This function will add a new action to the current class
    console.log("Inside action form client-before");
    console.log(addFormAbilities.children[0].firstElementChild.value);
    console.log(addFormAbilities.children[1].firstElementChild.value);
    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = addFormAbilities.children[0].firstElementChild.value;
    payload.description = addFormAbilities.children[1].firstElementChild.value;
    payload.classID = curCHAR.chosen_class_id;
    payload.charID = curCHAR.character_id;
    console.log(payload);
    req.open('POST', '/addToAbilities');
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            console.log('inside response');
            var response = JSON.parse(req.responseText)
            console.log(response.actions);
            showAbilities(response.actions);

        } else {
            console.log("error in network request: " + req.statusText);
        }});
    req.send(JSON.stringify(payload));
};

function classInventpull(){
    // This function pulls available inventory and classes so the player can create their own char with the information
    var req = new XMLHttpRequest();
    var payload = {};
    req.open('Get', '/getClassInvent');
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            console.log('inside response');
            var response = JSON.parse(req.responseText)
            inventAavailable = response.inventory;
            classAvailable = response.classes;
            actionAvailable = response.actions;
        } else {
            console.log("error in network request: " + req.statusText);
        }});
    req.send(JSON.stringify(payload));

}
/*
function addInventForm(e){
    console.log(addForm);
    console.log("name: " + addForm[0].firstElementChild.value);
    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = addForm[0].firstElementChild.value;
    payload.damage = addForm[1].firstElementChild.value;
    payload.effect = addForm[2].firstElementChild.value;
    payload.weight = addForm[3].firstElementChild.value;
    payload.charID = curCHAR.character_id;
    payload.classID = curCHAR.chosen_class_id;
    console.log(payload);
    req.open('POST', '/addToInventory');
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            console.log('inside response');
            var response = JSON.parse(req.responseText)
            console.log(response.inventory);
            showCharInven(response.inventory);
        } else {
            console.log("error in network request: " + req.statusText);
        }});
    req.send(JSON.stringify(payload));
    
};
*/

function readName(event)
{
    // This is the read functionality of our code base driven by the search bar
    // This takes in a entity type and a search string and return object IF name is found.
    // Question: How do we handle multiple returns?
    classInventpull();
    event.preventDefault();
    console.log("inside readByName");

    // Locks fields if user accidently accesses this button after opening edit
    for (var i = 0; i < statBlock.children.length; i++){
        statBlock.children[i].children[1].firstElementChild.disabled = true;
    }
    for (var i = 0; i < charNamePlus.children.length; i ++){
        currentNode = charNamePlus.children[i].firstElementChild;
        currentNode.disabled = true;
    }

    charSavebutton.hidden = true;
    charEditButton.hidden = false;


    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = searchName.value;
    payload.type = searchType.value;
    console.log(payload)
    // REQUEST TO SERVER
    req.open('POST', '/readByName', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            console.log("inside response")
            var response = JSON.parse(req.responseText)
           /* console.log(response.type);
            console.log(response.result);
            console.log(response.statBlock);
            console.log(response.inventory);
            console.log(response.actions);
            */
            if (response.type = 'character'){
                curCHAR = response.result[0];
                showChar(response.result[0]);
                showStat(response.statBlock);
                showCharInven(response.inventory);
                showAbilities(response.actions);
                classInventpull();
            }
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
    req.send(JSON.stringify(payload));
    console.log("back to clientside")

};

function addNewInventory(e){
    newInventoryStart.hidden = true;
    document.getElementById('addInventHolder').hidden = false;
}

function saveNewInventory(e){
    console.log('inside saveNewInventory');
    var payload = {};
    var req = new XMLHttpRequest();
    payload.name = addForm[0].firstElementChild.value;
    payload.damage = addForm[1].firstElementChild.value;
    payload.effect = addForm[2].firstElementChild.value;
    payload.weight = addForm[3].firstElementChild.value;
    console.log(payload);
    req.open('POST', '/addNewInventory', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            console.log("inside response")
            var response = JSON.parse(req.responseText)
            newInventoryStart.hidden = false;
            document.getElementById('addInventHolder').hidden = true;
            classInventpull();
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
    req.send(JSON.stringify(payload));
    console.log("back to clientside")
    
}

function addNewAction(e){
    newActionStart.hidden = true;
    document.getElementById('actionNewForm').hidden = false;
}

function saveNewAction(e){
    console.log('inside saveNewAction');
    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = document.getElementById('newActionName').value
    payload.description = document.getElementById('newActionDescription').value
    console.log(payload);
    req.open('POST', '/addNewAction', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            console.log("inside response")
            var response = JSON.parse(req.responseText)
            newActionStart.hidden = false;
            document.getElementById('actionNewForm').hidden = true;
            classInventpull();
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
    req.send(JSON.stringify(payload));
    console.log("back to clientside")

}

function addNewClass(e){
    newClassStart.hidden = true;
    document.getElementById('classNewForm').hidden = false;

};

function saveNewClass(e){
    console.log("inside saveNewClass");
    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = document.getElementById('newClassName').value;
    payload.hp = document.getElementById('newClassHP').value
    console.log(payload); 
    req.open('POST', '/addNewClass', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            console.log("inside response")
            var response = JSON.parse(req.responseText)
            newClassStart.hidden = false;
            document.getElementById('classNewForm').hidden = true;
            classInventpull();
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
    req.send(JSON.stringify(payload));
    console.log("back to clientside")
}

function openinventMapper(e){
    charIventMapStart.hidden = true;
    document.getElementById('addInventoryChar').hidden = false;
    charIventMapSave.hidden = false;
    createInventoryMap();
}

function createInventoryMap(){
    var select = document.createElement("select");
    select.id = "InventToMap";
    select.name = "invent"

   
    for (i = 0; i < inventAavailable.length; i++) {
      var option = document.createElement("option");
      option.value = inventAavailable[i].inventory_id;
      option.text = inventAavailable[i].name;
      select.appendChild(option);
    }
   
    var label = document.createElement("label");
    label.innerHTML = "Chose Item: "
    label.htmlFor = "invent";
    console.log(select);
    document.getElementById('addInventoryChar').appendChild(select);
}

function saveinventMapper(e){
    console.log("inside saveinventMapper");
    var payload = {};
    payload.inventoryID = document.getElementById('InventToMap').value;
    payload.charID = String(curCHAR.character_id);
    var req = new XMLHttpRequest();
    req.open('POST', '/mapCharInvent', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            console.log("inside response")
            var response = JSON.parse(req.responseText)
            charIventMapStart.hidden = false;
            document.getElementById('addInventoryChar').innerHTML = "";
            document.getElementById('addInventoryChar').hidden = true;
            charIventMapSave.hidden = true;
            showCharInven(response.inventory);
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
    req.send(JSON.stringify(payload));
    console.log("back to clientside")

}

function openactionMapper(e){
    actionclassMapStart.hidden = true;
    document.getElementById('addActionClass').hidden = false;
    actionclassMapSave.hidden = false;
    createActionMap();
    }

function createActionMap(){
    
    // ADD dropdown for actions
    var select = document.createElement("select");
    select.id = "actionToMap";
    select.name = "action"

   
    for (i = 0; i < actionAvailable.length; i++) {
      var option = document.createElement("option");
      option.value = actionAvailable[i].action_id;
      option.text = actionAvailable[i].name;
      select.appendChild(option);
    }
   
    var label = document.createElement("label");
    label.innerHTML = "Chose Action: "
    label.htmlFor = "action";
    console.log(select);
    document.getElementById('addActionClass').appendChild(select);
    
    // ADD dropdown for classes
    select = document.createElement("select");
    select.id = "classToMap";
    select.name = "class"

   
    for (i = 0; i < classAvailable.length; i++) {
      var option = document.createElement("option");
      option.value = classAvailable[i].class_id;
      option.text = classAvailable[i].name;
      select.appendChild(option);
    }
   
    var label = document.createElement("label");
    label.innerHTML = "Chose Class: "
    label.htmlFor = "class";
    console.log(select);
    document.getElementById('addActionClass').appendChild(select);


}

function saveactionMapper(e){
    console.log("inside saveactionMapper");
    var payload = {};
    payload.classID = String(document.getElementById('classToMap').value);
    payload.actionID = String(document.getElementById('actionToMap').value);
    var req = new XMLHttpRequest();
    req.open('POST', '/mapActionCLass', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            console.log("inside response")
            var response = JSON.parse(req.responseText)
            actionclassMapStart.hidden = false;
            document.getElementById('addActionClass').innerHTML = "";
            document.getElementById('addActionClass').hidden = true;
            actionclassMapSave.hidden = true;
            showAbilities(response)
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
    req.send(JSON.stringify(payload));
    console.log("back to clientside")

}

function showAbilities(actions){
    var curAbilities = document.getElementById("abilitiesTable").children[1];
    console.log(actions);
    classActions = document.createElement("TBODY");
    for (action in actions){
        curAction  = actions[action];
        var curRow = classActions.insertRow(0);
        var name = curRow.insertCell(0);
        name.innerHTML = "<th scope=\"row\">" + curAction.name +"</th>";
        var description = curRow.insertCell(1);
        description.innerHTML = "<td>" + curAction.description + "</td>";
    }
    console.log(classActions);
    abilitiesTable.replaceChild(classActions, curAbilities);
};

function showCharInven(backpack){
    console.log(backpack);
    var curPack = inventoryTable.children[1];
    pack = document.createElement("TBODY");
    pack.setAttribute("id", "inventoryPack");

    for(item in backpack){
        curItem = backpack[item];
        var curRow = pack.insertRow(0)
        var name = curRow.insertCell(0);
        name.innerHTML = "<th scope=\"row\">" + curItem.name +"</th>";
        var damage = curRow.insertCell(1);
        damage.innerHTML = "<td>" + curItem.damage + "</td>";
        var effects = curRow.insertCell(2);
        effects.innerHTML = "<td>" + curItem.effects + "</td>";
        var weight = curRow.insertCell(3);
        weight.innerHTML = "<td>" + curItem.weight + "</td>"
        var removeItem = curRow.insertCell(4);
        removeItem.innerHTML = '<button type="button" class="btn btn-danger btn-sm">Remove</button>';
        }
    inventoryTable.replaceChild(pack, curPack);
    var elements = document.getElementsByClassName("btn btn-danger btn-sm");
    console.log(elements);
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", removeItemDB);
    }
    
    /*
    addForm[0].firstElementChild.value = "";
    addForm[1].firstElementChild.value = "";
    addForm[2].firstElementChild.value = "";
    addForm[3].firstElementChild.value = "";
    */
};

function showStat(stats){
    console.log(stats);
    curNode = statBlock.firstElementChild
    for (let x in stats[0]){
        if (x != 'stat_id'){
            curNode.children[1].firstElementChild.value = stats[0][x];
            curNode = curNode.nextElementSibling;
            }
        }
    }

function showChar(char){
    console.log(char);
    nameChar.value = char.name;
    demoChar.value = char.chosen_demographic_info;
    classChar.children[0].value = char.chosen_class_id;
};

function createInstance(){
    // PLACEHOLDER
}


// 
function clearContent(){
    // clears stat block
    curNode = statBlock.firstElementChild
    while (curNode){
        curNode.children[1].firstElementChild.value = "";
        curNode = curNode.nextElementSibling;
    }
    // clear name and information
    nameChar.value = "";
    demoChar.value = "";
    classChar.children[0].value = "";
    classInventpull();
    updateChar();

};

function classSection(){
    // Creates selector for classes
    let curClass = [];
    for (i = 0; i < classAvailable.length; i++){
        curClass.push(classAvailable[i].name);
    }
    var select = document.createElement("select");
    select.id = "charClass";
    select.name = "class"
   
    for (const val of curClass) {
      var option = document.createElement("option");
      option.value = curClass.indexOf(val) + 1;
      option.text = val.charAt(0).toUpperCase() + val.slice(1);
      select.appendChild(option);
    }
   
    var label = document.createElement("label");
    label.innerHTML = "Choose your class: "
    label.htmlFor = "class";
    console.log(select);
    classChar.replaceChild(select, classChar.children[0]);

}

for (var i = 0; i < removeInvent.length; i++) 
{
    removeInvent[i] . addEventListener("click", removeItem);
};

charSavebutton.addEventListener('click', saveChar);

function saveChar(event)
{
    // for current Char, updates char based on attributes changes
    for (var i = 0; i < statBlock.children.length; i++){
        statBlock.children[i].children[1].firstElementChild.disabled = true;
    }
    for (var i = 0; i < charNamePlus.children.length; i ++){
        currentNode = charNamePlus.children[i].firstElementChild;
        currentNode.disabled = true;
    }
    charSavebutton.hidden = true;
    charEditButton.hidden = false;
    console.log("Inside save char for send to DB");
    // for Char, grab name, classID, demo
    console.log(nameChar.value); // name
    console.log(classChar.firstElementChild.value); // classID
    console.log(demoChar.value); // demo info
    console.log(curCHAR.stat_id); // stat id
    // collect stats
    curNode = statBlock.firstElementChild
    var stats = [];
    while (curNode){
        stats.push(parseInt(curNode.children[1].firstElementChild.value));
        curNode = curNode.nextElementSibling;
    }
    console.log(stats); // current stats
    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = nameChar.value;
    payload.classID = classChar.firstElementChild.value;
    payload.demo = demoChar.value;
    payload.statID = curCHAR.stat_id;
    payload.stats = stats;
    payload.charID = curCHAR.character_id;
    console.log(payload);

    
    req.open('POST', '/updateChar', true); // Where are we going
    req.setRequestHeader('Content-Type', 'application/json'); // what kind of info are we sending
    req.addEventListener('load', function(){ // what do we do when we get a response from the server
        if(req.status >= 200 && req.status < 400){
            console.log("inside response")
            var response = JSON.parse(req.responseText);
            console.log(response);
            showAbilities(response.actions);
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
    req.send(JSON.stringify(payload));
    



}

function updateChar(event)
{
    console.log(statBlock);
    for (var i = 0; i < statBlock.children.length; i++){
        statBlock.children[i].children[1].firstElementChild.disabled = false;
    }
    for (var i = 0; i < charNamePlus.children.length; i ++){
        currentNode = charNamePlus.children[i].firstElementChild;
        currentNode.disabled = false;
    }
    charSavebutton.hidden = false;
    charEditButton.hidden = true;
    classInventpull(); // Changes the selector for class
    classSection();

}

function removeItem(event) 
{
    console.log("inside removeItem");
    currentItem = event.target.parentNode.parentNode;
    currentItem.remove();
    // Remove from DB
}

function showAddInventoryForm()
{
   addForm.hidden = false; 
   addToInvent.hidden = true;
}



function changeCard(val)
{
    if (val == 1){
        abilitiesCard.hidden = false;
        inventoryCard.hidden = true;
    } else {
        abilitiesCard.hidden = true;
        inventoryCard.hidden = false;
    }
}
