import responsive from "gulp-responsive";
import responsiveConfig from "gulp-responsive-config";
/*import imagemin from "gulp-imagemin";*/
import webp from "gulp-webp";
import gulpAvif from "gulp-avif";

export const images = (done) => {
    // Make configuration from existing HTML and CSS files
    console.log(app.blocks);
    app.blocks.forEach (function (block) {
        var config = responsiveConfig([
            app.basePath.blocks + '/' + block + '/*.scss',
            app.basePath.blocks + '/' + block + '/*.html'
        ]);
        // Возьми все изображения из папки
        return app.gulp.src(app.basePath.blocks + '/' + block + '/*.{jpg,jpeg,png}')

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
            .pipe(app.gulp.dest(app.path.build.images + '/' + block + '/'))
            .pipe(webp({quality: 80}))
            .pipe(app.gulp.dest(app.path.build.images + '/' + block + '/'))

        /*.pipe(gulpAvif({quality: 30}))
        .pipe(app.gulp.dest('./dist/img/section/'))*/

    });
    done();
}



