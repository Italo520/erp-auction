import { CreateAuctionUseCase } from '../CreateAuctionUseCase';
import { IAuctionRepository } from '../../repositories/IAuctionRepository';
import { Auction } from '../../entities/Auction';

describe('CreateAuctionUseCase', () => {
    let createAuctionUseCase: CreateAuctionUseCase;
    let mockAuctionRepository: jest.Mocked<IAuctionRepository>;

    beforeEach(() => {
        mockAuctionRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findActiveAuctions: jest.fn(),
        };
        createAuctionUseCase = new CreateAuctionUseCase(mockAuctionRepository);
    });

    it('should create an auction successfully', async () => {
        const auctionData = {
            name: 'Test Auction',
            startDateTime: new Date('2024-01-01'),
            endDateTime: new Date('2024-01-02'),
            status: 'DRAFT' as const,
            items: [],
        };

        const createdAuction: Auction = {
            id: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
            ...auctionData,
        };

        mockAuctionRepository.create.mockResolvedValue(createdAuction);

        const result = await createAuctionUseCase.execute(auctionData);

        expect(result).toEqual(createdAuction);
        expect(mockAuctionRepository.create).toHaveBeenCalledWith(auctionData);
    });

    it('should throw error if end date is before start date', async () => {
        const auctionData = {
            name: 'Invalid Auction',
            startDateTime: new Date('2024-01-02'),
            endDateTime: new Date('2024-01-01'), // Invalid
            status: 'DRAFT' as const,
            items: [],
        };

        await expect(createAuctionUseCase.execute(auctionData))
            .rejects
            .toThrow('A data de término deve ser posterior à data de início.');

        expect(mockAuctionRepository.create).not.toHaveBeenCalled();
    });
});
