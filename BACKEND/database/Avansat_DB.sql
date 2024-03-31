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
  `Tipo_cliente` VARCHAR(45) NOT NULL,
  `Nombre` VARCHAR(255) NOT NULL,
  `Apellidos` VARCHAR(255) NULL DEFAULT NULL,
  `Id_fiscal` VARCHAR(12) NOT NULL,
  `Direccion` VARCHAR(255) NOT NULL,
  `C_postal` INT(5) NULL DEFAULT NULL,
  `Localidad` VARCHAR(45) NULL DEFAULT NULL,
  `Pais` VARCHAR(45) NULL DEFAULT NULL,
  `Telefono` VARCHAR(15) NULL DEFAULT NULL,
  `Movil` INT(9) NULL DEFAULT NULL,
  `Email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 20242
DEFAULT CHARACTER SET = utf8;

select * from clientes;

INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('Juan', 'García', 35, 'juan.garcia@example.com');
INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('María', 'López', 28, 'maria.lopez@example.com');
INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('Pedro', 'Martínez', 40, 'pedro.martinez@example.com');
INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('Laura', 'Hernández', 45, 'laura.hernandez@example.com');
INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('Carlos', 'Rodríguez', 30, 'carlos.rodriguez@example.com');
INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('Ana', 'Pérez', 25, 'ana.perez@example.com');
INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('Luis', 'Gómez', 38, 'luis.gomez@example.com');
INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('Sofía', 'Díaz', 32, 'sofia.diaz@example.com');
INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('Elena', 'Fernández', 50, 'elena.fernandez@example.com');
INSERT INTO clientes (nombre, apellido, edad, email) VALUES ('Miguel', 'Ruiz', 27, 'miguel.ruiz@example.com');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
