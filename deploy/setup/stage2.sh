#!/bin/sh
# This script should be wrapped by another script that
# encloses all of these commands in "scl enable python27"
# and is run by the "plaid" user one time for setup.
# i.e. scl enable python27 "path/to/this/script.sh"
# See also http://developerblog.redhat.com/2013/02/14/setting-up-django-and-python-2-7-on-red-hat-enterprise-6-the-easy-way/

#source /usr/bin/virtualenvwrapper.sh # python 2.6 version
source /opt/rh/python27/root/usr/bin/virtualenvwrapper.sh
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
#
echo "Create www directories (media/static/wsgi-related)"
mkdir /var/www/dataverse_org/media # user uploads
mkdir /var/www/dataverse_org/static # images, js, css, etc.
mkdir /var/www/dataverse_org/dataverse_org # wsgi.py
cp /webapps/code/dataverse.org/dataverse_org/dataverse_org/vagrant-centos-wsgi.py /var/www/dataverse_org/dataverse_org/wsgi.py
#
echo "Run collecstatic to copy files to the static www directory"
#
python manage.py collectstatic --noinput --settings=dataverse_org.settings.production
echo "Create directory for federated dataverses logos"
mkdir -p /var/www/dataverse_org/media/federated_logos
cp /webapps/code/dataverse.org/dataverse_org/media/federated_logos/* /var/www/dataverse_org/media/federated_logos
python manage.py loaddata apps/federated_dataverses/fixtures/test-data.json --settings=dataverse_org.settings.production
