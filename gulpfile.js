var gulp     = require('gulp'),             // Meu Automatizador
    sass     = require('gulp-sass'),        // Meu pré-processador
    cssnano  = require('gulp-cssnano'),     // Minifica o css, https://cssnano.co
    srcmaps  = require('gulp-sourcemaps'),  // Mapeia o css, para debugg
    bs       = require('browser-sync'),     // Server sincronizado ao Browser, para atualizar em 'tempo real'.
    uglify   = require('gulp-uglify'),      // Minifica o JavaScript.
    rename   = require('gulp-rename'),      // Renomeia Arquivos.
    concat   = require('gulp-concat'),      // Concatena arquivos.
    pipeif   = require('gulp-if'),          // Utilizado para criar condições
    ssi      = require('gulp-ssi'),         // Pra concatenar html
    flatmap  = require('gulp-flatmap'),     // Mapea os Arquivos
    imagemin = require('gulp-imagemin'),    // Comprimi as imagens
    pngquant = require('imagemin-pngquant'),// Plugin imagemin para minificar png
    watch = require('gulp-watch'),          // Verifica modificação em algum arquivo
    fs       = require('fs');               // Para verificar se um arquivo ou pasta existe

// Configuração dos Browser Suportados pelo cssnano
var supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 8',
    'ff >= 20',
    'ios 6',
    'android 4'
];

// Configuração dos Caminhos
var config = {
    src    : {
        sass  : "./src/sass/**/*.scss",
        fonts : "./src/sass/fonts/**/*.*",
        index : "./src/*.html",
        incs  : "./src/html-parts/*.html",
        js    : "./src/js/*",
        vendors   : "./src/vendors/*",
        img   : "./src/images/**/*"
    },
    server : {
        root : "./server",
        css  : "./server/css",
        fonts: "./server/css/fonts",
        js   : "./server/js",
        vendors   : "./server/vendors",
        img  : "./server/images"
    },
    dist : {
        root : "./dist",
        css  : "./dist/css",
        fonts: "./dist/css/fonts",
        js   : "./dist/js",
        vendors   : "./dist/vendors",
        img  : "./dist/images"
    }
};

// Função para tratr o Sass, converto e minifica-lo
function compile_css($origin, $dest, $out, $dev = true){
    return gulp.src($origin)
        .pipe(sass.sync({outputStyle: $out}).on('error', sass.logError))
        .pipe(pipeif( $dev, srcmaps.init()))
        .pipe(cssnano({
            autoprefixer: {browsers: supported, add: true}
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest($dest))
        .pipe(pipeif( $dev, srcmaps.write('.')))
        .pipe(pipeif( $dev, gulp.dest($dest)))
        .pipe(bs.stream());
}

// Função que move as fonts
function compile_fonts($origin, $dest){    
    return gulp.src($origin)
        .pipe(gulp.dest($dest))
        .pipe(bs.stream());
}

// Função para tratar o Js, concatena-lo e minifica-lo
function compile_scripts($origin, $dest, $dev = true){
    return gulp.src($origin)
        .pipe(concat('scripts.js'))
        .pipe(pipeif( $dev, srcmaps.init()))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest($dest))
        .pipe(pipeif( $dev, srcmaps.write('.')))
        .pipe(pipeif( $dev, gulp.dest($dest)))
        .pipe(bs.stream());
}

// Função para tratar o Js, concatena-lo e minifica-lo
function compile_vendors($origin, $dest, $dev = true){
    return gulp.src($origin)
        .pipe(pipeif( $dev, srcmaps.init()))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest($dest))
        .pipe(pipeif( $dev, srcmaps.write('.')))
        .pipe(pipeif( $dev, gulp.dest($dest)))
        .pipe(bs.stream());
}

// Apenas Transporta o HTML
function compile_html($origin, $dest){
    return gulp.src($origin)
        .pipe(flatmap(function(stream, file){
            return stream
                .pipe(ssi())
        }))
        .pipe(gulp.dest($dest))
        .pipe(bs.stream());
}

// Comprimi as imagens quando exportr o projeto
function compile_imgs($origin,$dest, $compress = false){
    return gulp.src($origin)
        .pipe(pipeif($compress, imagemin(
            [
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                pngquant(),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ], {
                verbose: true
            }
        )))
        .pipe(gulp.dest($dest));
}

// Inicia a compilação do sass
gulp.task('sass',done =>{
    compile_css(config.src.sass, config.server.css, 'expanded');
    done();
});

// Trata dos scripts js de terceiros
gulp.task('fonts', done =>{
    compile_fonts(config.src.fonts, config.server.fonts);
    done();
});

// Inicia a compilação dos scripts
gulp.task('scripts',done =>{
    compile_scripts(config.src.js, config.server.js);
    done();
});

// Trata dos scripts js de terceiros
gulp.task('vendors',done => {
    compile_vendors(config.src.vendors, config.server.vendors, false);
     done();
});

// Inicia a compilação dos scripts
gulp.task('html',done=>{
    compile_html(config.src.index, config.server.root);
    done();
});

// Comprimi as imagens
gulp.task('images', done =>{
    compile_imgs(config.src.img ,config.server.img);
    done();
});

// Tarefa para o Ambiente de Desenvolvimento
gulp.task('dev',()=>{
    bs.init({
        server: {
            baseDir: "./server",
            browser: "google chrome"
        },
        port: 3000
    });

    if(!fs.existsSync('./server')){
        compile_css(config.src.sass, config.server.css, 'expanded');
        compile_fonts(config.src.fonts, config.server.fonts);
        compile_scripts(config.src.js, config.server.js);
        compile_html(config.src.index, config.server.root);
        compile_imgs(config.src.img, config.server.img);
        compile_vendors(config.src.vendors, config.server.vendors, false);
    }

    watch(config.src.incs, function () {
        console.log("observando arquivos html-parts");
        compile_html(config.src.index, config.server.root);
    });

    watch(config.src.index, function () {
        console.log("observando arquivos index");
        compile_html(config.src.index, config.server.root);
    });

    watch(config.src.sass, function () {
        console.log("observando arquivos sass");
        compile_css(config.src.sass, config.server.css, 'expanded');
    });

    watch(config.src.fonts, function () {
        console.log("observando arquivos as fonts");
        compile_fonts(config.src.fonts, config.server.fonts);
    });
    
    watch(config.src.js, function () {
        console.log("observando arquivos js");
        compile_scripts(config.src.js, config.server.js);
    });

    watch(config.src.img, function () {
        console.log("observando arquivos img");
        compile_imgs(config.src.img, config.server.img);
    });
});

// Tarefa para exportar o projeto
gulp.task('dist',()=>{
    compile_css(config.src.sass, config.dist.css, 'compressed',false);
    compile_fonts(config.src.fonts, config.dist.fonts);
    compile_scripts(config.src.js, config.dist.js,false);
    compile_html(config.src.index, config.dist.root);
    compile_imgs(config.src.img ,config.dist.img, true);
    compile_vendors(config.src.vendors, config.dist.vendors,false);
});