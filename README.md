dataverse.org
=============

STOP!!! For the main Dataverse source code, please go to https://github.com/IQSS/dataverse

https://dataverse.org (the project site) is now hosted on OpenScholar but this git repo exists because dataverse.org was once a combination of dynamic content powered by Django and static content powered by Sphinx. All that code is still here. http://best-practices.dataverse.org/harvard-policies/harvard-privacy-policy.html comes from this repo and it currently linked from the footer of https://dataverse.harvard.edu as "Privacy Policy", which is what https://github.com/IQSS/dataverse.harvard.edu/issues/7 is about. There may be other content in here we care about as well.

`deploy/files/etc/httpd/conf.d` contains the Apache configs for some sites that are still in production...

- guides.dataverse.org
- best-practices.dataverse.org

... and a number of sites that are now gone. There's potentially some value here if we decide to revive some of those static sites.
