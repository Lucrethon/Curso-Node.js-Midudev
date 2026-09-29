DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;
USE moviesdb;


CREATE TABLE movies (

movie_id BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
title VARCHAR(255) NOT NULL, 
year INT NOT NULL, 
director VARCHAR(255) NOT NULL, 
duration INT NOT NULL, 
poster TEXT,
rate DECIMAL(2, 1) NOT NULL

);



CREATE TABLE genres (

genre_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE

);

CREATE TABLE movie_genres (
movie_id BINARY(16) REFERENCES movies(movie_id),
genre_id INT REFERENCES genres(genre_id), 
PRIMARY KEY (movie_id, genre_id)

);

INSERT INTO genres (name) VALUES
('Action'),
('Adventure'),
('Animation'),
('Biography'), 
('Crime'),
('Drama'),
('Fantasy'),
('Romance'),
('Sci-Fi');

INSERT INTO movies (title, year, director, duration, poster, rate) VALUES
('The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
('The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0);

INSERT INTO movie_genres (movie_id, genre_id) VALUES 
    ((SELECT movie_id from movies WHERE title = 'The Shawshank Redemption'), (SELECT genre_id FROM genres WHERE name = 'Drama')),
    ((SELECT movie_id from movies WHERE title = 'The Dark Knight'), (SELECT genre_id FROM genres WHERE name = 'Drama')),
    ((SELECT movie_id from movies WHERE title = 'The Dark Knight'), (SELECT genre_id FROM genres WHERE name = 'Action')),
    ((SELECT movie_id from movies WHERE title = 'The Dark Knight'), (SELECT genre_id FROM genres WHERE name = 'Crime'));

-- SELECT BIN_TO_UUID(movie_id) movie_id, title, year, director, duration, poster, rate FROM movies;

-- SELECT 
-- BIN_TO_UUID(m.movie_id),
-- m.title, 
-- m.year,
-- m.director,
-- m.duration,
-- m.POSTER,
-- m.rate,
-- g.name
-- FROM movies AS m
-- JOIN movie_genres AS mg
--     ON m.movie_id = mg.movie_id
-- JOIN genres as g
--     ON mg.genre_id = g.genre_id
-- WHERE g.name = 'Crime'; 

-- SELECT * FROM movies
-- WHERE movie_id = ;



