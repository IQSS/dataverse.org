#!/bin/sh
echo "Setting up dataverse.org"
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
mkvirtualenv thedata
workon thedata
# Install requirements (pip)
echo "Install requirements (pip)"
cd /webapps/code/dataverse-dot-org
pip install -r requirements/production.txt
#
# Create directory for sqlite db
#
echo "Create general data directory"
#
mkdir -p /webapps/data/thedata
chown apache /webapps/data/thedata
#
echo "Create data directory for sqlite db"
mkdir -p /webapps/data/thedata/sqlite
chown apache /webapps/data/thedata/sqlite
#
# Create directory for uploaded files
#
# echo "Create data directory for uploaded files"
mkdir -p /webapps/data/thedata/thedata_uploaded_files
chown apache /webapps/data/thedata/thedata_uploaded_files
#
# Validate settings file
#
echo "Validate settings file"
cd /webapps/code/dataverse-dot-org/thedata
python manage.py validate --settings=thedata.settings.production
#
# Create sqlite database + initial tables
#
echo "Create sqlite database + initial tables"
python manage.py syncdb --noinput --settings=thedata.settings.production
# resolve "Site matching query does not exist" and setup root:root
# http://stackoverflow.com/questions/11476210/getting-site-matching-query-does-not-exist-error-after-creating-django-admin/23028198#23028198
# http://stackoverflow.com/questions/1466827/automatically-create-an-admin-user-when-running-djangos-manage-py-syncdb
#
# Permissions for database
#
chown apache /webapps/data/thedata/sqlite/thedata.db3
#
#
echo "Setting up Apache"
echo "Create www directories (media/static/wsgi-related)"
mkdir /var/www/thedata
mkdir /var/www/thedata/media # user uploads
mkdir /var/www/thedata/static # images, js, css, etc.
mkdir /var/www/thedata/thedata # wsgi.py
#
echo "Run collectatic to copy files to the static www directory"
#
python manage.py collectstatic --noinput --settings=thedata.settings.production
cp /webapps/code/dataverse-dot-org/thedata/thedata/vagrant-centos-wsgi.py /var/www/thedata/thedata/wsgi.py
cp /webapps/code/dataverse-dot-org/deploy/vagrant-centos-thedata.conf /etc/httpd/conf.d/thedata.conf
service httpd start
chkconfig httpd on
# on HMDC VM, changed SELinux to "permissive" in /etc/selinux/config
