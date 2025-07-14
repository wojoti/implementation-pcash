import type { PragmaCashConfig } from './types/pragmacash';
import { getConfigFromEnv } from './env';

// Konfiguracja dla PragmaCash SDK
// Dane mogą być pobierane ze zmiennych środowiskowych lub fallback do wartości domyślnych
export const PRAGMA_CASH_CONFIG: PragmaCashConfig = getConfigFromEnv();

// Konfiguracja SDK scripts
export const SDK_CONFIG = {
  sdkUrl: 'https://pragma-cash-sdk.stage.qa.pragmago.tech/pragma-cash-sdk/pragma-cash-sdk.js',
  widgetUrl: 'https://pragma-cash-sdk.stage.qa.pragmago.tech/pragma-cash-front/pragma-cash-widget.js',
  language: 'pl', // pl, en, cs, ro, sk
} as const;
