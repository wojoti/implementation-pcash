import type { PragmaCashConfig } from './types/pragmacash';

/**
 * Konfiguracja z zmiennych środowiskowych lub fallback do wartości domyślnych
 */
export const getConfigFromEnv = (): PragmaCashConfig => {
  return {
    partnerKey: import.meta.env.VITE_PRAGMA_PARTNER_KEY || 'xxx',
    partnerCustomerId: import.meta.env.VITE_PRAGMA_CUSTOMER_ID || 'xxx',
    customerData: {
      userId: import.meta.env.VITE_PRAGMA_USER_ID || '32145',
      returnUrl: import.meta.env.VITE_PRAGMA_RETURN_URL || 'https://panel.pragmago.pl',
      firstName: import.meta.env.VITE_PRAGMA_FIRST_NAME || 'Test',
      lastName: import.meta.env.VITE_PRAGMA_LAST_NAME || 'Testowy',
      email: import.meta.env.VITE_PRAGMA_EMAIL || 'test.mail@pragmago.pl',
      phone: {
        prefix: import.meta.env.VITE_PRAGMA_PHONE_PREFIX || '+48',
        number: import.meta.env.VITE_PRAGMA_PHONE_NUMBER || '45512444'
      },
      registrationNumber: {
        country: import.meta.env.VITE_PRAGMA_REGISTRATION_COUNTRY || 'PL',
        registrationNumber: import.meta.env.VITE_PRAGMA_REGISTRATION_NUMBER || 'PL123123123'
      },
      identificationNumber: import.meta.env.VITE_PRAGMA_IDENTIFICATION_NUMBER || '42142141',
      identityDocument: {
        type: (import.meta.env.VITE_PRAGMA_IDENTITY_TYPE as 'idCard' | 'passport' | 'drivingLicense') || 'idCard',
        number: import.meta.env.VITE_PRAGMA_IDENTITY_NUMBER || 'ZZC314412'
      },
      checksum: null,
    }
  };
};
