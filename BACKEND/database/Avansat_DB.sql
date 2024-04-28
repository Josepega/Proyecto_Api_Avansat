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
  `Tipo_cliente` VARCHAR(45) NULL DEFAULT NULL,
  `Nombre` VARCHAR(255) NOT NULL,
  `Apellidos` VARCHAR(255) NULL DEFAULT NULL,
  `Id_fiscal` VARCHAR(12) NOT NULL,
  `Direccion` VARCHAR(255) NOT NULL,
  `C_postal` VARCHAR(15) NULL DEFAULT 'Desconocido',
  `Localidad` VARCHAR(45) NULL DEFAULT 'Desconocido',
  `Pais` VARCHAR(45) NULL DEFAULT 'Desconocido',
  `Telefono` VARCHAR(15) NULL DEFAULT 'Desconocido',
  `Movil` VARCHAR(15) NULL DEFAULT 'Desconocido',
  `Email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_cliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 20257
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `avansat_db`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`facturas` (
  `Id_factura` INT(15) NOT NULL AUTO_INCREMENT,
  `Fecha_alta`date NULL ,
  `Id_cliente` INT(15) NULL,
  `Albaran` VARCHAR(45) NULL  ,
  `Fecha_vencimiento` VARCHAR(45)  NULL ,
  `Estado` VARCHAR(45) NULL ,
  `Forma_pago` VARCHAR(45)  NULL  ,
  `Base_imponible` DECIMAL(8,2)  NULL ,
  `Total` DECIMAL(8,2)  NULL  ,
  PRIMARY KEY (`Id_factura`, `Id_cliente`),
  CONSTRAINT `fk_facturas_clientes1`
    FOREIGN KEY (`Id_cliente`)
    REFERENCES `avansat_db`.`clientes` (`Id_cliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `avansat_db`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`stock` (
  `Id_stock` INT(15) NOT NULL AUTO_INCREMENT,
  `Codigo` VARCHAR(45) NOT NULL,
  `Cantidad` INT(11) NOT NULL,
  `Nombre` VARCHAR(255) NOT NULL,
  `Precio_coste` DECIMAL(8,2) NULL DEFAULT NULL,
  `Precio_coste_iva` DECIMAL(8,2) NULL DEFAULT NULL,
  `Precio_venta` DECIMAL(8,2) NULL DEFAULT NULL,
  `Precio_venta_iva` DECIMAL(8,2) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_stock`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `avansat_db`.`detalle_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`detalle_factura` (
  `facturas_Id_factura` INT(15) NOT NULL,
  `facturas_Id_cliente` INT(15) NOT NULL,
  `Cantidad` INT(15) NULL DEFAULT NULL,
  `stock_Id_stock` INT(15) NOT NULL,
  `Codigo` VARCHAR(45) NULL,
  PRIMARY KEY (`facturas_Id_factura`, `facturas_Id_cliente`, `stock_Id_stock`),
  CONSTRAINT `fk_stock_has_facturas_facturas1`
    FOREIGN KEY (`facturas_Id_factura` , `facturas_Id_cliente`)
    REFERENCES `avansat_db`.`facturas` (`Id_factura` , `Id_cliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_stock_has_facturas_stock1`
    FOREIGN KEY (`stock_Id_stock`)
    REFERENCES `avansat_db`.`stock` (`Id_stock`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `avansat_db`.`servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`servicios` (
  `Id_servicio` INT(15) NOT NULL AUTO_INCREMENT,
  `Codigo` VARCHAR(45) NOT NULL,
  `Nombre` VARCHAR(255) NOT NULL,
  `Precio_coste` DECIMAL(8,2) NULL DEFAULT NULL,
  `Precio_coste_iva` DECIMAL(8,2) NULL DEFAULT NULL,
  `Precio_venta` DECIMAL(8,2) NULL DEFAULT NULL,
  `Precio_venta_iva` DECIMAL(8,2) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_servicio`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `avansat_db`.`presupuestos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`presupuestos` (
  `Id_presupuesto` INT(15) NOT NULL AUTO_INCREMENT,
  `Fecha_alta` DATE NULL DEFAULT NULL,
  `Id_cliente` INT(15) NOT NULL,
  `Albaran` VARCHAR(45) NULL DEFAULT NULL,
  `Fecha_vencimiento` VARCHAR(45) NULL DEFAULT NULL,
  `Estado` VARCHAR(45) NULL DEFAULT NULL,
  `Forma_pago` VARCHAR(45) NULL DEFAULT NULL,
  `Base_imponible` DECIMAL(8,2) NULL DEFAULT NULL,
  `Total` DECIMAL(8,2) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_presupuesto`, `Id_cliente`),
  CONSTRAINT `fk_presupuestos_clientes1`
    FOREIGN KEY (`Id_cliente`)
    REFERENCES `avansat_db`.`clientes` (`Id_cliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `avansat_db`.`detalle_presupuesto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avansat_db`.`detalle_presupuesto` (
  `presupuestos_Id_presupuesto` INT(15) NOT NULL,
  `presupuestos_Id_cliente` INT(15) NOT NULL,
  `Cantidad` INT(15) NULL,
  `stock_Id_stock` INT(15) NOT NULL,
  `Codigo` VARCHAR(45) NULL,
  PRIMARY KEY (`presupuestos_Id_presupuesto`, `presupuestos_Id_cliente`, `stock_Id_stock`),
  CONSTRAINT `fk_presupuestos_has_stock_presupuestos1`
    FOREIGN KEY (`presupuestos_Id_presupuesto` , `presupuestos_Id_cliente`)
    REFERENCES `avansat_db`.`presupuestos` (`Id_presupuesto` , `Id_cliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_presupuestos_has_stock_stock1`
    FOREIGN KEY (`stock_Id_stock`)
    REFERENCES `avansat_db`.`stock` (`Id_stock`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `avansat_db`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  `idUsuarios` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NULL ,
  `contrasena` VARCHAR(150) NULL,
  `mail` VARCHAR(45) NULL ,
  `numPersonas` INT(11) NULL,
  PRIMARY KEY (`idUsuarios`)
  );



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `avansat_db`.`clientes`
-- -----------------------------------------------------
START TRANSACTION;
USE `avansat_db`;
INSERT INTO `avansat_db`.`clientes` (`Id_cliente`, `Tipo_cliente`, `Nombre`, `Apellidos`, `Id_fiscal`, `Direccion`, `C_postal`, `Localidad`, `Pais`, `Telefono`, `Movil`, `Email`) VALUES (DEFAULT, 'Persona', 'Juan Antonio', 'Bautista', '32014728P', 'Gran via de las cortes catalanas 555', '08014', 'Barcelona', 'España', '985231478', '689698710', NULL);
INSERT INTO `avansat_db`.`clientes` (`Id_cliente`, `Tipo_cliente`, `Nombre`, `Apellidos`, `Id_fiscal`, `Direccion`, `C_postal`, `Localidad`, `Pais`, `Telefono`, `Movil`, `Email`) VALUES (DEFAULT, 'Empresa', 'Avansat', 'Empresa', '75412387K', 'C/ Carretas 2345 5º2', '17562', 'Gerona', 'España', '965878795', '656874123', NULL);
INSERT INTO usuarios (nombre,  mail, contrasena) VALUES ('Jose Manuel', 'info@avansat.cat', '123');

COMMIT;
select * from usuarios;

-- -----------------------------------------------------
-- Data for table `avansat_db`.`stock`
-- -----------------------------------------------------
START TRANSACTION;
USE `avansat_db`;
INSERT INTO `avansat_db`.`stock` (`Id_stock`, `Codigo`, `Cantidad`, `Nombre`, `Precio_coste`, `Precio_coste_iva`, `Precio_venta`, `Precio_venta_iva`) VALUES (DEFAULT, '123456789', 200, 'Repuesto Genérigo Fagor', 100, 121, 200, 242);
INSERT INTO `avansat_db`.`stock` (`Id_stock`, `Codigo`, `Cantidad`, `Nombre`, `Precio_coste`, `Precio_coste_iva`, `Precio_venta`, `Precio_venta_iva`) VALUES (DEFAULT, '123654788', 450, 'Vaso Calentador Expansor ', 300, 366, 600, 710);

COMMIT;
select * from facturas;
select * from usuarios;
