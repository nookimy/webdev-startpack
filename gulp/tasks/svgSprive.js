import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
    let config = {
        svg: {
            namespaceClassnames: false
        },

        shape: {
            dimension: {
                maxWidth: 500,
                maxHeight: 500
            },
            spacing: {
                padding: 0
            },
            transform: [{
                "svgo": {
                    "plugins": [
                        {
                            name: 'removeXMLNS',
                            params: {
                                opationName: 'true'
                            }
                        },
                        {
                            name: 'removeAttrs',
                            params: {
                                attrs: '(fill|stroke|style)'
                            }
                        },
                        {
                            name: 'removeViewBox',
                            params: {
                                opationName: 'false'
                            }
                        },
                        {
                            name: 'removeUnusedNS',
                            params: {
                                opationName: 'false'
                            }
                        },
                        {
                            name: 'removeUselessStrokeAndFill',
                            params: {
                                opationName: 'true'
                            }
                        },
                        {
                            name: 'cleanupIDs',
                            params: {
                                opationName: 'false'
                            }
                        },
                        {
                            name: 'removeComments',
                            params: {
                                opationName: 'true'
                            }
                        },
                        {
                            name: 'removeEmptyAttrs',
                            params: {
                                opationName: 'true'
                            }
                        },
                        {
                            name: 'removeEmptyText',
                            params: {
                                opationName: 'true'
                            }
                        },
                        {
                            name: 'collapseGroups',
                            params: {
                                opationName: 'true'
                            }
                        },
                    ]
                }
            }]
        },

        mode: {
            symbol: {
                dest : './components/icons',
                sprite: '../../sprite.svg'
            }
        },
    };

    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG SPRITE",
                message: "Error: <%= error.message %>"
            }))
        )

        .pipe(svgSprite(config))
        .pipe(app.gulp.dest(`${app.path.build.svgicons}`));
}