var inventoryCard = document.getElementById('inventoryCard');
var abilitiesCard = document.getElementById('abilitiesCard');
var abilitySwitch = document.getElementById('showAbilties');
var inventorySwitch = document.getElementById("showInventory");
var addToInvent = document.getElementById("addToInven");
var addForm = document.getElementById("addNewItem");
var removeInvent = document.getElementsByClassName("btn btn-danger btn-sm");
var charSavebutton = document.getElementById("charSave");
var charEditButton = document.getElementById("charEdit");
var statBlock = document.getElementById("statBlock");
var charNamePlus = document.getElementById("charNamePlus");
var getCharbyName = document.getElementById("getCharByName");







abilitySwitch.addEventListener("click", function() {changeCard(1)});
inventorySwitch.addEventListener("click", function() {changeCard(0)});
addToInvent.addEventListener("click", function() {showAddInventoryForm()});
charEditButton.addEventListener("click", updateChar);
getCharbyName.addEventListener("click", getChar);


// Server Requests
function getChar(event)
{
    console.log("inside getChar")
    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = "test";
    req.open('GET', 'getCharbyID', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            console.log("inside response")
          } else {
            console.log("Error in network request: " + req.statusText);
          }});
    req.send(JSON.stringify(payload));
    console.log("back to clientside")

}


for (var i = 0; i < removeInvent.length; i++) 
{
    removeInvent[i] . addEventListener("click", removeItem);
}

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
