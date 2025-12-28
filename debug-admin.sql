-- Debug query to see what's happening with products and profiles
SELECT 
  p.id as product_id,
  p.title,
  p.owner_id,
  pr.id as profile_id,
  pr.email,
  pr.role
FROM products p
LEFT JOIN profiles pr ON p.owner_id = pr.id
ORDER BY p.owner_id;

-- Check if admin can see all profiles
SELECT * FROM profiles;

-- Check current user and role
SELECT auth.uid(), 
       (SELECT role FROM profiles WHERE id = auth.uid()) as current_role;