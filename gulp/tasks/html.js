import posthtml from "gulp-posthtml";
import include from "posthtml-include";
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

        .pipe(app.gulp.dest(app.path.build.root))

        .pipe(app.plugins.browsersync.stream());
}

export const htmlProd = () => {
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

        // Подключение минифицированных файлов стилей
        .pipe(app.plugins.replace('.css', '.min.css'))

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

        .pipe(app.gulp.dest(app.basePath.prod))
}
