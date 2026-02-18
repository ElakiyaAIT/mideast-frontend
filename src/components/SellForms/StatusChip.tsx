import React from 'react';
interface ConditionPillProps {
  label: string;
  status: 'good' | 'fair' | 'bad';
}

export const ConditionPill: React.FC<ConditionPillProps> = ({ label, status }) => {
  const getStyles = () => {
    switch (status) {
      case 'good':
        return {
          wrapper: 'bg-green-100 text-green-700',
          circle: 'bg-green-500 text-white',
          icon: 'check',
        };
      case 'fair':
        return {
          wrapper: 'bg-yellow-100 text-yellow-700',
          circle: 'bg-yellow-500 text-white',
          icon: 'priority_high',
        };
      case 'bad':
        return {
          wrapper: 'bg-red-100 text-red-700',
          circle: 'bg-red-500 text-white',
          icon: 'close',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${styles.wrapper}`}
    >
      {/* Icon Circle */}
      <div className={`flex h-5 w-5 items-center justify-center rounded-full ${styles.circle}`}>
        <span className='material-symbols-outlined !text-[14px]'>{styles.icon}</span>
      </div>

      {label}
    </div>
  );
};
