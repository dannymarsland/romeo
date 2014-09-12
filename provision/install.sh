#!/bin/bash

sudo apt-get update
sudo apt-get install python-software-properties -y
sudo add-apt-repository ppa:ondrej/php5 -y
sudo apt-get update

sudo apt-get install apache2 php5 php5-cli php-pear php5-mysql php5-curl unzip make php5-dev php-apc php5-xdebug \
             libpcre3-dev memcached php5-memcached php5-sqlite libjpeg-progs libapache2-mod-php5 curl git subversion \
             imagemagick libmagick-dev libmagick-dev php5-imagick php5-mcrypt  -y

sudo cp /vagrant/provision/config/dev.conf /etc/apache2/sites-available
sudo cp /vagrant/provision/config/servername.conf /etc/apache2/conf-available
sudo cp /vagrant/provision/config/xdebug.conf /etc/php5/apache2/conf.d
sudo cp /vagrant/provision/config/hosts /etc

sudo mkdir -p /vagrant/logs

cd /usr/local/bin
sudo curl -s http://getcomposer.org/installer | sudo php
sudo chmod a+x composer.phar
sudo cp composer.phar composer

cd /vagrant

sudo a2enconf servername

sudo a2dissite 000-default
sudo a2ensite dev

sudo a2dismod negotiation
sudo a2enmod rewrite
sudo a2enmod expires
sudo a2enmod headers
sudo a2enmod ssl

sudo service apache2 restart


