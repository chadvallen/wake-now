insert into orders (name, shipping_address, city, state_name, zipcode, user_id)
values (${name}, ${shipping_address}, ${city}, ${state_name}, ${zipcode}, ${user_id})
returning *;

