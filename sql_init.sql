CREATE SCHEMA IF NOT EXISTS `db_to_do_gpt` DEFAULT CHARACTER SET utf8;
USE `db_to_do_gpt`;

/* RESET */
DROP TABLE IF EXISTS `db_to_do_gpt`.`task`;
DROP TABLE IF EXISTS `db_to_do_gpt`.`todolist`;
DROP TABLE IF EXISTS `db_to_do_gpt`.`user`;

/* USER TABLE CREATION */
CREATE TABLE `db_to_do_gpt`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(320) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `idUser_UNIQUE` (`idUser` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

/* TODOLIST TABLE CREATION */
CREATE TABLE `db_to_do_gpt`.`todolist` (
  `idTodolist` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(320) NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  `creationDate` DATE,
  `lastModifiedDate` DATETIME,
  `idUser` INT NOT NULL,
  UNIQUE INDEX `idTodolist_UNIQUE` (`idTodolist` ASC) VISIBLE,
  PRIMARY KEY (`idTodolist`),
  INDEX `idUser_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `db_to_do_gpt`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
DROP TRIGGER IF EXISTS `db_to_do_gpt`.`todolist_BEFORE_INSERT`;

DELIMITER $$
USE `db_to_do_gpt`$$
CREATE DEFINER = CURRENT_USER TRIGGER `db_to_do_gpt`.`todolist_BEFORE_INSERT` BEFORE INSERT ON `todolist` FOR EACH ROW
BEGIN
	SET NEW.creationDate = NOW();
    SET NEW.lastModifiedDate = NOW();
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS `db_to_do_gpt`.`todolist_BEFORE_UPDATE`;

DELIMITER $$
USE `db_to_do_gpt`$$
CREATE DEFINER = CURRENT_USER TRIGGER `db_to_do_gpt`.`todolist_BEFORE_UPDATE` BEFORE UPDATE ON `todolist` FOR EACH ROW
BEGIN
	IF NEW.title <> OLD.title OR NEW.description <> OLD.description THEN
		SET NEW.lastModifiedDate = NOW();
	END IF;
END$$
DELIMITER ;

/* TASK TABLE CREATION */
CREATE TABLE `db_to_do_gpt`.`task` (
  `idTask` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(320) NOT NULL,
  `isFinished` BOOLEAN DEFAULT false,
  `priority` INT DEFAULT 0,
  `idTodolist` INT NOT NULL,
  PRIMARY KEY (`idTask`),
  UNIQUE INDEX `idTask_UNIQUE` (`idTask` ASC) VISIBLE,
  INDEX `idTodolist_idx` (`idTodolist` ASC) VISIBLE,
  CONSTRAINT `idTodolist`
    FOREIGN KEY (`idTodolist`)
    REFERENCES `db_to_do_gpt`.`todolist` (`idTodolist`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
DROP TRIGGER IF EXISTS `db_to_do_gpt`.`task_BEFORE_INSERT`;

DELIMITER $$
USE `db_to_do_gpt`$$
CREATE DEFINER = CURRENT_USER TRIGGER `db_to_do_gpt`.`task_BEFORE_INSERT` BEFORE INSERT ON `task` FOR EACH ROW
BEGIN
	UPDATE todolist SET lastModifiedDate = NOW() WHERE idTodolist = NEW.idTodolist;
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS `db_to_do_gpt`.`task_BEFORE_UPDATE`;

DELIMITER $$
USE `db_to_do_gpt`$$
CREATE DEFINER = CURRENT_USER TRIGGER `db_to_do_gpt`.`task_BEFORE_UPDATE` BEFORE UPDATE ON `task` FOR EACH ROW
BEGIN
	UPDATE todolist SET lastModifiedDate = NOW() WHERE idTodolist = NEW.idTodolist;
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS `db_to_do_gpt`.`task_BEFORE_DELETE`;

DELIMITER $$
USE `db_to_do_gpt`$$
CREATE DEFINER = CURRENT_USER TRIGGER `db_to_do_gpt`.`task_BEFORE_DELETE` BEFORE DELETE ON `task` FOR EACH ROW
BEGIN
	UPDATE todolist SET lastModifiedDate = NOW() WHERE idTodolist = OLD.idTodolist;
END$$
DELIMITER ;
