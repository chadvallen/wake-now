select li.id, li.order_id, li.product_id, o.name, o.shipping_address, o.city, o.state_name, o.zipcode, p.name, p.image_url
from line_items li
join orders o
on o.id = li.order_id
join products p
on li.product_id = p.id
where o.user_id = 1;