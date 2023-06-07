import svgSprite from "gulp-svg-sprite";
import svgo from "gulp-svgo";

export const svgSprive = () => {
    let config = {
        svg: {
            namespaceClassnames: false,
            xmlDeclaration: true,
        },
        shape: {
            id: {
                separator: '-',
            },
            spacing: {
                padding: 0
            },
            transform: [{
                "svgo": {
                    "plugins": [
                        {
                            name: 'moveGroupAttrsToElems',
                            params: {
                                opationName: 'true'
                            }
                        },
                        {
                            name: 'removeXMLNS',
                            params: {
                                opationName: 'true'
                            }
                        },
                        {
                            name: 'removeAttrs',
                            params: {
                                attrs: '(style)'
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
                dest : '../../src/components/',
                sprite: './sprite.svg',
            }
        },
    };
    return app.gulp.src(app.path.src.svgicons, {})

        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SPRITE",
                message: "Error: <%= error.message %>"
            }))
        )

        .pipe(svgSprite(config))
        .pipe(app.gulp.dest(app.path.build.images))
}

export const svg = () => {
    return app.gulp.src(app.path.src.svg, {})

        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            }))
        )

        .pipe(svgo(
            {
                plugins: [
                    {removeUselessStrokeAndFill: true}
                ]
            }
        ))
        .pipe(app.gulp.dest(app.path.build.images))
}


