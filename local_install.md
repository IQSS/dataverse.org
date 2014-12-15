## Install (on OS X)

### Install [pip](http://pip.readthedocs.org/en/latest/installing.html)

* use sudo if needed

### Install [virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/install.html)

* depends on pip

```
sudo pip install virtualenvwrapper
```

### Pull down the [dataverse.org repository](https://github.com/IQSS/dataverse.org)

* Use the [mac client](https://mac.github.com/) if desired

### Setup

#### cd into the repository

```
cd ~\dataverse.org
```

#### Install the virtualenv and the requirements

This may take a minute or two.  (Xcode needs to be installed)
    
```
mkvirtualenv dataverse_org
pip install -r requirements/local.txt
```

#### Configure settings (still in ~\dataverse.org)

* Edit a file

```
vim $VIRTUAL_ENV/bin/postactivate
```

* add these lines

```
export DJANGO_DEBUG=True
export DJANGO_SETTINGS_MODULE=dataverse_org.settings.local
```

* Test it from command line

```
deactivate
workon dataverse_org
echo $DJANGO_SETTINGS_MODULE
```

You should see ```dataverse_org.settings.local```

#### Install (still in ~\dataverse.org)

```
cd dataverse_org
python manage.py syncdb
python manage.py loaddata apps/federated_dataverses/fixtures/initial_data.json 
```

#### Run (still in ~\dataverse.org\dataverse_org)

```
python manage.py runserver
```

* Feel grateful to be alive

#### Edit the files template files

* Location ```~\dataverse.org\dataverse_org\templates```

* ```base.html``` is the over-arching template


## Working post installation

```
cd ~\dataverse.org\dataverse_org
workon dataverse_org
python manage.py runserver
```

