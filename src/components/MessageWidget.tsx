import type { PragmaCashInitResponse, MessageType } from '../types/pragmacash';

interface MessageWidgetProps {
  data: PragmaCashInitResponse;
  messageType: MessageType;
  onRefreshStatus?: () => Promise<void>;
}

export const MessageWidget: React.FC<MessageWidgetProps> = ({ 
  data, 
  messageType, 
  onRefreshStatus 
}) => {
  const showRefreshButton = messageType === 'other-user';

  const getMessageContent = () => {
    switch (messageType) {
      case 'no-offer':
        return {
          title: 'Brak dostępnej oferty',
          description: data.noOfferReason || 'Obecnie nie mamy dla Ciebie dostępnej oferty.',
          badgeText: 'Informacja',
          badgeClass: 'pragma-badge-warning'
        };
      case 'other-user':
        return {
          title: 'Formularz w trakcie wypełniania',
          description: 'Wniosek jest obecnie wypełniany przez inną osobę z Twojej firmy.',
          badgeText: 'W trakcie',
          badgeClass: 'pragma-badge-info'
        };
      default:
        return {
          title: 'Informacja',
          description: 'Brak dostępnych informacji.',
          badgeText: 'Info',
          badgeClass: ''
        };
    }
  };

  const messageContent = getMessageContent();

  return (
    <div className="pragma-offer-card">
      {/* Header z badżem */}
      <div className="mb-4">
        <span className={`pragma-offer-badge ${messageContent.badgeClass}`}>
          {messageContent.badgeText}
        </span>
        <h3 className="text-xl font-semibold text-gray-800 mt-2">
          PragmaCash
        </h3>
      </div>

      {/* Sekcja wiadomości */}
      <div className={`pragma-message-section ${messageType === 'no-offer' ? 'pragma-message-warning' : 'pragma-message-info'}`}>
        <h4 className="text-lg font-medium text-gray-800 mb-2">
          {messageContent.title}
        </h4>
        <p className="text-sm text-gray-600">
          {messageContent.description}
        </p>
      </div>

      {/* Przycisk odświeżania (tylko dla other-user) */}
      {showRefreshButton && onRefreshStatus && (
        <button
          onClick={onRefreshStatus}
          className="btn-base btn-secondary mt-3"
        >
          Odśwież status
        </button>
      )}
    </div>
  );
};
