DROP TABLE IF EXISTS `participant`;
DROP TABLE IF EXISTS `association`;
DROP TABLE IF EXISTS `horaire`;
DROP TABLE IF EXISTS `inscription`;
DROP TABLE IF EXISTS `activite`;

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
  places INT NOT NULL,
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
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL
);

CREATE TABLE inscription (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  participant_id INT NOT NULL,
  activite_id INT NOT NULL,
  FOREIGN KEY (participant_id) REFERENCES participant(id),
  FOREIGN KEY (activite_id) REFERENCES horaire(id)
);

INSERT INTO association (nom, description)
VALUES
    ("MyLittlePwnies", "association de cybersecurite"),
    ("RacconBreaker", "BDE"),
    ("AJCALNN", "association des joueurs compulsif au loisir non numerique"),
    ("EpiTranspi", "association de sport"),
    ("Epiclutch", "association de e-sport"),
    ("Epipop", "association de culture pop");

-- Insertion des activités
INSERT INTO activite (nom, description, association_id, places)
VALUES
    ("CTF", "capture the flag", 1, 12),
    ("Nerf", "Battaile de nerf", 2, 30),
    ("Escape game (CHTULHU)", "Venez faire un escape game sur le theme de chtulhu", 3, 6),
    ("tournois de ping-pong", "association de sport", 4, 8),
    ("PS4 switch", "duel sur differents jeux videos", 5, 12),
    ("quizz, blindtest et pixel art", "la pop c'est cool", 6, 20);

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
    (5, '2023-06-03 15:00:00', '2023-06-03 16:00:00'),

    (6, '2023-05-29 13:00:00', '2023-05-29 14:00:00'),
    (6, '2023-05-29 14:00:00', '2023-05-29 15:00:00'),
    (6, '2023-05-29 15:00:00', '2023-05-29 16:00:00');


INSERT INTO inscription (participant_id, activite_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10),
    (1, 11),
    (1, 12),
    (1, 13),
    (1, 14),
    (1, 15);