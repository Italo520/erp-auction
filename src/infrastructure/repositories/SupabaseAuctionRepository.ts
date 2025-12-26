import { IAuctionRepository, AuctionFilterParams } from '@/core/repositories/IAuctionRepository';
import { Auction } from '@/core/entities/Auction';
import { PaginatedResult } from '@/shared/types/domain.types';
import { supabase } from '@/infrastructure/api/supabaseClient';

export class SupabaseAuctionRepository implements IAuctionRepository {

    async create(auctionData: Omit<Auction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Auction> {
        const dbData = {
            name: auctionData.name,
            start_date_time: auctionData.startDateTime,
            end_date_time: auctionData.endDateTime,
            status: auctionData.status,
            description: auctionData.description,
            terms_conditions: auctionData.termsConditions
        };

        const { data, error } = await supabase
            .from('auctions')
            .insert(dbData)
            .select()
            .single();

        if (error) throw error;
        return this.mapToDomain(data);
    }

    async findById(id: string): Promise<Auction | null> {
        const { data, error } = await supabase
            .from('auctions')
            .select(`
            *,
            auction_items (
                *,
                vehicle:vehicles (*)
            )
        `)
            .eq('id', id)
            .single();

        if (error) return null;
        return this.mapToDomain(data);
    }

    async findAll(params: AuctionFilterParams): Promise<PaginatedResult<Auction>> {
        let query = supabase
            .from('auctions')
            .select('*', { count: 'exact' });

        if (params.status) query = query.eq('status', params.status);
        if (params.search) query = query.ilike('name', `%${params.search}%`);
        if (params.dateRange) {
            query = query.gte('start_date_time', params.dateRange.start.toISOString())
                .lte('start_date_time', params.dateRange.end.toISOString());
        }

        const from = (params.page - 1) * params.limit;
        const to = from + params.limit - 1;

        const { data, error, count } = await query.range(from, to);

        if (error) throw error;

        return {
            data: data.map(this.mapToDomain),
            total: count || 0,
            page: params.page,
            limit: params.limit,
            totalPages: Math.ceil((count || 0) / params.limit)
        };
    }

    async update(id: string, data: Partial<Auction>): Promise<Auction> {
        const dbData: any = {};
        if (data.name) dbData.name = data.name;
        if (data.status) dbData.status = data.status;
        if (data.startDateTime) dbData.start_date_time = data.startDateTime;
        if (data.endDateTime) dbData.end_date_time = data.endDateTime;

        const { data: updated, error } = await supabase
            .from('auctions')
            .update(dbData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return this.mapToDomain(updated);
    }

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('auctions')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }

    async findActiveAuctions(): Promise<Auction[]> {
        const now = new Date().toISOString();
        const { data, error } = await supabase
            .from('auctions')
            .select('*')
            .eq('status', 'ACTIVE')
            .lte('start_date_time', now)
            .gte('end_date_time', now);

        if (error) throw error;
        return data.map(this.mapToDomain);
    }

    private mapToDomain(data: any): Auction {
        return {
            id: data.id,
            name: data.name,
            startDateTime: new Date(data.start_date_time),
            endDateTime: new Date(data.end_date_time),
            status: data.status,
            description: data.description,
            termsConditions: data.terms_conditions,
            items: data.auction_items ? data.auction_items.map((item: any) => ({
                id: item.id,
                auctionId: item.auction_id,
                vehicleId: item.vehicle_id,
                vehicle: item.vehicle, // Need separate mapping if deeply needed
                lotNumber: item.lot_number,
                currentBid: item.current_bid,
                status: item.status
            })) : [],
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at)
        };
    }
}
