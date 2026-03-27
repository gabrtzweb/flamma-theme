# Flamma Theme

Flamma is my custom Shopify theme based on the official Horizon architecture. It is built with a strict focus on native web development, Core Web Vitals optimization, and lean engineering.

## Core Principles

- **Web-native:** Leverages the latest browser engines to their fullest. Semantic markup and modern CSS/JS ensure functionality across devices.
- **Lean & Fast:** Code ships on quality and purpose. No heavy frameworks where vanilla solutions thrive.
- **Server-rendered First:** HTML is rendered by Shopify servers using Liquid. Business logic stays on the server; client-side rendering is strictly used as a progressive enhancement.

## Getting Started

To work on Flamma locally, ensure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed, then set up the Shopify CLI:

1. Clone the repository:

   ```sh
   git clone https://github.com/gabrtzweb/flamma-theme.git
   ```

2. Navigate to the project directory:

   ```sh
   cd flamma-theme
   ```

3. Install Shopify CLI globally (if not already installed):

   ```sh
   npm install -g @shopify/cli@latest
   ```

## Development Workflow

We use the [Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli) to automate local development.

Start local development and connect to the development store:

```bash
shopify theme dev
```

Pull latest remote theme changes:

```bash
shopify theme pull
```

Push local changes:

```bash
shopify theme push
```

## Custom Modifications Since Initial Commit

This project has substantial custom work on top of the initial Horizon baseline.

Summary since initial commit (`71eafc5..HEAD`):

- **63 files changed**
- **8271 insertions**
- **994 deletions**

### 1. Wishlist System

- Added complete wishlist feature with local storage and UI counter.
- Added wishlist page template and section rendering.
- Added configurable wishlist settings in theme customizer.

Main files:

- `assets/wishlist.js`
- `sections/wishlist.liquid`
- `templates/page.wishlist.json`
- `snippets/wishlist-button.liquid`
- `assets/icon-heart.svg`
- `assets/icon-heart-fill.svg`
- `config/settings_schema.json`
- `locales/en.default.json`
- `locales/pt-BR.json`

### 2. Footer and Trust/Badge Customizations

- Added reusable footer trust badges block.
- Extended footer utilities/group composition and policy/payment presentation.
- Added SSL verification snippet.

Main files:

- `blocks/footer-badges.liquid`
- `sections/footer-group.json`
- `sections/footer-utilities.liquid`
- `blocks/footer-copyright.liquid`
- `blocks/payment-icons.liquid`
- `snippets/ssl-verification.liquid`

### 3. Product Information and Conversion Enhancements

- Added installments pricing block.
- Added payment options content block.
- Added discount badges and product card badges.
- Added product video section using metafields.
- Enhanced existing price/review/sku behavior and presentation.

Main files:

- `blocks/price-installments.liquid`
- `blocks/payment-options.liquid`
- `blocks/discount-badges.liquid`
- `snippets/product-card-badges.liquid`
- `sections/product-video.liquid`
- `blocks/price.liquid`
- `blocks/review.liquid`
- `snippets/price.liquid`
- `snippets/sku.liquid`

### 4. Header, Navigation, and Search Upgrades

- Customized header actions and drawer behaviors.
- Added icon-driven menu support.
- Enhanced announcement/header composition.
- Added custom search bar and supporting snippets.

Main files:

- `blocks/_header-menu.liquid`
- `sections/header.liquid`
- `sections/header-group.json`
- `sections/header-announcements.liquid`
- `snippets/header-actions.liquid`
- `snippets/header-drawer.liquid`
- `snippets/menu-icons.liquid`
- `snippets/search-bar.liquid`
- `snippets/search.liquid`
- `snippets/announcement-actions.liquid`

### 5. Storefront UI and Layout Extensions

- Added large global stylesheet for store-specific UI overrides.
- Added custom icon set for support and UI accents.
- Updated marquee, product card gallery, and thumbs/gallery related blocks.
- Added Intelipost block.

Main files:

