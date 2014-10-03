## Install (on OS X)

### Install [pip](http://pip.readthedocs.org/en/latest/installing.html)

* use sudo if needed

### Install [virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/install.html)

* depends on pip

```
sudo pip install virtualenvwrapper
```

### Pull down the [dataverse-dot-org repository](https://github.com/IQSS/dataverse-dot-org)

* Use the [mac client](https://mac.github.com/) if desired

### Setup

#### cd into the repository

```
cd ~\dataverse-dot-org
```

#### Install the virtualenv and the requirements

This may take a minute or two.  (Xcode needs to be installed)
    
```
mkvirtualenv thedata
pip install -r requirements/local.txt
```

#### Configure settings (still in ~\dataverse-dot-org)

* Edit a file

```
vim $VIRTUAL_ENV/bin/postactivate
```

* add these lines

```
export DJANGO_DEBUG=True
export DJANGO_SETTINGS_MODULE=thedata.settings.local
```

* Test it from command line

```
deactivate
workon thedata
echo $DJANGO_SETTINGS_MODULE
```

You should see ```thedata.settings.local```

#### Install (still in ~\dataverse-dot-org)

```
cd thedata
python manage.py syncdb
python manage.py loaddata apps/federated_dataverses/fixtures/test-data.json 
```

#### Run (still in ~\dataverse-dot-org\thedata)

```
python manage.py runserver
```

* Feel grateful to be alive

#### Edit the files template files

* Location ```~\dataverse-dot-org\thedata\templates```

* ```base.html``` is the over-arching template


## Working post installation

```
cd ~\dataverse-dot-org\thedata
workon thedata
python manage.py runserver
```

