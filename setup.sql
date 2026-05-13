-- ═══════════════════════════════════════════════════════════════
-- CASAL EM FÉ — Setup do Banco de Dados Supabase
-- Cole todo este conteúdo no Editor SQL do Supabase e execute
-- ═══════════════════════════════════════════════════════════════

-- 1. Tabela de casais (cada casal tem um código de convite)
create table if not exists public.casais (
  id uuid default gen_random_uuid() primary key,
  codigo text unique default upper(substr(md5(random()::text), 1, 6)),
  criado_em timestamptz default now()
);

-- 2. Membros — liga usuários a casais
create table if not exists public.membros (
  user_id uuid references auth.users(id) on delete cascade primary key,
  couple_id uuid references public.casais(id) on delete set null,
  criado_em timestamptz default now()
);

-- 3. Estado compartilhado do casal (JSON completo)
create table if not exists public.estado (
  couple_id uuid references public.casais(id) on delete cascade primary key,
  completed_days int[] default '{}',
  start_date text default null,
  profile jsonb default '{}',
  diary jsonb default '{}',
  theme_checked jsonb default '{}',
  intention text default '',
  favorites text[] default '{}',
  atualizado_em timestamptz default now()
);

-- 4. Trigger para atualizar timestamp automaticamente
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.atualizado_em = now(); return new; end; $$;

drop trigger if exists trg_estado_updated on public.estado;
create trigger trg_estado_updated
  before update on public.estado
  for each row execute function public.set_updated_at();

-- 5. Habilitar Row Level Security
alter table public.casais enable row level security;
alter table public.membros enable row level security;
alter table public.estado enable row level security;

-- 6. Políticas de acesso
-- Casais: qualquer autenticado pode ler (para buscar por código) e criar
drop policy if exists "ler casais" on public.casais;
drop policy if exists "criar casal" on public.casais;
create policy "ler casais" on public.casais for select to authenticated using (true);
create policy "criar casal" on public.casais for insert to authenticated with check (true);

-- Membros: cada usuário gerencia apenas o próprio registro
drop policy if exists "ler membro" on public.membros;
drop policy if exists "criar membro" on public.membros;
drop policy if exists "atualizar membro" on public.membros;
create policy "ler membro" on public.membros for select to authenticated using (user_id = auth.uid());
create policy "criar membro" on public.membros for insert to authenticated with check (user_id = auth.uid());
create policy "atualizar membro" on public.membros for update to authenticated using (user_id = auth.uid());

-- Estado: apenas membros do casal podem ler e escrever
drop policy if exists "ler estado" on public.estado;
drop policy if exists "criar estado" on public.estado;
drop policy if exists "atualizar estado" on public.estado;
create policy "ler estado" on public.estado for select to authenticated
  using (couple_id in (select couple_id from public.membros where user_id = auth.uid()));
create policy "criar estado" on public.estado for insert to authenticated
  with check (couple_id in (select couple_id from public.membros where user_id = auth.uid()));
create policy "atualizar estado" on public.estado for update to authenticated
  using (couple_id in (select couple_id from public.membros where user_id = auth.uid()));

-- 7. Habilitar Realtime para sync em tempo real
alter publication supabase_realtime add table public.estado;

-- ✅ Pronto! Agora rode o App.jsx no Vercel.

-- Coluna para intenções de oração persistentes
ALTER TABLE public.estado ADD COLUMN IF NOT EXISTS prayer_intentions jsonb default '[]';
