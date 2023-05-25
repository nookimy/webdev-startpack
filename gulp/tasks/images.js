import responsive from "gulp-responsive";
import responsiveConfig from "gulp-responsive-config";
/*import imagemin from "gulp-imagemin";*/
import webp from "gulp-webp";

export const images = () => {
    // Make configuration from existing HTML and CSS files
    var config = responsiveConfig([
        '../../src/components/blocks/section/*.scss',
        '../../src/components/blocks/section/*.html'
    ]);
    return app.gulp.src('../../src/components/blocks/section/*.{png,jpg}')
        // Use configuration
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(responsive(config, {
            errorOnEnlargement: false,
            // normalize: true,
            quality: 100,
            compressionLevel: 0,
        }))
        /*.pipe(imagemin([
            imagemin.jpegtran({progressive: true})
        ]))*/
        .pipe(app.gulp.dest('../../dist/img/section/'))
        .pipe(webp({quality: 80}))
        .pipe(app.gulp.dest('../../dist/img/section/'))
}
