# Use a imagem oficial do PHP
FROM php:8.1-fpm as php

# Instale as dependências do Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql

# Configure o ambiente de trabalho
WORKDIR /var/www/html

# Copie todos os arquivos do projeto Laravel para o contêiner
COPY . .

# Instale as dependências do Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instale as dependências do projeto Laravel
RUN composer install

# Exponha a porta 9000 para o servidor PHP-FPM
EXPOSE 8000

# Inicie o servidor PHP-FPM
CMD ["php-fpm"]
