// Typy dla PragmaCash SDK

export interface PragmaCashCustomerData {
  userId: string;
  returnUrl: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: {
    prefix: string;
    number: string;
  };
  registrationNumber?: {
    country: string;
    registrationNumber: string;
  };
  identificationNumber?: string;
  identityDocument?: {
    type: 'idCard' | 'passport' | 'drivingLicense';
    number: string;
  };
  bankAccount?: {
    iban: string;
    swift: string;
    currency?: string;
  };
  checksum?: string | null;
}

export interface PragmaCashValue {
  amount: string;
  currency: string;
}

export interface PragmaCashWhereAmI {
  formId: string | null;
  step: string;
  cta: 'START_PROPOSAL' | 'GO_TO_PROPOSAL' | 'FINISH_PROPOSAL' | 'WAITING_FOR_DECISION' | 'CONTINUE_SIGNING';
  stepData?: Record<string, unknown>;
}

export interface PragmaCashForceOpenPopup {
  force: boolean;
  variant: 'GO_TO_FORM' | 'EXPIRED' | 'EXPIRED_ALLOW_NEW' | 'START_FORM' | '';
}

export interface PragmaCashInitResponse {
  value?: PragmaCashValue;
  available: boolean;
  valueType?: string;
  noOfferReason?: string | null;
  otherUserFillsForm?: boolean;
  forceOpenPopup?: PragmaCashForceOpenPopup;
  whereAmI?: PragmaCashWhereAmI;
  notInitialized?: boolean; // tylko dla demo
}

export interface PragmaCashConfig {
  partnerKey: string;
  partnerCustomerId: string;
  customerData: PragmaCashCustomerData;
}

export interface PragmaCashSDK {
  initializePragmaCash(
    partnerKey: string, 
    partnerCustomerId: string, 
    customerData: PragmaCashCustomerData
  ): Promise<PragmaCashInitResponse>;
  
  shouldShowWidget(initialized?: boolean): Promise<boolean>;
  
  openWidgetModal(landingPage?: boolean): Promise<boolean | string>;
  
  getWidgetData(fetchNew?: boolean): Promise<{
    success: boolean;
    data: PragmaCashInitResponse;
  }>;
}

export interface PragmaGoSDK {
  PragmaGo: {
    getInstance(): PragmaCashSDK;
  };
}

declare global {
  interface Window {
    pragmaGoReady: Promise<{ getInstance(): PragmaCashSDK }>;
    onPragmaGoLoad?: () => void;
    PragmaGoSDK?: PragmaGoSDK;
  }
}

export type WidgetState = 'loading' | 'available' | 'no-offer' | 'other-user' | 'error';

export type MessageType = 'no-offer' | 'other-user';
