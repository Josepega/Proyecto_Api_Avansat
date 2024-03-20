-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Avansat
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Avansat_DB` ;

-- -----------------------------------------------------
-- Schema Avansat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Avansat_DB` DEFAULT CHARACTER SET utf8 ;
USE `Avansat_DB` ;

-- -----------------------------------------------------
-- Table `Avansat`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Avansat_DB`.`clientes` (
  `id_clientes` INT NOT NULL,
  `Nombre` VARCHAR(255) NULL,
  `Apellidos` VARCHAR(255) NULL,
  `Nif` VARCHAR(9) NULL,
  `Cif` VARCHAR(9) NULL,
  `Direccion` VARCHAR(255) NULL,
  `Telefono` VARCHAR(15) NULL,
  `Movil` VARCHAR(15) NULL,
  `Email` VARCHAR(45) NULL,
  PRIMARY KEY (`id_clientes`))
ENGINE = InnoDB;


