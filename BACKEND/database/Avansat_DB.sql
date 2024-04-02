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
  `id_cliente` INT(11) NOT NULL AUTO_INCREMENT,
  `Tipo_cliente` VARCHAR(45) NULL,
  `Nombre` VARCHAR(255) NOT NULL,
  `Apellidos` VARCHAR(255) NULL,
  `Id_fiscal` VARCHAR(12) NOT NULL,
  `Direccion` VARCHAR(255) NOT NULL,
  `C_postal` VARCHAR(15) NULL DEFAULT 'Desconocido',
  `Localidad` VARCHAR(45) NULL DEFAULT 'Desconocido',
  `Pais` VARCHAR(45) NULL DEFAULT 'Desconocido',
  `Telefono` VARCHAR(15) NULL DEFAULT 'Desconocido',
  `Movil` VARCHAR(15) NULL DEFAULT 'Desconocido',
  `Email` VARCHAR(45) NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 20256
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `avansat_db`.`clientes`
-- -----------------------------------------------------
START TRANSACTION;
USE `avansat_db`;
INSERT INTO `avansat_db`.`clientes` (`id_cliente`, `Tipo_cliente`, `Nombre`, `Apellidos`, `Id_fiscal`, `Direccion`, `C_postal`, `Localidad`, `Pais`, `Telefono`, `Movil`, `Email`) VALUES (DEFAULT, 'Persona', 'Juan Antonio', 'Perales Rocca', '31075705U', 'Gran Via 123 4º 5', '08016', 'Barcelona', 'España', NULL, '654122879', 'info@inglowerst.com');
INSERT INTO `avansat_db`.`clientes` (`id_cliente`, `Tipo_cliente`, `Nombre`, `Apellidos`, `Id_fiscal`, `Direccion`, `C_postal`, `Localidad`, `Pais`, `Telefono`, `Movil`, `Email`) VALUES (DEFAULT, 'Empresa', 'Gadgets Mgic SL', NULL, 'S87854211H', 'Carrer Ampla 135 Bajo c-2', '08035', 'Barcelona', 'España', '935789789', NULL, NULL);

COMMIT;

