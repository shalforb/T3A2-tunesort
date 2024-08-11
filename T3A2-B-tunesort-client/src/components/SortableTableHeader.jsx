import React from 'react';

const SortableTableHeader = ({ label, sortKey, sortConfig, requestSort }) => {
    const isActive = sortConfig.key === sortKey;
    const direction = sortConfig.direction === 'ascending' ? '▲' : '▼';

    return (
        <th 
            onClick={() => requestSort(sortKey)} 
            className={`p-2 cursor-pointer ${isActive ? 'bg-gray-200 font-bold' : ''}`}
        >
            <div className="flex items-center">
                <span>{label}</span>
                <span className={`ml-2 ${isActive ? '' : 'opacity-50'}`}>
                    {direction}
                </span>
            </div>
        </th>
    );
};

export default SortableTableHeader;
