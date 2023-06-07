// Получаем имя папки проекта (build-2023)
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());
import fs from "fs";

const buildFolder = `./dev`; // Также можно использовать rootFolder
const srcFolder = `./src`;

// Базовые пути отдельно, чтобы можно было использовать для других путей
export const basePath = {
    files: 'src/files', // Тестовая папка
    src: 'src',
    dev: 'dev',
    prod: 'prod',
    components: 'src/components',
    blocks: 'src/components/blocks', // Путь до папки с блоками препроцессорных файлов
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
        html: basePath.src + '/*.html',
        scss: basePath.components + '/style.scss',
        csslib: basePath.src + '/css-lib/*.*',
        js: basePath.src + '/js/*.js',
        jslib: basePath.src + '/js-lib/*.*',
        images: basePath.src + '/img/**/*.{jpg,jpeg,png,gif,webp}',
        fonts: basePath.src + '/fonts/',
        svgicons: basePath.blocks + '/icons/icons-*.svg',
        svg: basePath.blocks + '/**/*.svg',
        files: basePath.files + '/**/*.*',
    },

    build: {
        root: basePath.dev,
        css: basePath.dev + '/css/',
        js: basePath.dev + '/js/',
        images: basePath.dev + '/img/',
        fonts: basePath.dev + '/fonts/',
        files: basePath.dev + '/files/',
    },
    // Чтобы вотчер не тормозил прописываем каждую папку отдельно
    watch: {
        html:
            [basePath.src + '/*.html'
                // Сюда добавим пути к файлам блоков чуть ниже по коду
            ],
        scss:
            [basePath.components + '/*.scss'
                // Сюда добавим пути к файлам блоков чуть ниже по коду
            ],
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,

        files: `${srcFolder}/files/**/*.*`,
    },

    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: `test`,
}

// Массив для списка папок блоков, заполнится сам чуть ниже по коду
export const blocks = [];

// Получаем список блоков и записываем их в массив blocks
if (basePath.blocks) {
    fs.readdirSync(basePath.blocks).forEach(function (directory) {
        blocks.push(directory);
    });
}

// Добавляем к path.src.componentsWatch пути к блокам
blocks.forEach (function (block) {
    path.watch.scss.push(basePath.components + '/blocks/' + block + '/*.scss');
});

// Добавляем к path.src.htmlWatch пути к блокам
blocks.forEach (function (block) {
    path.watch.html.push(basePath.components + '/blocks/' + block + '/*.html');
});




