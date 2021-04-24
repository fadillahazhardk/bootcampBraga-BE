
-- CRUD TABLES

--@block
CREATE TABLE profiles (
        id SERIAL PRIMARY KEY,
        fltr varchar(255),
        imgSrc varchar(255),
        title varchar(255),
        summary varchar(255),
        galleryHref varchar(255)
    );

--@block
SELECT *
FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND 
    schemaname != 'information_schema';

--@block
SELECT 
   table_name, 
   column_name, 
   data_type 
FROM 
   information_schema.columns
WHERE 
   table_name = 'profiles';

--@block
ALTER TABLE profiles
ADD galleryTitle varchar(255);

--@block
DROP TABLE profiles;


-- CRUD ROWS

--@block
INSERT INTO profiles (fltr, imgSrc, title, summary, galleryHref, galleryTitle)
VALUES 
    ('filter-app', 'assets/img/portfolio/portfolio-1.jpg', 'App 1', 'App', 'assets/img/portfolio/portfolio-1.jpg', 'App 1')
RETURNING id ;

--@block
SELECT * FROM profiles;

--@block
UPDATE profiles
SET
    imgsrc = 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    GalleryHref= 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
WHERE id = 4;

--@block
DELETE FROM profiles WHERE id=1;