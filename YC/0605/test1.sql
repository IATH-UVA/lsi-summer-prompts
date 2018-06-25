/*SELECT name, year, rank FROM movies 
WHERE year=1992 AND rank>3
ORDER BY rank DESC;

SELECT COUNT(*) FROM movies WHERE year=1992;

SELECT * FROM actors WHERE last_name LIKE '%stack%';

SELECT first_name || ' ' || last_name as full_name, 
COUNT(first_name || ' ' || last_name) as sum 
FROM actors  GROUP BY full_name 
ORDER BY sum DESC
LIMIT 10;

SELECT first_name, last_name, COUNT(actor_id) as roleSum 
     FROM actors, roles
	 WHERE actors.id = roles.actor_id
	 GROUP BY actor_id
	 ORDER BY roleSum DESC
	 LIMIT 100; 
	 
SELECT genre, COUNT(genre) as popularity
     FROM movies_genres
	 WHERE movies.id = movies_genres.movies_id
     GROUP BY genre
     ORDER BY popularity	 
	 
SELECT first_name, last_name
FROM actors, movies, roles
WHERE movies.id = roles.movie_id
     AND roles.actor_id = actors.id
     AND movies.name = "Braveheart"
     AND movies.year = 1995
ORDER BY last_name	 

SELECT first_name, last_name, name, year
FROM directors, movies, movies_genres, movies_directors
WHERE movies_genres.genre = "Film-Noir"
AND  movies_genres.movie_id = movies.id
AND movies_directors.movie_id = movies.id
AND movies_directors.director_id = directors.id
AND movies.year%4 =0
ORDER BY name */

SELECT first_name, last_name, name, year
FROM directors, movies, actors, roles
WHERE movies_genres.genre = "Film-Noir"
AND  movies_genres.movie_id = movies.id
AND movies_directors.movie_id = movies.id
AND movies_directors.director_id = directors.id
AND movies.year%4 =0
ORDER BY name


	 

