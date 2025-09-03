import React from 'react'

type ColumnConfig<T> = {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
    data: T[];
    columns: ColumnConfig<T>[];
};


export function AdminTable<T>({ data, columns }: TableProps<T>) {
    function getNestedValue(obj: any, path: string) {
        return path.split('.').reduce((acc, part) => acc?.[part], obj);
    }

    return (
        <>
            <div className={`table-header-row grid grid-cols-${columns.length}`}>
                {columns.map((col, index) => (
                    <div className="header-cell py-3 px-4 border-b border-slate-200 bg-gray-100" key={`header-${index}`}>
                        <p className='text-slate-900 text-sm font-medium leading-5 text-center'>{col.header}</p>
                    </div>
                ))}
            </div>
            <div className="table-content">
                {data.length === 0 ? (
                    <div className="not-found-info w-full rounded-[12px] border border-slate-200 py-6">
                        <p className='text-slate-900 text-lg font-medium leading-6 text-center'>no article found</p>
                    </div>
                ) : (data.map((row, rowIndex) => (
                    <div className={`table-content-row grid grid-cols-${columns.length}`} key={`content-row-${rowIndex}`}>
                        {
                            columns.map((col, index) => (
                                <div className={`content-cell py-3 px-4 border-b border-slate-200 bg-white flex justify-center items-center ${col.key === "actions" ? "space-x-3" : ""} h-[84px]`} key={`column-${rowIndex}-${index}`}>
                                    {col.render
                                        ? col.render(row)
                                        : getNestedValue(row, col.key)}
                                </div>
                            ))
                        }
                    </div>
                )))}
            </div >
        </>
    )
}

export default AdminTable
