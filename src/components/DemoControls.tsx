interface DemoControlsProps {
  onSimulateAvailable: () => void;
  onSimulateNoOffer: () => void;
  onSimulateOtherUser: () => void;
  onSimulateError: () => void;
  onInitializeReal: () => Promise<void>;
  isLoading: boolean;
}

export const DemoControls: React.FC<DemoControlsProps> = ({
  onSimulateAvailable,
  onSimulateNoOffer,
  onSimulateOtherUser,
  onSimulateError,
  onInitializeReal,
  isLoading,
}) => {
  return (
    <div className="card mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Demo - Symulacja różnych stanów
      </h2>
      
      <div className="demo-buttons">
        <button
          onClick={onSimulateAvailable}
          disabled={isLoading}
          className="btn-base btn-success"
        >
          Oferta dostępna (mock)
        </button>
        
        <button
          onClick={onSimulateNoOffer}
          disabled={isLoading}
          className="btn-base btn-warning"
        >
          Brak oferty (mock)
        </button>
        
        <button
          onClick={onSimulateOtherUser}
          disabled={isLoading}
          className="btn-base btn-primary"
        >
          Inny użytkownik (mock)
        </button>
        
        <button
          onClick={onSimulateError}
          disabled={isLoading}
          className="btn-base btn-danger"
        >
          Błąd (mock)
        </button>
        
        <button
          onClick={onInitializeReal}
          disabled={isLoading}
          className="btn-base btn-dark"
          style={{ gridColumn: 'span 2' }}
        >
          {isLoading ? 'Ładowanie...' : 'Inicjalizuj SDK (rzeczywiste)'}
        </button>
      </div>
      
      <div className="mt-4" style={{ padding: '0.75rem', backgroundColor: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '0.375rem' }}>
        <p className="text-sm text-blue-800">
          <strong>Instrukcja:</strong> Użyj przycisków powyżej do testowania różnych stanów widgetu. 
          Przycisk "Inicjalizuj SDK" wykonuje rzeczywiste połączenie z API PragmaCash.
        </p>
      </div>
    </div>
  );
};
