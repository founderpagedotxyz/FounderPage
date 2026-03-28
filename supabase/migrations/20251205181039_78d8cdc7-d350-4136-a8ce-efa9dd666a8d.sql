-- Create a function to get public profile data (excludes email for non-owners)
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_username text)
RETURNS TABLE (
  id uuid,
  username text,
  name text,
  bio text,
  location text,
  photo_url text,
  favicon_url text,
  links jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.username,
    p.name,
    p.bio,
    p.location,
    p.photo_url,
    p.favicon_url,
    p.links,
    p.created_at,
    p.updated_at
  FROM profiles p
  WHERE p.username = profile_username;
END;
$$;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.get_public_profile(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_profile(text) TO anon;