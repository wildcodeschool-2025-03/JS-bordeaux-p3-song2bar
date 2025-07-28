DROP DATABASE if exists song2bar;
CREATE DATABASE song2bar;
USE song2bar;

CREATE TABLE bar (
   id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   music_style VARCHAR(100) NOT NULL,
   address VARCHAR(100) NOT NULL,
   postcode INT NOT NULL,
   city VARCHAR(100) NOT NULL,
   image1 VARCHAR(255) NOT NULL,
   image2 VARCHAR(255) NOT NULL,
   image3 VARCHAR(255) NOT NULL,
   image4 VARCHAR(255) NOT NULL,
   hours_id INT,
   latitude FLOAT,
   longitude FLOAT
);

INSERT INTO bar (
   name,
   music_style,
   address,
   postcode,
   city,
   image1,
   image2,
   image3,
   image4,
   latitude,
   longitude
)
VALUES
('La Guinguette Chez Alriq', 'World', 'Quai des Queyries', 33100, 'Bordeaux',
 '/images/bar_images/la_guinguette_chez_alriq/image_1.jpg', '/images/bar_images/la_guinguette_chez_alriq/image_2.webp',
 '/images/bar_images/la_guinguette_chez_alriq/image_3.jpg', '/images/bar_images/la_guinguette_chez_alriq/image_4.jpg',
 44.8440566, -0.5642994),
('Iboat', 'Electro', 'Bassin a flot', 33300, 'Bordeaux',
 '/images/bar_images/iboat/image_1.jpg', '/images/bar_images/iboat/image_2.webp',
 '/images/bar_images/iboat/image_3.jpg', '/images/bar_images/iboat/image_4.jpg',
 44.8634792, -0.5568093),
('Blonde Venus', 'Electro', 'Bassin a flot', 33300, 'Bordeaux',
 '/images/bar_images/blonde_de_venus/image_1.webp', '/images/bar_images/blonde_de_venus/image_2.jpeg',
 '/images/bar_images/blonde_de_venus/image_3.jpg', '/images/bar_images/blonde_de_venus/image_4.jpg',
 44.8634792, -0.5568093),
('Pulp', 'World', '30 rue des vignes', 33000, 'Bordeaux',
 '/images/bar_images/pulp/image_1.jpg', '/images/bar_images/pulp/image_2.jpg',
 '/images/bar_images/pulp/image_3.jpg', '/images/bar_images/pulp/image_4.jpeg',
 44.8323956, -0.5652534),
('L''Avant-scene', 'Rock', '42 cours de l''Yser', 33000, 'Bordeaux',
 '/images/bar_images/l_avant_scene/image_1.jpg', '/images/bar_images/l_avant_scene/image_2.jpg',
 '/images/bar_images/l_avant_scene/image_3.jpg', '/images/bar_images/l_avant_scene/image_4.jpeg',
 44.8281851, -0.5685683),
('La Tencha', 'World', '22 quai de la monnaie', 33000, 'Bordeaux',
 '/images/bar_images/la_tencha/image_1.jpeg', '/images/bar_images/la_tencha/image_2.jpg',
 '/images/bar_images/la_tencha/image_3.jpg', '/images/bar_images/la_tencha/image_4.jpg',
 44.8335454, -0.5624974),
('Danse Machine', 'Groove', '45 quai Lawton', 33300, 'Bordeaux',
 '/images/bar_images/dance_machine/image_1.jpg', '/images/bar_images/dance_machine/image_2.jpg',
 '/images/bar_images/dance_machine/image_3.jpg', '/images/bar_images/dance_machine/image_4.jpg',
 44.8641505, -0.5569527),
('L''Apollo', 'Groove et funk', '19 place Fernand Lafargue', 33000, 'Bordeaux',
 '/images/bar_images/l_appollo/image_1.jpg', '/images/bar_images/l_appollo/image_2.jpeg',
 '/images/bar_images/l_appollo/image_3.jpg', '/images/bar_images/l_appollo/image_4.jpg',
 44.8372520, -0.5716578),
