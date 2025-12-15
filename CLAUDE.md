# CLAUDE.md - Vraag het Pip

PWA advies-app met wijsheden van Pip de hond. Een persoonlijk verjaardagscadeau voor Pauline.

## Project Info

| Wat | Details |
|-----|---------|
| **Naam** | Vraag het Pip |
| **Type** | PWA (Progressive Web App) |
| **Voor** | Pauline (verjaardag 18 december 2025) |
| **Hosting** | GitHub Pages |
| **Wachtwoord** | Pippeledokus! |

## Over Pip

- Zwartwitte boomer/chihuahua mix
- Levensmaatje van Pauline
- Huilt/loeit bij sirenes
- Haat regen
- Klein maar met grote persoonlijkheid

## Functionaliteit

1. **Dagelijks advies**: Kies uit 3 categorieën (Liefde, Werk, Leven)
2. **Extra trekken**: Onbeperkt extra adviezen als je wilt
3. **Wachtwoordbeveiliging**: Alleen Pauline kan erbij
4. **PWA**: Installeerbaar op telefoon

## Content

- **150 adviezen** (50 per categorie: liefde, werk, leven)
- **23 foto's** van Pip (worden hergebruikt)
- Foto's matchen op seizoen (geen kerstfoto's in zomer)
- Toon: mix van wijs, grappig, lief - met Pip's persoonlijkheid

## Design

### Kleurenpalet (toegankelijk roze)

```css
:root {
  /* Basis roze - zacht/dusty */
  --color-pink-soft: #F8E1E7;      /* Achtergrond */
  --color-pink-medium: #E8A0B0;    /* Accenten */
  --color-pink-bright: #D44D6E;    /* CTA buttons - contrast 4.5:1 op wit */

  /* Pip kleuren */
  --color-black: #1A1A1A;          /* Tekst, Pip's zwart */
  --color-white: #FEFEFE;          /* Wit, Pip's wit */

  /* States */
  --color-focus: #9D174D;          /* Focus ring - hoog contrast */
}
```

### Typography

- Font: System fonts (snel laden)
- Body: 16px minimum
- Touch targets: 44x44px minimum

## Tech Stack

- Vanilla HTML/CSS/JavaScript
- Service Worker voor PWA
- LocalStorage voor state
- Geen framework nodig (simpel houden)

## File Structure

```
Pips_glazen_bol/
├── index.html          # Wachtwoord scherm
├── app.html            # Hoofdapp
├── css/
│   └── style.css
├── js/
│   ├── app.js          # Main app logic
│   ├── data.js         # Adviezen data
│   └── sw.js           # Service Worker
├── images/
│   └── pip/            # Geoptimaliseerde foto's
├── manifest.json
└── Fotos/              # Originele foto's (niet deployen)
```

## Commands

```bash
# Lokaal testen
npx serve .

# Foto's optimaliseren (TODO)
# ...
```

## Agents

Dit project gebruikt expertise van:
- **Wilhelmina** (PWA Specialist) - Service Workers, installatie
- **Judy** (Accessibility Expert) - Contrast, touch targets
- **Susan** (UI Designer) - Visueel design
- **Brenda** (UX Designer) - User flow

## Belangrijke Regels

1. **Geen kerstfoto's in zomer** - Foto's hebben seizoen tags
2. **Toegankelijk roze** - Altijd contrast checken
3. **Mobile first** - Pauline gebruikt vooral telefoon
4. **Simpel houden** - Dit is een cadeau, niet een enterprise app
