/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'wemogy',
  tagline: 'Web & Mobile Technology',
  url: 'https://docs.wemogy.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wemogy', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Developers',
      logo: {
        alt: 'wemogy logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'overview',
          position: 'left',
          label: 'Documentation'
        },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: "docs-internal",
          position: 'left',
          label: 'Internal'
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/wemogy',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/wemogy'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wemogy'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} wemogy GmbH.`
    },
    prism: {
      //theme: require('prism-react-renderer/themes/dracula'),
      // Check here: https://prismjs.com/#supported-languages
      additionalLanguages: ['csharp', 'hcl']
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/wemogy/documentation/edit/main/'
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/wemogy/documentation/edit/main/blog/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-internal',
        path: 'docs-internal',
        routeBasePath: 'docs-internal',
        sidebarPath: require.resolve('./sidebars-internal.js'),
        editUrl: 'https://github.com/wemogy/documentation/edit/main/'
      },
    ],
  ],
};
