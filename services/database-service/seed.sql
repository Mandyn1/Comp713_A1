INSERT INTO movies (id, movieName, genre, director) VALUES
(1, 'Shrek', 'Adventure', 'Gordon Ramsay'),
(2, 'Lord of the Rings', 'Adventure', 'John Key'),
(3, 'Princess Bride', 'Romance', 'Andre the Giant'),
(4, 'Iron Man', 'Action', 'Michael Scott'),
(5, 'Pretty Woman', 'Romance', 'Channing Tatum');

INSERT INTO seats (seatRow, seatNumber) VALUES
('A', 1),('A', 2),('A', 3),('A', 4),('A', 5),
('B', 1),('B', 2),('B', 3),('B', 4),('B', 5),
('C', 1),('C', 2),('C', 3),('C', 4),('C', 5),
('D', 1),('D', 2),('D', 3),('D', 4),('D', 5);

INSERT INTO showings (showing_date, movie) VALUES
('2026-10-18', 1),
('2026-10-18', 4),
('2026-10-20', 1),
('2026-10-21', 2),
('2026-10-25', 3),
('2026-10-26', 5);

-- Username: admin, Password: admin123
INSERT INTO users (username, password) VALUES
('admin', '8c2e1e5b5258b0511868a6b0787d4f9b:3b0b57c1628164bd7aa14c6a5fd410dbd8230deb9f6a7ce38c56a2c14538f18c775ae7aa5c4ee34be31519c04bc78784539660c7e39fdfac76faddbf64e795da');