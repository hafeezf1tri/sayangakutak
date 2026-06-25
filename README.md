# Sayang Aku Tak?

A small Next.js page with a playful "Sayang aku tak?" prompt. The page asks the user to pick an answer, makes the "Tak" button dodge the pointer.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/base-nova styling setup
- Base UI button primitive
- lucide-react icons
- Vercel Analytics in production

## How To Run

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

Build for production:

```bash
pnpm build
```

Run the production build locally:

```bash
pnpm start
```

Run linting:

```bash
pnpm lint
```

## Project Structure

```text
app/
  globals.css        Global Tailwind imports, theme tokens, and animations
  layout.tsx         Root document layout, fonts, metadata, icons, analytics
  page.tsx           Home route entry point
components/
  floating-hearts.tsx
  sayang-prompt.tsx
  ui/
    button.tsx
lib/
  utils.ts
public/
  icons and placeholder assets
```

## Page Composition

### `app/page.tsx`

This is the home route. It does not contain page logic itself; it simply renders the main interactive component:

```tsx
import { SayangPrompt } from "@/components/sayang-prompt"

export default function Page() {
  return <SayangPrompt />
}
```

### `app/layout.tsx`

The root layout wraps every route in the app. It is responsible for:

- Loading Geist Sans and Geist Mono through `next/font/google`
- Importing `app/globals.css`
- Setting the site metadata, title, description, generator, and icons
- Setting viewport theme color
- Rendering Vercel Analytics only in production

### `components/sayang-prompt.tsx`

This is the main page component and contains the user interaction.

Key responsibilities:

- Marks itself as a client component with `"use client"`
- Tracks the current screen with `stage`
- Tracks the moving "Tak" button position with `dodge`
- Tracks how many times the user has tried to press "Tak" with `dodgeCount`
- Renders the centered prompt card
- Renders the success/gotcha card after the user clicks "Ya, saya sayanggggg"
- Resets the interaction after 2.6 seconds

Important state:

```ts
type Stage = "asking" | "tipu"

const [stage, setStage] = useState<Stage>("asking")
const [dodge, setDodge] = useState({ x: 0, y: 0 })
const [dodgeCount, setDodgeCount] = useState(0)
```

Important behavior:

- `runAway()` randomly moves the "Tak" button by changing its `translate(x, y)` style.
- `pickSayang()` switches to the `"tipu"` stage, then resets the prompt after a timeout.
- `onMouseEnter`, `onClick`, and `onTouchStart` all trigger `runAway()` for the "Tak" button.

### `components/floating-hearts.tsx`

This client component renders the animated background hearts.

Key responsibilities:

- Creates randomized heart positions, sizes, durations, delays, and opacities
- Runs that random generation inside `useEffect`
- Avoids server/client hydration mismatches by generating hearts only in the browser
- Uses the `Heart` icon from `lucide-react`
- Relies on the `.animate-float-up` class from `app/globals.css`

The default number of hearts is `14`, but it can be changed:

```tsx
<FloatingHearts count={20} />
```

### `components/ui/button.tsx`

This is the reusable button wrapper used by the prompt.

Key responsibilities:

- Builds on `@base-ui/react/button`
- Uses `class-variance-authority` for button variants and sizes
- Uses the local `cn()` helper to merge Tailwind classes safely
- Supports variants such as `default`, `secondary`, `outline`, `ghost`, `destructive`, and `link`
- Supports sizes such as `default`, `xs`, `sm`, `lg`, and icon sizes

In the page, it is used for both prompt answers:

- Primary/default button: `Ya, saya sayanggggg`
- Secondary button: moving `Tak` answer

### `lib/utils.ts`

This file exports the `cn()` helper:

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

It combines conditional class names with `clsx`, then resolves Tailwind conflicts with `tailwind-merge`.

## Styling And Animation

### `app/globals.css`

This file contains:

- Tailwind CSS import
- `tw-animate-css` import
- shadcn Tailwind import
- Theme tokens for colors, radius, fonts, and UI primitives
- Light and dark color variables
- Base body/html styles
- Custom keyframe animations

Current color palette:

| Name | Hex | CSS Variable | Usage |
| --- | --- | --- | --- |
| Venus | `#BAD6EB` | `--primary` | Primary highlight color, borders, button, heart color |
| Galaxy | `#081F5C` | `--background` | Main page background |
| Universe | `#7096D1` | `--accent` | Secondary blue and alternate button color |
| Planetary | `#334EAC` | `--planetary` | Gradient tail and stronger blue accents |
| Milky Way | `#FFF9F0` | `--foreground` | Main text color |
| Sky | `#D0E3FF` | `--sky` | Subtle highlights and hover color |
| Meteor | `#F7F2EB` | `--meteor` | Light neutral support color |

Custom animations:

- `float-up`: moves background hearts upward while fading them out
- `pop-in`: scales prompt cards into view
- `wiggle`: rotates the gotcha face back and forth

Animation utility classes:

```css
.animate-float-up
.animate-pop-in
.animate-wiggle
```

## Interaction Flow

1. The user lands on `/`.
2. `app/page.tsx` renders `SayangPrompt`.
3. `SayangPrompt` renders `FloatingHearts` behind the prompt card.
4. The user sees two buttons:
   - `Ya, saya sayanggggg`
   - `Tak, tak sayanggg`
5. If the user tries to press `Tak`, the button moves and the teasing text changes.
6. If the user presses `Ya`, the component switches to the `tipu` screen.
7. After 2.6 seconds, the component resets to the original question.

## Notes

- This project uses `pnpm-lock.yaml`, so `pnpm` is the safest package manager choice.
- `next.config.mjs` currently ignores TypeScript build errors with `ignoreBuildErrors: true`.
- Images are configured as unoptimized in `next.config.mjs`.
- The app is generated from a v0-style shadcn setup, based on `components.json`.
