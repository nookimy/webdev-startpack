import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
    // Ищем файлы шрифтов .otf
    return app.gulp.src(app.path.src.fonts + '*.otf', {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        // Конвертируем в .ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        // Выгружаем в исходную папку
        .pipe(app.gulp.dest(app.path.src.fonts))

}

export const ttfToWoff = () => {
    // Ищем файлы шрифтов .ttf
    return app.gulp.src(app.path.src.fonts + '*.ttf', {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        // Конвертируем в .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        // Выгружаем в папку c результатом
        .pipe(app.gulp.dest(app.path.build.fonts))

        // Ищем файлы шрифтов .ttf
        .pipe(app.gulp.src(app.path.src.fonts + '*.ttf'))
        // Конвертируем в .woff2
        .pipe(ttf2woff2())
        // Выгружаем в папку c результатом
        .pipe(app.gulp.dest(app.path.build.fonts))

}

export const ttfToWoff2 = () => {
    // Ищем файлы шрифтов .ttf
    return app.gulp.src(app.path.src.fonts + '*.ttf')
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        // Конвертируем в .woff2
        .pipe(ttf2woff2())
        // Выгружаем в папку c результатом
        .pipe(app.gulp.dest(app.path.build.fonts))
}

export const fontsStyle = () => {
    // Файл стилей подключения шрифтов
    let fontsFile = app.basePath.components + '/fonts.scss';

    // Проверяем существует ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontsFiles){
        if (fontsFiles) {
            // Проверяем существует ли файл стилей для подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                // Если файла нет, создаем его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    // Записываем подключения шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        let fontStyle = 'normal';
                        if (fontWeight.toLowerCase() === 'thinitalic') {
                            fontWeight = 100,
                            fontStyle = 'italic';
                        } else if (fontWeight.toLowerCase() === 'extralightitalic') {
                            fontWeight = 200,
                            fontStyle = 'italic';
                        } else if (fontWeight.toLowerCase() === 'lightitalic') {
                            fontWeight = 300,
                            fontStyle = 'italic';
                        } else if (fontWeight.toLowerCase() === 'mediumitalicitalic') {
                            fontWeight = 500,
                            fontStyle = 'italic';
                        } else if (fontWeight.toLowerCase() === 'semibolditalic') {
                            fontWeight = 600,
                            fontStyle = 'italic';
                        } else if (fontWeight.toLowerCase() === 'bolditalic') {
                            fontWeight = 700,
                            fontStyle = 'italic';
                        } else if (fontWeight.toLowerCase() === 'extrabolditalic') {
                            fontWeight = 800,
                            fontStyle = 'italic';
                        } else if (fontWeight.toLowerCase() === 'blackitalic') {
                            fontWeight = 900,
                            fontStyle = 'italic';
                        } else if (fontWeight.toLowerCase() === 'italic') {
                            fontWeight = 400,
                            fontStyle = 'italic';
                        } else if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile,
                        `@font-face {\n\tfont-family: "${fontName}";\n\tfont-display: swap;\n\tsrc:\n\t\tlocal("${fontName}"),\n\t\turl("./src/fonts/${fontFileName}.woff2") format("woff2"),\n\t\turl("./src/fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\r\n}\r\n`,cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // Если файл есть, выводим сообщение
                console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!")
            }
        }
    });

    return app.gulp.src(app.basePath.components);
    function cb() {}
}
