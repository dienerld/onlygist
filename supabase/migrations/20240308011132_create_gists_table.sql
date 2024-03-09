create table public.gists (
  id uuid primary key,
  profile_uid uuid references public.profiles (id) not null,
  is_paid boolean not null,
  title varchar not null,
  description text not null,
  lang varchar not null,
  price integer not null,
  content text not null,
  created_at timestamp with time zone default current_timestamp not null
);
