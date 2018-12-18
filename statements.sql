useful links:
 - http://www.peachpit.com/articles/article.aspx?p=1752305&seqNum=2
 - https://stackoverflow.com/questions/20856/recommended-sql-database-design-for-tags-or-tagging

CREATE TABLE `test`.`shops` (
  `id` BIGINT NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `address` VARCHAR(100) NOT NULL UNIQUE,
  `lng` DOUBLE NOT NULL,
  `lat` DOUBLE NOT NULL,
  `withdrawn` BOOLEAN NOT NULL,
  `brand` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `test`.`ownstag` (
  `idtag` BIGINT NOT NULL,
  `id` BIGINT NOT NULL);

CREATE TABLE `test`.`tag` (
  `idtag` BIGINT NOT NULL UNIQUE,
  `tag_name` VARCHAR(45) NOT NULL UNIQUE,
  PRIMARY KEY (`idtag`));

CREATE TABLE `test`.`volunteers` (
  `id` BIGINT NOT NULL,
  `username` VARCHAR(20) NOT NULL UNIQUE,
  `firstname` VARCHAR(20) NOT NULL,
  `lastname` VARCHAR(20) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `email` VARCHAR(10) NOT NULL UNIQUE,
  `dateofbirth` DATE NOT NULL,
  `dateofreg` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `test`.`password` (
  `volunteerid` BIGINT NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`password`, `volunteerid`));

CREATE TABLE `test`.`products` (
  `id` BIGINT NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `description` VARCHAR(300) NOT NULL,
  `category` VARCHAR(20) NOT NULL,
  `withdrawn` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `test`.`images` (
  `id` BIGINT NOT NULL UNIQUE,
  `path` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `test`.`prices` (
  `price` DOUBLE NOT NULL,
  `date` DATE NOT NULL,
  `productid` BIGINT NOT NULL,
  `shopid` BIGINT NOT NULL,
  `volunteerid` BIGINT NOT NULL);

