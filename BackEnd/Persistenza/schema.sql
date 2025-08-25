-- UTENTE
CREATE TABLE Utente (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    fotoProfilo TEXT,
    eta INT,
    bio TEXT,
    hashtag TEXT,
    stato VARCHAR(20)
);

-- CHAT
CREATE TABLE Chat (
    id INT PRIMARY KEY
);

-- MESSAGGIO
CREATE TABLE Messaggio (
    id TEXT PRIMARY KEY,
    contenuto TEXT
);

-- EVENTO
CREATE TABLE Evento (
    nomeEvento VARCHAR(100),
    nomeGruppo VARCHAR(100),
    img_url TEXT,
    inizio TIMESTAMP,
    fine TIMESTAMP,
    descrizione TEXT,
    approvato BOOLEAN,
    PRIMARY KEY (nomeEvento, nomeGruppo)
);

-- EVENTO_CONDIVISO
CREATE TABLE Evento_Condiviso (
    nomeEvento VARCHAR(100),
    gruppoPromotore VARCHAR(100),
    PRIMARY KEY (nomeEvento, gruppoPromotore),
    FOREIGN KEY (nomeEvento, gruppoPromotore) REFERENCES Evento(nomeEvento, nomeGruppo),
    FOREIGN KEY (gruppoPromotore) REFERENCES Gruppo(nomeGruppo)
);

-- PROPOSTA_EVENTO
CREATE TABLE Proposta_Evento (
    promotore VARCHAR(100) REFERENCES Utente(username)
);

-- EVENTO_APPROVATO
CREATE TABLE Evento_Approvato (
nomeEvento VARCHAR(100),
    nomeGruppo VARCHAR(100),
    PRIMARY KEY (nomeEvento, nomeGruppo),
    FOREIGN KEY (nomeEvento, nomeGruppo) REFERENCES Evento(nomeEvento, nomeGruppo)
);
-- PARTECIPANTE_EVENTO
CREATE TABLE Partecipante_Evento (
    nomeGruppo VARCHAR(100),
    nomeEvento VARCHAR(100),
    username VARCHAR(50),
    PRIMARY KEY (nomeEvento, username),
    FOREIGN KEY (nomeEvento, nomeGruppo) REFERENCES Evento(nomeEvento, nomeGruppo),
    FOREIGN KEY (username) REFERENCES Utente(username)
);

-- PARTECIPANTE_GRUPPO
CREATE TABLE Partecipante_Gruppo (
    nomeGruppo VARCHAR(100),
    username VARCHAR(50),
    PRIMARY KEY (nomeGruppo, username),
    FOREIGN KEY (nomeGruppo) REFERENCES Gruppo(nomeGruppo),
    FOREIGN KEY (username) REFERENCES Utente(username)
);

-- MODERATORE
CREATE TABLE Moderatore (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255)
);

-- SEGNALAZIONE
CREATE TABLE Segnalazione (
    idSegnalazione INT PRIMARY KEY,
    motivo TEXT
);

-- GRUPPO
CREATE TABLE Gruppo (
    nomeGruppo VARCHAR(100) PRIMARY KEY,
    img_url VARCHAR(100),
    immagine TEXT,
    descrizione TEXT
);

-- INVITO
CREATE TABLE Invito (
    id INT PRIMARY KEY,
    daGruppo VARCHAR(100),
    perGruppo VARCHAR(100),
    eventoCondiviso VARCHAR(100),
    accettato: BOOLEAN
    FOREIGN KEY (daGruppo) REFERENCES Gruppo(nomeGruppo),
    FOREIGN KEY (perGruppo) REFERENCES Gruppo(nomeGruppo),
    FOREIGN KEY (eventoCondiviso, daGruppo) REFERENCES Evento_Condiviso(nomeEvento, gruppoPromotore)
);

CREATE TABLE Evento_Decorator(
    nomeEvento VARCHAR(100),
    gruppoPromotore VARCHAR(100),
    tipo TEXT,
    PRIMARY KEY (nomeEvento, gruppoPromotore),
    FOREIGN KEY (nomeEvento, gruppoPromotore) REFERENCES Evento(nomeEvento, nomeGruppo),
    FOREIGN KEY (gruppoPromotore) REFERENCES Gruppo(nomeGruppo)
);

-- ORGANIZZATORE_EVENTO
CREATE TABLE Organizzatore_Evento (
    nomeEvento VARCHAR(100),
    nomeGruppo VARCHAR(100),
    utente VARCHAR(50),
    PRIMARY KEY (nomeEvento, utente),
    FOREIGN KEY (nomeEvento, nomeGruppo) REFERENCES Evento(nomeEvento, nomeGruppo),
    FOREIGN KEY (utente) REFERENCES Utente(username)
);

-- AMMINISTRATORE_GRUPPO
CREATE TABLE Amministratore_Gruppo (
    nomeGruppo VARCHAR(100),
    utente VARCHAR(50),
    PRIMARY KEY (nomeGruppo, utente),
    FOREIGN KEY (nomeGruppo) REFERENCES Gruppo(nomeGruppo),
    FOREIGN KEY (utente) REFERENCES Utente(username)
);
