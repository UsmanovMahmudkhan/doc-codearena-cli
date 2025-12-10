# CoreArenaCLI Website

This is the official website for CoreArenaCLI, built with Jekyll and deployed via GitHub Pages.

## Local Development

### Prerequisites

- Ruby 3.1 or higher
- Bundler gem

### Setup

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Build and serve the site locally:
   ```bash
   bundle exec jekyll serve
   ```

3. Open your browser and navigate to `http://localhost:4000`

### Configuration

The site configuration is in `_config.yml`. Key settings include:

- Site title and description
- Navigation menu
- External links (documentation, GitHub, community channels)
- Jekyll plugins

## Project Structure

```
/
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts
├── _includes/           # Reusable components
├── _sass/               # SCSS stylesheets
├── assets/              # Static assets (CSS, images)
├── index.html           # Homepage
├── features.html        # Features page
├── community.html       # Community page
├── contact.html         # Contact page
├── 404.html             # 404 error page
└── Gemfile              # Ruby dependencies
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

### Manual Deployment

If you need to deploy manually:

1. Build the site:
   ```bash
   bundle exec jekyll build
   ```

2. The `_site` directory contains the built site files.

## Customization

### Adding New Pages

1. Create a new HTML file in the root directory
2. Add front matter with layout and title:
   ```yaml
   ---
   layout: page
   title: Your Page Title
   ---
   ```
3. Add the page to the navigation in `_config.yml`

### Modifying Styles

- SCSS variables: `_sass/_variables.scss`
- Base styles: `_sass/_base.scss`
- Layout styles: `_sass/_layout.scss`
- Component styles: `_sass/_components.scss`

### Updating Links

All external links are configured in `_config.yml` under the `links` section.

## License

This website is part of the CoreArenaCLI project and is licensed under the Apache License 2.0.

## Contributing

Contributions to improve the website are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For more information, see the [Community page](community.html) and [Contributing Guide](https://github.com/UsmanovMahmudkhan/CoreArenaCLI/blob/main/CONTRIBUTING.md).

