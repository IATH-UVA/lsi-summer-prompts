#warming up
SELECT name, year FROM movies WHERE year=1902 AND rank>5;

#1) birth year (and letter of name as start of title)
SELECT * FROM movies WHERE year=1979 AND name LIKE 'M%';

#2) 1982 count
SELECT COUNT(*) FROM movies WHERE year=1982;

#3) stacktors
SELECT * FROM actors WHERE last_name LIKE '%stack%';

#4) 10 most popular last, first
# LAST TESTING
SELECT last_name, count(*) AS lastsum FROM actors GROUP BY last_name ORDER BY lastsum DESC LIMIT 10;
# FIRST TESTING
SELECT first_name, count(*) AS firstsum FROM actors GROUP BY first_name
# concatenated
SELECT FIRST_NAME || ' ' || last_name as name, count(FIRST_NAME || ' ' || last_name) as sum FROM actors GROUP BY name ORDER BY sum DESC LIMIT 10;

#5) List the top 100 most active actors and the number of roles they have starred in...
# join some actors and roles
SELECT actor_id, last_name, first_name, count(role) as rolesum
   FROM actors, roles
   WHERE  actors.id = roles.actor_id
   group by actor_id
   order by rolesum
   DESC LIMIT 100;

#6) How many movies does IMDB have of each genre, ordered by least popular genre?
# genre and movies table joins...
SELECT genre, count(name) as namesum
   FROM movies, movies_genres
   WHERE  movies.id = movies_genres.movie_id
   group by genre
   order by namesum;

#7) List the first and last names of all the actors who played in the 1995 movie 'Braveheart', arranged alphabetically by last name.
# multiple joins

SELECT first_name, last_name, name
   FROM movies, roles, actors
   WHERE  movies.id = roles.movie_id AND roles.actor_id = actors.id
   AND movies.name = 'Braveheart' AND movies.year= 1995
   ORDER BY last_name;


#8) Leap Noir in years divisible by 4: director name, the movie name, and the year, sorted by movie name
SELECT first_name, last_name, name, year
   FROM movies, movies_directors, directors
   WHERE  movies.id = movies_directors.movie_id AND directors.id = movies_directors.director_id
   AND movies.year%4= 0
   ORDER BY name;


