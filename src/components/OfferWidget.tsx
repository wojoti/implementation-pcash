import { useState } from 'react';
import type { PragmaCashInitResponse } from '../types/pragmacash';
import { getCtaButtonText, shouldHighlightButton, formatAmount } from '../utils/pragmacash';

interface OfferWidgetProps {
  data: PragmaCashInitResponse;
  onOpenModal: (landingPage?: boolean) => Promise<void>;
}

export const OfferWidget: React.FC<OfferWidgetProps> = ({ data, onOpenModal }) => {
  const [isLoadingMain, setIsLoadingMain] = useState(false);
  const [isLoadingLanding, setIsLoadingLanding] = useState(false);

  const ctaText = getCtaButtonText(data.whereAmI?.cta);
  const shouldHighlight = shouldHighlightButton(data.whereAmI?.cta);
  const formattedAmount = formatAmount(data.value?.amount, data.value?.currency);

  const handleMainAction = async () => {
    setIsLoadingMain(true);
    try {
      await onOpenModal(false);
    } catch (error) {
      console.error('Błąd otwierania głównego modala:', error);
    } finally {
      setIsLoadingMain(false);
    }
  };

  const handleLandingAction = async () => {
    setIsLoadingLanding(true);
    try {
      await onOpenModal(true);
    } catch (error) {
      console.error('Błąd otwierania landing page:', error);
    } finally {
      setIsLoadingLanding(false);
    }
  };

  return (
    <div className="pragma-offer-card">
      {/* Header z badżem */}
      <div className="mb-4">
        {data.notInitialized && (
          <span className="pragma-offer-badge pragma-badge-warning mb-2" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Not initialized
          </span>
        )}
        <span className="pragma-offer-badge">
          Oferta dla Ciebie
        </span>
        <h3 className="text-xl font-semibold text-gray-800 mt-2">
          PragmaCash
        </h3>
      </div>

      {/* Sekcja kwoty */}
      <div className="pragma-amount-section">
        <p className="text-sm text-gray-600 mb-2">
          Dostępna kwota:
        </p>
        <p className="text-2xl font-bold text-primary-600">
          {formattedAmount}
        </p>
      </div>

      {/* Przyciski akcji */}
      <div className="space-y-3">
        <button
          onClick={handleLandingAction}
          disabled={isLoadingLanding}
          className="btn-base btn-primary"
        >
          {isLoadingLanding ? 'Ładowanie...' : 'Szczegóły usługi'}
        </button>

        <button
          onClick={handleMainAction}
          disabled={isLoadingMain}
          className={`btn-base btn-primary ${shouldHighlight ? 'animate-pulse-custom' : ''}`}
        >
          {isLoadingMain ? 'Ładowanie...' : ctaText}
        </button>
      </div>
    </div>
  );
};
