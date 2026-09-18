INSERT INTO movies (id, name, genre, director) VALUES
(1, 'Shrek', 'Adventure', 'Gordon Ramsay'),
(2, 'Lord of the Rings', 'Adventure', 'John Key'),
(3, 'Princess Bride', 'Romance', 'Andre the Giant'),
(4, 'Iron Man', 'Action', 'Michael Scott'),
(5, 'Pretty Woman', 'Romance', 'Channing Tatum');

INSERT INTO seats (row, number) VALUES
('A', 1),('A', 2),('A', 3),('A', 4),('A', 5),
('B', 1),('B', 2),('B', 3),('B', 4),('B', 5),
('C', 1),('C', 2),('C', 3),('C', 4),('C', 5),
('D', 1),('D', 2),('D', 3),('D', 4),('D', 5);

INSERT INTO showings (showing_date, movie) VALUES
(2026-10-18, 1),
(2026-10-18, 4),
(2026-10-20, 1),
(2026-10-21, 2),
(2026-10-25, 3),
(2026-10-26, 5);
