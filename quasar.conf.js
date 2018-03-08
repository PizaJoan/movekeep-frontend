// Configuration for your app

module.exports = function(ctx) {
    return {
        // app plugins (/src/plugins)
        plugins: ['vue-resource', 'vuelidate', 'filters'],
        css: ['app.styl'],
        extras: [
            ctx.theme.mat ? 'roboto-font' : null,
            'material-icons',
            'ionicons'
            // 'mdi',
            // 'fontawesome'
        ],
        supportIE: true,
        vendor: {
            add: [],
            remove: []
        },
        build: {
            scopeHoisting: true,
            vueRouterMode: 'hash',
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            // useNotifier: false,
            extendWebpack(cfg) {
                cfg.module.rules.push({
                    /*  enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/*/
                })
            },
            env: ctx.dev
                ? {
                      API: JSON.stringify('http://192.168.1.41:8080'),
                      AUTH: JSON.stringify('http://192.168.1.41:3000')
                  }
                : {
                      API: JSON.stringify('http://192.168.1.41:8080'),
                      AUTH: JSON.stringify('http://192.168.1.41:3000')
                  }
        },
        devServer: {
            //https: true,
            port: 8081,
            open: true // opens browser window automatically
        },
        // framework: 'all' --- includes everything; for dev only!
        framework: {
            components: [
                'QLayout',
                'QLayoutHeader',
                'QLayoutDrawer',
                'QPageContainer',
                'QPage',
                'QToolbar',
                'QToolbarTitle',
                'QBtn',
                'QIcon',
                'QList',
                'QListHeader',
                'QItem',
                'QItemMain',
                'QItemSide',
                'QTabs',
                'QRouteTab',
                'QLayoutFooter',
                'QScrollArea',
                'QTab',
                'QCard',
                'QCardTitle',
                'QCardMedia',
                'QItemTile',
                'QCardMain',
                'QField',
                'QInput',
                'QTooltip',
                'QTable',
                'QSearch',
                'QUploader',
                'QItemSeparator',
                'QSelect',
                'QOptionGroup'
            ],
            directives: ['Ripple'],
            // Quasar plugins
            plugins: [
                'Notify',
                'LocalStorage',
                'Dialog'
            ]
        },
        // animations: 'all' --- includes all animations
        animations: [],
        pwa: {
            cacheExt:
                'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
            manifest: {
                // name: 'Quasar App',
                // short_name: 'Quasar-PWA',
                // description: 'Best PWA App in town!',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#000000',
                icons: [
                    {
                        src: 'statics/icons/logo-movekeep-100x100.png',
                        sizes: '100x100',
                        type: 'image/png'
                    }
                ]
            }
        },
        cordova: {
            // id: 'org.cordova.quasar.app'
        },
        electron: {
            extendWebpack(cfg) {
                // do something with cfg
            },
            packager: {
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',
                // Window only
                // win32metadata: { ... }
            }
        },

        // leave this here for Quasar CLI
        starterKit: '1.0.0'
    }
}
