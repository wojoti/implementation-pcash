# PragmaCash SDK - Wariant Zaawansowany 🚀

Kompletna implementacja PragmaCash SDK w **React + TypeScript + Vite** zgodnie z **Wariantem Zaawansowanym** dokumentacji. Ta implementacja zapewnia pełną kontrolę nad wyglądem i zachowaniem widgetu poprzez niestandardową strukturę HTML i style.

## ✨ Funkcjonalności

- 🎯 **Wariant Zaawansowany PragmaCash SDK** - pełna kontrola nad widgetem
- 🚀 **Nowoczesny stack** - React 18 + TypeScript + Vite
- 🎨 **Niestandardowy widget** - własne style i animacje
- 📱 **Responsywny design** - działa na wszystkich urządzeniach
- 🔧 **Pełna obsługa stanów** - wszystkie scenariusze z dokumentacji
- 🧪 **Demo mode** - symulacja różnych stanów widgetu
- 🔒 **Type-safe** - kompletne pokrycie TypeScript
- ⚡ **Hot Module Replacement** - szybki development
- 🐛 **Debug panel** - informacje developerskie
- 🌍 **Zmienne środowiskowe** - bezpieczna konfiguracja

## 🎯 Obsługiwane stany widgetu

### 1. 💰 Oferta dostępna (`available: true`)
- Wyświetla dostępną kwotę dla klienta
- Przycisk CTA na podstawie `whereAmI.cta`
- Dodatkowy przycisk "Szczegóły usługi" (landing page)
- Animacje dla wyróżnienia akcji

### 2. ❌ Brak oferty (`noOfferReason`)
- Wyświetla powód braku dostępnej oferty
- Komunikat informacyjny z powodem
- Bez przycisków akcji

### 3. 👥 Inny użytkownik (`otherUserFillsForm: true`)
- Informacja o trwającym procesie wypełniania
- Przycisk "Odśwież status" do sprawdzenia aktualnego stanu
- Automatyczne odświeżanie danych

### 4. 🚫 Błąd inicjalizacji
- Komunikat o błędzie z ikoną
- Przycisk "Spróbuj ponownie"
- Obsługa różnych typów błędów

## 🛠️ Instalacja i uruchomienie

```bash
# Klonowanie projektu
git clone <repository-url>
cd implementation-pcash

# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Build dla produkcji
npm run build

# Preview build
npm run preview
```

## ⚙️ Konfiguracja

### Podstawowa konfiguracja w `src/config.ts`:

```typescript
export const PRAGMA_CASH_CONFIG: PragmaCashConfig = {
  partnerKey: 'TWÓJ_KLUCZ_PARTNERA',
  partnerCustomerId: 'TWÓJ_CUSTOMER_ID',
  customerData: {
    userId: 'ID_UŻYTKOWNIKA',
    returnUrl: 'https://twoja-domena.pl',
    // ... inne dane klienta
  }
};
```

### Bezpieczna konfiguracja przez zmienne środowiskowe:

1. **Skopiuj plik konfiguracyjny:**
```bash
cp .env.example .env
```

2. **Edytuj plik `.env`:**
```env
# Dane partnera z Strefy Partnera PragmaGO
VITE_PRAGMA_PARTNER_KEY=twój_rzeczywisty_klucz
VITE_PRAGMA_CUSTOMER_ID=twój_customer_id

# URL powrotu
VITE_PRAGMA_RETURN_URL=https://twoja-domena.pl

# Dane klienta (opcjonalne)
VITE_PRAGMA_USER_ID=12345
VITE_PRAGMA_FIRST_NAME=Jan
VITE_PRAGMA_LAST_NAME=Kowalski
VITE_PRAGMA_EMAIL=jan@example.com
```

## 🏗️ Architektura projektu

```
src/
├── components/                 # Komponenty React
│   ├── PragmaCashWidget.tsx   # 🎯 Główny komponent widgetu
│   ├── OfferWidget.tsx        # 💰 Widget z dostępną ofertą
│   ├── MessageWidget.tsx      # 📝 Widget z komunikatami
│   ├── ErrorWidget.tsx        # 🚫 Widget błędu
│   └── DemoControls.tsx       # 🎮 Kontrolki demo
├── hooks/
│   └── usePragmaCash.ts       # 🔗 Hook zarządzający SDK
├── types/
│   └── pragmacash.ts          # 📝 Definicje TypeScript
├── utils/
│   └── pragmacash.ts          # 🛠️ Funkcje pomocnicze
├── config.ts                  # ⚙️ Konfiguracja aplikacji
├── env.ts                     # 🌍 Zmienne środowiskowe
├── App.tsx                    # 🏠 Główny komponent
└── index.css                  # 🎨 Style CSS
```

## 🔧 Kluczowe metody SDK

### `initializePragmaCash(partnerKey, partnerCustomerId, customerData)`
Inicjalizuje SDK z danymi partnera i klienta. Zwraca pełne dane do wyświetlenia widgetu.

```typescript
const initResult = await pragmaCash.initializePragmaCash(
  partnerKey,
  partnerCustomerId,
  customerData
);
```

