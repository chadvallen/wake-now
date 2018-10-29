create table users (
    id serial primary key,
    auth0_id varchar not null,
    email varchar not null,
    profile_name text not null,
    picture text not null
);
