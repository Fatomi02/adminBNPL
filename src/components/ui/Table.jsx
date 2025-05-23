/* eslint-disable react/prop-types */
import { useState } from 'react';
import StatusBadge from './StatusBadge';

function Table({ columns, data, pagination = true, onRowClick, isLoading = false }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = pagination 
    ? data.slice(startIndex, startIndex + rowsPerPage) 
    : data;
  
  // Handle row click if prop provided
  const handleRowClick = (item) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-neutral-200 rounded"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-neutral-100 rounded"></div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-neutral-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, rowIndex) => (
              <tr 
                key={item.id || rowIndex}
                className={onRowClick ? "hover:bg-neutral-50 cursor-pointer" : ""}
                onClick={() => handleRowClick(item)}
              >
                {columns.map((column) => (
                  <td
                    key={`${item.id || rowIndex}-${column.key}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800"
                  >
                    {column.render 
                      ? column.render(item)
                      : column.key === 'status' 
                        ? <StatusBadge status={item[column.key]} /> : (column.key === 'createdAt' || column.key === 'date') ?
                          new Date(item[column.key]).toLocaleDateString()
                        : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-6 py-4 text-center text-sm text-neutral-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {pagination && totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-700">
                Showing <span className="font-medium">{startIndex + 1}</span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(startIndex + rowsPerPage, data.length)}
                </span>{' '}
                of <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === index + 1
                        ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                        : 'bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;