### `openWidgetModal(landingPage?)`
Otwiera modal SDK w różnych trybach:
- `landingPage: true` - otwiera stronę informacyjną
- `landingPage: false` - otwiera aktualny krok wniosku

```typescript
// Otwórz landing page
await pragmaCash.openWidgetModal(true);

// Otwórz formularz wniosku
await pragmaCash.openWidgetModal(false);
```

### `getWidgetData(fetchNew?)`
Pobiera aktualne dane widgetu:
- `fetchNew: true` - pobiera nowe dane z API
- `fetchNew: false` - zwraca zapisany stan

```typescript
const refreshedData = await pragmaCash.getWidgetData(true);
```

### `shouldShowWidget(initialized?)`
Sprawdza czy widget powinien być wyświetlony (opcjonalne - dane już w `initResult`).

## 🎮 Demo i testowanie

Aplikacja zawiera kompletny panel demo do testowania wszystkich stanów:

- **🟢 Oferta dostępna (mock)** - Symuluje dostępną ofertę z kwotą
- **🟡 Brak oferty (mock)** - Symuluje brak dostępnej oferty
- **🔵 Inny użytkownik (mock)** - Symuluje wypełnianie przez innego użytkownika
- **🔴 Błąd (mock)** - Symuluje błąd systemu
- **⚙️ Inicjalizuj SDK (rzeczywiste)** - Rzeczywiste połączenie z API PragmaCash

## 🎨 Customizacja stylów

### Główne kolory (zgodne z PragmaCash):
```css
/* Kolory podstawowe */
--pragma-primary: #2563eb;     /* Niebieski */
--pragma-success: #16a34a;     /* Zielony */
--pragma-warning: #ea580c;     /* Pomarańczowy */
--pragma-danger: #dc2626;      /* Czerwony */

/* Przykład customizacji */
.pragma-offer-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}
```

### Animacje:
```css
/* Pulsująca animacja dla przycisków CTA */
.animate-pulse-custom {
  animation: pulse-custom 1s infinite;
}

@keyframes pulse-custom {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
  }
  70% {
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
}
```

## 📱 Wymagania SDK

Widget wymaga prawidłowego załadowania skryptów PragmaCash SDK w `index.html`:

```html
<!-- Przygotowanie Promise dla SDK -->
<script>
  window.pragmaGoReady = new Promise((resolve) => {
    window.onPragmaGoLoad = () => {
      resolve(window.PragmaGoSDK.PragmaGo);
    };
  });
</script>

<!-- Główne skrypty SDK -->
<script type="module" crossorigin src="https://cdn.pragmago.pl/pragma-cash-sdk/pragma-cash-sdk.js"></script>
<script type="module" crossorigin src="https://cdn.pragmago.pl/pragma-cash-front/pragma-cash-widget.js"></script>

<!-- Ukryty div wymagany przez SDK -->
<div id="pragmago" data-widget-render="false" data-language="pl" style="display: none;"></div>
```

## 🔒 Bezpieczeństwo i produkcja

### ⚠️ Ważne uwagi bezpieczeństwa:

1. **Nigdy nie hardcoduj danych produkcyjnych** w kodzie źródłowym
2. **Używaj zmiennych środowiskowych** dla wrażliwych danych
3. **Partner Key nie powinien być widoczny** w kodzie frontend w produkcji
4. **Rozważ proxy backend** dla wrażliwych operacji

### 🚀 Przygotowanie do produkcji:

```bash
# Build aplikacji
npm run build

# Pliki wyjściowe w folderze 'dist/'
# Skopiuj na serwer i skonfiguruj web server (nginx, apache, etc.)
```

## 🐛 Debugging

### Debug panel (tylko w trybie development):
- Stan widgetu
- Status ładowania  
- Dane JSON z API
- Błędy i logi

### Console logs:
```javascript
// Włącz verbose logging
console.log('Inicjalizacja SDK...');
console.log('Dane inicjalizacyjne:', initResult);
```

## 📋 Lista kompatybilności

- ✅ **React** 18+
- ✅ **TypeScript** 5+
- ✅ **Vite** 7+
- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+

## 📞 Wsparcie i kontakt

Zgodnie z dokumentacją PragmaCash SDK, przed wdrożeniem produkcyjnym konieczne jest:

1. **Zatwierdzenie wyglądu i treści widgetu** z Opiekunem Biznesowym PragmaGO
2. **Testy integracyjne** na środowisku testowym
3. **Weryfikacja konfiguracji** w Strefie Partnera

## 🏆 Dodatkowe funkcjonalności

- 🔄 **Auto-refresh** statusu dla stanu "inny użytkownik"
- 🎭 **Graceful fallbacks** przy błędach
- ⚡ **Lazy loading** komponentów
- 🧪 **Unit tests ready** struktura
- 📊 **Analytics hooks** gotowe do integracji
- 🌐 **i18n ready** dla wielu języków

## 📄 Licencja

Ten projekt jest implementacją przykładową zgodną z warunkami licencji PragmaCash SDK. 
Należy przestrzegać warunków użytkowania dostarczonych przez PragmaGO.

---

**Implementacja przygotowana zgodnie z dokumentacją Wariantu Zaawansowanego PragmaCash SDK** 🎯
