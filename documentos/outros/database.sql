-- Create foundational tables without dependencies first
CREATE TABLE teams (
    id SERIAL PRIMARY KEY
);

CREATE TABLE tutors (
    id SERIAL PRIMARY KEY,
    name TEXT DEFAULT NULL,
    email TEXT DEFAULT NULL,
    password TEXT DEFAULT NULL,
    nationality TEXT DEFAULT NULL,
    time_zone INTEGER DEFAULT NULL,
    age INTEGER DEFAULT NULL,
    gender TEXT DEFAULT NULL,
    status TEXT DEFAULT NULL,
    curiosity TEXT DEFAULT NULL,
    id_team INTEGER DEFAULT NULL,
    FOREIGN KEY (id_team) REFERENCES teams(id)
);

-- Update Teams to reference Tutors after Tutors is created
ALTER TABLE teams ADD COLUMN id_tutor INTEGER DEFAULT NULL;
ALTER TABLE teams ADD CONSTRAINT fk_id_tutor FOREIGN KEY (id_tutor) REFERENCES tutors(id);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT DEFAULT NULL,
    email TEXT DEFAULT NULL,
    password TEXT DEFAULT NULL,
    nationality TEXT DEFAULT NULL,
    time_zone INTEGER DEFAULT NULL,
    gender TEXT DEFAULT NULL,
    status TEXT DEFAULT NULL,
    curiosity TEXT DEFAULT NULL,
    happiness_meter INTEGER DEFAULT NULL,
    instagram TEXT DEFAULT NULL,
    facebook TEXT DEFAULT NULL,
    twitter TEXT DEFAULT NULL,
    first_language TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    state TEXT DEFAULT NULL,
    university TEXT DEFAULT NULL,
    birthdate DATE DEFAULT NULL,
    id_team INTEGER DEFAULT NULL,
    FOREIGN KEY (id_team) REFERENCES teams(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    text TEXT DEFAULT NULL,
    datetime TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    from_id_user INTEGER DEFAULT NULL,
    to_id_user INTEGER DEFAULT NULL,
    FOREIGN KEY (from_id_user) REFERENCES users(id),
    FOREIGN KEY (to_id_user) REFERENCES users(id)
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    file INTEGER DEFAULT NULL,
    type TEXT DEFAULT NULL,
    size_file BIT DEFAULT NULL,  -- Consider using BYTEA or INTEGER for actual file sizes
    datetime TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    description TEXT DEFAULT NULL,
    id_user INTEGER DEFAULT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
    from_id_user INTEGER DEFAULT NULL,
    to_id_user INTEGER DEFAULT NULL,
    feedback TEXT DEFAULT NULL,
    feedback_type TEXT DEFAULT NULL,
    game_round INTEGER DEFAULT NULL,
    FOREIGN KEY (from_id_user) REFERENCES users(id),
    FOREIGN KEY (to_id_user) REFERENCES users(id)
);

-- Tables dependent on DM and collaboration categories, assumed they are stand-alone without existing dependencies
CREATE TABLE pre_game_dm (
    id SERIAL PRIMARY KEY,
    question TEXT DEFAULT NULL,
    options TEXT DEFAULT NULL,
    answer TEXT DEFAULT NULL
);

CREATE TABLE peer_evaluation_dm (
    id SERIAL PRIMARY KEY,
    question TEXT DEFAULT NULL,
    options TEXT DEFAULT NULL,
    answer TEXT DEFAULT NULL
);

CREATE TABLE end_game_dm (
    id SERIAL PRIMARY KEY,
    question TEXT DEFAULT NULL,
    options TEXT DEFAULT NULL,
    answer TEXT DEFAULT NULL
);

CREATE TABLE pre_game_collaboration (
    id SERIAL PRIMARY KEY,
    question TEXT DEFAULT NULL,
    options TEXT DEFAULT NULL,
    answer TEXT DEFAULT NULL
);

CREATE TABLE peer_evaluation_collaboration (
    id SERIAL PRIMARY KEY,
    question TEXT DEFAULT NULL,
    options TEXT DEFAULT NULL,
    answer TEXT DEFAULT NULL
);

CREATE TABLE end_game_collaboration (
    id SERIAL PRIMARY KEY,
    question TEXT DEFAULT NULL,
    options TEXT DEFAULT NULL,
    answer TEXT DEFAULT NULL
);

-- Decision Making and Collaboration tables with all dependencies resolved
CREATE TABLE decision_making (
    id SERIAL PRIMARY KEY,
    from_id_user INTEGER DEFAULT NULL,
    to_id_user INTEGER DEFAULT NULL,
    id_pre_game_dm INTEGER DEFAULT NULL,
    id_evaluation_dm INTEGER DEFAULT NULL,
    id_end_game_dm INTEGER DEFAULT NULL,
    FOREIGN KEY (from_id_user) REFERENCES users(id),
    FOREIGN KEY (to_id_user) REFERENCES users(id),
    FOREIGN KEY (id_pre_game_dm) REFERENCES pre_game_dm(id),
    FOREIGN KEY (id_evaluation_dm) REFERENCES peer_evaluation_dm(id),
    FOREIGN KEY (id_end_game_dm) REFERENCES end_game_dm(id)
);

CREATE TABLE collaboration (
    id SERIAL PRIMARY KEY,
    from_id_user INTEGER DEFAULT NULL,
    to_id_user INTEGER DEFAULT NULL,
    id_pre_game_collaboration INTEGER DEFAULT NULL,
    id_peer_evaluation_collaboration INTEGER DEFAULT NULL,
    id_end_game_collaboration INTEGER DEFAULT NULL,
    FOREIGN KEY (from_id_user) REFERENCES users(id),
    FOREIGN KEY (to_id_user) REFERENCES users(id),
    FOREIGN KEY (id_pre_game_collaboration) REFERENCES pre_game_collaboration(id),
    FOREIGN KEY (id_peer_evaluation_collaboration) REFERENCES peer_evaluation_collaboration(id),
    FOREIGN KEY (id_end_game_collaboration) REFERENCES end_game_collaboration(id)
);