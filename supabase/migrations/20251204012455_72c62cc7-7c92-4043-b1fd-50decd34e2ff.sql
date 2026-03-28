-- Add Stripe Connect fields to startups table
ALTER TABLE public.startups 
ADD COLUMN IF NOT EXISTS stripe_account_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_connected_at TIMESTAMP WITH TIME ZONE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_startups_stripe_account_id ON public.startups(stripe_account_id);

-- Update RLS to allow users to update their own Stripe connection
-- (existing policy already allows users to update own startups)