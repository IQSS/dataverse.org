#!/bin/sh
echo "Starting"
#scl enable python27 bash
source /opt/rh/python27/root/usr/bin/virtualenvwrapper.sh
export WORKON_HOME=/webapps/virtualenvs
workon dataverse_org
python /webapps/code/dataverse.org/dataverse_org/scripts/retrieve_dv3dot6_stats.py
echo "Done"