('The House Of Parlement', 'Pop', '11 rue du parlement', 33000, 'Bordeaux',
 '/images/bar_images/the_house_of_parliament/image_1.jpg', '/images/bar_images/the_house_of_parliament/image_2.jpeg',
 '/images/bar_images/the_house_of_parliament/image_3.jpg', '/images/bar_images/the_house_of_parliament/image_4.jpg',
 44.8406263, -0.5730344),
('Le Connemara Irish Pub', 'Rock', '14-18 Cours d''Albret', 33000, 'Bordeaux',
 '/images/bar_images/le_connemara/image_1.jpg', '/images/bar_images/le_connemara/image_2.jpg',
 '/images/bar_images/le_connemara/image_3.jpg', '/images/bar_images/le_connemara/image_4.webp',
 44.8327572, -0.5797856),
('Le Motel', 'Electro', '12 Place Fernand Lafargue', 33000, 'Bordeaux',
 '/images/bar_images/la_motel/image_1.webp', '/images/bar_images/la_motel/image_2.webp',
 '/images/bar_images/la_motel/image_3.webp', '/images/bar_images/la_motel/image_4.jpg',
 44.8369020, -0.5720472),
('Le Bistrot des Bouchons', 'Métal', '6 Cours Gambetta', 33400, 'Talence',
 '/images/bar_images/le_bistrot_des_bouchons/image_1.webp', '/images/bar_images/le_bistrot_des_bouchons/image_2.jpg',
 '/images/bar_images/le_bistrot_des_bouchons/image_3.jpeg', '/images/bar_images/le_bistrot_des_bouchons/image_4.jpg',
 44.8209245, -0.5829475),
('The Garage Bar', 'Rock', '40 Avenue du Maréchal de Lattre de Tassigny', 33610, 'Cestas',
 '/images/bar_images/the_garage_bar/image_1.jpg', '/images/bar_images/the_garage_bar/image_2.jpg',
 '/images/bar_images/the_garage_bar/image_3.jpg', '/images/bar_images/the_garage_bar/image_4.jpg',
 44.7750790, -0.7057460),
('Echo - Bar à Vin & Cocktails', 'Jazz', '8 Av. Roger Cohe', 33600, 'Pessac',
 '/images/bar_images/l_echo/image_1.jpg', '/images/bar_images/l_echo/image_2.jpg',
 '/images/bar_images/l_echo/image_3.jpg', '/images/bar_images/l_echo/image_4.webp',
 44.8065024, -0.6316273),
('Sortie 13', 'Pop-Rock', 'Rue Walter Scott', 33600, 'Pessac',
 '/images/bar_images/sortie_13/image_1.jpg', '/images/bar_images/sortie_13/image_2.webp',
 '/images/bar_images/sortie_13/image_3.webp', '/images/bar_images/sortie_13/image_4.webp',
 44.8013473, -0.6604822),
('The Black Cat Pub', 'Rock', '37 Cours Aristide Briand', 33000, 'Bordeaux',
 '/images/bar_images/the_black_cat_pub/image_1.jpg', '/images/bar_images/the_black_cat_pub/image_2.jpg',
 '/images/bar_images/the_black_cat_pub/image_3.jpeg', '/images/bar_images/the_black_cat_pub/image_4.jpg',
 44.8317503, -0.5770514),
('Adiu', 'World', '12 Cours Victor Hugo', 33000, 'Bordeaux',
 '/images/bar_images/adiu/image_1.jpg', '/images/bar_images/adiu/image_2.webp',
 '/images/bar_images/adiu/image_3.jpg', '/images/bar_images/adiu/image_4.jpg',
 44.8359140, -0.5667508),
