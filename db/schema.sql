DROP DATABASE IF EXISTS `georisk1`;
CREATE DATABASE `georisk1`;

USE `georisk1`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `Preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(100) NOT NULL,
  `favorites` BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);


-- Left Join to match user preferences to user by ID
SELECT Users.fi, userpref.id
FROM usercred
LEFT JOIN userpref ON usercred.id = userpref.id
ORDER BY usercred.first_name;