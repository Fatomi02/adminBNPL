/* eslint-disable react/prop-types */
import clsx from 'clsx';

function StatusBadge({ status, size = 'default' }) {
  // Get color class based on status
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'verified':
      case 'active':
      case 'completed':
      case 'paid':
        return 'badge-success';
      case 'pending':
      case 'in review':
      case 'processing':
      case 'in progress':
        return 'badge-warning';
      case 'rejected':
      case 'failed':
      case 'flagged':
      case 'overdue':
      case 'declined':
        return 'badge-error';
      default:
        return 'bg-neutral-200 text-neutral-600';
    }
  };
  
  return (
    <span 
      className={clsx(
        'badge', 
        'capitalize',
        getStatusClass(),
        size === 'small' && 'text-xs px-1.5 py-0.5',
        size === 'large' && 'text-sm px-3 py-1.5'
      )}
    >
      {status}
    </span>
  );
}

export default StatusBadge;