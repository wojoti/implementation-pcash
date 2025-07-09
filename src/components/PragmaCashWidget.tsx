import type { PragmaCashInitResponse, WidgetState } from '../types/pragmacash';
import { OfferWidget } from './OfferWidget';
import { MessageWidget } from './MessageWidget';
import { ErrorWidget } from './ErrorWidget';

interface PragmaCashWidgetProps {
  widgetData: PragmaCashInitResponse | null;
  widgetState: WidgetState;
  isLoading: boolean;
  error: string | null;
  onOpenModal: (landingPage?: boolean) => Promise<void>;
  onRefreshStatus: () => Promise<void>;
  onRetry: () => Promise<void>;
}

export const PragmaCashWidget: React.FC<PragmaCashWidgetProps> = ({
  widgetData,
  widgetState,
  isLoading,
  error,
  onOpenModal,
  onRefreshStatus,
  onRetry,
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="pragma-offer-card">
        <div className="animate-pulse">
          <div className="flex items-center mb-4">
            <div className="h-6 w-20 bg-gray-200" style={{ borderRadius: '0.25rem' }}></div>
          </div>
          <div className="h-8 w-32 bg-gray-200 mb-4" style={{ borderRadius: '0.25rem' }}></div>
          <div className="bg-gray-100" style={{ padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <div className="h-4 w-24 bg-gray-200 mb-2" style={{ borderRadius: '0.25rem' }}></div>
            <div className="h-8 w-28 bg-gray-200" style={{ borderRadius: '0.25rem' }}></div>
          </div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-200" style={{ borderRadius: '0.5rem' }}></div>
            <div className="h-12 bg-gray-200" style={{ borderRadius: '0.5rem' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Render widget based on state
  switch (widgetState) {
    case 'available':
      if (!widgetData) return <ErrorWidget error="Brak danych widgetu" onRetry={onRetry} />;
      return <OfferWidget data={widgetData} onOpenModal={onOpenModal} />;

    case 'no-offer':
      if (!widgetData) return <ErrorWidget error="Brak danych widgetu" onRetry={onRetry} />;
      return (
        <MessageWidget 
          data={widgetData} 
          messageType="no-offer" 
        />
      );

    case 'other-user':
      if (!widgetData) return <ErrorWidget error="Brak danych widgetu" onRetry={onRetry} />;
      return (
        <MessageWidget 
          data={widgetData} 
          messageType="other-user" 
          onRefreshStatus={onRefreshStatus}
        />
      );

    case 'error':
    default:
      return <ErrorWidget error={error} onRetry={onRetry} />;
  }
};
