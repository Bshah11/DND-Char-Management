-- Bhavin Shah and Jeovani Vela
-- DND Char Manager
--11/12/2020

-- For all variable name the colon : will be used to 
-- denoate the front-end variable name being used

-- NOT inserting those values that are auto_increment

-- Query for adding new character
INSERT INTO `character` (name, chosen_class_id, stat_id, chosen_demographic_info, total_hit_points, current_hit_points)
VALUES ('',(SELECT class_id FROM class),(SELECT stat_id FROM statistic),'','','');

-- Query for adding new Statistics
INSERT INTO `statistic` (strength, dexterity, constitution, intelligence, wisdom, charisma) 
VALUES ('', '', '', '', '', '');

-- Query for adding new inventory
INSERT INTO `inventory` (inventory_id, name, damage, effects, weight) 
VALUES ('', '', '', '', '');

-- Query for adding new ability
INSERT INTO `action` (name, description) 
VALUES ('', '');

-- Query for selecting statistics based statID
SELECT stat_id FROM statistic WHERE stat_id='';

-- Query for selecting inventory based on inventoryID
SELECT inventory_id FROM inventory WHERE inventory_id='';

-- Query for selecting class based on classID
SELECT class_id FROM class WHERE class_id='';

-- Query for searching inventory items by Name

-- Query for select character by Name

-- Query for classes by name

-- Query for action by name

-- Query for updating char entity
-- This does not update statistic, or inventory

-- Query for updating inventory

-- Query for updating Ability

-- Quer for updating classes

-- Query for deleting Char by CharID
DELETE FROM `character` WHERE character_id = '';

-- Query for deleting class by classID
DELETE FROM `class` WHERE class_id='';

-- Query for deleting statistic by statID
DELETE FROM `statistic` WHERE stat_id='';

-- Query for deleting inventory by CharID
DELETE `inventory` FROM `inventory` JOIN `character` ON character_id = '';

-- Query for deleting action by actionID
DELETE FROM `action` WHERE action_id='';


