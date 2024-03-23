-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema avansat_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `avansat_db` ;

-- -----------------------------------------------------
-- Schema avansat_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `avansat_db` DEFAULT CHARACTER SET utf8 ;
USE `avansat_db` ;

-- -----------------------------------------------------
-- Table `avansat_db`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`clientes` (
  `Id_cliente` INT auto_increment ,
  `Nombre` VARCHAR(255) NULL DEFAULT NULL,
  `Apellidos` VARCHAR(255) NULL DEFAULT NULL,
  `Id_fiscal` VARCHAR(9) NULL DEFAULT NULL,
  `Direccion` VARCHAR(255) NULL DEFAULT NULL,
  `C.P` INT(5) NULL,
  `Localidad` VARCHAR(45) NULL,
  `Pais` VARCHAR(45) NULL,
  `Telefono` VARCHAR(15) NULL DEFAULT NULL,
  `Movil` VARCHAR(15) NULL DEFAULT NULL,
  `Email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_cliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SELECT * FROM clientes;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
