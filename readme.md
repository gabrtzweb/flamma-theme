# Flamma Theme

Flamma is a high-performance custom Shopify theme based on the official Horizon architecture. It is built with a strict focus on native web development, Core Web Vitals optimization, and lean engineering.

Functionality and design default to "no" until proven necessary. We avoid bloated third-party apps and polyfills, relying instead on progressive enhancement and the evergreen web.

## Core Principles

- **Web-native:** Leverages the latest browser engines to their fullest. Semantic markup and modern CSS/JS ensure functionality across devices.
- **Lean & Fast:** Code ships on quality and purpose. No heavy frameworks where vanilla solutions thrive.
- **Server-rendered First:** HTML is rendered by Shopify servers using Liquid. Business logic stays on the server; client-side rendering is strictly used as a progressive enhancement.

## Getting Started

To work on Flamma locally, ensure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed, then set up the Shopify CLI:

1. Clone the repository:

   ```sh
   git clone [https://github.com/gabrtzweb/flamma-theme.git](https://github.com/gabrtzweb/flamma-theme.git)
   ```

2. Navigate to the project directory:

   ```sh
   cd flamma-theme
   ```

3. Install the Shopify CLI globally (if not already installed):

   ```sh
   npm install -g @shopify/cli@latest
   ```

## Development Workflow

We use the [Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli) to automate the local development workflow.

To start the local development server and connect to your development store, run:

```bash
shopify theme dev
```

### Documentation & Assets

Check the `/docs` folder for architectural diagrams, UI mockups, and reference images.

### Developer Tools

- **Theme Check:** It is highly recommended to use the [Theme Check VS Code extension](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) to lint and validate Liquid code in real-time.
- **Formatting:** We rely on Prettier to maintain a consistent codebase.

## License

Based on Shopify Horizon. Custom modifications are proprietary.
