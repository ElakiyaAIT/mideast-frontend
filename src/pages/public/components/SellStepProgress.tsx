interface Step {
  id: number;
  icon: string;
  label: string;
}

interface SellStepProgressProps {
  steps: Step[];
  currentStep: number;
}

export const SellStepProgress = ({ steps, currentStep }: SellStepProgressProps) => {
  return (
    <div className="rounded-t-3xl border-b border-slate-200 bg-[#DE9A4F33] p-8 dark:border-slate-700 dark:bg-slate-900/50">
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex min-w-max items-center justify-start gap-8 sm:min-w-0 sm:justify-between sm:gap-0">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-shrink-0 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    index <= currentStep
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-black text-white dark:bg-slate-700'
                  }`}
                >
                  <i className="material-icons">{step.icon}</i>
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    index <= currentStep ? 'text-primary' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center px-6">
                  <div
                    className={`h-[2px] w-10 ${
                      index < currentStep ? 'bg-primary' : 'bg-slate-400 dark:bg-slate-600'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
