/* eslint-disable react/prop-types */
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import clsx from 'clsx';
import Card from './Card';

function StatsCard({ title, value, changePercent = null, icon: Icon, trend = 'none' }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-neutral-500 text-sm font-medium">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-800">{value}</p>
          
          {changePercent !== null && (
            <div className={clsx(
              "flex items-center mt-2 text-sm",
              trend === 'up' && 'text-success-600',
              trend === 'down' && 'text-error-600',
              trend === 'none' && 'text-neutral-500'
            )}>
              {trend === 'up' && <FiArrowUp className="mr-1" />}
              {trend === 'down' && <FiArrowDown className="mr-1" />}
              <span>{changePercent}% from last period</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="p-3 rounded-lg bg-primary-50 text-primary-500">
            <Icon size={24} />
          </div>
        )}
      </div>
      
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-32 h-32 -mb-8 -mr-8 rounded-full bg-primary-500/5"></div>
    </Card>
  );
}

export default StatsCard;