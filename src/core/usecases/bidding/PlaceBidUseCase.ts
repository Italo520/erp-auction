import { IBidRepository } from '@/core/repositories/IBidRepository';
// import { User } from '../../entities/User'; // Assuming we have user context

export class PlaceBidUseCase {
    constructor(private bidRepo: IBidRepository) { }

    async execute(auctionId: string, amount: number, userId: string = 'anon'): Promise<void> {
        // Here we would validate bid amount against rules (increment, current high, etc.)
        // For now just pass to repo

        // NOTE: In a real app, userId comes from the authenticated session context passed to the use case
        // or the repo uses the current session user automatically on create.
        // Given the simple interface:

        await this.bidRepo.create({
            auctionId: auctionId,
            vehicleId: 'unknown', // Warning: Logic gap, PlaceBid usually needs vehicleId if bids are per vehicle
            userId: userId,
            amount: amount,
            channel: 'WEB',
            isCancelled: false
        });
    }
}
