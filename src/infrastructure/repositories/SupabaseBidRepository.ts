import { IBidRepository } from '../../core/repositories/IBidRepository';
import { Bid } from '../../core/entities/Bid';
import { supabase } from '../api/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

export class SupabaseBidRepository implements IBidRepository {

    async create(bid: Omit<Bid, 'id' | 'timestamp'>): Promise<Bid> {
        const dbData = {
            auction_id: bid.auctionId,
            vehicle_id: bid.vehicleId,
            user_id: bid.userId,
            amount: bid.amount,
            channel: bid.channel || 'WEB',
            is_cancelled: bid.isCancelled || false
        };

        const { data, error } = await supabase
            .from('bids')
            .insert(dbData)
            .select()
            .single();

        if (error) throw error;
        return this.mapToDomain(data);
    }

    async findByVehicleId(vehicleId: string, limit: number = 20): Promise<Bid[]> {
        const { data, error } = await supabase
            .from('bids')
            .select('*')
            .eq('vehicle_id', vehicleId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data.map(this.mapToDomain);
    }

    async findHighestBid(vehicleId: string): Promise<Bid | null> {
        const { data, error } = await supabase
            .from('bids')
            .select('*')
            .eq('vehicle_id', vehicleId)
            .order('amount', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'row not found'
        if (!data) return null;

        return this.mapToDomain(data);
    }

    async findByUserId(userId: string): Promise<Bid[]> {
        const { data, error } = await supabase
            .from('bids')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data.map(this.mapToDomain);
    }

    subscribeToVehicleBids(vehicleId: string, callback: (bid: Bid) => void): () => void {
        const channel = supabase
            .channel(`vehicle_bids_${vehicleId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'bids', filter: `vehicle_id=eq.${vehicleId}` },
                (payload) => {
                    callback(this.mapToDomain(payload.new));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }

    subscribeToAuctionBids(auctionId: string, callback: (bid: Bid) => void): () => void {
        const channel = supabase
            .channel(`auction_room_${auctionId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'bids', filter: `auction_id=eq.${auctionId}` },
                (payload) => {
                    callback(this.mapToDomain(payload.new));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }

    private mapToDomain(data: any): Bid {
        return {
            id: data.id,
            auctionId: data.auction_id,
            vehicleId: data.vehicle_id,
            userId: data.user_id,
            amount: data.amount,
            timestamp: new Date(data.created_at),
            channel: data.channel,
            ipAddress: data.ip_address,
            isCancelled: data.is_cancelled
        };
    }
}
