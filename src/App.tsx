import { PragmaCashWidget } from './components/PragmaCashWidget';
import { DemoControls } from './components/DemoControls';
import { usePragmaCash } from './hooks/usePragmaCash';
import { PRAGMA_CASH_CONFIG } from './config';
import './App.css';

function App() {
  const {
    widgetData,
    widgetState,
    isLoading,
    error,
    initializeWidget,
    openModal,
    refreshStatus,
    simulateAvailable,
    simulateNoOffer,
    simulateOtherUser,
    simulateError,
  } = usePragmaCash(PRAGMA_CASH_CONFIG);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            PragmaCash SDK - Wariant Zaawansowany
          </h1>
          <p className="text-gray-600">
            Implementacja w React z niestandardowym widgetem
          </p>
        </div>

        {/* Demo Controls */}
        <DemoControls
          onSimulateAvailable={simulateAvailable}
          onSimulateNoOffer={simulateNoOffer}
          onSimulateOtherUser={simulateOtherUser}
          onSimulateError={simulateError}
          onInitializeReal={initializeWidget}
          isLoading={isLoading}
        />

        {/* Widget Container */}
        <div className="flex justify-center">
          <div className="pragma-widget-container">
            <PragmaCashWidget
              widgetData={widgetData}
              widgetState={widgetState}
              isLoading={isLoading}
              error={error}
              onOpenModal={openModal}
              onRefreshStatus={refreshStatus}
              onRetry={initializeWidget}
            />
          </div>
        </div>

        {/* Hidden div required by SDK */}
        <div 
          id="pragmago" 
          data-widget-render="false" 
          data-language="pl" 
          style={{ display: 'none' }}
        />

        {/* Debug Info */}
        {import.meta.env.DEV && (
          <div className="debug-info mt-8">
            <h3>Debug Info:</h3>
            <div className="text-sm space-y-1">
              <p><strong>Stan widgetu:</strong> {widgetState}</p>
              <p><strong>Ładowanie:</strong> {isLoading ? 'Tak' : 'Nie'}</p>
              <p><strong>Błąd:</strong> {error || 'Brak'}</p>
              <details className="mt-2">
                <summary>Dane widgetu</summary>
                <pre>
                  {JSON.stringify(widgetData, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
