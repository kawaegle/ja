CREATE TABLE IF NOT EXISTS association (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS activite (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  association_id INT NOT NULL,
  FOREIGN KEY (association_id) REFERENCES association(id)
);

CREATE TABLE IF NOT EXISTS horaire (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  activite_id INT NOT NULL,
  debut DATETIME NOT NULL,
  fin DATETIME NOT NULL,
  FOREIGN KEY (activite_id) REFERENCES activite(id)
);

CREATE TABLE IF NOT EXISTS participant (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS inscription (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  participant_id INT NOT NULL,
  activite_id INT NOT NULL,
  FOREIGN KEY (participant_id) REFERENCES participant(id),
  FOREIGN KEY (activite_id) REFERENCES activite(id)
);

