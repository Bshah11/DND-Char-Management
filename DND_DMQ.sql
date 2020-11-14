-- Bhavin Shah and Jeovani Vela
-- DND Char Manager
--11/12/2020


-- 5 queries below create the tables for the database
CREATE TABLE `statistic`(
    `stat_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `strength` INT NOT NULL,
    `dexterity` INT NOT NULL,
    `constitution` INT NOT NULL,
    `intelligence` INT NOT NULL,
    `wisdom` INT NOT NULL,
    `charisma` INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `inventory` (
    `inventory_id` VARCHAR(8) PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `damage` INT,
    `effects` VARCHAR(200),
    `weight` INT
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `class` (
    `class_id` INT(25) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name`VARCHAR(50),
    `hit_points` INT
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `action`(
    `action_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(200) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `character` (
    `character_id` INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `chosen_class_id` INT(25),
    `stat_id` INT,
    `chosen_demographic_info` VARCHAR(500),
    `total_hit_points` INT NOT NULL,
    `current_hit_points` INT NOT NULL,
    FOREIGN KEY(`chosen_class_id`) REFERENCES `class`(`class_id`),
    FOREIGN KEY(`stat_id`) REFERENCES `statistic` (`stat_id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;



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


