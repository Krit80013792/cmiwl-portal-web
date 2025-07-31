import mongoose, { Schema } from 'mongoose';
import { IResource } from '../models/ResourceModel';

const ResourcesSchema: Schema = new Schema(
    {
        sResourceId: { type: String, required: true, unique: true }, //* uuid
        nResourceOrder: { type: Number, required: true, default: 0 },
        sResourceName: { type: String, required: true },
        sResourcePolicy: { type: String, required: true }, //* e.g., 'public', 'private', 'protected'
        sResourceDescription: { type: String, required: false, default: '' },
        sResourceLabel: { type: String, required: true },
        sResourceIcon: { type: String, required: true },
        sResourcePathTo: { type: String, required: true },
        arChildrenItems: [{ type: [], ref: 'CMSResources' }], //* Array of child resources
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'CMSResources',
    }
);

export const ResourcesEntity = mongoose.models.CMSResources || mongoose.model<IResource>('CMSResources', ResourcesSchema);
