import { MasterCarColorRepository } from '../../../src/infrastructure/database/mongodb/repositories/MasterCarColorRepository';
import { MasterCarColorEntity } from '../../../src/domain/entities/MasterCarColorEntity';

jest.mock("../../../src/domain/entities/MasterCarColorEntity");

describe("MasterCarColorRepository", () => {
    let repository: MasterCarColorRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        repository = new MasterCarColorRepository();
    });

    it("Create should save and return entity", async () => {
        const mockSave = jest.fn().mockResolvedValue({ id: "1", CarColorNameTh: "ขาว" });
        (MasterCarColorEntity as any).mockImplementation(() => ({ save: mockSave }));

        const result = await repository.create({ CarColorNameTh: "ขาว" });
        expect(mockSave).toHaveBeenCalled();
        expect(result).toEqual({ id: "1", CarColorNameTh: "ขาว" });
    });

    it("FindAll should return all entities", async () => {
        const mockFind = jest.fn().mockResolvedValue([{ id: "1", CarColorNameTh: "ขาว" }]);
        (MasterCarColorEntity as any).find = mockFind;

        const result = await repository.findAll();
        expect(mockFind).toHaveBeenCalled();
        expect(result).toEqual([{ id: "1", CarColorNameTh: "ขาว" }]);
    });

    it("FindById should return entity by id", async () => {
        const mockFindById = jest.fn().mockResolvedValue({ id: "1", CarColorNameTh: "ขาว" });
        (MasterCarColorEntity as any).findById = mockFindById;

        const result = await repository.findById("1");
        expect(mockFindById).toHaveBeenCalledWith("1");
        expect(result).toEqual({ id: "1", CarColorNameTh: "ขาว" });
    });

    it("Update should update and return the entity", async () => {
        const mockFindByIdAndUpdate = jest.fn().mockResolvedValue({ id: "1", CarColorNameTh: "ขาว" });
        (MasterCarColorEntity as any).findByIdAndUpdate = mockFindByIdAndUpdate;

        const result = await repository.update("1", { CarColorNameTh: "ขาว" });
        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith("1", { CarColorNameTh: "ขาว" }, { new: true });
        expect(result).toEqual({ id: "1", CarColorNameTh: "ขาว" });
    });

    it("DeleteOne should delete entity and return it", async () => {
        const mockFindByIdAndDelete = jest.fn().mockResolvedValue({ id: "1", CarColorNameTh: "ขาว" });
        (MasterCarColorEntity as any).findByIdAndDelete = mockFindByIdAndDelete;

        const result = await repository.deleteOne("1");
        expect(mockFindByIdAndDelete).toHaveBeenCalledWith("1");
        expect(result).toEqual({ id: "1", CarColorNameTh: "ขาว" });
    });
});
