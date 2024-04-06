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
  `id_cliente` INT(15) NOT NULL AUTO_INCREMENT,
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


-- -----------------------------------------------------
-- Table `avansat_db`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`stock` (
  `Id_stock` INT(15) NOT NULL AUTO_INCREMENT,
  `Codigo` VARCHAR(45) NOT NULL,
  `Cantidad` INT NOT NULL,
  `Nombre` VARCHAR(255) NOT NULL,
  `Precio_coste` DECIMAL(5,2) NULL,
  `Precio_coste_iva` DECIMAL(5,2) NULL,
  `Precio_venta` DECIMAL(5,2) NULL,
  `Precio_venta_iva` DECIMAL(5,2) NULL,
  PRIMARY KEY (`Id_stock`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `avansat_db`.`servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`servicios` (
  `Id_servicio` INT(15) NOT NULL AUTO_INCREMENT,
  `Codigo` VARCHAR(45) NOT NULL,
  `Nombre` VARCHAR(255) NOT NULL,
  `Precio_coste` DECIMAL(5,2) NULL,
  `Precio_coste_iva` DECIMAL(5,2) NULL,
  `Precio_venta` DECIMAL(5,2) NULL,
  `Precio_venta_iva` DECIMAL(5,2) NULL,
  PRIMARY KEY (`Id_servicio`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `avansat_db`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`facturas` (
  `Id_factura` VARCHAR(15) NOT NULL,
  `Fecha_alta` DATE NULL,
  `Fecha_vencimiento` VARCHAR(45) NULL,
  `Estado` VARCHAR(45) NULL,
  `Base_imponible` DECIMAL(5,2) NULL,
  `Total` DECIMAL(5,2) NULL,
  PRIMARY KEY (`Id_factura`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `avansat_db`.`clientes`
-- -----------------------------------------------------
START TRANSACTION;
USE `avansat_db`;
INSERT INTO `avansat_db`.`clientes` (`id_cliente`, `Tipo_cliente`, `Nombre`, `Apellidos`, `Id_fiscal`, `Direccion`, `C_postal`, `Localidad`, `Pais`, `Telefono`, `Movil`, `Email`) VALUES (, 'Persona', 'Antonio', 'Gil', '30125478T', 'Galvan 109 ap 33', '08015', 'Barcelona', 'España', '', '652254789', 'info@info.com');
INSERT INTO `avansat_db`.`clientes` (`id_cliente`, `Tipo_cliente`, `Nombre`, `Apellidos`, `Id_fiscal`, `Direccion`, `C_postal`, `Localidad`, `Pais`, `Telefono`, `Movil`, `Email`) VALUES (, 'Persona', 'José Manuel', 'Sanchez', '32147895P', 'Marialluisa 22 AtB', '17300', 'Blanes', 'España', '982125478', NULL, 'recrea@info.es');
INSERT INTO `avansat_db`.`clientes` (`id_cliente`, `Tipo_cliente`, `Nombre`, `Apellidos`, `Id_fiscal`, `Direccion`, `C_postal`, `Localidad`, `Pais`, `Telefono`, `Movil`, `Email`) VALUES (, 'Empresa', 'Aliexpress', NULL, '52148777H', 'Nicaragua 113 20A', '19000', 'Victoria', 'España', '958741236', '666333222', 'ali@aliexpress.es');

COMMIT;


-- -----------------------------------------------------
-- Data for table `avansat_db`.`stock`
-- -----------------------------------------------------
START TRANSACTION;
USE `avansat_db`;
INSERT INTO `avansat_db`.`stock` (`Id_stock`, `Codigo`, `Cantidad`, `Nombre`, `Precio_coste`, `Precio_coste_iva`, `Precio_venta`, `Precio_venta_iva`) VALUES (DEFAULT, '00589', 2, 'Calentador Freeire', 125, NULL, 325, NULL);
INSERT INTO `avansat_db`.`stock` (`Id_stock`, `Codigo`, `Cantidad`, `Nombre`, `Precio_coste`, `Precio_coste_iva`, `Precio_venta`, `Precio_venta_iva`) VALUES (DEFAULT, '1234568', 12, 'juntas colters', 23, NULL, 46, NULL);
INSERT INTO `avansat_db`.`stock` (`Id_stock`, `Codigo`, `Cantidad`, `Nombre`, `Precio_coste`, `Precio_coste_iva`, `Precio_venta`, `Precio_venta_iva`) VALUES (DEFAULT, '25897122', 2, 'Repuestos varios', 2.5, NULL, 7.5, NULL);
INSERT INTO `avansat_db`.`stock` (`Id_stock`, `Codigo`, `Cantidad`, `Nombre`, `Precio_coste`, `Precio_coste_iva`, `Precio_venta`, `Precio_venta_iva`) VALUES (DEFAULT, '3650012', 5, 'Conector GR', 32.75, NULL, 60.23, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `avansat_db`.`servicios`
-- -----------------------------------------------------
START TRANSACTION;
USE `avansat_db`;
INSERT INTO `avansat_db`.`servicios` (`Id_servicio`, `Codigo`, `Nombre`, `Precio_coste`, `Precio_coste_iva`, `Precio_venta`, `Precio_venta_iva`) VALUES (DEFAULT, '012345', 'Horas trabajo', 30, 58, 122, 155);
INSERT INTO `avansat_db`.`servicios` (`Id_servicio`, `Codigo`, `Nombre`, `Precio_coste`, `Precio_coste_iva`, `Precio_venta`, `Precio_venta_iva`) VALUES (DEFAULT, '123045', 'Revision Caldera', 45, 60, 100, 121);

COMMIT;


-- -----------------------------------------------------
-- Data for table `avansat_db`.`facturas`
-- -----------------------------------------------------
START TRANSACTION;
USE `avansat_db`;
INSERT INTO `avansat_db`.`facturas` (`Id_factura`, `Fecha_alta`, `Fecha_vencimiento`, `Estado`, `Base_imponible`, `Total`) VALUES (DEFAULT, '01/09/2023', '31/09/2023', 'Pagada', 123, 242);
INSERT INTO `avansat_db`.`facturas` (`Id_factura`, `Fecha_alta`, `Fecha_vencimiento`, `Estado`, `Base_imponible`, `Total`) VALUES (DEFAULT, '02/03/2024', '02/04/2024', 'Pagada', 258,30, 270,50);
INSERT INTO `avansat_db`.`facturas` (`Id_factura`, `Fecha_alta`, `Fecha_vencimiento`, `Estado`, `Base_imponible`, `Total`) VALUES (DEFAULT, '04/05/2024', '04/06/2024', 'Pendiente', 23,50, 142,75);

COMMIT;

