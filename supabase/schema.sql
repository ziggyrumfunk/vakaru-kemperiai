-- Vakarų kemperiai — database schema (safe to run inside your EXISTING Supabase project).
-- It only adds a `vehicles` table and a `vehicle-images` bucket; it does not touch other tables.
--
-- IMPORTANT: set the admin email below to the email you will use to log in to /admin.
-- Only that logged-in user can add/edit/delete vehicles. Everyone else can only read.
-- Default is your business email; change it here if you log in with a different one.

create extension if not exists "pgcrypto";

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('camper','minibus')),
  featured boolean default false,
  vip boolean default false,
  sort_order int default 0,
  chassis text, engine text, power_kw int, power_hp int, year int, transmission text,
  length_cm int, height_cm int, width_cm int, weight_kg int, water_l int, fuel_tank_l int,
  consumption text, seats int, berths int,
  features text[] default '{}',
  description_lt text, description_ru text, description_lv text, description_en text,
  hero_image text, images text[] default '{}',
  created_at timestamptz default now()
);

alter table public.vehicles enable row level security;

-- Public read for the website
drop policy if exists "vehicles_public_read" on public.vehicles;
create policy "vehicles_public_read" on public.vehicles for select using (true);

-- Writes only for the admin email
drop policy if exists "vehicles_admin_write" on public.vehicles;
create policy "vehicles_admin_write" on public.vehicles for all to authenticated
  using ( (auth.jwt() ->> 'email') = 'vakarukemperiai@gmail.com' )
  with check ( (auth.jwt() ->> 'email') = 'vakarukemperiai@gmail.com' );

-- Storage bucket for photos
insert into storage.buckets (id, name, public)
values ('vehicle-images','vehicle-images', true)
on conflict (id) do nothing;

drop policy if exists "vehicle_images_public_read" on storage.objects;
create policy "vehicle_images_public_read" on storage.objects for select
  using ( bucket_id = 'vehicle-images' );

drop policy if exists "vehicle_images_admin_write" on storage.objects;
create policy "vehicle_images_admin_write" on storage.objects for all to authenticated
  using ( bucket_id = 'vehicle-images' and (auth.jwt() ->> 'email') = 'vakarukemperiai@gmail.com' )
  with check ( bucket_id = 'vehicle-images' and (auth.jwt() ->> 'email') = 'vakarukemperiai@gmail.com' );
