import dartSass from 'sass'; // Препроцессор Sass
import gulpSass from 'gulp-sass'; // Плагин для запуска Sass
import rename from 'gulp-rename'; // Переименование файла
import cleanCss from 'gulp-clean-css'; // Сжатие CSS-файла
import webpCss from 'gulp-webpcss'; // Вывод webp-изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа-запросов

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true }) // либо app.isDev вместо true при использовании плагина if

        // Уведомления об ошибках
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))

        // Меняем пути для изображений
        .pipe(app.plugins.replace(/@img\//g, '../img/'))

        // Преобразование в css
        .pipe(sass({
           outputStyle: 'expanded'
        }))
        // Группировка медиазапросов
        .pipe(groupCssMediaQueries())
        // webp-изображения, если они поддерживаются
        .pipe(webpCss(
            {
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }
        ))
        // Автопрефиксер
        .pipe(autoprefixer(
            {
                grid: true,
                overrideBrowserlist: ["last 3 versions"],
                cascade: true
            }
        ))
        // Положи в папку разработки
        .pipe(app.gulp.dest(app.path.build.css))
        // Сжатие css файла
        .pipe(cleanCss())
        // Переименование файла min.css файла
        .pipe(rename({
            extname: ".min.css"
        }))
        // Положить min.css в папку разработки
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}