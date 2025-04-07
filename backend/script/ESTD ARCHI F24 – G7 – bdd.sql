CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    googleId VARCHAR(255) DEFAULT NULL,
    facebookId VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL DEFAULT '06 06 06 06 06',
    -- On stocke le tableau "address" au format JSON (disponible sur MySQL 5.7+ ou MariaDB 10.2+)
    address JSON DEFAULT '["Vincennes", "Paris"]',
    userType ENUM('admin', 'client', 'employer') NOT NULL DEFAULT 'client',
    profile VARCHAR(255) NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png',
    answer VARCHAR(255) NOT NULL DEFAULT 'test',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO Users (userName, email, password, userType)
VALUES
    ('Back-office (Admin)',   'thetiptop2025@gmail.com', 'Admin2025@',   'admin'),
    ('Back-office (Employe)', 'employe@gmail.com',       'Employe2025@', 'employer'),
    ('Back-office (Client)',  'client@gmail.com',        'Client2025@',  'client');

CREATE TABLE WinningTickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticketNumber VARCHAR(20) NOT NULL UNIQUE,
    isUsed BOOLEAN NOT NULL DEFAULT FALSE,
    prizeValue INT NOT NULL,
    prizeWon VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE Gains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    ticketNumber VARCHAR(20) NOT NULL UNIQUE,
    prizeWon VARCHAR(255) NOT NULL,
    prizeValue INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES Users(id)
);





CREATE PROCEDURE generateWinningTickets()
BEGIN
    DECLARE count INT DEFAULT 0;
    DECLARE prize_count INT;
    DECLARE prize_value INT;
    DECLARE prize_won VARCHAR(255);

    -- Lot 1 : 300 000 tickets, valeur 10, objet "1 Infuseur à thé"
    SET prize_count = 300000;
    SET prize_value = 10;
    SET prize_won = '1 Infuseur à thé';
    SET count = 0;
    WHILE count < prize_count DO
        INSERT INTO WinningTickets (ticketNumber, isUsed, prizeValue, prizeWon, created_at, updated_at)
        VALUES (
            CONCAT('3T-', UPPER(SUBSTRING(MD5(RAND()), 1, 7))),
            FALSE,
            prize_value,
            prize_won,
            NOW(),
            NOW()
        );
        SET count = count + 1;
    END WHILE;

    -- Lot 2 : 100 000 tickets, valeur 15, objet "1 Boite de 100g d’un thé détox ou infusion"
    SET prize_count = 100000;
    SET prize_value = 15;
    SET prize_won = '1 Boite de 100g d’un thé détox ou infusion';
    SET count = 0;
    WHILE count < prize_count DO
        INSERT INTO WinningTickets (ticketNumber, isUsed, prizeValue, prizeWon, created_at, updated_at)
        VALUES (
            CONCAT('3T-', UPPER(SUBSTRING(MD5(RAND()), 1, 7))),
            FALSE,
            prize_value,
            prize_won,
            NOW(),
            NOW()
        );
        SET count = count + 1;
    END WHILE;

    -- Lot 3 : 50 000 tickets, valeur 20, objet "1 boite de 100g d’un thé signature"
    SET prize_count = 50000;
    SET prize_value = 20;
    SET prize_won = '1 boite de 100g d’un thé signature';
    SET count = 0;
    WHILE count < prize_count DO
        INSERT INTO WinningTickets (ticketNumber, isUsed, prizeValue, prizeWon, created_at, updated_at)
        VALUES (
            CONCAT('3T-', UPPER(SUBSTRING(MD5(RAND()), 1, 7))),
            FALSE,
            prize_value,
            prize_won,
            NOW(),
            NOW()
        );
        SET count = count + 1;
    END WHILE;

    -- Lot 4 : 30 000 tickets, valeur 39, objet "1 coffret découverte d’une valeur de 39€"
    SET prize_count = 30000;
    SET prize_value = 39;
    SET prize_won = '1 coffret découverte d’une valeur de 39€';
    SET count = 0;
    WHILE count < prize_count DO
        INSERT INTO WinningTickets (ticketNumber, isUsed, prizeValue, prizeWon, created_at, updated_at)
        VALUES (
            CONCAT('3T-', UPPER(SUBSTRING(MD5(RAND()), 1, 7))),
            FALSE,
            prize_value,
            prize_won,
            NOW(),
            NOW()
        );
        SET count = count + 1;
    END WHILE;

    -- Lot 5 : 20 000 tickets, valeur 69, objet "1 coffret découverte d’une valeur de 69€"
    SET prize_count = 20000;
    SET prize_value = 69;
    SET prize_won = '1 coffret découverte d’une valeur de 69€';
    SET count = 0;
    WHILE count < prize_count DO
        INSERT INTO WinningTickets (ticketNumber, isUsed, prizeValue, prizeWon, created_at, updated_at)
        VALUES (
            CONCAT('3T-', UPPER(SUBSTRING(MD5(RAND()), 1, 7))),
            FALSE,
            prize_value,
            prize_won,
            NOW(),
            NOW()
        );
        SET count = count + 1;
    END WHILE;
END$$

DELIMITER ;

-- Exécutez la procédure pour générer les tickets
CALL generateWinningTickets();

