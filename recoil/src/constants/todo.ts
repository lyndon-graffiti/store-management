export enum FilterValue {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}

export const TODO_FILTERS = [
    {
        name: FilterValue.All,
        label: '所有项目',
    },
    {
        name: FilterValue.Active,
        label: '未完成',
    },
    {
        name: FilterValue.Completed,
        label: '已完成',
    },
]