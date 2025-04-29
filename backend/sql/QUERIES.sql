-- Query 1: List all users and the number of artworks they have saved (JOIN + GROUP BY + HAVING)
SELECT u.username, COUNT(uc.object_id) AS artwork_count
FROM user u
LEFT JOIN user_collection uc ON u.user_id = uc.user_id
GROUP BY u.username
HAVING COUNT(uc.object_id) > 0;

-- Query 2: Find artworks created by artists with nationality 'French' (JOIN + WHERE)
SELECT ao.object_name, a.artist_name
FROM artobject ao
JOIN creator c ON ao.creator_id = c.creator_id
JOIN artist a ON c.creator_id = a.creator_id
WHERE a.nationality = 'French';

-- Query 3: Find the museums with more than 3 artworks exhibited (JOIN + GROUP BY + HAVING)
SELECT m.museum_name, COUNT(ao.object_id) AS total_artworks
FROM museum m
JOIN artobject ao ON m.museum_id = ao.museum_id
GROUP BY m.museum_id
HAVING total_artworks > 3;

-- Query 4: Show artworks that use 'Oil' as medium (JOIN + WHERE)
SELECT ao.object_name, m.name AS medium_name
FROM artobject ao
JOIN medium m ON ao.medium_id = m.medium_id
WHERE m.name = 'Oil';

-- Query 5: Find users who have saved at least one artwork created before 1900 (subquery)
SELECT DISTINCT u.username
FROM user u
WHERE u.user_id IN (
    SELECT uc.user_id
    FROM user_collection uc
    JOIN artobject ao ON uc.object_id = ao.object_id
    WHERE ao.year < 1900
);

-- Query 6: Find artworks stored in a department called 'Paintings' (JOIN)
SELECT ao.object_name
FROM artobject ao
JOIN department d ON ao.dept_id = d.dept_id
WHERE d.dept_name = 'Paintings';

-- Query 7: Find artworks not created by companies (subquery with NOT IN)
SELECT ao.object_name
FROM artobject ao
WHERE ao.creator_id NOT IN (
    SELECT company_id FROM company
);

-- Query 8: List all medium names and type names (set operation UNION)
SELECT name AS item FROM medium
UNION
SELECT type_name AS item FROM type;