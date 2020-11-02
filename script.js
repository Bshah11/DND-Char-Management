var inventoryCard = document.getElementById('inventoryCard');
var abilitiesCard = document.getElementById('abilitiesCard');
var abilitySwitch = document.getElementById('showAbilties');
var inventorySwitch = document.getElementById("showInventory");
var addToInvent = document.getElementById("addToInven");
var addForm = document.getElementById("addNewItem");
var removeInvent = document.getElementsByClassName("btn btn-danger btn-sm");
var charEditButton = document.getElementById("charEdit");
var statBlock = document.getElementById("statBlock");

abilitySwitch.addEventListener("click", function() {changeCard(1)});
inventorySwitch.addEventListener("click", function() {changeCard(0)});
addToInvent.addEventListener("click", function() {showAddInventoryForm()});
charEditButton.addEventListener("click", updateChar);
for (var i = 0; i < removeInvent.length; i++) 
{
    removeInvent[i] . addEventListener("click", removeItem);
}

function updateChar(event)
{
    console.log("inside updateChar")
    console.log(statBlock);
    for (var i = 0; i < statBlock.children.length; i++){
        console.log(statBlock.children[i].children[1]);
        statBlock.children[i].children[1].firstElementChild.disabled = false;
    }
    charEditButton.textContent = "Save";
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
