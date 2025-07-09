import { useState, useEffect, useCallback } from 'react';
import type { 
  PragmaCashConfig, 
  PragmaCashInitResponse, 
  PragmaCashSDK, 
  WidgetState 
} from '../types/pragmacash';

interface UsePragmaCashReturn {
  widgetData: PragmaCashInitResponse | null;
  widgetState: WidgetState;
  isLoading: boolean;
  error: string | null;
  initializeWidget: () => Promise<void>;
  openModal: (landingPage?: boolean) => Promise<void>;
  refreshStatus: () => Promise<void>;
  simulateAvailable: () => void;
  simulateNoOffer: () => void;
  simulateOtherUser: () => void;
  simulateError: () => void;
}

export const usePragmaCash = (config: PragmaCashConfig): UsePragmaCashReturn => {
  const [widgetData, setWidgetData] = useState<PragmaCashInitResponse | null>(null);
  const [widgetState, setWidgetState] = useState<WidgetState>('loading');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Funkcja do determinowania stanu widgetu na podstawie danych
  const determineWidgetState = useCallback((data: PragmaCashInitResponse | null): WidgetState => {
    if (!data) return 'error';
    
    if (data.available === true) {
      return 'available';
    } else if (data.noOfferReason) {
      return 'no-offer';
    } else if (data.otherUserFillsForm === true) {
      return 'other-user';
    } else {
      return 'error';
    }
  }, []);

  // Inicjalizacja widgetu z rzeczywistymi danymi
  const initializeWidget = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Sprawdź czy SDK jest dostępny
      if (!window.pragmaGoReady) {
        throw new Error('PragmaCash SDK nie jest załadowany');
      }

      const PragmaGo = await window.pragmaGoReady;
      const pragmaCash: PragmaCashSDK = PragmaGo.getInstance();

      console.log('Inicjalizacja PragmaCash SDK...');

      // Inicjalizacja SDK z rzeczywistymi danymi
      const initResult = await pragmaCash.initializePragmaCash(
        config.partnerKey,
        config.partnerCustomerId,
        config.customerData
      );

      console.log('Dane inicjalizacyjne:', initResult);

      setWidgetData(initResult);
      setWidgetState(determineWidgetState(initResult));

    } catch (err) {
      console.error('Błąd inicjalizacji SDK:', err);
      setError(err instanceof Error ? err.message : 'Nieznany błąd');
      setWidgetState('error');
    } finally {
      setIsLoading(false);
    }
  }, [config, determineWidgetState]);

  // Otwieranie modala
  const openModal = useCallback(async (landingPage: boolean = false) => {
    if (!window.pragmaGoReady) {
      throw new Error('PragmaCash SDK nie jest załadowany');
    }

    try {
      const PragmaGo = await window.pragmaGoReady;
      const pragmaCash: PragmaCashSDK = PragmaGo.getInstance();

      const result = await pragmaCash.openWidgetModal(landingPage);

      if (result !== true && result !== 'Data sent to widget') {
        console.warn('Widget modal result:', result);
      }

    } catch (err) {
      console.error('Błąd otwierania modala:', err);
      throw err;
    }
  }, []);

  // Odświeżanie statusu widgetu
  const refreshStatus = useCallback(async () => {
    if (!window.pragmaGoReady) return;

    try {
      const PragmaGo = await window.pragmaGoReady;
      const pragmaCash: PragmaCashSDK = PragmaGo.getInstance();

      const refreshedData = await pragmaCash.getWidgetData(true);

      if (refreshedData.success) {
        setWidgetData(refreshedData.data);
        setWidgetState(determineWidgetState(refreshedData.data));
      }

    } catch (err) {
      console.error('Błąd odświeżania statusu:', err);
    }
  }, [determineWidgetState]);

  // Funkcje symulacji różnych stanów (do celów demonstracyjnych)
  const simulateAvailable = useCallback(() => {
    const mockData: PragmaCashInitResponse = {
      available: true,
      notInitialized: true, // dla demo
      value: { amount: "25000.00", currency: "PLN" },
      whereAmI: { 
        formId: null,
        step: "CALCULATOR",
        cta: "START_PROPOSAL" 
      }
    };
    setWidgetData(mockData);
    setWidgetState(determineWidgetState(mockData));
  }, [determineWidgetState]);

  const simulateNoOffer = useCallback(() => {
    const mockData: PragmaCashInitResponse = {
      available: false,
      noOfferReason: "Brak wystarczającego limitu kredytowego"
    };
    setWidgetData(mockData);
    setWidgetState(determineWidgetState(mockData));
  }, [determineWidgetState]);

  const simulateOtherUser = useCallback(() => {
    const mockData: PragmaCashInitResponse = {
      available: false,
      otherUserFillsForm: true
    };
    setWidgetData(mockData);
    setWidgetState(determineWidgetState(mockData));
  }, [determineWidgetState]);

  const simulateError = useCallback(() => {
    setWidgetData(null);
    setWidgetState('error');
    setError('Symulowany błąd');
  }, []);

  // Automatyczne wyświetlenie demo przy pierwszym załadowaniu
  useEffect(() => {
    simulateAvailable();
  }, [simulateAvailable]);

  return {
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
  };
};
