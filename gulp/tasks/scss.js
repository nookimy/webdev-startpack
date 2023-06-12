import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename'; // Переименование файла
import cleanCss from 'gulp-clean-css'; // Сжатие CSS-файла
/*import webpCss from 'gulp-webpcss'; // Вывод webp-изображений*/
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

        // webp-изображения, если они поддерживаются
/*        .pipe(webpCss(
            {
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }
        ))*/



        // Преобразование в css
        .pipe(sass({
           outputStyle: 'expanded'
        }))

        // Подмена путей до изображений
        .pipe(app.plugins.replace('../', '../img/'))
        .pipe(app.plugins.replace('./src/fonts/', '../fonts/'))


        // Группировка медиазапросов
        .pipe(groupCssMediaQueries())


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