create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.study_aws_users_table (id, email, thumbnail_url, provider_username)
  values (new.id, new.raw_user_meta_data ->>'email', new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'provider_id');
  return new;  
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();