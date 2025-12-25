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
CREATE POLICY "Veículos são públicos" ON vehicles FOR
SELECT USING (true);

-- Escrita (Insert/Update/Delete): Apenas Admins
-- Assume que existe um campo 'role' no metadata do usuário
CREATE POLICY "Apenas Admins gerenciam veículos" ON vehicles FOR ALL USING (
    auth.jwt () -> 'user_metadata' ->> 'role' = 'ADMIN'
)
WITH
    CHECK (
        auth.jwt () -> 'user_metadata' ->> 'role' = 'ADMIN'
    );

-- ==========================================
-- POLÍTICAS PARA IMAGENS (vehicle_images)
-- ==========================================

CREATE POLICY "Imagens são públicas" ON vehicle_images FOR
SELECT USING (true);

CREATE POLICY "Apenas Admins gerenciam imagens" ON vehicle_images FOR ALL USING (
    auth.jwt () -> 'user_metadata' ->> 'role' = 'ADMIN'
)
WITH
    CHECK (
        auth.jwt () -> 'user_metadata' ->> 'role' = 'ADMIN'
    );

-- ==========================================
-- POLÍTICAS PARA LEILÕES (auctions)
-- ==========================================

CREATE POLICY "Leilões são públicos" ON auctions FOR
SELECT USING (true);

CREATE POLICY "Apenas Admins gerenciam leilões" ON auctions FOR ALL USING (
    auth.jwt () -> 'user_metadata' ->> 'role' = 'ADMIN'
)
WITH
    CHECK (
        auth.jwt () -> 'user_metadata' ->> 'role' = 'ADMIN'
    );

-- ==========================================
-- POLÍTICAS PARA LANCES (bids)
-- ==========================================

-- Leitura: Pública (Para ver histórico e tempo real)
CREATE POLICY "Lances são públicos" ON bids FOR
SELECT USING (true);

-- Escrita: Usuários autenticados podem dar lances
-- Garante que o usuário só pode inserir um lance se o user_id for ele mesmo
CREATE POLICY "Usuários autenticados podem dar lances" ON bids FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

-- Importante: Ninguém pode alterar ou deletar lances (imutabilidade)
-- Não criamos policies FOR UPDATE ou DELETE para bids propositalmente.

-- ==========================================
-- BUCKET DE IMAGENS (Storage)
-- (Caso precise configurar policies para o Storage também)
-- ==========================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('vehicles', 'vehicles', true);

-- CREATE POLICY "Imagens de veículos são públicas"
-- ON storage.objects FOR SELECT
-- USING ( bucket_id = 'vehicles' );

-- CREATE POLICY "Apenas Admins sobem imagens"
-- ON storage.objects FOR INSERT
-- WITH CHECK ( bucket_id = 'vehicles' AND auth.jwt() -> 'user_metadata' ->> 'role' = 'ADMIN' );