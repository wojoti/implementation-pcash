interface ErrorWidgetProps {
  error?: string | null;
  onRetry?: () => Promise<void>;
}

export const ErrorWidget: React.FC<ErrorWidgetProps> = ({ error, onRetry }) => {
  return (
    <div className="pragma-error-card border-l-4 border-red-500">
      {/* Ikona błędu */}
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <svg 
            className="h-6 w-6 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        <h3 className="ml-3 text-xl font-semibold text-red-800">
          Wystąpił błąd
        </h3>
      </div>

      {/* Opis błędu */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          {error || 'Nie udało się załadować widgetu PragmaCash'}
        </p>
      </div>

      {/* Przycisk ponownej próby */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-base btn-danger"
        >
          Spróbuj ponownie
        </button>
      )}
    </div>
  );
};
