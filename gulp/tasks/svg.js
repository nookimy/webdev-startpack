import svgSprite from "gulp-svg-sprite";
import svgo from "gulp-svgo";


export const svg = () => {
    let config = {
        mode: {
            symbol: {
                dest : '../../src/components/',
                sprite: './sprite.svg',
            }
        },
        svg: {
            namespaceClassnames: false,
            xmlDeclaration: true,
        },
        shape: {
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
                            name: 'removeUselessStrokeAndFill',
                            params: {
                                opationName: 'false'
                            }
                        },
                        {
                            name: 'convertColors',
                            params: {
                                opationName: 'true'
                            }
                        },
                        {
                            name: 'removeAttrs',
                            params: {
                                opationName: '(style)'
                            }
                        },
                        {
                            name: 'removeViewBox',
                            params: {
                                opationName: 'false'
                            }
                        },
                        {
                            name: 'sortAttrs',
                            params: {
                                opationName: 'true'
                            }
                        },

                    ]
                }
            }]
        },
    };
    return app.gulp.src(app.path.src.svg, {})

        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            }))
        )

        .pipe(app.plugins.replace('fill="none" ', ''))

        .pipe(svgSprite(config))
        // Подмена путей до изображений


        .pipe(app.gulp.dest(app.basePath.components))
}



