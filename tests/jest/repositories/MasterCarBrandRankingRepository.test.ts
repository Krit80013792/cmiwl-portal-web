import { MasterCarBrandRankingRepository } from '../../../src/infrastructure/database/mongodb/repositories/MasterCarBrandRankingRepository';
import { MasterCarBrandRankingEntity } from '../../../src/domain/entities/MasterCarBrandRankingEntity';

jest.mock("../../../src/domain/entities/MasterCarBrandRankingEntity");

describe("MasterCarBrandRankingRepository", () => {
    let repository: MasterCarBrandRankingRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        repository = new MasterCarBrandRankingRepository();
    });

    it("Create should save and return entity", async () => {
        const mockSave = jest.fn().mockResolvedValue({ id: "1", CarBrandName: "Toyota" });
        (MasterCarBrandRankingEntity as any).mockImplementation(() => ({ save: mockSave }));

        const result = await repository.create({ CarBrandName: "Toyota" });
        expect(mockSave).toHaveBeenCalled();
        expect(result).toEqual({ id: "1", CarBrandName: "Toyota" });
    });

    it("FindAll should return all entities", async () => {
        const mockFind = jest.fn().mockResolvedValue([{ id: "1", CarBrandName: "Toyota" }]);
        (MasterCarBrandRankingEntity as any).find = mockFind;

        const result = await repository.findAll();
        expect(mockFind).toHaveBeenCalled();
        expect(result).toEqual([{ id: "1", CarBrandName: "Toyota" }]);
    });

    it("FindById should return entity by id", async () => {
        const mockFindById = jest.fn().mockResolvedValue({ id: "1", CarBrandName: "Toyota" });
        (MasterCarBrandRankingEntity as any).findById = mockFindById;

        const result = await repository.findById("1");
        expect(mockFindById).toHaveBeenCalledWith("1");
        expect(result).toEqual({ id: "1", CarBrandName: "Toyota" });
    });

    it("Update should update and return the entity", async () => {
        const mockFindByIdAndUpdate = jest.fn().mockResolvedValue({ id: "1", CarBrandName: "Honda" });
        (MasterCarBrandRankingEntity as any).findByIdAndUpdate = mockFindByIdAndUpdate;

        const result = await repository.update("1", { CarBrandName: "Honda" });
        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith("1", { CarBrandName: "Honda" }, { new: true });
        expect(result).toEqual({ id: "1", CarBrandName: "Honda" });
    });

    it("DeleteOne should delete entity and return it", async () => {
        const mockFindByIdAndDelete = jest.fn().mockResolvedValue({ id: "1", CarBrandName: "Toyota" });
        (MasterCarBrandRankingEntity as any).findByIdAndDelete = mockFindByIdAndDelete;

        const result = await repository.deleteOne("1");
        expect(mockFindByIdAndDelete).toHaveBeenCalledWith("1");
        expect(result).toEqual({ id: "1", CarBrandName: "Toyota" });
    });
});
