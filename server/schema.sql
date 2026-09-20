DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS showings;
DROP TABLE IF EXISTS seats;
DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
    id BIGINT NOT NULL AUTO_INCREMENT,
    movieName VARCHAR(100) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    director VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE seats (
    id BIGINT NOT NULL AUTO_INCREMENT,
    seatRow char(1) NOT NULL,
    seatNumber INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_seat (seatRow, seatNumber)
);

CREATE TABLE showings (
    id BIGINT NOT NULL AUTO_INCREMENT,
    showing_date DATE NOT NULL,
    movie BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (movie) REFERENCES movies(id)
);

CREATE TABLE tickets (
    id BIGINT NOT NULL AUTO_INCREMENT,
    showing BIGINT NOT NULL,
    seat BIGINT NOT NULL,
    confirmed BOOLEAN NOT NULL,
    timer TINYINT,
    PRIMARY KEY (id),
    FOREIGN KEY (showing) REFERENCES showings(id),
    FOREIGN KEY (seat) REFERENCES seats(id),
    UNIQUE KEY unique_ticket (seat, showing)
);
