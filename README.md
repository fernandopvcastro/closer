# Arquitetura Automatizada para Build

## Configuração Gulpfile

* __gulp dev (command):__
    >Este comando é responsável por iniciar um servidor local de desenvolvimento.

* __gulp dist (command):__
    >Este comando irá compilar todo o projeto para uma pasta dist. Que é a versão
    de distribuição do site.

* __gulp sass (task):__
    >Tarefa que invoca a função compiler_sass(). Responsável por compilar o sass em css.
    Recebe 3 parâmetros: compile_sass( $origin, $dest, $dev)

  * __Parâmetros__
    
    __$origin (Obrigatório):__ Caminho origem dos arquivos scss que serão compilados em css
        
    __$dest (Obrigatório):__ Caminho destino dos arquivos css
        
    __$dev (Opcional):__ valor boolean para definir quando deverá ser criado uma mapeamento do css minificado,
        é utilizado para separar quando a função compilar o sass para o ambiente de desenvolvimento
        e para quando for compilar para distribuição
   
        
* __gulp scripts (task):__
    >Tarefa que invoca a função compiler_scripts(). Responsável por concatenar e minificar o js em um arquivo scripts.min.js.
    Recebe 3 parâmetros: compile_scripts( $origin, $dest, $dev)

  * __Parâmetros__
    
    __$origin (Obrigatório) :__ Caminho origem dos arquivos js que serão compilados
        
    __$dest (Obrigatório):__ Caminho destino do arquivo scripts.min.js
        
    __$dev (Opcional):__ valor boolean para definir quando deverá ser criado uma mapeamento do js minificado,
        é utilizado para separar quando a função compilar para o ambiente de desenvolvimento
        e para quando for compilar para distribuição
        
* __gulp vendors (task):__
    >Tarefa que invoca a função compile_vendors(). Responsável por minificar os scripts js de terceiros.
    Recebe 3 parâmetros: compile_vendors( $origin, $dest, $dev)

  * __Parâmetros__
    
    __$origin (Obrigatório) :__ Caminho origem dos arquivos js que serão compilados
        
    __$dest (Obrigatório):__ Caminho destino do arquivo js
        
    __$dev (Opcional):__ valor boolean para definir quando deverá ser criado uma mapeamento do js minificado, é utilizado para separar quando a função compilar para o ambiente de desenvolvimento
        e para quando for compilar para distribuição

* __gulp html (task):__
    >Tarefa que invoca a função compile_html(). Responsável por minificar os scripts js de terceiros.
    Recebe 2 parâmetros: compile_html( $origin, $dest)

  * __Parâmetros__
    
    __$origin (Obrigatório) :__ Caminho origem dos arquivos html
        
    __$dest (Obrigatório):__ Caminho destino dos arquivos html
        
* __gulp images (task):__
    >Tarefa que invoca a função compile_imgs(). Responsável por comprimir as imagens
    Recebe 3 parâmetros: compile_imgs( $origin, $dest, $dev)

  * __Parâmetros__
    
    __$origin (Obrigatório) :__ Caminho origem das imagens que serão comprimidas
        
    __$dest (Obrigatório):__ Caminho destino das imagens comprimidas
        
    __$dev (Opcional):__ valor boolean para ativar e desativar a compressão de imagens. é utilizada para separar quando a função compilar para o ambiente de desenvolvimento e para quando for compilar para distribuição.

* __Módulos Utilizados__
    * __gulp__ --> Automatizador escolhido.
    * __sass__ --> Pré-processador escolhido.
    * __gulp-cssnano__ --> Minifica o css, [https://cssnano.co](https://cssnano.co).
    * __gulp-sourcemaps__ --> Mapeia css e js minificados para faciliar odebugg.
    * __browser-sync__ --> Criar um Server local sincronizado ao Browser, suport ao desenvolvimento.
    * __gulp-uglify__  --> Minifica o JavaScript.
    * __gulp-rename__ --> Renomeia Arquivos.
    * __gulp-concat__ --> Concatena arquivos.
    * __gulp-if__ --> Permite condições na função pipe do gulp
    * __gulp-ssi__ --> Permite Modularizar o html
    * __gulp-flatmap__ --> Mapea os Arquivos html
    * __gulp-imagemin__ --> Comprimi as imagens
    * __imagemin-pngquant__ --> Plugin imagemin para minificar png
    * __gulp-watch__ --> Possibilita a visualização de modificação em arquivos
    * __fs__ --> Para verificar se um arquivo ou pasta existe