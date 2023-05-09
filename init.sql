DROP TABLE IF EXISTS `association`;
DROP TABLE IF EXISTS `activite`;
DROP TABLE IF EXISTS `horaire`;
DROP TABLE IF EXISTS `participant`;
DROP TABLE IF EXISTS `inscription`;

CREATE TABLE association (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE activite (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  association_id INT NOT NULL,
  FOREIGN KEY (association_id) REFERENCES association(id)
);

CREATE TABLE horaire (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  activite_id INT NOT NULL,
  debut DATETIME NOT NULL,
  fin DATETIME NOT NULL,
  FOREIGN KEY (activite_id) REFERENCES activite(id)
);

CREATE TABLE participant (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE inscription (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  participant_id INT NOT NULL,
  activite_id INT NOT NULL,
  FOREIGN KEY (participant_id) REFERENCES participant(id),
  FOREIGN KEY (activite_id) REFERENCES activite(id)
);

INSERT INTO association (nom, description)
VALUES
    ("MyLittlePwnies", "association de cybersecurité"),
    ("RacconBreaker", "BDE"),
    ("AJCALNN", "association des joueurs compulsif au loisir non numerique"),
    ("EpiTranspi", "association de sport"),
    ("Epiclutch", "association de e-sport");

-- Insertion des activités
INSERT INTO activite (nom, description, association_id)
VALUES
    ("CTF", "capture the flag", 1),
    ("Nerf", "Battaile de nerf", 2),
    ("Jeu de rôle", "association des joueurs compulsif au loisir non numerique", 3),
    ("Football", "association de sport", 4),
    ("League of Legends", "association de e-sport", 5);

-- Insertion des horaires
INSERT INTO horaire (activite_id, debut, fin)
VALUES
    (1, '2023-06-03 13:00:00', '2023-06-03 14:00:00'),
    (1, '2023-06-03 14:00:00', '2023-06-03 15:00:00'),
    (1, '2023-06-03 15:00:00', '2023-06-03 16:00:00'),

    (2, '2023-06-03 14:00:00', '2023-06-03 15:00:00'),
    (2, '2023-06-03 15:00:00', '2023-06-03 16:00:00'),

    (3, '2023-06-03 13:00:00', '2023-06-03 14:00:00'),
    (3, '2023-06-03 15:00:00', '2023-06-03 16:00:00'),

    (4, '2023-06-03 13:00:00', '2023-06-03 14:00:00'),
    (4, '2023-06-03 14:00:00', '2023-06-03 15:00:00'),

    (5, '2023-06-03 13:00:00', '2023-06-03 14:00:00'),
    (5, '2023-06-03 14:00:00', '2023-06-03 15:00:00'),
    (5, '2023-06-03 15:00:00', '2023-06-03 16:00:00');
