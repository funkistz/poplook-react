#!/bin/sh -e

echo Setting www-data uid/gid to $PHP_UID/$PHP_GID
deluser www-data
adduser www-data -u $PHP_UID -g $PHP_GID -D

echo Running composer up
cd /poplook-v2-laravel
su www-data -c "composer up"

#if [ -d /var/www/html ]; then
#    rmdir /var/www/html
#fi
#ln -s /poplook-v2-laravel/public /var/www/html

echo Adding poplook.com /etc/hosts hack
echo 172.17.0.1 poplook.com >> /etc/hosts

exec php-fpm