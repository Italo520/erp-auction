import { supabase } from '@/infrastructure/api/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Bid } from '@/core/entities/Bid';
import { Auction } from '@/core/entities/Auction';

export class SupabaseRealtimeService {
    private channels: Map<string, RealtimeChannel> = new Map();

    /**
     * Escuta novos lances em um leilão específico.
     */
    subscribeToAuctionBids(auctionId: string, onNewBid: (bid: Bid) => void): RealtimeChannel {
        const channelName = `auction-bids-${auctionId}`;

        // Evita duplicar assinaturas
        if (this.channels.has(channelName)) {
            return this.channels.get(channelName)!;
        }

        const channel = supabase
            .channel(channelName)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'bids',
                    filter: `auction_id=eq.${auctionId}`,
                },
                (payload) => {
                    console.log('Novo lance recebido:', payload.new);

                    // Mapear payload do banco para entidade Bid
                    const bid: Bid = {
                        id: payload.new.id,
                        auctionId: payload.new.auction_id,
                        vehicleId: payload.new.vehicle_id,
                        userId: payload.new.user_id,
                        amount: payload.new.amount,
                        timestamp: new Date(payload.new.created_at || payload.new.timestamp),
                        channel: payload.new.channel || 'WEB',
                        isCancelled: payload.new.is_cancelled || false,
                        ipAddress: payload.new.ip_address,
                    };

                    onNewBid(bid);
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log(`✅ Conectado ao realtime de lances: ${auctionId}`);
                } else if (status === 'CHANNEL_ERROR') {
                    console.error(`❌ Erro ao conectar no canal de lances: ${auctionId}`);
                }
            });

        this.channels.set(channelName, channel);
        return channel;
    }

    /**
     * Escuta mudanças de status do leilão (PAUSADO, FINALIZADO, etc).
     */
    subscribeToAuctionStatus(auctionId: string, onStatusChange: (status: string) => void): RealtimeChannel {
        const channelName = `auction-status-${auctionId}`;

        if (this.channels.has(channelName)) {
            return this.channels.get(channelName)!;
        }

        const channel = supabase
            .channel(channelName)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'auctions',
                    filter: `id=eq.${auctionId}`,
                },
                (payload) => {
                    const newStatus = (payload.new as any).status;
                    console.log('Status do leilão alterado:', newStatus);
                    onStatusChange(newStatus);
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log(`✅ Conectado ao realtime de status: ${auctionId}`);
                }
            });

        this.channels.set(channelName, channel);
        return channel;
    }

    /**
     * Cancela uma assinatura específica
     */
    unsubscribe(channelName: string) {
        const channel = this.channels.get(channelName);
        if (channel) {
            supabase.removeChannel(channel);
            this.channels.delete(channelName);
            console.log(`🔌 Desconectado do canal: ${channelName}`);
        }
    }

    /**
     * Cancela todas as assinaturas
     */
    unsubscribeAll() {
        this.channels.forEach((channel, name) => {
            supabase.removeChannel(channel);
            console.log(`🔌 Desconectado do canal: ${name}`);
        });
        this.channels.clear();
    }

    /**
     * Retorna o status da conexão do canal
     */
    getChannelStatus(channelName: string): string | null {
        const channel = this.channels.get(channelName);
        return channel?.state || null;
    }
}

// Singleton instance
export const realtimeService = new SupabaseRealtimeService();
