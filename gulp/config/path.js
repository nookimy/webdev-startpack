// Получаем имя папки проекта (build-2023)
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());
import fs from "fs";

const buildFolder = `./dist`; // Также можно использовать rootFolder
const srcFolder = `./src`;

// Базовые пути отдельно, чтобы можно было использовать для других путей
export const basePath = {
    files: 'src/files', // Тестовая папка
    src: 'src',
    dev: 'dist',
    prod: 'prod',
    less: 'src/less',
    blocks: 'src/less/blocks', // Путь до папки с блоками препроцессорных файлов
    srcCms: 'source-cms', // Название папки в которой размещаются исходники для CMS, например, source-cms
    templatesFolder: 'custom', // Название папки в которой размещаются шаблоны, например, custom
    modulesFolder: 'modules', // Название папки в которой размещаются модули CMS, например, modules
    templateName: '', // Должно определиться само из названия папки в исходниках
    title: '', // Название сайта
    protocol: 'https://',
    domain: '' // URL сайта, без протокола
}

export const path = {
    src: {
        js: basePath.src + '/js/app.js',
        images: basePath.src + '/img/**/*.{jpg,jpeg,png,gif,webp}',
        svg: basePath.src + '/img/**/*.svg',
        scss: basePath.less + '/style.scss',
        html: basePath.src + '/*.pug',
        files: basePath.files + '/**/*.*',
        svgicons: basePath.src + '/svgicons/*.svg',
    },

    build: {
        root: basePath.dev,
        js: basePath.dev + '/js/',
        images: basePath.dev + '/img/',
        css: basePath.dev + '/css/',
        fonts: basePath.dev + '/fonts/',
        files: basePath.dev + '/files/',
    },

    watch: {
        html:
            [basePath.src + '/*.pug'
                // Сюда добавим пути к файлам блоков чуть ниже по коду
            ],
        js: `${srcFolder}/scss/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        scss: basePath.blocks + '/**/*.scss',
        files: `${srcFolder}/files/**/*.*`,
    },



    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: `test`,
}

// Массив для списка папок блоков, заполнится сам чуть ниже по коду
let blocks = [];

// Получаем список блоков и записываем их в массив blocs
if (basePath.blocks) {
    fs.readdirSync(basePath.blocks).forEach(function (directory) {
        blocks.push(directory);
        console.log(blocks);
    });
}

// Добавляем к path.src.htmlWatch пути к блокам
blocks.forEach (function (block) {
    path.watch.html.push(basePath.less + '/blocks/' + block + '/*.pug');
});




