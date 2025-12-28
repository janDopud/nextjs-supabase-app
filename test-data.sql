-- Insert test customer profiles
INSERT INTO profiles (id, email, role) VALUES
('11111111-1111-1111-1111-111111111111', 'john@customer.com', 'customer'),
('22222222-2222-2222-2222-222222222222', 'sarah@customer.com', 'customer'),
('33333333-3333-3333-3333-333333333333', 'mike@customer.com', 'customer'),
('44444444-4444-4444-4444-444444444444', 'emma@customer.com', 'customer');

-- Insert products for John (Electronics seller)
INSERT INTO products (title, description, price, currency, quantity_available, category, status, is_active, owner_id) VALUES
('Gaming Laptop', 'High-end gaming laptop with RTX 4070', 1899.99, 'EUR', 5, 'Electronics', 'approved', true, '11111111-1111-1111-1111-111111111111'),
('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 149.99, 'EUR', 20, 'Electronics', 'approved', true, '11111111-1111-1111-1111-111111111111'),
('Gaming Mouse', 'Wireless gaming mouse with 16000 DPI', 79.99, 'EUR', 15, 'Electronics', 'pending', true, '11111111-1111-1111-1111-111111111111');

-- Insert products for Sarah (Fashion seller)
INSERT INTO products (title, description, price, currency, quantity_available, category, status, is_active, owner_id) VALUES
('Summer Dress', 'Elegant floral summer dress', 89.99, 'EUR', 12, 'Fashion', 'approved', true, '22222222-2222-2222-2222-222222222222'),
('Leather Handbag', 'Premium leather handbag with gold accents', 199.99, 'EUR', 8, 'Fashion', 'approved', true, '22222222-2222-2222-2222-222222222222'),
('Designer Sunglasses', 'UV protection designer sunglasses', 129.99, 'EUR', 25, 'Fashion', 'pending', true, '22222222-2222-2222-2222-222222222222');

-- Insert products for Mike (Sports seller)
INSERT INTO products (title, description, price, currency, quantity_available, category, status, is_active, owner_id) VALUES
('Basketball Shoes', 'Professional basketball shoes with air cushion', 159.99, 'EUR', 18, 'Sports', 'approved', true, '33333333-3333-3333-3333-333333333333'),
('Yoga Mat', 'Non-slip premium yoga mat', 39.99, 'EUR', 30, 'Sports', 'approved', true, '33333333-3333-3333-3333-333333333333'),
('Protein Powder', 'Whey protein powder 2kg', 49.99, 'EUR', 50, 'Sports', 'rejected', true, '33333333-3333-3333-3333-333333333333');

-- Insert products for Emma (Home & Kitchen seller)
INSERT INTO products (title, description, price, currency, quantity_available, category, status, is_active, owner_id) VALUES
('Air Fryer', 'Digital air fryer 5L capacity', 119.99, 'EUR', 10, 'Home & Kitchen', 'approved', true, '44444444-4444-4444-4444-444444444444'),
('Ceramic Cookware Set', '10-piece ceramic non-stick cookware set', 299.99, 'EUR', 6, 'Home & Kitchen', 'approved', true, '44444444-4444-4444-4444-444444444444'),
('Smart Coffee Machine', 'WiFi enabled coffee machine with app control', 399.99, 'EUR', 4, 'Home & Kitchen', 'pending', true, '44444444-4444-4444-4444-444444444444');

-- Insert products for specific customer (90005b34-b9f6-41ec-97de-1211c0b245f5)
INSERT INTO products (title, description, price, currency, quantity_available, category, status, is_active, owner_id) VALUES
('Wireless Earbuds', 'Premium noise-cancelling wireless earbuds', 199.99, 'EUR', 25, 'Electronics', 'approved', true, '90005b34-b9f6-41ec-97de-1211c0b245f5'),
('Smart Watch', 'Fitness tracking smartwatch with GPS', 299.99, 'EUR', 15, 'Electronics', 'approved', true, '90005b34-b9f6-41ec-97de-1211c0b245f5'),
('Bluetooth Speaker', 'Portable waterproof Bluetooth speaker', 89.99, 'EUR', 30, 'Electronics', 'pending', true, '90005b34-b9f6-41ec-97de-1211c0b245f5'),
('Phone Case', 'Protective phone case with card holder', 29.99, 'EUR', 50, 'Electronics', 'approved', true, '90005b34-b9f6-41ec-97de-1211c0b245f5'),
('Tablet Stand', 'Adjustable aluminum tablet stand', 39.99, 'EUR', 20, 'Electronics', 'approved', true, '90005b34-b9f6-41ec-97de-1211c0b245f5');