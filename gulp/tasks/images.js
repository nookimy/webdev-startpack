import responsive from "gulp-responsive";
import responsiveConfig from "gulp-responsive-config";
/*import imagemin from "gulp-imagemin";*/
import webp from "gulp-webp";
import gulpAvif from "gulp-avif";

export const images = () => {
    // Make configuration from existing HTML and CSS files
    var config = responsiveConfig([
        './src/components/blocks/section/*.scss',
        './src/components/blocks/section/*.html'
    ]);
    // Возьми все изображения из папки section
    return app.gulp.src('./src/components/blocks/section/*.{png,jpg}')

        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            }))
        )

        .pipe(responsive(config, {
            errorOnEnlargement: false,
            quality: 80,
            withMetadata: false,
            compressionLevel: 7,
        }))
        .pipe(app.gulp.dest('./dist/img/section/'))
        .pipe(gulpAvif())
        .pipe(webp({quality: 80}))
        .pipe(app.gulp.dest('./dist/img/section/'))
}
