// Основной модуль
import gulp from "gulp";

// Импорт путей
import {basePath, blocks, path} from "./gulp/config/path.js";

// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
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
import  { htmlProd } from "./gulp/tasks/html.js";
import  { server } from "./gulp/tasks/server.js";
import  { scss } from "./gulp/tasks/scss.js";
import  { copycss } from "./gulp/tasks/copy.js";
import  { js } from "./gulp/tasks/js.js";
import  { copyjs } from "./gulp/tasks/copy.js";
import  { jsProd } from "./gulp/tasks/js.js";
import  { img } from "./gulp/tasks/images.js";
import  { imgopt } from "./gulp/tasks/images.js";
import  { svg } from "./gulp/tasks/svg.js";
import {otfToTtf, ttfToWoff, ttfToWoff2, fontsStyle} from "./gulp/tasks/fonts.js";
import  { zip } from "./gulp/tasks/zip.js";
import  { ftp } from "./gulp/tasks/ftp.js";

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, img);
}

// Создание svg-спрайта
export { svg };


// Последовательная обработка шрифтов
const fonts = gulp.series( otfToTtf, ttfToWoff, ttfToWoff2, fontsStyle);


const test = gulp.series(imgopt);

// Тестовая задача
export { test };



// основные задачи

const mainTasks = gulp.series(svg, gulp.parallel(copy, copycss, copyjs, html, scss, js, img));
const mainTasksProd = gulp.parallel(htmlProd, jsProd);

// Построение сценариев выполнения задач
const dev = gulp.series(mainTasks, gulp.parallel(watcher, server));
const prod = gulp.series(reset, mainTasksProd);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);


//Экспорт сценариев
export { dev }
export  { prod }
export  { deployZIP }
export  { deployFTP }



//Выполнение сценария по умолчанию
gulp.task('default', dev);