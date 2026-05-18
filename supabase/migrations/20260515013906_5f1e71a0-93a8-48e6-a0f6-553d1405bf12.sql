CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  intents TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'received',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) > 0
  AND length(name) <= 200
  AND length(trim(email)) > 0
  AND length(email) <= 320
  AND length(trim(message)) > 0
  AND length(message) <= 5000
  AND coalesce(array_length(intents, 1), 0) <= 12
);