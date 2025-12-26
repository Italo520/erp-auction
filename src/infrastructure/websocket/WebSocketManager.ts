import { BiddingEvent, BiddingListener } from '@/presentation/components/features/bidding/bidding.types';

export class WebSocketManager {
    private listeners: Map<string, BiddingListener[]> = new Map();
    private isConnected: boolean = false;
    private mockInterval: NodeJS.Timeout | null = null;

    connect(url: string): void {
        console.log(`Connecting to ${url}...`);
        this.isConnected = true;

        // Simulação de eventos do backend
        this.startMockEvents();
    }

    disconnect(): void {
        console.log("Disconnecting...");
        this.isConnected = false;
        if (this.mockInterval) {
            clearInterval(this.mockInterval);
            this.mockInterval = null;
        }
    }

    subscribe(topic: string, listener: BiddingListener): void {
        if (!this.listeners.has(topic)) {
            this.listeners.set(topic, []);
        }
        this.listeners.get(topic)?.push(listener);
    }

    unsubscribe(topic: string, listener: BiddingListener): void {
        const topicListeners = this.listeners.get(topic);
        if (topicListeners) {
            this.listeners.set(topic, topicListeners.filter(l => l !== listener));
        }
    }

    emit(topic: string, event: BiddingEvent): void {
        const topicListeners = this.listeners.get(topic);
        topicListeners?.forEach(listener => listener(event));
    }

    private startMockEvents() {
        // Simula lances chegando a cada 5-10 segundos
        if (typeof window !== 'undefined') {
            this.mockInterval = setInterval(() => {
                const randomAmount = Math.floor(Math.random() * 1000) + 100;
                const mockBid: BiddingEvent = {
                    type: 'BID_PLACED',
                    payload: {
                        id: Math.random().toString(36).substr(2, 9),
                        auctionId: 'mock-auction',
                        userId: 'user-random',
                        userName: `User ${Math.floor(Math.random() * 100)}`,
                        amount: 0, // Será preenchido relativo ao atual na lógica do frontend ou aqui se tivesse estado
                        timestamp: new Date()
                    }
                };
                // Envia para todos os tópicos por simplicidade do mock
                this.listeners.forEach(listeners => listeners.forEach(l => l(mockBid)));
            }, 8000);
        }
    }

    // Método para simular envio de mensagem do cliente
    send(topic: string, message: any): void {
        console.log(`Sending to ${topic}:`, message);
        // Aqui num real, enviaria socket.send()
    }
}

// Singleton instance
export const webSocketManager = new WebSocketManager();
