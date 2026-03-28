-- Add favicon_url column to profiles table
ALTER TABLE public.profiles
ADD COLUMN favicon_url text DEFAULT NULL;