## Dataverse.org Navbar for SPHINX projects                                                   

Instructions to add the 'dataverse.org' navbar to Sphinx projects.

The placement of the following files into a Sphinx project will result in a dynamically loading (JSONP) navbar matching that of http://dataverse.org*.  

(* currently http://beta.dataverse.org)

### Instructions:                                                                       

1. Create a blank Sphinx ```navbar.html``` file
    - file location: ```{{ your sphinx project }}/source/_templates/navbar.html```
    - example: ```best_practices/source/_templates/navbar.html```

1. Copy the contents of ```sphinx-navbar.html``` file into ```navbar.html```         
    - content source: ```sphinx-navbar.html```
    - content target: ```{{ your sphinx project }}/source/_templates/navbar.html```
        - example: ```best_practices/source/_templates/navbar.html```
    - ** In Guides.dataverse.org, the call to load "navbar_from_dataverse_org.js"  is different:
        - Usual call: ```<script type="text/javascript" src="/_static/navbar_from_dataverse_org.js"></script>```
        - For the guides: ```<script type="text/javascript" src="/en/latest/_static/navbar_from_dataverse_org.js"></script>```

1. Copy the file ```navbar_from_dataverse_org.js``` to Sphinx
    - target location: ```{{ your sphinx project }}/source/_static/navbar_from_dataverse_org.js```
        - example: ```best_practices/source/_static/navbar_from_dataverse_org.js```

1. Run a build!  (take a break)


### Local testing

- Drag ```test_json_header.html`` into a browser
    - It should load the local ```navbar_from_dataverse_org.js``` file
    - The page will attempt to retrieve the navbar from the ```navbar_url``` specified in ```navbar_from_dataverse_org.js```
   
### Current Sphinx projects using this ("hackish") navbar:

#### Relevant files for the guides below    
    - ```source/_templates/navbar.html```
    - ```source/_static/navbar_from_dataverse_org.js```

1.   Community Guides
    - http://community.dataverse.org
        - https://github.com/IQSS/dataverse.org/tree/master/docs/community/source
1.   Best Practices
    - http://best-practices.dataverse.org
        - https://github.com/IQSS/dataverse.org/tree/master/docs/best_practices/source
1.   Guides
    - http://guides.dataverse.org
    - https://github.com/IQSS/dataverse/tree/master/doc/sphinx-guides/source
    - ** In navbar.html, the call to load "navbar_from_dataverse_org.js"  is different
        - Usual call: ```<script type="text/javascript" src="/_static/navbar_from_dataverse_org.js"></script>```
        - For the guides: ```<script type="text/javascript" src="/en/latest/_static/navbar_from_dataverse_org.js"></script>```