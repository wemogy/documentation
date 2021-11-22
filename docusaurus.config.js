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
      title: 'Documentation',
      logo: {
        alt: 'wemogy logo',
        src: 'img/logo.svg'
      },
      items: [
        // {
        //   type: 'doc',
        //   docId: 'overview',
        //   position: 'left',
        //   label: 'Documentation'
        // },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'modules',
          position: 'left',
          label: 'Modules'
        },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'reactbase',
          position: 'left',
          label: 'ReactBase'
        },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'workWithUs',
          position: 'left',
          label: 'Work with us'
        },
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
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Overview',
        //       to: '/docs/overview'
        //     }
        //   ]
        // },
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
    }
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
        id: 'modules',
        path: 'docs-modules',
        routeBasePath: 'modules',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/wemogy/documentation/edit/main/'
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reactbase',
        path: 'docs-reactbase',
        routeBasePath: 'reactbase',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/wemogy/documentation/edit/main/'
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'workWithUs',
        path: 'docs-work-with-us',
        routeBasePath: 'work-with-us',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/wemogy/documentation/edit/main/'
      }
    ]
  ]
};
