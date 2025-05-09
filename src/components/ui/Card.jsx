import clsx from 'clsx';

function Card({ children, title, subtitle, className, footer, icon: Icon }) {
  return (
    <div className={clsx('card', className)}>
      {(title) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            {Icon && (
              <div className="mr-3 p-2 rounded-md bg-primary-50 text-primary-500">
                <Icon size={20} />
              </div>
            )}
            <div>
              {title && <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>}
              {subtitle && <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      
      <div>{children}</div>
      
      {footer && <div className="mt-4 pt-4 border-t border-neutral-200">{footer}</div>}
    </div>
  );
}

export default Card;