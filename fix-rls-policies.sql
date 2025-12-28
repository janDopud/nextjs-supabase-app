-- Drop ALL existing policies first
DROP POLICY IF EXISTS "Public can view approved products" ON products;
DROP POLICY IF EXISTS "Customers can manage own products" ON products;
DROP POLICY IF EXISTS "Admins can manage all products" ON products;
DROP POLICY IF EXISTS "Public can view images of approved products" ON product_images;
DROP POLICY IF EXISTS "Customers can manage own product images" ON product_images;
DROP POLICY IF EXISTS "Admins can manage all product images" ON product_images;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Recreate simple policies without recursion
CREATE POLICY "Public can view approved products" ON products
  FOR SELECT USING (status = 'approved' AND is_active = true);

CREATE POLICY "Public can view images of approved products" ON product_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM products 
      WHERE id = product_id AND status = 'approved' AND is_active = true
    )
  );

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);