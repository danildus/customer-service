ARG NGINX_VERSION=1.18

FROM nginx:${NGINX_VERSION}-alpine AS app_nginx

COPY ./templates /etc/nginx/templates/

# Fix "www-data" user & group ids
RUN set -x ; \
    addgroup -g 1000 -S www-data ; \
    adduser -u 1000 -D -S -G www-data www-data && exit 0 ; \
    exit 1

RUN set -xe && sed -e "s#nginx;#www-data;#g" -i /etc/nginx/nginx.conf

WORKDIR /app/public