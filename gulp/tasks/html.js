import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";


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
        .pipe(app.gulp.dest(app.path.build.root))
        .pipe(app.plugins.browsersync.stream());
}