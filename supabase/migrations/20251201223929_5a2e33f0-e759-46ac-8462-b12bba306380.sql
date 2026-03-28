-- Create storage buckets for profile photos and startup logos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('profiles', 'profiles', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('startup-logos', 'startup-logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']);

-- RLS policies for profile photos
CREATE POLICY "Profile photos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload their own profile photo"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profiles' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own profile photo"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profiles' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile photo"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profiles' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS policies for startup logos
CREATE POLICY "Startup logos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'startup-logos');

CREATE POLICY "Users can upload startup logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'startup-logos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their startup logos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'startup-logos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their startup logos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'startup-logos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create revenue_history table for tracking monthly revenue
CREATE TABLE public.revenue_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID NOT NULL REFERENCES public.startups(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  revenue INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.revenue_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Revenue history is viewable by everyone"
ON public.revenue_history FOR SELECT
USING (true);

CREATE POLICY "Users can manage their startup revenue history"
ON public.revenue_history FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.startups
    WHERE startups.id = revenue_history.startup_id
    AND startups.user_id = auth.uid()
  )
);

CREATE TRIGGER update_revenue_history_updated_at
  BEFORE UPDATE ON public.revenue_history
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();