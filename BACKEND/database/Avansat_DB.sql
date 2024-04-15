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
  `Id_cliente` INT(15) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`Id_cliente`))
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
-- Table `avansat_db`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`facturas` (
  `Id_factura` INT(15) NOT NULL AUTO_INCREMENT,
  `Fecha_alta` DATE NULL,
  `Id_cliente` INT(15) NOT NULL,
  `Albaran` VARCHAR(45) NULL,
  `Fecha_vencimiento` VARCHAR(45) NULL,
  `Estado` VARCHAR(45) NULL,
  `Forma_pago` VARCHAR(45) NULL,
  `Base_imponible` DECIMAL(5,2) NULL,
  `Total` DECIMAL(5,2) NULL,
  PRIMARY KEY (`Id_factura`, `Id_cliente`),
  CONSTRAINT `fk_facturas_clientes1`
    FOREIGN KEY (`Id_cliente`)
    REFERENCES `avansat_db`.`clientes` (`Id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `avansat_db`.`detalle_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`detalle_factura` (
  `Id_factura` INT(15) NOT NULL,
  `Id_cliente` INT(15) NOT NULL,
  `Id_stock` INT(15) NOT NULL,
  `Cantidad` INT(15) NULL,
  PRIMARY KEY (`Id_factura`, `Id_cliente`, `Id_stock`),
  CONSTRAINT `fk_stock_has_facturas_stock1`
    FOREIGN KEY (`Id_stock`)
    REFERENCES `avansat_db`.`stock` (`Id_stock`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_stock_has_facturas_facturas1`
    FOREIGN KEY (`Id_factura` , `Id_cliente`)
    REFERENCES `avansat_db`.`facturas` (`Id_factura` , `Id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

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
select * from facturas;
