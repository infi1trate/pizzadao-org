
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'journal',
  status TEXT NOT NULL DEFAULT 'subscribed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX newsletter_subscribers_email_lower_idx
  ON public.newsletter_subscribers (lower(email));

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to the newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(email)) > 0
  AND length(email) <= 320
  AND email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
  AND length(source) <= 64
);
