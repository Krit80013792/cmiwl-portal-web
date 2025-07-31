export function mapResourcesToMenu(resources: any[]) {
    return [
        {
            label: 'MENU',
            items: resources.map(resource => ({
                label: resource.resourceLabel,
                icon: resource.resourceIcon,
                to: resource.resourcePathTo
            }))
        }
    ];
};
