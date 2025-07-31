export interface ResourceDTO extends Document {
    id: string; //* MongoDB ObjectId
    resourceId: string; //* uuid
    resourceOrder: number;
    resourceName: string;
    resourcePolicy: string;
    resourceDescription: string;
    resourceLabel: string;
    resourceIcon: string;
    resourcePathTo: string; //* Path to the resource, e.g., '/users'
    childrenItems: ResourceDTO[]; //* Array of child resources
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};
