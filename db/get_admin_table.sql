select li.id, li.order_id, li.product_id, o.name, o.shipping_address, o.city, o.state_name, o.zipcode
from line_items li
join orders o
on o.id = li.order_id;