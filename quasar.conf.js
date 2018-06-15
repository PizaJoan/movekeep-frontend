// Configuration for your app

module.exports = function(ctx) {
    return {
        // app plugins (/src/plugins)
        plugins: ['vue-resource', 'vuelidate', 'filters', 'i18n'],
        css: ['app.styl'],
        extras: [
            ctx.theme.mat ? 'roboto-font' : null,
            'material-icons',
            'ionicons'
            // 'mdi',
            // 'fontawesome'
        ],
        supportIE: true,
        /* vendor: {
            add: [],
            remove: []
        }, */
        build: {
            scopeHoisting: true,
            vueRouterMode: 'hash',
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            // useNotifier: false,
            extendWebpack(cfg) {
               // cfg.module.rules[0].options.loaders.i18n = ['vue-i18n-loader', { loader: '@kazupon/vue-i18n-loader'}]
               // console.log(cfg.module.rules[0].options.loaders)
                /*cfg.module.rules.push({
                    test: /\.vue$/,
                    use: ['vue-i18n-loader', { loader: '@kazupon/vue-i18n-loader'}]
                })
                //cfg.module.rules.push({
                    /*  enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
               })
                cfg.module.rules.push({
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            // you need to specify `i18n` loaders key with `vue-i18n-loader` (https://github.com/kazupon/vue-i18n-loader)
                            i18n: 'vue-i18n-loader'
                        }
                    }
                })*/
            },
            env: ctx.dev
                ? {
                    API: JSON.stringify('http://192.168.1.41:8080'),
                    AUTH: JSON.stringify('http://192.168.1.41:3000'),
                    WEBSOCK: JSON.stringify('http://192.168.1.41:8080/movekeep-comments')
                  }
                : {
                    API: JSON.stringify('https://api.movekeep.tk'),
                    AUTH: JSON.stringify('https://auth.movekeep.tk'),
                    WEBSOCK: JSON.stringify('https://auth.movekeep.tk/movekeep-comments')
                  }
        },
        devServer: {
            //https: true,
            port: 8081,
            open: true // opens browser window automatically
        },
        // framework: 'all' --- includes everything; for dev only!
        framework: {
            i18n: 'es',
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
                'QCardSeparator',
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
                'QOptionGroup',
                'QTr',
                'QTd',
                'QInnerLoading',
                'QSpinnerMat'
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
        animations: 'all',
        pwa: {
            manifest: {
                name: 'Movekeep',
                short_name: 'Movekeep',
                description: 'App to help people get in shape',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#000000',
                icons: [
                    {
                        src: 'statics/icons/logo-movekeep-100x100.png',
                        sizes: '100x100',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/logo-movekeep-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'statics/icons/logo-movekeep-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    }
                ]
            }
        },
        cordova: {
            id: 'com.movekeep'
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
