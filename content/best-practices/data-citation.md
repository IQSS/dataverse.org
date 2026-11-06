The Dataverse Project standardizes the citation of datasets to make it easier for researchers to publish their data and get credit as well as recognition for their work. When you create a dataset in a Dataverse repository, the citation is generated and presented automatically.

As an open-source framework and research data repository, the Dataverse Project is committed to helping researchers, journals, and organizations make scientific data accessible, reusable, and open (when possible), which includes implementing community-accepted standards for data publication (Altman and Crosas 2013). Since 1995, members of Harvard’s [Institute for Quantitative Social Science](https://www.iq.harvard.edu/) (IQSS) and its [Dataverse Project team](/about#team) have played an active part in the work to standardize data citation (King 1995; Altman and King 2007; Altman and Crosas 2013).

A Dataverse repository formulates each data citation according to the [Joint Declaration of Data Citation Principles](https://force11.org/info/joint-declaration-of-data-citation-principles-final/) (2014), a synthesis of all previously existing principles and initiatives on data citation.

In addition to getting recognition with a citation, you can make your Dataverse collection recognizable by setting up your own branding. Read more about Dataverse [Themes](https://guides.dataverse.org/en/latest/user/dataverse-management.html#theme) and [Widgets](https://guides.dataverse.org/en/latest/user/dataverse-management.html#widgets) in the Dataverse User Guide.

## The Data Citation Standard

The citation standard defined here offers proper recognition to authors as well as permanent identification through the use of global, persistent identifiers in place of URLs, which can change frequently. Use of Universal Numerical Fingerprints (UNFs) guarantees to the scholarly community that future researchers will be able to verify that data retrieved is identical to that used in a publication decades earlier, even if it has changed storage media, operating systems, hardware, and statistical program format.

### Two examples

Following are two authentic examples of replication data citations, as printed in journal articles.

From *International Studies Quarterly* ([King and Zeng 2007](https://gking.harvard.edu/publication/when-can-history-be-our-guide-the-pitfalls-of-counterfactual-inference/), p. 209):

> Gary King; Langche Zeng, 2006, “Replication data for: When Can History be Our Guide? The Pitfalls of Counterfactual Inference”, Harvard Dataverse, V2, http://hdl.handle.net/1902.1/DXRXCFAWPK UNF:3:DaYlT6QSX9r0D50ye+tXpA==

Harvard Dataverse now also identifies this dataset as [doi:10.7910/DVN/EK886K](https://doi.org/10.7910/DVN/EK886K), with the same UNF.

From *Political Analysis* ([Hanmer, Banks, and White 2014](https://doi.org/10.1093/pan/mpt027)):

> Hanmer, Michael J.; Banks, Antoine J., White, Ismail K., 2013, “Replication data for: Experiments to Reduce the Over-reporting of Voting: A Pipeline to the Truth”, Harvard Dataverse, V1, [http://dx.doi.org/10.7910/DVN/22893](https://doi.org/10.7910/DVN/22893) UNF:5:eJOVAjDU0E0jzSQ2bRCg9g==

### The seven components

Each citation has seven components. Five are human-readable: the author(s), title, year, data repository (or distributor), and version number. Two are machine-readable:

1. **A global persistent identifier**, which begins with “hdl” (for the international [Handle.Net](https://www.handle.net/) system) or “doi” (for the [Digital Object Identifier (DOI)](https://www.doi.org/) system). This identifier is designed to persist even if URLs, or the web itself, are replaced with something else. When the citation appears online, the identifier is linked to the URL that references the identifier, which works in browsers available today. In print, the URL is also included in the citation.
2. **A Universal Numerical Fingerprint (UNF)**, which begins with “UNF” and is described in the next section.

In the first example above, the seven components are:

- **Authors:** Gary King; Langche Zeng
- **Year:** 2006
- **Title:** “Replication data for: When Can History be Our Guide? The Pitfalls of Counterfactual Inference”
- **Data repository (distributor):** Harvard Dataverse
- **Version:** V2
- **Global persistent identifier:** hdl:1902.1/DXRXCFAWPK
- **Universal Numerical Fingerprint:** UNF:3:DaYlT6QSX9r0D50ye+tXpA==

### What the UNF guarantees

Four features make the UNF especially useful:

1. **It changes whenever the data change.** The UNF algorithm’s cryptographic technology ensures that the alphanumeric identifier will change when any portion of the data set changes. Not only does this assure future researchers that they can use the same data set referenced in a years-old journal article, it enables the data set’s owner to track each iteration of the owner’s research. When an original data set is updated or incorporated into a new, related data set, the algorithm generates a unique UNF each time.
2. **It depends on the content of the data, not the file format.** For example, you create a data set in SPSS, Stata or R, and five years later you need to look at your data set again, but the data was converted to the next big thing (NBT). You can use NBT, recompute the UNF, and verify for certain that the data set you’re downloading is the same one you created originally. That is, the UNF will not change.
3. **It identifies the data without access to them.** Knowing only the UNF, journal editors can be confident that they are referencing a specific data set that never can be changed, even if they do not have permission to see the data. In a sense, the UNF is the ultimate summary statistic.
4. **It reveals nothing about the data.** The UNF’s noninvertible, cryptographic properties guarantee that acquiring the UNF of a data set conveys no information about the content of the data. Authors can take advantage of this property to distribute the full citation of a data set, including the UNF, even if the data is proprietary or highly confidential, all without the risk of disclosure.

### Implementing the UNF

- [Technical UNF documentation](https://guides.dataverse.org/en/latest/developers/unf/index.html) in the Dataverse Developer Guide
- Micah Altman’s paper “[A Fingerprint Method for Scientific Data Verification](https://doi.org/10.1007/978-1-4020-8741-7_57)” (Altman 2008)

## References and Further Reading

- Altman, Micah. 2008. “[A Fingerprint Method for Scientific Data Verification](https://doi.org/10.1007/978-1-4020-8741-7_57).” In *Advances in Computer and Information Sciences and Engineering*, 311–316. Dordrecht: Springer.
- Altman, Micah, and Mercè Crosas. 2013. “[The Evolution of Data Citation: From Principles to Implementation](https://doi.org/10.29173/iq504).” *IASSIST Quarterly* 37 (1–4): 62–70.
- Altman, Micah, and Gary King. 2007. “[A Proposed Standard for the Scholarly Citation of Quantitative Data](https://gking.harvard.edu/publication/a-proposed-standard-for-the-scholarly-citation-of-quantitative-data/).” *D-Lib Magazine* 13 (3/4).
- Hanmer, Michael J., Antoine J. Banks, and Ismail K. White. 2014. “[Experiments to Reduce the Over-Reporting of Voting: A Pipeline to the Truth](https://doi.org/10.1093/pan/mpt027).” *Political Analysis* 22 (1): 130–141.
- King, Gary. 1995. “[Replication, Replication](https://gking.harvard.edu/publication/replication-replication/).” *PS: Political Science and Politics* 28 (3): 444–452.
- King, Gary, and Langche Zeng. 2007. “[When Can History Be Our Guide? The Pitfalls of Counterfactual Inference](https://gking.harvard.edu/publication/when-can-history-be-our-guide-the-pitfalls-of-counterfactual-inference/).” *International Studies Quarterly* 51 (1): 183–210.
- National Research Council. 2012. *[For Attribution: Developing Data Attribution and Citation Practices and Standards: Summary of an International Workshop](https://doi.org/10.17226/13564)*. Paul F. Uhlir, rapporteur. Washington, DC: The National Academies Press.
