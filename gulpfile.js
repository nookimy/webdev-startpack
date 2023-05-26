// Основной модуль
import gulp from "gulp";

// Импорт путей
import {basePath, blocks, path} from "./gulp/config/path.js";

// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'), // Режим продакшена
    isDev: !process.argv.includes('--build'), // Режим разработчика
    path: path,
    basePath: basePath,
    blocks: blocks,
    gulp: gulp,
    plugins: plugins,
}

// Импорт задач
import  { copy } from "./gulp/tasks/copy.js";
import  { reset } from "./gulp/tasks/reset.js";
import  { html } from "./gulp/tasks/html.js";
import  { htmlprod } from "./gulp/tasks/html.js";
import  { server } from "./gulp/tasks/server.js";
import  { scss } from "./gulp/tasks/scss.js";
import  { js } from "./gulp/tasks/js.js";
import  { images } from "./gulp/tasks/images.js";
import  { svg } from "./gulp/tasks/svg.js";
import  { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import  { svgSprive } from "./gulp/tasks/svgSprive.js";
import  { zip } from "./gulp/tasks/zip.js";
import  { ftp } from "./gulp/tasks/ftp.js";

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// Создание svg-спрайта
export { svgSprive };
// Нарезка изображений
export { img };

const img = gulp.series(images);

// Последовательная обработка шрифтов
const fonts = gulp.series( otfToTtf, ttfToWoff, fontsStyle);

// основные задачи
const mainTasks = gulp.parallel(copy, html, scss, js, images, svg);
/*const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svg));*/
const mainTasksProd = gulp.parallel(htmlprod);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const prod = gulp.series(reset, mainTasksProd);
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//Экспорт сценариев
export { dev }
export { prod }
export  { build }
export  { deployZIP }
export  { deployFTP }



//Выполнение сценария по умолчанию
gulp.task('default', dev);