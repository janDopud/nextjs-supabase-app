-- First, create a test admin user profile (you'll need to register this user through your app first)
-- Replace 'your-admin-uuid' with the actual UUID from auth.users after registration

-- Insert sample products (replace 'your-admin-uuid' with actual admin user ID)
INSERT INTO products (title, description, price, currency, quantity_available, category, status, is_active, owner_id) VALUES
('Laptop Pro 15"', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 'EUR', 10, 'Electronics', 'approved', true, 6a8f1065-90b9-432b-a8d3-113b2d774e5a),
('Wireless Headphones', 'Premium noise-cancelling wireless headphones', 199.99, 'EUR', 25, 'Electronics', 'approved', true, 6a8f1065-90b9-432b-a8d3-113b2d774e5a),
('Coffee Maker', 'Automatic drip coffee maker with programmable timer', 89.99, 'EUR', 15, 'Home & Kitchen', 'approved', true, 6a8f1065-90b9-432b-a8d3-113b2d774e5a),
('Running Shoes', 'Comfortable running shoes with advanced cushioning', 129.99, 'EUR', 30, 'Sports', 'approved', true, 6a8f1065-90b9-432b-a8d3-113b2d774e5a),
('Smartphone', 'Latest smartphone with 128GB storage and dual camera', 699.99, 'EUR', 20, 'Electronics', 'approved', true, 6a8f1065-90b9-432b-a8d3-113b2d774e5a);

-- Note: You'll need to replace 'your-admin-uuid' with the actual UUID from your registered admin user