('L''Athénée Libertaire', 'World', '7 Rue du Muguet', 33000, 'Bordeaux',
 '/images/bar_images/l_athenee_libertaire/image_1.avif', '/images/bar_images/l_athenee_libertaire/image_2.jpg',
 '/images/bar_images/l_athenee_libertaire/image_3.jpg', '/images/bar_images/l_athenee_libertaire/image_4.png',
 44.8370861, -0.5686945),
('L''Antidote', 'Punk', '13BIS Rue Elie Gintrac', 33800, 'Bordeaux',
 '/images/bar_images/l_antidote/image_1.jpg', '/images/bar_images/l_antidote/image_2.jpeg',
 '/images/bar_images/l_antidote/image_3.jpg', '/images/bar_images/l_antidote/image_4.jpg',
 44.8308543, -0.5712482),
('La Bodega Del Theatro', 'Pop', '24 Rue de la Faïencerie', 33000, 'Bordeaux',
 '/images/bar_images/la_bodega_del-theatro/image_1.jpeg', '/images/bar_images/la_bodega_del-theatro/image_2.jpg',
 '/images/bar_images/la_bodega_del-theatro/image_3.jpg', '/images/bar_images/la_bodega_del-theatro/image_4.jpg',
 44.8605498, -0.5560125),
('Code 23', 'Jazz', '23 Rue du Mirail', 33000, 'Bordeaux',
 '/images/bar_images/code_23/image_1.jpg', '/images/bar_images/code_23/image_2.jpg',
 '/images/bar_images/code_23/image_3.jpg', '/images/bar_images/code_23/image_4.webp',
 44.8340836, -0.5712241),
('L''Âne qui Tousse', 'Soul', '4 Rue des Bahutiers', 33000, 'Bordeaux',
 '/images/bar_images/l_ane_qui_tousse/image_1.jpg', '/images/bar_images/l_ane_qui_tousse/image_2.jpg',
 '/images/bar_images/l_ane_qui_tousse/image_3.jpeg', '/images/bar_images/l_ane_qui_tousse/image_4.jpg',
 44.8394930, -0.5705066),
('The Grind House', 'Country', '12 Rue des Piliers de Tutelle', 33000, 'Bordeaux',
 '/images/bar_images/the_grind_house/image_1.jpg', '/images/bar_images/the_black_cat_pub/image_2.jpg',
 '/images/bar_images/the_black_cat_pub/image_3.jpeg', '/images/bar_images/the_black_cat_pub/image_4.jpg',
 44.8414811, -0.5736073),
('Le Bal du Coq', 'Folk', '15 Rue du Loup', 33000, 'Bordeaux',
 '/images/bar_images/le_bal_du_coq/image_1.jpg', '/images/bar_images/le_bal_du_coq/image_2.webp',
 '/images/bar_images/le_bal_du_coq/image_3.webp', '/images/bar_images/le_bal_du_coq/image_4.jpg',
 44.8379903, -0.5723946),
('L''Arcadien', 'Métal', '5 Rue Duffour Dubergier', 33000, 'Bordeaux',
 '/images/bar_images/l_arcadien/image_1.jpg', '/images/bar_images/l_arcadien/image_2.webp',
 '/images/bar_images/l_arcadien/image_3.jpg', '/images/bar_images/l_arcadien/image_4.webp',
 44.8370268, -0.5761843),
('Thélonious Café Jazz Club', 'Blues et Jazz', '18 Rue Bourbon', 33000, 'Bordeaux',
 '/images/bar_images/thelonious_cafe_jazz_club/image_1.jpg', '/images/bar_images/thelonious_cafe_jazz_club/image_2',
 '/images/bar_images/thelonious_cafe_jazz_club/image_3.webp', '/images/bar_images/thelonious_cafe_jazz_club/image_4.webp',
 44.8605456, -0.5568387),
('Blackrock Pub', 'Pop-Rock', '25 Cours de l''Intendance', 33000, 'Bordeaux',
 '/images/bar_images/blackrock_pub/image_1.jpeg', '/images/bar_images/blackrock_pub/image_2.jpg',
 '/images/bar_images/blackrock_pub/image_3.jpeg', '/images/bar_images/blackrock_pub/image_4.jpeg',
 44.8420349, -0.5766984),
