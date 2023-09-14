FROM bitnami/laravel
WORKDIR /app

COPY . .

RUN composer install



EXPOSE 8000
CMD ["php", "artisan", "serve"]
