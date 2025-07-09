/**
 * Mapuje CTA (Call To Action) na odpowiedni tekst przycisku
 */
export const getCtaButtonText = (cta: string | undefined): string => {
  const ctaTexts: Record<string, string> = {
    'START_PROPOSAL': 'Sprawdź ofertę',
    'GO_TO_PROPOSAL': 'Przejdź do wniosku',
    'FINISH_PROPOSAL': 'Dokończ wniosek',
    'WAITING_FOR_DECISION': 'Sprawdź status',
    'CONTINUE_SIGNING': 'Kontynuuj podpisywanie'
  };

  return ctaTexts[cta || 'START_PROPOSAL'] || 'Zobacz szczegóły';
};

/**
 * Określa czy przycisk powinien być wyróżniony animacją
 */
export const shouldHighlightButton = (cta: string | undefined): boolean => {
  const highlightCtas = ['START_PROPOSAL', 'FINISH_PROPOSAL', 'CONTINUE_SIGNING'];
  return highlightCtas.includes(cta || '');
};

/**
 * Formatuje kwotę z walidacją
 */
export const formatAmount = (amount: string | undefined, currency: string | undefined): string => {
  if (!amount || !currency) return '0 PLN';
  
  // Sprawdź czy amount jest liczbą
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) return '0 PLN';
  
  // Formatuj kwotę z separatorami tysięcy
  const formattedAmount = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
  
  return `${formattedAmount} ${currency}`;
};
