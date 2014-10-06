#!/bin/sh
echo "Setting up dataverse.org"
# Platform for
# Lightweight
# Applications from
# IQSS
# Data Science
useradd plaid
# EPEL already enabled on HMDC VM
rpm -Uvh http://dl.fedoraproject.org/pub/epel/6Server/x86_64/epel-release-6-8.noarch.rpm
# on HMDC VM, httpd is already installed
yum install -y python-pip python-devel httpd mod_wsgi ack elinks
#
# Install virtualenvwrapper
#
echo "Install virtualenvwrapper"
pip install virtualenvwrapper
source /usr/bin/virtualenvwrapper.sh
#
# Setup virtualenv
echo "Setup virtualenv"
mkdir -p /webapps/virtualenvs
export WORKON_HOME=/webapps/virtualenvs
mkvirtualenv dataverse_org
workon dataverse_org
# Install requirements (pip)
echo "Install requirements (pip)"
cd /webapps/code/dataverse.org
pip install -r requirements/production.txt
#
# Create directory for sqlite db
#
echo "Create general data directory"
#
mkdir -p /webapps/data/dataverse_org
chown apache /webapps/data/dataverse_org
#
echo "Create data directory for sqlite db"
mkdir -p /webapps/data/dataverse_org/sqlite
chown apache /webapps/data/dataverse_org/sqlite
#
# Create directory for uploaded files
#
# echo "Create data directory for uploaded files"
mkdir -p /webapps/data/dataverse_org/dataverse_org_uploaded_files
chown apache /webapps/data/dataverse_org/dataverse_org_uploaded_files
#
# Validate settings file
#
echo "Validate settings file"
cd /webapps/code/dataverse.org/dataverse_org
python manage.py validate --settings=dataverse_org.settings.production
#
# Create sqlite database + initial tables
#
echo "Create sqlite database + initial tables"
python manage.py syncdb --noinput --settings=dataverse_org.settings.production
# resolve "Site matching query does not exist" and setup root:root
# http://stackoverflow.com/questions/11476210/getting-site-matching-query-does-not-exist-error-after-creating-django-admin/23028198#23028198
# http://stackoverflow.com/questions/1466827/automatically-create-an-admin-user-when-running-djangos-manage-py-syncdb
#
# Permissions for database
#
chown apache /webapps/data/dataverse_org/sqlite/dataverse_org.db3
#
#
echo "Setting up Apache"
echo "Create www directories (media/static/wsgi-related)"
mkdir /var/www/dataverse_org
mkdir /var/www/dataverse_org/media # user uploads
mkdir /var/www/dataverse_org/static # images, js, css, etc.
mkdir /var/www/dataverse_org/dataverse_org # wsgi.py
#
echo "Run collectatic to copy files to the static www directory"
#
python manage.py collectstatic --noinput --settings=dataverse_org.settings.production
cp /webapps/code/dataverse.org/dataverse_org/dataverse_org/vagrant-centos-wsgi.py /var/www/dataverse_org/dataverse_org/wsgi.py
cp /webapps/code/dataverse.org/deploy/vagrant-centos-dataverse_org.conf /etc/httpd/conf.d/dataverse_org.conf
service httpd start
chkconfig httpd on
# on HMDC VM, changed SELinux to "permissive" in /etc/selinux/config
