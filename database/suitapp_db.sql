/*
Database | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/

/* CREATE DATABASE */
DROP DATABASE IF EXISTS suitapp_db;
CREATE DATABASE suitapp_db;
\c suitapp_db;

/* CREATE TABLES */
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR (20) NOT NULL,
    lastname VARCHAR (20) NOT NULL,
    username VARCHAR (20),
    normalized_username VARCHAR (20) UNIQUE NOT NULL,
    user_password VARCHAR (30) NOT NULL,
    email VARCHAR (30) UNIQUE NOT NULL,
    avatar_url TEXT DEFAULT '',
    bio VARCHAR (500) DEFAULT '',
    light_theme BOOLEAN NOT NULL DEFAULT TRUE,
    time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    caption VARCHAR DEFAULT '',
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    hashtag_str TEXT DEFAULT '',
    time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    commenter_id INT REFERENCES users(id) ON DELETE CASCADE,
    comment_body VARCHAR NOT NULL,
    time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE reactions
(
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    comment_id INT REFERENCES comments(id) ON DELETE CASCADE,
    reactor_id INT REFERENCES users(id) ON DELETE CASCADE,
    emoji_type INT NOT NULL,
    time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE follows
(
    id SERIAL PRIMARY KEY,
    follower_id INT REFERENCES users(id) ON DELETE CASCADE,
    followed_user_id INT REFERENCES users(id) ON DELETE CASCADE,
    time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);



/* SEED DATA */

INSERT INTO users
(firstname, lastname, username, normalized_username, user_password, email, avatar_url, bio)
VALUES
('Abby', 'Star', 'Abby Dark Star', 'abbydarkstar', 'password123', 'abbydarkstar@gmail.com', 'http://localhost:3129/images/avatars/abby_avatar.jpg', 'New England bred, Southern raised, West Coast girl. Marketing| Content Creator | Cosplayer| Current: Unity |Former: Logitech G, Ubisoft'),
('Nova', 'Kyra', 'Nova Kyra', 'novakyra', 'password123', 'novakyra@gmail.com', 'http://localhost:3129/images/avatars/nova_avatar.jpg', '20 something lover of cosplay, wine, bikinis and general nerdity.'),
('Envy', 'Us', 'EnvyUs', 'envyus', 'password123', 'greenwith@gmail.com', 'http://localhost:3129/images/avatars/envy_avatar.jpg', 'Just a girl Lovecrafting their way to your heart'),
('Spider', 'Monarch', 'Cursed Arachnid', 'cursedarachnid', 'password123', 'cursedarachnid@gmail.com', 'http://localhost:3129/images/avatars/cursed_avatar.jpg', '🕷spiders are beautiful🕷spider-man/fantastic four enthusiast🕷'),
('MH', 'Cosplay & Design', 'MH Cosplay & Design', 'mhcosplaydesign', 'password123', 'mhcosplay@gmail.com', 'http://localhost:3129/images/avatars/mh_avatar.jpg', 'Professional Cosplayer who loves Cosplay Art, and I love to create anything art related. Enjoy scrolling through my cosplay page.'),
('MegaSeneca', 'Cosplay', 'MegaSeneca Cosplay', 'megasenecacosplay', 'password123', 'megaseneca@gmail.com', 'http://localhost:3129/images/avatars/megaseneca_avatar.jpg', 'amateur cosplayer, artist, avid Megaman fan'),
('Chris', 'Mason', 'Chris Mason', 'chrismason', 'password123', 'fit4life.com', 'http://localhost:3129/images/avatars/chris_avatar.jpg', 'Gym Addict, Mixed martial artist, Cosplayer and Traveller. My Cosplay page is King of The North Cosplays'),
('Dan', 'Morash', 'DanMorashCosplay', 'danmorashcosplay', 'password123', 'dantheman@gmail.com', 'http://localhost:3129/images/avatars/chris_avatar.jpg', 'Cosplayer from Halifax - Obsessed with my cat and Funkos.'),
('Empty', 'Newbie', 'mrNewPerson', 'mrnewperson', 'password123', 'mrempty@gmail.com', '', '');

INSERT INTO posts
(image_url, caption, owner_id, hashtag_str)
VALUES
('http://localhost:3129/images/posts/abby1.jpeg', '#HappyNewYear everyone! I hope it is filled with joy, love and experiences that fulfill you. No matter the difficulty the new year brings, you can get through it. I look forward to sharing new adventures with you!', 1, '#HappyNewYear#'),
('http://localhost:3129/images/posts/abby2.jpeg', 'My #Winter White Girl #cosplay is complete.', 1, '#Winter#cosplay#'),
('http://localhost:3129/images/posts/abby3.jpeg', 'The #Tardis broke a things-whirly so I’m trying this human transport! Allonsy!', 1, '#Tardis#'),
('http://localhost:3129/images/posts/abby4.jpeg', 'Headed to the #Marriott floor! #cosplay2020 #dragoncon #strangerthings', 1, '#Marriott#cosplay2020#dragoncon#strangerthings#'),
('http://localhost:3129/images/posts/nova1.jpeg','“Your life stopped being your own the moment you were bit by that spider.” #cindymoon #silk #spiderverse #cosplay', 2, '#cindymoon#silk#spiderverse#cosplay#'),
('http://localhost:3129/images/posts/nova2.jpeg', 'Look. I’m not all that attractive outside of all the cosplay makeup. I am a hermit with greasy hair, acne, half of my face is sunken in, one eye is bigger than the other, my eyes are different shapes, shit I’m even missing half my teeth. But I love #hotwings. So I win.', 2, '#hotwings#'),
('http://localhost:3129/images/posts/nova3.jpeg', 'Out on the #Marriott floor come say hi!', 2, '#Marriott#'),
('http://localhost:3129/images/posts/nova4.jpeg', '“Come on live a little, while you can.” This is from #2014 but it’s still one of my favorite #cosplay photos!', 2, '#2014#cosplay#'),
('http://localhost:3129/images/posts/envy1.jpeg', '#2009 I wasn’t sure if I would make it through the night, to now pursuing my #dreams and having a wonderful career with amazing friends all over the world.Thank you for being a part of it, and never give up on yourself. You might surprise yourself with just how much you can do 💛 #Ghostbusters #Gozer', 3, '#2009#dreams#Ghostbusters#Gozer#'),
('http://localhost:3129/images/posts/envy2.jpeg', 'I experienced so much, more than I ever thought I would be able to. I learned a lot about myself and about others. 3 years ago I quit my job as a lab tech and made the leap into doing #patreon and content creation full time on the other side of the country almost 3,000 miles away.', 3, '#patreon#'),
('http://localhost:3129/images/posts/envy3.jpeg', 'Hey, you looking  for a Personal Assistant? 🧡 #Sonia #Pokemon #Pikachu #DetectivePikachu', 3, '#Sonia#Pokemon#Pikachu#DetectivePikachu#'),
('http://localhost:3129/images/posts/envy4.jpeg', 'I''m looking for the Key Master. #Ghostbusters #Dana #Zuul #DanaZuul', 3, '#Ghostbusters#Dana#Zuul#DanaZuul#'),
('http://localhost:3129/images/posts/cursed1.jpeg', 'Welcome, my dear #spiderlings! I''m a #horror #cosplayer / #streamer with a #spider obsession, here to cause a spook.', 4, '#spiderlings#horror#cosplayer#streamer#spider#'),
('http://localhost:3129/images/posts/cursed2.jpeg', '#HappyNewYear ''s Eve to all! Hope your #Holidays were enjoyable- mine sure were terrific... 🔪 #HappyNewYear', 4, '#NewYearsEve#Holidays#HappyNewYear#'),
('http://localhost:3129/images/posts/cursed3.jpeg', 'It''s #Friday the 13th, so how about getting #lucky?', 4, '#Friday#lucky#'),
('http://localhost:3129/images/posts/cursed4.jpeg', '', 4, ''),
('http://localhost:3129/images/posts/mh1.jpeg', 'Just pure fierceness #Renekton #fire #scorchedearthrenekton #8ft #supercon #floridasupercon #LeagueOfLegends #LeagueOfLegendsCosplay #Supercon2019', 5, '#Renekton#fire#scorchedearthrenekton#8ft#supercon#floridasupercon#LeagueOfLegends#LeagueOfLegendsCosplay#Supercon2019#'),
('http://localhost:3129/images/posts/mh2.jpeg', 'I’m proud of my students this year. We have Kha’Zix as well as Ziggs. On the right we have another one of my students as Cassie Cage from MK. #Supercon2019 #MortalKombat #cassiecage #ziggs #khazix #renekton #cosplay #leagueoflegendscosplay', 5, '#Supercon2019#MortalKombat#cassiecage#ziggs#khazix#renekton#cosplay#leagueoflegendscosplay#'),
('http://localhost:3129/images/posts/mh3.jpeg', 'Getting suited up for Supercon. How’s he looking? #renekton #supercon #supercon2019 #leagueoflegends #floridasupercon #greatness #riotgames #leagueoflegendscosplay', 5, '#renekton#supercon#supercon2019#leagueoflegends#floridasupercon#greatness#riotgames#leagueoflegendscosplay#'),
('http://localhost:3129/images/posts/mh4.jpeg', 'Renekton is ready for Supercon #renekton #riotgame #supercon2019 #floridasupercon #leagueoflegends #supercon #awesome', 5, '#riotgame#supercon2019#floridasupercon#leagueoflegends#supercon#awesome#'),
('http://localhost:3129/images/posts/megaseneca1.jpeg', 'I made two more weapons for my Mega Man Volnutt cosplay. His shining laser and an unused canon concept from the game. Photos by Tricia McEvoy, my sister and davjwx #megaman #megamancosplay #cosplay #rhodeislandcomiccon #rockman #cosplay #capcom #megamanlegends', 6, '#megaman#megamancosplay#cosplay#rhodeislandcomiccon#rockman#cosplay#capcom#megamanlegends#'),
('http://localhost:3129/images/posts/megaseneca2.jpeg', 'R E D #megamancosplay #megaman #rockman #cosplay #capcom', 6, '#megamancosplay#megaman#rockman#cosplay#capcom#'),
('http://localhost:3129/images/posts/megaseneca3.jpeg', 'I won the intermediate category at the cosplay competition at Rhode Island Comic Con. The first cosplay competition I won. I want to thank the Mega Man fans on Twitter for supporting me with my cosplay builds. Photos by: Tricia McEvoy #megaman #megmancosplay #cosplay #rockman', 6, '#megaman#megmancosplay#cosplay#rockman#'),
('http://localhost:3129/images/posts/megaseneca4.jpeg', 'got some new boots today. Out here on dat grind 🙏🏻👏💧keep it 💯 #megaman #megamancosplay #rockman #cosplay #wip', 6, '#megaman#megamancosplay#rockman#cosplay#wip#'),
('http://localhost:3129/images/posts/chris1.jpeg', 'Due to shoot more Nightwing soon. Considering treating the body suit as found a new pattern that will look awesome with the mods #cosplay #wip #workinprogress #fitspo #bodybuildingmotivation #bodysuit #dccomics #dickgrayson #nightwing #robin #batman #KingoftheNorthCosplays', 7, '#cosplay#wip#workinprogress#fitspo#bodybuildingmotivation#bodysuit#dccomics#dickgrayson#nightwing#robin#batman#KingoftheNorthCosplays#'),
('http://localhost:3129/images/posts/chris2.jpeg', '"I know what I''m capable of; I am a soldier now, a warrior. I am someone to fear, not hunt" Ph AJ Charlton Photography || Some #Sunday #Morning #motivation for myself,  get the #gym get back and then beyond my #Spartacus #physique #blackandwhite #photography #fitnessmotivation', 7, '#Sunday#morning#motivation#gym#Spartacus#physique#blackandwhite#photography#fitnessmotivation#'),
('http://localhost:3129/images/posts/chris3.jpeg', 'First progress picture of 2020 and Christmas doesn''t actually seem to have done that much damage!  Time for a new routine and to make some new progress #gym #gymlife #bodyconfidence #bodyweighttraining #bodybuilding #fitness #fitnessmotivation #arms #fitfam #muscleandhealth', 7, '#gym#gymlife#bodyconfidence#bodyweighttraining#bodybuilding#fitness#fitnessmotivation#arms#fitfam#muscleandhealth#'),
('http://localhost:3129/images/posts/chris4.jpeg', 'Zero to Hero! Photography by the super talented Eric Carroll, Bracers by Cosmic Workshop! #Cosplay #disney #hercules #disneyshercules #gothedistance #zerotohero #disneycosplay #legday #quadsquad #muscles #modelling #cosplayarmour #fitness #fitfam #cosplayersthatlift', 7, '#Cosplay#disney#hercules#disneyshercules#gothedistance#zerotohero#disneycosplay#legday#quadsquad#muscles#modelling#cosplayarmour#fitness#fitfam#cosplayersthatlift#'),
('http://localhost:3129/images/posts/dan1.jpeg', '“I wouldn''t kill him because he looked as frightened as I was. I looked at him, and I saw myself.” #howtotrainyourdragon #cosplay #holmat2019 #HolidayMatsuri', 8, '#howtotrainyourdragon#cosplay#holmat2019#HolidayMatsuri#'),
('http://localhost:3129/images/posts/dan2.jpeg', 'I want to make another Nightwing cosplay soon. Maybe my own design inspired by others that have shown up in the comics/shows/games. What are some of your favourite Nightwing/Dick Grayson looks? 📸: Bri Lan Imagery #nightwing #cosplay #dccomics', 8, '#nightwing#cosplay#dccomics#'),
('http://localhost:3129/images/posts/dan3.jpeg', 'The first of many shots showing my new cosplay of Hiccup from How To Train Your Dragon! 📸: #MrPaulTran #HowToTrainYourDragon #cosplay #holmat2019 #HolidayMatsuri #toothless', 8, '#MrPaulTran#HowToTrainYourDragon#cosplay#holmat2019#HolidayMatsuri#toothless#'),
('http://localhost:3129/images/posts/dan4.jpeg', 'Happy #Friday from your favourite eye beam boy ❤️ #xmen #cosplay #marvel', 8, '#Friday#xmen#cosplay#marvel#'),
('http://localhost:3129/images/posts/dan5.jpeg', '', 8, '');

INSERT INTO comments
(post_id, commenter_id, comment_body)
VALUES
(1, 3, 'From this day on I shall be known as Bob. For Bob is a good name and I am good. But if you want you can just call me Sally.'),
(1, 2, 'I see you have something to talk about. Well, I have something to shout about. Infact something to sing about. But I''ll just keep quiet and let you carry on.'),
(1, 6, 'And everything is going to the beat And everything is going to the beat And everything is going.'),
(2, 2, 'Oppan Gangnam Style Gangnam Style Op op op op oppan Gangnam Style Gangnam Style Op op op op oppan Gangnam Style.'),
(2, 7, 'I see trees of green........ red roses too I see em bloom..... for me and for you And I think to myself.... what a wonderful world.'),
(2, 4, 'People always told me be careful of what you do And dont go around breaking young girls'' hearts And mother always told me be careful of who you love And be careful of what you do cause the lie becomes the truth.'),
(3, 3, 'And everything is going to the beat And everything is going to the beat And everything is going...'),
(3, 8, 'Buddy you''re a young man hard man Shoutin'' in the street gonna take on the world some day You got blood on yo'' face You big disgrace Wavin'' your banner all over the place.'),
(3, 4, 'Engaging. It keeps your mind occupied while you wait.'),
(4, 6, 'Bold shapes.'),
(4, 4, 'Mission accomplished. It''s exquisite.'),
(4, 8, 'Super thought out! Ahhhhhhh...'),
(5, 1, 'I admire your spaces, friend.'),
(5, 8, 'Let me take a nap... great shot, anyway.'),
(5, 3, 'Fresh =) I adore the use of shape and avatar!'),
(6, 7, 'It''s delightful not just admirable!'),
(6, 4, 'My 53 year old nephew rates this atmosphere very elegant :)'),
(6, 6, 'You just won the internet!'),
(7, 4, 'Incredibly fab shot mate'),
(7, 7, 'Baby blue. This is new school.'),
(7, 1, 'Contrast.'),
(8, 6, 'This shot has navigated right into my heart.'),
(8, 4, 'This is killer work!!'),
(8, 7, 'Sleek. So engaging.'),
(9, 1, 'Such shot, many blur, so bold'),
(9, 2, 'Extra fun mate'),
(9, 7, 'Nice use of white in this shot!'),
(10, 6, 'This atmosphere blew my mind.'),
(10, 7, 'Killer work you have here.'),
(10, 1, 'Shade, iconography, shot, concept – sleek :-)'),
(11, 8, 'I want to learn this kind of shot! Teach me.'),
(11, 7, 'That''s radiant and appealing, friend.'),
(11, 5, 'I think I''m crying. It''s that magical.'),
(12, 6, 'Just slick =)'),
(12, 2, 'Can''t wait to try it out.'),
(12, 5, 'Exquisite. So appealing.'),
(13, 8, 'I like your shot =)'),
(13, 6, 'I want to learn this kind of notification! Teach me.'),
(13, 1, 'Just sublime m8'),
(14, 5, 'Violet. Designgasmed all over this!'),
(14, 2, 'Overly exquisite shapes :)'),
(14, 8, 'Shape, layout, shot, design – cool m8'),
(15, 2, 'It''s excellent not just amazing!'),
(15, 7, 'Such shot, many type, so magnificent'),
(15, 1, 'Exquisite dude Adore the use of type and playfulness!'),
(16, 8, 'Looks sleek and gorgeous :)'),
(16, 6, 'Immensely good mate'),
(16, 2, 'Beastly work you have here.'),
(17, 4, 'Americans want to take credit for everything.'),
(17, 8, 'Nice picture but please get a better camera cause this one does your videos no justice.'),
(17, 1, 'HEEEY HEEY BROTHERRR THAAT''S MY BROTHER :D'),
(18, 8, 'useful tips thx'),
(18, 7, 'It''s EXCELLENT for taking photos. Video quality is 720 but still looks great.'),
(18, 1, 'ummm is this episode 2? a bunch of that stuff from the recap didn''t happen in ep 1.'),
(19, 2, 'You''ve made me hungry for wine'),
(19, 6, 'Amaxing picture!!'),
(19, 7, 'Go Big or Go Home.'),
(20, 1, 'this is a waste of money...i can''t to authorize this.'),
(20, 3, 'Yeah, you can tune the center spot to be white hot and go about 3 miles. Thanks, Greg'),
(20, 8, 'Wow, his voice is really the way it sounds on the records. They''re awesome live.'),
(21, 2, 'They dont have that at Georgetown.'),
(21, 5, 'Holy shit, i won. I never win anything, yay'),
(21, 7, 'mmm tht sounds very nice, do you take theory or is tht improv'),
(22, 8, 'MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANNNNNNNNNNNNNNNN!'),
(22, 2, 'Love :)'),
(22, 1, 'Fervently agree!'),
(23, 8, 'you sure? I thought this was the military. Wow, could have fooled me. Honestly, get over it.'),
(23, 2, 'SECOND!!'),
(23, 5, 'boy don''t she feel warm tonight...'),
(24, 2, 'The poor guy has been waiting soooooo long in the A&E queues he''s decided to go for a sleep.'),
(24, 7, 'I thought it was longer. :( Sorry guys.'),
(24, 8, 'I support it'),
(25, 6, 'it works'),
(25, 3, 'DAAAAMMNNN. right when i saw that shirt go up i was like---*FAVORITE*.'),
(25, 4, 'wherever you are you''ll always be my muse.'),
(26, 5, 'Nonsense - you obviously can''t recognise the nuances of Gaming'),
(26, 8, 'Interesting story :D'),
(26, 1, 'please make a tutorial it looks awesome'),
(27, 6, 'LOL your welcome! :P'),
(27, 1, 'There''s no replacement for displacement!'),
(27, 4, 'Agreed love ya !'),
(28, 3, 'iLoveHisHair ♥'),
(28, 6, 'At last! Someone else who thinks there should be more coconut in this.'),
(28, 2, 'Did you get sims in the future?'),
(29, 7, 'THIS PICTURE IS THE BEST!!!! DUDE I LOVE IT!!!'),
(29, 1, 'no joke I love it!'),
(29, 3, 'does he still live with his parents?'),
(30, 7, 'First!!!'),
(30, 6, 'dear god... that''s a couple minutes I''ll never get back.'),
(30, 4, 'what was this'),
(31, 3, 'Omg.'),
(31, 4, 'Don''t wanna get hit by it D:'),
(31, 2, 'make a movie out of these costumes or something like that would be cool'),
(32, 3, 'Best picture Ever (:'),
(32, 5, 'I remember playing in that haha'),
(32, 1, 'I agree with you there.'),
(33, 7, 'Ha haha I love u too'),
(33, 2, 'this is really good :)'),
(33, 5, 'Lol was in that game??');

INSERT INTO reactions
(post_id, comment_id, reactor_id, emoji_type)
VALUES
(NULL, 1, 6, 7),
(NULL, 18, 8, 5),
(5, NULL, 5, 1),
(NULL, 96, 4, 2),
(32, NULL, 7, 1),
(NULL, 11, 3, 2),
(1, NULL, 6, 5),
(NULL, 41, 1, 2),
(8, NULL, 8, 3),
(NULL, 28, 4, 5),
(NULL, 43, 2, 7),
(NULL, 14, 1, 5),
(NULL, 5, 4, 2),
(19, NULL, 7, 1),
(NULL, 87, 2, 6),
(28, NULL, 4, 3),
(4, NULL, 6, 5),
(NULL, 59, 5, 3),
(NULL, 35, 1, 2),
(16, NULL, 6, 4),
(NULL, 55, 8, 7),
(14, NULL, 4, 2),
(26, NULL, 7, 3),
(18, NULL, 1, 2),
(NULL, 55, 3, 5),
(17, NULL, 7, 4),
(32, NULL, 3, 2),
(NULL, 72, 8, 6),
(8, NULL, 4, 3),
(11, NULL, 7, 6),
(23, NULL, 6, 2),
(30, NULL, 7, 1),
(NULL, 42, 5, 1),
(33, NULL, 1, 3),
(NULL, 66, 3, 5),
(NULL, 44, 5, 7),
(NULL, 23, 8, 5),
(1, NULL, 5, 4),
(20, NULL, 7, 4),
(NULL, 54, 8, 4),
(12, NULL, 1, 6),
(24, NULL, 2, 1),
(NULL, 40, 5, 4),
(NULL, 35, 7, 7),
(NULL, 7, 1, 7),
(NULL, 69, 8, 2),
(NULL, 24, 6, 5),
(6, NULL, 2, 1),
(10, NULL, 6, 6),
(22, NULL, 4, 3),
(NULL, 18, 1, 6),
(24, NULL, 6, 2),
(11, NULL, 7, 5),
(10, NULL, 4, 6),
(NULL, 68, 7, 4),
(NULL, 74, 5, 6),
(NULL, 8, 4, 7),
(25, NULL, 5, 3),
(NULL, 94, 6, 4),
(NULL, 86, 8, 3),
(27, NULL, 2, 2),
(32, NULL, 1, 6),
(21, NULL, 5, 6),
(NULL, 87, 4, 4),
(NULL, 63, 2, 5),
(13, NULL, 1, 3),
(NULL, 75, 4, 7),
(NULL, 84, 6, 4),
(5, NULL, 2, 6),
(11, NULL, 8, 7),
(NULL, 91, 7, 4),
(NULL, 29, 2, 2),
(NULL, 72, 7, 5),
(23, NULL, 1, 6),
(20, NULL, 6, 5),
(6, NULL, 7, 3),
(NULL, 40, 6, 5);

INSERT INTO follows
(follower_id, followed_user_id)
VALUES
(1, 6),
(1, 5),
(1, 2),
(1, 3),
(2, 6),
(2, 4),
(2, 7),
(2, 3),
(3, 8),
(3, 1),
(3, 4),
(3, 7),
(4, 5),
(4, 8),
(4, 2),
(4, 6),
(5, 3),
(5, 7),
(5, 4),
(5, 8),
(6, 1),
(6, 2),
(6, 8),
(6, 4),
(7, 2),
(7, 8),
(7, 1),
(7, 6),
(8, 1),
(8, 5),
(8, 7),
(8, 4);

/* I'll handle emojies and adding more likes tomorrow */

/* TESTING */

SELECT *
FROM users;

SELECT *
FROM posts;

SELECT *
FROM comments;

SELECT *
FROM reactions;

SELECT *
FROM follows;
