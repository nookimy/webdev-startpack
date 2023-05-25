import fileInclude from "gulp-file-include";
import posthtml from "gulp-posthtml";
import include from "posthtml-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlBeautify from "gulp-html-beautify";



export const html = () => {
    return app.gulp.src(app.path.src.html)

        // Уведомления об ошибках
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )

        // Сборка html-файлов
        .pipe(posthtml([
            include()
          ]))

        // Подмена путей до изображений
        .pipe(app.plugins.replace('../', './img/'))

        // Добавление варианта webp изображений и тега picture
        .pipe(webpHtmlNosvg())

        // Версионность файлов стилей и скриптов
        .pipe(
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': [
                        'css',
                        'js',
                    ]
                },
                'output': {
                    'file': 'gulp/version.json'
                }
            })
        )
        .pipe(htmlBeautify())
        .pipe(app.gulp.dest(app.path.build.root))
        .pipe(app.plugins.browsersync.stream());
}


export const htmlprod = () => {
    return app.gulp.src(app.path.src.html)

        // Уведомления об ошибках
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )

        // Сборка html-файлов
        .pipe(fileInclude())

        // Подмена путей до изображений
        .pipe(app.plugins.replace(/@img\//g, 'img/'))

        // Добавление варианта webp изображений и тега picture
        .pipe(webpHtmlNosvg())

        // Версионность файлов стилей и скриптов
        .pipe(
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': [
                        'css',
                        'js',
                    ]
                },
                'output': {
                    'file': 'gulp/version.json'
                }
            })
        )
        .pipe(app.gulp.dest(app.path.build.htmlProd))
        .pipe(app.plugins.browsersync.stream());
}