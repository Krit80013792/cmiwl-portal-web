import { Document } from 'mongoose';

export interface IResource extends Document {
    _id: string; //* MongoDB ObjectId
    sResourceId: string; //* uuid
    nResourceOrder: number
    sResourceName: string;
    sResourcePolicy: string; //* e.g., 'public', 'private', 'protected'
    sResourceDescription: string;
    sResourceLabel: string;
    sResourceIcon: string;
    sResourcePathTo: string; //* Path to the resource, e.g., '/users'
    arChildrenItems: IResource[]; //* Array of child resources
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};
