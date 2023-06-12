import svgSprite from "gulp-svg-sprite";
import svgo from "gulp-svgo";

export const svgOpt = () => {
    return app.gulp.src(app.path.src.svg, {})

        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG OPT",
                message: "Error: <%= error.message %>"
            }))
        )


        .pipe(svgo({
            plugins: [
                {removeXMLNS: false},
                {removeUselessStrokeAndFill: false},
                {convertColors: true},
                {removeAttrs: '(style)'},
                {removeViewBox: false},
                {sortAttrs: true}
            ]
        }))
        .pipe(app.gulp.dest(app.path.src.svgOpt))
};


export const svgSprive = () => {
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

                    ]
                }
            }]
        },
    };

    return app.gulp.src(app.path.src.svgOpt + '/' +'*.svg', {})

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
        .pipe(app.gulp.dest(app.path.build.images))
}



