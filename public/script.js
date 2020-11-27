var inventoryTable = document.getElementById('inventoryTable');
var abilitiesTable = document.getElementById('abilitiesTable');
var abilitiesCard = document.getElementById('abilitiesCard');
var abilitySwitch = document.getElementById('showAbilties');
var inventorySwitch = document.getElementById("showInventory");
var addToInvent = document.getElementById("addInvent");
var addToAction = document.getElementById("addAction");
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
var curCHAR;








abilitySwitch.addEventListener("click", function() {changeCard(1)});
inventorySwitch.addEventListener("click", function() {changeCard(0)});
charEditButton.addEventListener("click", updateChar);
readByName.addEventListener("click", readName);
addToInvent.addEventListener("click",addInventForm);
addToAction.addEventListener("click", addActionForm);



// Server Requests

function addActionForm(e){
    // This function will add a new action to the current class
    console.log("Inside action form client-before");
    console.log("")

};

function addInventForm(e){
    var addForm = document.getElementById("addInventForm").children
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
            console.log(JSON.parse(req.inventory));
        } else {
            console.log("error in network request: " + req.statusText);
        }});
    req.send(JSON.stringify(payload));
    
};



function readName(event)
{
    // This is the read functionality of our code base driven by the search bar
    // This takes in a entity type and a search string and return object IF name is found.
    // Question: How do we handle multiple returns?

    event.preventDefault();
    console.log("inside readByName");
    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = searchName.value;
    payload.type = searchType.value;
    console.log(payload)
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
            }
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
    req.send(JSON.stringify(payload));
    console.log("back to clientside")

};

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
    console.log(pack);
    inventoryTable.replaceChild(pack, curPack);

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
    classChar.value = char.chosen_class_id;
};

function createInstance(){
    // PLACEHOLDER
}


for (var i = 0; i < removeInvent.length; i++) 
{
    removeInvent[i] . addEventListener("click", removeItem);
};

charSavebutton.addEventListener('click', saveChar);

function saveChar(event)
{
    for (var i = 0; i < statBlock.children.length; i++){
        statBlock.children[i].children[1].firstElementChild.disabled = true;
    }
    for (var i = 0; i < charNamePlus.children.length; i ++){
        currentNode = charNamePlus.children[i].firstElementChild;
        currentNode.disabled = true;
    }
    charSavebutton.hidden = true;
    charEditButton.hidden = false;

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
