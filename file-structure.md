
# Project File Structure

This document provides a tree map of the project's file structure, with descriptions for each key component to explain its purpose.

```
.
├── README.md                 # Project README with setup and deployment instructions.
├── components.json           # Configuration for shadcn/ui components.
├── next.config.ts            # Configuration for the Next.js framework.
├── package.json              # Project dependencies and scripts.
├── src/
│   ├── ai/
│   │   └── genkit.ts         # Initializes and configures the Genkit AI instance.
│   ├── app/
│   │   ├── ai/
│   │   │   └── page.tsx      # The UI page for AI compute features.
│   │   ├── dashboard/
│   │   │   └── page.tsx      # The main dashboard page, the app's primary view.
│   │   ├── finance/
│   │   │   └── page.tsx      # A page dedicated to financial charts and data visualization.
│   │   ├── globals.css       # Global stylesheets and Tailwind CSS theme definitions.
│   │   ├── layout.tsx        # The root layout for the entire application.
│   │   └── page.tsx          # The root page, which redirects to the dashboard.
│   ├── apps/
│   │   ├── Terminal.tsx      # A draggable, interactive terminal application.
│   │   ├── calculator/
│   │   │   └── calculator.tsx# A sleek, draggable calculator application.
│   │   └── explorer.tsx      # The core window manager for the desktop environment.
│   ├── components/
│   │   ├── font-provider.tsx # Manages and applies custom fonts across the app.
│   │   ├── layout/
│   │   │   ├── Clock.tsx     # A real-time digital clock for the header.
│   │   │   ├── HeaderRight.tsx # Right-aligned header components (search, user, etc.).
│   │   │   └── main-layout.tsx # The primary layout structure including sidebar and header.
│   │   └── ui/
│   │       ├── background-blobs.tsx # Renders the animated background gradient blobs.
│   │       ├── button.tsx      # Standard button component from shadcn/ui.
│   │       ├── card.tsx        # Card component for structured content display.
│   │       ├── chart.tsx       # Components for building charts with Recharts.
│   │       ├── command.tsx     # The command palette (⌘K) component.
│   │       ├── dialog.tsx      # Modal dialog component.
│   │       ├── dropdown-menu.tsx # Dropdown menu component.
│   │       ├── input.tsx       # Standard input field component.
│   │       ├── separator.tsx   # A separator line component.
│   │       ├── sheet.tsx       # A side sheet component.
│   │       ├── shooting-stars.tsx # Renders the animated shooting stars effect.
│   │       ├── sidebar.tsx     # A highly customizable and responsive sidebar component.
│   │       ├── skeleton.tsx    # A skeleton loader component for placeholder content.
│   │       ├── stars-background.tsx # Renders the static starfield background.
│   │       └── tooltip.tsx     # Tooltip component for hover-activated information.
│   ├── contexts/
│   │   └── WindowsContext.tsx  # Manages the state of all draggable windows.
│   ├── hooks/
│   │   └── use-mobile.ts     # A hook to detect if the user is on a mobile device.
│   ├── lib/
│   │   └── utils.ts          # Utility functions, including `cn` for class names.
│   └── v0.1.md               # The development log for version 0.1.
└── tsconfig.json             # TypeScript compiler configuration.
```
