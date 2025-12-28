-- Drop the problematic admin policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create a simple admin policy using a function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users u
    JOIN profiles p ON u.id = p.id
    WHERE u.id = auth.uid() AND p.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create admin policy using the function
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (is_admin() OR auth.uid() = id);