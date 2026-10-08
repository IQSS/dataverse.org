**This fictitious use case highlights ways administrators can leverage generalist repositories to track and report data sharing at an organizational level.**

---

**Use case date:** February 2, 2023

**Use case contact:** Julian Gautier, [support@dataverse.harvard.edu](mailto:support@dataverse.harvard.edu)

<img src="/use-cases/hdv_dataset_reporting/images/harvard-dataverse-logo.png" alt="Harvard Dataverse logo" height="60" style="height:60px;width:auto">

---

## Background

The scholarly repository librarian at a Carnegie R2 university helps track the outputs of the research activities that the university funds, including research data. Each academic quarter, the librarian prepares a report of the data published by the university's affiliates and submits the report to the university's Data Services Task Force. Then the university's Sponsored Programs Office, another member of the task force, uses the report to determine which funded research has complied with data sharing requirements and where that data is published.

The university encourages affiliates to use its own research data repository, but the librarian knows that affiliates also publish research data elsewhere. So he maintains a list of those places and procedures for finding the affiliate data they hold. The Harvard Dataverse Repository is one of those places.

## Use case

To get a sense of the amount of data that university affiliates have published in the Harvard Dataverse, the librarian uses the [repository's advanced search](https://guides.dataverse.org/en/latest/user/find-use-data.html#advanced-search) page to find datasets where the data depositor entered the university's name in the dataset's "Author Affiliation" metadata field, adjusting the search to account for popular spellings and abbreviations of the university's name, until he's confident that the search query returns most of the data that the university's affiliates have published in the repository.

To automate and streamline the discovery of this research data, the librarian works with Harvard Dataverse staff to [create an OAI-PMH set](https://guides.dataverse.org/en/latest/admin/harvestserver.html) that contains the results of his search queries. This lets him set up a harvesting job, where each week the university's repository imports the metadata of the datasets in the Harvard Dataverse. This way, the librarian needs to check only the university's repository to find data that affiliates have published in the Harvard Dataverse.

---

<img src="/use-cases/hdv_dataset_reporting/images/grei-logo.jpg" alt="GREI logo" height="80" style="height:80px;width:auto">

*GREI Use Cases are supported by the National Institutes of Health (NIH) Office of Data Science Strategy / Office of the NIH Director pursuant to OTA-21-009, "Generalist Repository Ecosystem Initiative (GREI)".*

*Header image: NIH Image Gallery. GDF10 protein forms new brain cell connections (<https://www.flickr.com/photos/nihgov/22798807131/>). Courtesy of S. Thomas Carmichael, MD, PhD, David Geffen School of Medicine at the University of California Los Angeles. NIH funding: National Institute of Neurological Disorders and Stroke (NINDS). More information at <https://www.nih.gov/news-events/news-releases/scientists-identify-main-component-brain-repair-after-stroke>*
