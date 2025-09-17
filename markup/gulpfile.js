import {readFileSync, rmSync} from 'node:fs';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postUrl from 'postcss-url';
import lightningcss from 'postcss-lightningcss';
import { createGulpEsbuild } from 'gulp-esbuild';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import server from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

const {src, dest, watch, series, parallel} = gulp;
const sass = gulpSass(dartSass);
const PATH_TO_SOURCE = './source/';
const PATH_TO_DIST = './build/';
const PATHS_TO_STATIC = [
    `${PATH_TO_SOURCE}fonts/**/*.{woff2,woff}`,
    `${PATH_TO_SOURCE}*.html`,
    `${PATH_TO_SOURCE}vendor/**/*`,
    `${PATH_TO_SOURCE}img/*.jpg`,
];
let isDevelopment = true;

export function processStyles() {
    return src(`${PATH_TO_SOURCE}styles/*.scss`, {sourcemaps: isDevelopment})
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(postcss([
            postUrl([
                {
                    filter: '**/*',
                    assetsPath: '../',
                },
            ]),
            lightningcss({
                lightningcssOptions: {
                    minify: !isDevelopment,
                },
            })
        ]))
        .pipe(dest(`${PATH_TO_DIST}styles`, {sourcemaps: isDevelopment}))
        .pipe(server.stream());
}

export function processScripts () {
    const gulpEsbuild = createGulpEsbuild({ incremental: isDevelopment });

    return src(`${PATH_TO_SOURCE}scripts/*.js`)
        .pipe(gulpEsbuild({
            bundle: true,
            format: 'esm',
            // splitting: true,
            platform: 'browser',
            minify: !isDevelopment,
            sourcemap: isDevelopment,
            target: browserslistToEsbuild(),
        }))
        .pipe(dest(`${PATH_TO_DIST}scripts`))
        .pipe(server.stream());
}

export function copyStatic() {
    return src(PATHS_TO_STATIC, {base: PATH_TO_SOURCE})
        .pipe(dest(PATH_TO_DIST));
}

export function startServer() {
    const serveStatic = PATHS_TO_STATIC
        .filter((path) => path.startsWith('!') === false)
        .map((path) => {
            const dir = path.replace(/(\/\*\*\/.*$)|\/$/, '');
            const route = dir.replace(PATH_TO_SOURCE, '/');

            return {route, dir};
        });

    server.init({
        server: {
            baseDir: PATH_TO_DIST
        },
        serveStatic,
        cors: true,
        notify: false,
        ui: false,
    }, (err, bs) => {
        bs.addMiddleware('*', (req, res) => {
            res.write(readFileSync(`${PATH_TO_DIST}404.html`));
            res.end();
        });
    });

    watch(`${PATH_TO_SOURCE}styles/**/*.scss`, series(processStyles));
    watch(`${PATH_TO_SOURCE}scripts/**/*.js`, series(processScripts));
    watch(PATHS_TO_STATIC, series(copyStatic, reloadServer));
}

function reloadServer(done) {
    server.reload();
    done();
}

export function removeBuild(done) {
    rmSync(PATH_TO_DIST, {
        force: true,
        recursive: true,
    });
    done();
}

export function runDev(done) {
    series(
        removeBuild,
        copyStatic,
        parallel(
            processStyles,
            processScripts,
        ),
        startServer,
    )(done);
}
