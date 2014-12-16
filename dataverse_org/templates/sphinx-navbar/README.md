## Dataverse.org Navbar for SPHINX projects                                                   

Instructions to add the 'dataverse.org' navbar to Sphinx projects.

The placement of the following files into a Sphinx project will result in a dynamically loading (JSONP) navbar matching that of dataverse.org*.  * currently beta.dataverse.org

###
Instructions:                                                                       

1. Create a blank Sphinx ```navbar.html``` file
    - file location: ```{{ your sphinx project }}/source/_templates/**navbar.html**```
    - example: ```best_practices/source/_templates/**navbar.html**```

1. Copy the **contents** of ```sphinx-navbar.html``` file into ```navbar.html```         
    - content source: ```sphinx-navbar.html```
    - content target: ```{{ your sphinx project }}/source/_templates/**navbar.html**```
        - example: ```best_practices/source/_templates/**navbar.html**```
2. Copy the file ```navbar_from_dataverse_org.js``` to Sphinx
    - target location: ```{{ your sphinx project }}/source/_tatic/**navbar_from_dataverse_org.js**```
        - example: ```best_practices/source/_templates/**navbar_from_dataverse_org.js**```
