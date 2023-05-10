import svgmin from "gulp-svgmin";




export const svg = () => {
    return app.gulp.src(app.path.src.svg)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SVG",
            message: "Error: <%= error.message %>"
        }))
    )    
    .pipe(svgmin({
        multipass: true,
        full: true,
        plugins: [
          'removeDoctype',
          'removeComments',
          'sortAttrs',
          'removeXMLNS',
          'removeViewBox',
          'removeUselessStrokeAndFill',
          {
            name: "addClassesToSVGElement",
            params: {
              classNames: ["svg"]
            }
          }
        ],
      }))
    .pipe(app.gulp.dest(app.path.build.images))
}

