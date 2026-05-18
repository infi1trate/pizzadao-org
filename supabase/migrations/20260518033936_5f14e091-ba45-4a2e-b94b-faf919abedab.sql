CREATE TABLE public.mafia_name_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  selected_movie_title TEXT NOT NULL,
  selected_movie_id TEXT,
  selected_topping TEXT NOT NULL,
  generated_names JSONB NOT NULL DEFAULT '[]'::jsonb,
  selected_name TEXT NOT NULL,
  selected_explanation TEXT,
  contact_handle TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.mafia_name_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can claim a mafia name"
ON public.mafia_name_claims
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(selected_movie_title)) > 0
  AND length(selected_movie_title) <= 200
  AND length(trim(selected_topping)) > 0
  AND length(selected_topping) <= 100
  AND length(trim(selected_name)) > 0
  AND length(selected_name) <= 200
  AND (contact_handle IS NULL OR length(contact_handle) <= 200)
);