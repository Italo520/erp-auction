-- ==========================================
-- SCRIPT DE SEGURANÇA RLS (Row Level Security)
-- Rode este script no Editor SQL do seu projeto Supabase
-- ==========================================
-- 1. Habilitar RLS nas tabelas
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;

ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- POLÍTICAS PARA VEÍCULOS (vehicles)
-- ==========================================
-- Leitura: Pública (Todos podem ver veículos)
DROP POLICY IF EXISTS "Veículos são públicos" ON vehicles;

CREATE POLICY "Veículos são públicos" ON vehicles FOR
SELECT
    USING (true);

-- Escrita (Insert/Update/Delete): Apenas Admins
DROP POLICY IF EXISTS "Apenas Admins gerenciam veículos" ON vehicles;

CREATE POLICY "Apenas Admins gerenciam veículos" ON vehicles FOR ALL USING (
    auth.jwt () - > 'user_metadata' - > > 'role' = 'ADMIN'
)
WITH
    CHECK (
        auth.jwt () - > 'user_metadata' - > > 'role' = 'ADMIN'
    );

-- ==========================================
-- POLÍTICAS PARA IMAGENS (tabela vehicle_images)
-- ==========================================
DROP POLICY IF EXISTS "Imagens são públicas" ON vehicle_images;

CREATE POLICY "Imagens são públicas" ON vehicle_images FOR
SELECT
    USING (true);

DROP POLICY IF EXISTS "Apenas Admins gerenciam imagens" ON vehicle_images;

CREATE POLICY "Apenas Admins gerenciam imagens" ON vehicle_images FOR ALL USING (
    auth.jwt () - > 'user_metadata' - > > 'role' = 'ADMIN'
)
WITH
    CHECK (
        auth.jwt () - > 'user_metadata' - > > 'role' = 'ADMIN'
    );

-- ==========================================
-- POLÍTICAS PARA LEILÕES (auctions)
-- ==========================================
DROP POLICY IF EXISTS "Leilões são públicos" ON auctions;

CREATE POLICY "Leilões são públicos" ON auctions FOR
SELECT
    USING (true);

DROP POLICY IF EXISTS "Apenas Admins gerenciam leilões" ON auctions;

CREATE POLICY "Apenas Admins gerenciam leilões" ON auctions FOR ALL USING (
    auth.jwt () - > 'user_metadata' - > > 'role' = 'ADMIN'
)
WITH
    CHECK (
        auth.jwt () - > 'user_metadata' - > > 'role' = 'ADMIN'
    );

-- ==========================================
-- POLÍTICAS PARA LANCES (bids)
-- ==========================================
-- Leitura: Pública
DROP POLICY IF EXISTS "Lances são públicos" ON bids;

CREATE POLICY "Lances são públicos" ON bids FOR
SELECT
    USING (true);

-- Escrita: Usuários autenticados podem dar lances
DROP POLICY IF EXISTS "Usuários autenticados podem dar lances" ON bids;

CREATE POLICY "Usuários autenticados podem dar lances" ON bids FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

-- ==========================================
-- BUCKET DE IMAGENS (Storage) - CORRIGIDO
-- Configuração para o bucket 'vehicle-images'
-- ==========================================
-- 1. Cria o bucket 'vehicle-images' e garante que é público
INSERT INTO
    storage.buckets (id, name, public)
VALUES
    ('vehicle-images', 'vehicle-images', true) ON CONFLICT (id) DO
UPDATE
SET
    public = true;

-- 2. Garante que RLS está ativado na tabela de objetos do storage
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Limpeza de políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Imagens de veículos são públicas" ON storage.objects;

DROP POLICY IF EXISTS "Apenas Usuários Autenticados sobem imagens" ON storage.objects;

DROP POLICY IF EXISTS "Apenas Usuários Autenticados deletam imagens" ON storage.objects;

DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- 4. CRIAÇÃO DAS POLÍTICAS DE STORAGE
-- Leitura: PÚBLICA (Necessário para exibir as fotos no site)
CREATE POLICY "Imagens de veículos são públicas" ON storage.objects FOR
SELECT
    USING (bucket_id = 'vehicle-images');

-- Upload: AUTENTICADO 
-- (Permite que qualquer usuário logado envie a foto para o bucket.
-- A segurança real de vinculação fica na tabela 'vehicles' acima).
CREATE POLICY "Apenas Usuários Autenticados sobem imagens" ON storage.objects FOR INSERT
WITH
    CHECK (
        bucket_id = 'vehicle-images'
        AND auth.role () = 'authenticated'
    );

-- Deleção: AUTENTICADO 
-- (Necessário para a funcionalidade de editar veículo e substituir foto).
CREATE POLICY "Apenas Usuários Autenticados deletam imagens" ON storage.objects FOR DELETE USING (
    bucket_id = 'vehicle-images'
    AND auth.role () = 'authenticated'
);