('Jungle Dreams Bar', 'Reggae', '8 Rue des Augustins', 33000, 'Bordeaux',
 '/images/bar_images/jungle_dreams_bar/image_1.jpg', '/images/bar_images/jungle_dreams_bar/image_2.jpeg',
 '/images/bar_images/jungle_dreams_bar/image_3.jpg', '/images/bar_images/jungle_dreams_bar/image_4.jpg',
 44.8324301, -0.5710858);


CREATE TABLE user (
   id INT PRIMARY KEY AUTO_INCREMENT,
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   role VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL,
   hashed_password VARCHAR(100) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO user (firstname, lastname, role, email, hashed_password) 
   VALUES
      ('Léa', 'Benoit', 'user', 'lea.benoit@example.com', 'azerty123'),
      ('Thomas', 'Marchand', 'user', 'thomas.marchand@example.com', 'azerty123'),
      ('Emma', 'Robert', 'bartender', 'emma.robert@example.com', 'azerty123'),
      ('Lucas', 'Fernandez', 'bartender', 'lucas.fernandez@example.com', 'azerty123'),
      ('Chloé', 'Perrin', 'bartender', 'chloe.perrin@example.com', 'azerty123'),
      ('Nathan', 'Rousseau', 'user', 'nathan.rousseau@example.com', 'azerty123'),
      ('Camille', 'Lemoine', 'user', 'camille.lemoine@example.com', 'azerty123'),
      ('Enzo', 'Morel', 'bartender', 'enzo.morel@example.com', 'azerty123'),
      ('Manon', 'Lefevre', 'bartender', 'manon.lefevre@example.com', 'azerty123'),
      ('Hugo', 'Faure', 'user', 'hugo.faure@example.com', 'azerty123'),
      ('Sophie', 'Garnier', 'user', 'sophie.garnier@example.com', 'azerty123'),
      ('Julien', 'Lopez', 'bartender', 'julien.lopez@example.com', 'azerty123'),
      ('Clara', 'Noël', 'user', 'clara.noel@example.com', 'azerty123'),
      ('Antoine', 'Blanc', 'bartender', 'antoine.blanc@example.com', 'azerty123'),
      ('Laura', 'Mathieu', 'bartender', 'laura.mathieu@example.com', 'azerty123'),
      ('Mathis', 'Fontaine', 'user', 'mathis.fontaine@example.com', 'azerty123'),
      ('Anaïs', 'Meyer', 'bartender', 'anais.meyer@example.com', 'azerty123'),
      ('Hugo', 'Chevalier', 'user', 'hugo.chevalier@example.com', 'azerty123'),
      ('Élise', 'Lemoine', 'user', 'elise.lemoine@example.com', 'azerty123'),
      ('Axel', 'Barbier', 'bartender', 'axel.barbier@example.com', 'azerty123'),
      ('Jade', 'Guillot', 'bartender', 'jade.guillot@example.com', 'azerty123'),
      ('Noah', 'Giraud', 'user', 'noah.giraud@example.com', 'azerty123'),
      ('Louise', 'Gomez', 'bartender', 'louise.gomez@example.com', 'azerty123'),
      ('Victor', 'Clement', 'user', 'victor.clement@example.com', 'azerty123'),
      ('Emma', 'Fabre', 'user', 'emma.fabre@example.com', 'azerty123'),
      ('Léo', 'Lemoine', 'user', 'leo.lemoine@example.com', 'azerty123'),
      ('Zoé', 'Paris', 'bartender', 'zoe.paris@example.com', 'azerty123'),
      ('Gabriel', 'Rolland', 'user', 'gabriel.rolland@example.com', 'azerty123'),
      ('Clémentine', 'Adam', 'bartender', 'clementine.adam@example.com', 'azerty123'),
      ('Louis', 'Perrot', 'user', 'louis.perrot@example.com', 'azerty123');

CREATE TABLE event (
   id INT PRIMARY KEY AUTO_INCREMENT,
   title VARCHAR(100) NOT NULL,
   image VARCHAR(255) NOT NULL,
   date DATE NOT NULL,
   start_at TIME NOT NULL,
   end_at TIME NOT NULL,
   description TEXT NOT NULL,
   creator_id INT NOT NULL,
   bar_id INT NOT NULL,
   music_group_id INT NOT NULL
);


CREATE TABLE music_group (
   id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(50) NOT NULL,
   style VARCHAR(30) NOT NULL,
   description TEXT NOT NULL,
   image VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


INSERT INTO music_group (name, style, description, image)
   VALUES
      ('Tinariwen', 'World', 'Formé dans les années 1980 dans les camps de réfugiés touaregs au Mali, Tinariwen est bien plus qu''un groupe de musique : c''est la voix d''un peuple nomade en quête de reconnaissance. Leurs morceaux, chantés en tamasheq, mélangent blues du désert, guitares électriques saturées et rythmes traditionnels touaregs. Le groupe a été influencé par des musiciens comme Bob Marley et Jimi Hendrix, mais aussi par la musique saharienne ancestrale. Tinariwen dénonce la guerre, l''exil et l''injustice, tout en célébrant la beauté du désert et la fierté de leur culture. Lauréats d''un Grammy Award, ils ont collaboré avec des artistes comme Carlos Santana, Robert Plant ou Thom Yorke. Leurs performances sont hypnotiques, méditatives, mais profondément engagées, à l''image d''un peuple résilient. Chaque concert est une immersion dans une culture nomade, entre spiritualité, contestation et poésie.', '/images/group_images/tinariwen.jpg'),
      ('Goran Bregović','World',  'Musicien yougoslave prolifique, Goran Bregović est d''abord connu comme le guitariste de Bijelo Dugme, groupe de rock emblématique des Balkans dans les années 70-80. Après la chute de la Yougoslavie, il s''est tourné vers la composition de musiques de films, notamment pour Emir Kusturica. Son style fusionne fanfare tzigane, chants orthodoxes, rythmes orientaux et harmonies balkaniques. Il dirige aujourd''hui un orchestre éclectique, le "Wedding and Funeral Band", qui transforme chaque concert en une fête joyeuse, explosive et baroque. Bregović incarne une vision musicale sans frontières, souvent teintée de mélancolie post-soviétique, de fougue festive et de spiritualité. Avec sa signature sonore unique, il célèbre la richesse des cultures d''Europe de l''Est tout en portant un regard lucide sur son histoire complexe.', '/images/group_images/goran-bregovic.jpg'),
      ('Ibeyi','World', 'Ibeyi, c''est le projet musical des sœurs jumelles Lisa-Kaindé et Naomi Diaz, filles du percussionniste cubain Anga Diaz. Nées à Paris, elles mêlent la culture yoruba (héritée de leur père), la soul, l''électro, le jazz et le hip-hop. Le nom "Ibeyi" signifie "jumelles" en langue yoruba, et leur musique puise dans les rituels afro-cubains, avec des chants souvent en langue lucumi. Leur style minimaliste met en valeur des harmonies vocales poignantes, des percussions intimistes et des textes introspectifs sur la perte, la filiation et la résilience. Révélées par XL Recordings, elles ont collaboré avec Beyoncé, Kamasi Washington et Frank Ocean. Leur univers est à la fois mystique et moderne, profondément enraciné dans la mémoire familiale et l''héritage spirituel. Sur scène, leur énergie reste sobre mais captivante, presque chamanique.', '/images/group_images/ibeyi.jpg'),
      ('Kronos Quartet','Classique', 'Fondé en 1973 à Seattle par le violoniste David Harrington, le Kronos Quartet s''est imposé comme l''un des ensembles de musique contemporaine les plus audacieux. Ce quatuor à cordes a révolutionné l''approche du répertoire classique en commandant plus de 1 000 œuvres à des compositeurs du monde entier. Il explore tous les genres : minimalisme, musique expérimentale, jazz, rock, musique traditionnelle (de l''Inde au Mexique), et collabore avec Laurie Anderson, Philip Glass, Astor Piazzolla ou encore Rhiannon Giddens. Leur démarche est militante : ils abordent des thèmes comme les droits humains, les migrations ou la justice climatique. Leur son est raffiné, inventif, et souvent électrifié. Le Kronos Quartet redéfinit sans cesse les frontières du classique, rendant accessible un art souvent perçu comme élitiste. Chaque concert est une expérience sensorielle et intellectuelle à part entière.', '/images/group_images/kronos-quartet.jpg'),
      ('Les Arts Florissants', 'Classique', 'Sous la direction du claveciniste franco-américain William Christie, Les Arts Florissants ont joué un rôle central dans la redécouverte du répertoire baroque des XVIIe et XVIIIe siècles. Fondé en 1979, l''ensemble vocal et instrumental s''est spécialisé dans les œuvres oubliées de Charpentier, Rameau, Purcell ou Monteverdi, interprétées avec des instruments d''époque. Leur démarche musicologique s''accompagne d''un sens de l''esthétique raffiné : chaque interprétation cherche à retrouver l''émotion, la finesse et la dramaturgie de l''époque baroque. Leur résidence à la Philharmonie de Paris et leur académie au jardin de Thiré témoignent de leur ancrage dans la formation et la transmission. Reconnus internationalement, ils sont des ambassadeurs d''un art baroque vivant, accessible et émotionnellement puissant, porté par une rigueur artistique exceptionnelle.', '/images/group_images/les-arts-florissants.jpg'),
      ('Rone','Electro', 'Erwan Castex, alias Rone, est l''un des producteurs les plus singuliers de la scène électro française. Son univers sonore oscille entre ambient onirique et techno mélancolique, alliant textures organiques, mélodies cinématographiques et rythmiques subtiles. Révélé avec l''album Spanish Breakfast puis Tohu Bohu, il s''est distingué par une approche sensible de l''électronique. Rone collabore avec des artistes issus d''univers variés comme Alain Damasio (littérature), Michel Gondry (cinéma) ou encore le Ballet de l''Opéra de Paris. Son live audio-visuel, souvent immersif, propose une véritable expérience sensorielle et poétique, à mille lieues des clubs survoltés. Son oeuvre reflète une quête d''introspection, entre futurisme et fragilité humaine.', '/images/group_images/rone.jpg'),
      ('Justice','Electro', 'Emblème de la French Touch 2.0, Justice est formé en 2003 par Gaspard Augé et Xavier de Rosnay. Leur son énergique fusionne rock, disco et électro dans une esthétique brute et saturée. Le duo s''impose avec leur tube D.A.N.C.E et l''album †, dont la croix est devenue une signature visuelle. Sur scène, leurs concerts spectaculaires mêlent stroboscopes, jeux de lumière géométriques et intensité sonore à la limite du rock metal. Influencés par Daft Punk mais aussi Metallica ou Queen, ils réinventent l''électro avec une attitude rock''n''roll. Leur musique, syncopée et puissante, a séduit un large public à travers le monde. Justice incarne une électro musclée, théâtrale et furieusement dansante.', '/images/group_images/justice.jpg'),
      ('Vulfpeck', 'Groove/Funk', 'Né de la complicité entre étudiants du conservatoire du Michigan, Vulfpeck s''est fait connaître grâce à ses vidéos YouTube à l''esthétique minimaliste et décalée. Le groupe propose un funk épuré, inspiré par la soul des années 70 (James Jamerson, Steely Dan, Bernard Purdie). Le bassiste Joe Dart, véritable virtuose, est l''un des piliers du son Vulfpeck. Le collectif adopte une démarche artisanale et indépendante, notamment avec leur projet Sleepify sur Spotify qui a fait le buzz. Leurs concerts sont chaleureux, drôles, et très musicaux, où chaque membre apporte une touche unique. Vulfpeck prouve qu''un groove simple et bien exécuté peut soulever les foules sans artifices.', '/images/group_images/vulfpeck.webp'),
      ('L''Entourage', 'Hip-Hop', 'L''Entourage est un collectif emblématique du rap français, rassemblant des figures majeures comme Nekfeu, Alpha Wann, Jazzy Bazz ou Deen Burbigo. Né dans les années 2010, il incarne une génération de rappeurs à la plume affûtée, entre technique implacable et introspection lucide. Issu de la scène indépendante parisienne (notamment via Rap Contenders), le groupe valorise l''authenticité, les valeurs de fraternité et un certain esthétisme old-school. Leur album Jeu de société (2014) synthétise cette approche : un rap réfléchi, influencé par le boom bap new-yorkais, mais avec un regard contemporain. Leurs concerts, dynamiques et fédérateurs, témoignent d''une réelle alchimie entre les membres.', '/images/group_images/entourage.jpg'),
      ('Run The Jewels', 'Hip-Hop', 'Derrière Run The Jewels, on retrouve Killer Mike (Atlanta) et El-P (New York), deux rappeurs expérimentés unis par une vision politique et artistique commune. Leur son est brutal, dense, souvent saturé, mêlant influences old school, beats industriels et paroles percutantes. Leurs textes dénoncent les violences policières, le racisme systémique, les inégalités sociales, le tout avec un style sans concession. Le duo a gagné une reconnaissance critique et populaire grâce à ses albums RTJ1 à RTJ4, et des collaborations avec Zack de la Rocha (Rage Against the Machine) ou Pharrell Williams. Leurs concerts sont énergiques, engagés et galvanisants. Run The Jewels, c''est le hip-hop comme poing levé, sans compromis.', '/images/group_images/run-the-jewels.jpg'),
      ('GoGo Penguin','Jazz', 'Trio instrumental britannique formé à Manchester, GoGo Penguin propose un jazz contemporain influencé par le minimalisme, l''électro et le rock alternatif. Le groupe — Nick Blacka (contrebasse), Chris Illingworth (piano) et Jon Scott (batterie) — crée une alchimie sonore unique, évoquant à la fois Philip Glass, Aphex Twin et Radiohead. Leurs compositions sont souvent structurées comme des morceaux électroniques, avec des motifs répétitifs, une rythmique précise et une atmosphère cinématographique. GoGo Penguin se démarque par sa capacité à rendre le jazz accessible, immersif et profondément émotionnel. Sur scène, leur énergie subtile et leur précision rythmique captivent un public varié.', '/images/group_images/gogo-penguin.jpg'),
      ('Avishai Cohen Trio', 'Jazz', 'Contrebassiste israélien à la renommée internationale, Avishai Cohen a été révélé en tant que membre du Chick Corea New Trio avant de se lancer dans une carrière solo prolifique. Il forme régulièrement des trios piano-contrebasse-batterie où se mêlent jazz moderne, musiques traditionnelles juives, influences moyen-orientales et mélodies méditerranéennes. Sa musique, à la fois introspective et rythmée, séduit par sa chaleur et sa sensibilité. Avishai Cohen privilégie l''émotion brute à la virtuosité démonstrative, tout en restant un technicien remarquable. Il insuffle dans ses compositions une spiritualité profonde, à la croisée de ses origines et de son parcours cosmopolite.', '/images/group_images/avishai-cohen-trio.jpg'),
      ('Christine and the Queens','Pop', 'Sous ce nom de scène se cache Héloïse Letissier, artiste française singulière, inclassable et internationalement reconnue. Christine and the Queens fusionne pop synthétique, électro et chanson française, avec des influences allant de David Bowie à Michael Jackson. Son œuvre explore les questions de genre, d''identité et de transformation, dans une mise en scène soignée et théâtrale. Connue pour ses performances chorégraphiées et ses clips visuellement puissants, elle mêle musique, danse et narration avec une grande cohérence artistique. Son évolution en tant qu''artiste — devenant parfois «Chris», puis «Redcar» — reflète une démarche introspective et poétique. Chaque projet est une nouvelle facette d''une quête artistique libre et engagée.', '/images/group_images/christine-and-the-queens.webp'),
      ('Tame Impala','Pop', 'Tame Impala est le projet solo de l''Australien Kevin Parker, multi-instrumentiste et producteur de génie. Depuis le succès de Lonerism et Currents, il s''est imposé comme figure centrale du renouveau psychédélique moderne. Sa musique mêle synthétiseurs planants, guitares filtrées et rythmiques hypnotiques, le tout avec une esthétique rétro-futuriste. Parker enregistre et produit tout lui-même, donnant une cohérence sonore unique à son univers. Ses paroles introspectives traitent souvent de solitude, de changement et de perception. En live, Tame Impala devient un groupe à part entière, proposant un spectacle visuel immersif. Sa musique, à la croisée du rock psyché, de l''électro et de la pop, séduit un public large et transgénérationnel.', '/images/group_images/tame-impala.webp'),
      ('Arctic Monkeys','Rock', 'Formés à Sheffield en 2002, les Arctic Monkeys ont bouleversé la scène rock britannique avec leur premier album Whatever People Say I Am, That''s What I''m Not, devenu disque le plus vendu de l''histoire en une semaine au Royaume-Uni. Portés par la plume aiguisée d''Alex Turner, ils livrent un rock narratif, urbain et ironique, influencé par The Strokes et les Beatles. Le groupe a évolué du garage rock brut vers des sonorités plus feutrées et cinématographiques, notamment avec Tranquility Base Hotel & Casino. Leur musique, toujours élégante, explore la mélancolie, le désenchantement et les relations modernes, avec un sens du style inimitable.', '/images/group_images/arctic-monkeys.webp'),
      ('Shaka Ponk', 'Rock','Shaka Ponk, groupe français fondé en 2004, se distingue par sa fusion explosive de rock, d''électro, de funk et de visuels numériques. Connus pour leurs performances scéniques survoltées, ils intègrent un singe virtuel, Mr Goz, dans leurs clips et concerts, offrant un spectacle total mêlant musique et technologies. Leurs chansons abordent des thèmes comme l''écologie, la société de consommation ou le libre arbitre, sur des rythmes puissants et dansants. Le groupe est aussi engagé écologiquement, militant pour une planète plus responsable. Avec son énergie débordante, Shaka Ponk incarne un rock moderne, hybride et résolument vivant.', '/images/group_images/shaka-ponk.webp');
      
CREATE TABLE participate (
   user_id INT,
   event_id INT,
   PRIMARY KEY (user_id, event_id)
);

CREATE TABLE favourite_event (
   user_id INT,
   event_id INT,
   PRIMARY KEY (user_id, event_id)
);

CREATE TABLE favourite_bar (
   user_id INT,
   bar_id INT,
   PRIMARY KEY (user_id, bar_id)
);

CREATE TABLE favourite_music_group (
   user_id INT,
   music_group_id INT,
   PRIMARY KEY (user_id, music_group_id)
);

CREATE TABLE hours (
	id INT PRIMARY KEY AUTO_INCREMENT,
	monday_opening_hours VARCHAR(50) NOT NULL,
	tuesday_opening_hours VARCHAR(50) NOT NULL,
	wednesday_opening_hours VARCHAR(50) NOT NULL,
	thursday_opening_hours VARCHAR(50) NOT NULL,
	friday_opening_hours VARCHAR(50) NOT NULL,
	saturday_opening_hours VARCHAR(50) NOT NULL,
	sunday_opening_hours VARCHAR(50) NOT NULL,
	happy_hours VARCHAR(50) NOT NULL
   );
