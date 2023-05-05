import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            }))
        )

        


        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: `../components/sprite.svg`,
                        example: true,
                    }
                },
            }
        ))
        .pipe(app.gulp.dest(`${app.path.build.svgicons}`));
}