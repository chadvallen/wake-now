insert into orders (name, shipping_address, city, state_name, zipcode, user_id)
values ($1, $2, $3, $4, $5, $6)
returning *;

