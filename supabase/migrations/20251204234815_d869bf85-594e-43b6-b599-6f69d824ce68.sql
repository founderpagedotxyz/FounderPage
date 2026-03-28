-- Allow admins to delete any profile
CREATE POLICY "Admins can delete any profile"
ON public.profiles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete any startup
CREATE POLICY "Admins can delete any startup"
ON public.startups
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));