CREATE TABLE movies (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    director VARCHAR(100) NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE seats (
    id BIGINT NOT NULL AUTO_INCREMENT,
    row char(1) NOT NULL,
    number INT NOT NULL,
    PRIMARY KEY (id)
    UNIQUE KEY unique_seat (row, number)
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
    PRIMARY KEY (id),
    FOREIGN KEY (showing) REFERENCES showings(id),
    FOREIGN KEY (seat) REFERENCES seats(id)
    UNIQUE KEY unique_ticket (seat, showing)
);