- `assets/custom.css`
- `assets/icon-support.svg`
- `sections/marquee.liquid`
- `blocks/_product-card-gallery.liquid`
- `blocks/thumbs.liquid`
- `blocks/intelipost.liquid`
- `snippets/custom-icons.liquid`
- `snippets/stylesheets.liquid`

### 6. Templates and Theme Configuration Updates

- Updated key JSON templates (home, collection, product, blog, page, search, 404, password).
- Updated section composition for header/footer areas.
- Extended settings schema and data for new blocks/features.

Main files:

- `templates/index.json`
- `templates/collection.json`
- `templates/product.json`
- `templates/search.json`
- `templates/blog.json`
- `templates/article.json`
- `templates/page.json`
- `templates/page.contact.json`
- `templates/list-collections.json`
- `templates/404.json`
- `templates/password.json`
- `config/settings_data.json`
- `config/settings_schema.json`

### 7. Localization and Content Updates

- Added/updated locale keys to support new custom sections, settings, and UI strings.

Main files:

- `locales/en.default.json`
- `locales/en.default.schema.json`
- `locales/pt-BR.json`
- `locales/pt-BR.schema.json`

### 8. Project Tooling and Repository Standards

- Added repository line-ending standards.
- Added editor settings and repository ignore configuration.
- Added design/mockup reference asset.

Main files:

- `.gitattributes`
- `.gitignore`
- `.vscode/settings.json`
- `docs/mockup.webp`

## Complete Changed File Inventory Since Initial Commit

Source range: `71eafc5..HEAD`

Added files:

- `.gitattributes`
- `.gitignore`
- `.vscode/settings.json`
- `assets/custom.css`
- `assets/icon-heart-fill.svg`
- `assets/icon-heart.svg`
- `assets/icon-support.svg`
- `assets/wishlist.js`
- `blocks/customer-review.liquid`
- `blocks/discount-badges.liquid`
- `blocks/footer-badges.liquid`
- `blocks/intelipost.liquid`
- `blocks/payment-options.liquid`
- `blocks/price-installments.liquid`
- `blocks/thumbs.liquid`
- `docs/mockup.webp`
- `readme.md`
- `sections/product-video.liquid`
- `sections/wishlist.liquid`
- `snippets/announcement-actions.liquid`
- `snippets/custom-icons.liquid`
- `snippets/menu-icons.liquid`
- `snippets/payment-modal.liquid`
- `snippets/product-card-badges.liquid`
- `snippets/search-bar.liquid`
- `snippets/ssl-verification.liquid`
- `snippets/wishlist-button.liquid`
- `templates/page.wishlist.json`

Modified files:

- `blocks/_header-menu.liquid`
- `blocks/_product-card-gallery.liquid`
- `blocks/footer-copyright.liquid`
- `blocks/payment-icons.liquid`
- `blocks/price.liquid`
- `blocks/review.liquid`
- `config/settings_data.json`
- `config/settings_schema.json`
- `locales/en.default.json`
- `locales/en.default.schema.json`
- `locales/pt-BR.json`
- `locales/pt-BR.schema.json`
- `sections/footer-group.json`
- `sections/footer-utilities.liquid`
- `sections/header-announcements.liquid`
- `sections/header-group.json`
- `sections/header.liquid`
- `sections/marquee.liquid`
- `snippets/header-actions.liquid`
- `snippets/header-drawer.liquid`
- `snippets/price.liquid`
- `snippets/search.liquid`
- `snippets/sku.liquid`
- `snippets/stylesheets.liquid`
- `templates/404.json`
- `templates/article.json`
- `templates/blog.json`
- `templates/collection.json`
- `templates/index.json`
- `templates/list-collections.json`
- `templates/page.contact.json`
- `templates/page.json`
- `templates/password.json`
- `templates/product.json`
- `templates/search.json`

## Documentation and Assets

Check the `docs/` folder for UI mockups, and reference images.

- **Theme Check:** Use the [Theme Check VS Code extension](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) to lint and validate Liquid code.

## License

Based on Shopify Horizon. Custom modifications are proprietary.
