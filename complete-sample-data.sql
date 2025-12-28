-- Create a dummy admin profile for sample data
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('6a8f1065-90b9-432b-a8d3-113b2d774e5a', 'admin@demo.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- The trigger will automatically create the profile, but let's ensure it exists
INSERT INTO profiles (id, email, role)
VALUES ('6a8f1065-90b9-432b-a8d3-113b2d774e5a', 'admin@demo.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Insert sample products
INSERT INTO products (title, description, price, currency, quantity_available, category, status, is_active, owner_id) VALUES
('Laptop Pro 15"', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 'EUR', 10, 'Electronics', 'approved', true, '6a8f1065-90b9-432b-a8d3-113b2d774e5a'),
('Wireless Headphones', 'Premium noise-cancelling wireless headphones', 199.99, 'EUR', 25, 'Electronics', 'approved', true, '6a8f1065-90b9-432b-a8d3-113b2d774e5a'),
('Coffee Maker', 'Automatic drip coffee maker with programmable timer', 89.99, 'EUR', 15, 'Home & Kitchen', 'approved', true, '6a8f1065-90b9-432b-a8d3-113b2d774e5a'),
('Running Shoes', 'Comfortable running shoes with advanced cushioning', 129.99, 'EUR', 30, 'Sports', 'approved', true, '6a8f1065-90b9-432b-a8d3-113b2d774e5a'),
('Smartphone', 'Latest smartphone with 128GB storage and dual camera', 699.99, 'EUR', 20, 'Electronics', 'approved', true, '6a8f1065-90b9-432b-a8d3-113b2d774e5a');