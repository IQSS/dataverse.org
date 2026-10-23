// Use cases published by the Dataverse team at https://github.com/IQSS/dataverse-use-cases.
// Markdown bodies are copied verbatim into content/use-cases/ (image paths rewritten to
// public/use-cases/<slug>/images/); titles, audiences and summaries below are editorial.
import cafeGrei from "../content/use-cases/cafe_grei.md";
import gspGrei from "../content/use-cases/gsp_grei.md";
import dataSeeking from "../content/use-cases/hdv_data_seeking.md";
import datasetReporting from "../content/use-cases/hdv_dataset_reporting.md";
import institutionalRepository from "../content/use-cases/hdv_institutional_repository.md";
import largeData from "../content/use-cases/hdv_large_data.md";
import nihDataSharing from "../content/use-cases/hdv_nih_data_sharing.md";
import nihFundedDatasets from "../content/use-cases/hdv_nih_funded_datasets.md";

export type UseCase = {
  slug: string;
  title: string;
  audience: "Researchers" | "Institutions" | "Funders" | "Research teams";
  kind: "Data sharing story" | "Case study";
  summary: string;
  image: string;
  imageAlt: string;
  /** Card thumbnail when the hero image carries baked-in text; "contain" shows a logo on white. */
  card?: { src: string; fit: "cover" | "contain" };
  citation: string;
  doi: string;
  featured?: boolean;
  /** Where the homepage card links: the collection or dataset the story is about (Harvard Dataverse itself for general scenarios). */
  repository: { href: string; label: string };
  body: string;
};

const repo = "https://github.com/IQSS/dataverse-use-cases/tree/main/use_cases";

export const useCases: UseCase[] = [
  {
    slug: "cafe_grei",
    repository: { href: "https://dataverse.harvard.edu/dataverse/CAFE", label: "CAFE collection" },
    title: "A Data-Sharing Community for Health and Extreme Weather",
    audience: "Research teams",
    kind: "Data sharing story",
    summary: "CAFE RCC, the NIH-funded Research Coordinating Center at Boston University and Harvard Chan, built a 48-collection data-sharing environment on Harvard Dataverse with the Dataverse team.",
    image: "/use-cases/cafe_grei/images/cafe-dataverse-collection.jpg",
    imageAlt: "The CAFE collection page on Harvard Dataverse",
    citation: "Barbosa, S., Braun, D., Lane, K., Gilmour, J., Boyd, C., Guanche, A., Katz, E., & Treacy, R. (2026). Harvard Dataverse Repository Data Sharing User Story: Creating a Data Sharing Community - CAFE RCC. Zenodo.",
    doi: "https://doi.org/10.5281/zenodo.18489235",
    featured: true,
    body: cafeGrei,
  },
  {
    slug: "gsp_grei",
    repository: { href: "https://doi.org/10.7910/DVN/25833", label: "GSP dataset" },
    title: "Sharing the Brain Genomics Superstruct Project",
    audience: "Researchers",
    kind: "Data sharing story",
    summary: "Neuroimaging, behavioral, cognitive and personality data from more than 1,500 participants, released openly on Harvard Dataverse and reused in Nature Medicine and Journal of Neuroscience papers.",
    image: "/use-cases/gsp_grei/images/gsp-dataset-page.jpg",
    imageAlt: "The Brain Genomics Superstruct Project dataset page on Harvard Dataverse",
    citation: "Barbosa, S., & Buckner, R. (2026). Harvard Dataverse Repository Data Sharing User Story: Sharing the Brain Genomics Superstruct Project (GSP). Zenodo.",
    doi: "https://doi.org/10.5281/zenodo.18489334",
    featured: true,
    body: gspGrei,
  },
  {
    slug: "hdv_large_data",
    repository: { href: "https://doi.org/10.7910/DVN/PCZYL4", label: "DrivAerNet++ dataset" },
    title: "Sharing Big Data",
    audience: "Researchers",
    kind: "Case study",
    summary: "How DrivAerNet++, 16 terabytes of automotive simulation data from MIT and TUM, is stored on tape and downloaded through Globus from Harvard Dataverse.",
    image: "/use-cases/hdv_large_data/images/header-banner.jpg",
    imageAlt: "Microscopy image from the NIH Image Gallery",
    card: { src: "/use-cases/hdv_large_data/images/drivaernet-files-tab.jpg", fit: "cover" },
    citation: "Gautier, J., Durand, G., Boyd, C., & Barbosa, S. (2025). Use Cases, Harvard Dataverse Repository. Zenodo.",
    doi: "https://doi.org/10.5281/zenodo.14782026",
    featured: true,
    body: largeData,
  },
  {
    slug: "hdv_nih_data_sharing",
    repository: { href: "https://doi.org/10.7910/DVN/FPO4HB", label: "HemOnc ontology dataset" },
    title: "Meeting an NIH Data Management and Sharing Plan",
    audience: "Researchers",
    kind: "Case study",
    summary: "An NIH-funded researcher deposits project data so that it satisfies the data management and sharing plan and the conditions of the grant.",
    image: "/use-cases/hdv_nih_data_sharing/images/header-banner.jpg",
    imageAlt: "Microscopy image from the NIH Image Gallery",
    card: { src: "/use-cases/hdv_nih_data_sharing/images/grei-logo.jpg", fit: "contain" },
    citation: "Gautier, J., Durand, G., Boyd, C., & Barbosa, S. (2025). Use Cases, Harvard Dataverse Repository. Zenodo.",
    doi: "https://doi.org/10.5281/zenodo.14782026",
    body: nihDataSharing,
  },
  {
    slug: "hdv_data_seeking",
    repository: { href: "https://dataverse.harvard.edu/", label: "Harvard Dataverse" },
    title: "Finding Data to Reuse",
    audience: "Researchers",
    kind: "Case study",
    summary: "A researcher searches a generalist repository to validate findings, reuse data and build on work within a discipline.",
    image: "/use-cases/hdv_data_seeking/images/header-banner.jpg",
    imageAlt: "Microscopy image from the NIH Image Gallery",
    card: { src: "/use-cases/hdv_data_seeking/images/grei-logo.jpg", fit: "contain" },
    citation: "Gautier, J., Durand, G., Boyd, C., & Barbosa, S. (2025). Use Cases, Harvard Dataverse Repository. Zenodo.",
    doi: "https://doi.org/10.5281/zenodo.14782026",
    body: dataSeeking,
  },
  {
    slug: "hdv_institutional_repository",
    repository: { href: "https://dataverse.harvard.edu/", label: "Harvard Dataverse" },
    title: "Harvard Dataverse as an Institutional Data Repository",
    audience: "Institutions",
    kind: "Case study",
    summary: "An institution gives its researchers a place to deposit and share outputs, reports on aggregate usage, and connects the repository to other systems through APIs.",
    image: "/use-cases/hdv_institutional_repository/images/header-banner.jpg",
    imageAlt: "Microscopy image from the NIH Image Gallery",
    card: { src: "/use-cases/hdv_institutional_repository/images/grei-logo.jpg", fit: "contain" },
    citation: "Gautier, J., Durand, G., Boyd, C., & Barbosa, S. (2025). Use Cases, Harvard Dataverse Repository. Zenodo.",
    doi: "https://doi.org/10.5281/zenodo.14782026",
    body: institutionalRepository,
  },
  {
    slug: "hdv_dataset_reporting",
    repository: { href: "https://dataverse.harvard.edu/", label: "Harvard Dataverse" },
    title: "Reporting on an Institution's Datasets",
    audience: "Institutions",
    kind: "Case study",
    summary: "An administrator tracks every dataset from the institution in Harvard Dataverse to confirm that researchers meet their data-sharing commitments.",
    image: "/use-cases/hdv_dataset_reporting/images/header-banner.jpg",
    imageAlt: "Microscopy image from the NIH Image Gallery",
    card: { src: "/use-cases/hdv_dataset_reporting/images/grei-logo.jpg", fit: "contain" },
    citation: "Gautier, J., Durand, G., Boyd, C., & Barbosa, S. (2025). Use Cases, Harvard Dataverse Repository. Zenodo.",
    doi: "https://doi.org/10.5281/zenodo.14782026",
    body: datasetReporting,
  },
  {
    slug: "hdv_nih_funded_datasets",
    repository: { href: "https://dataverse.harvard.edu/", label: "Harvard Dataverse" },
    title: "Tracking NIH-Funded Datasets",
    audience: "Funders",
    kind: "Case study",
    summary: "A funder finds the datasets it supported, reports on policy compliance and follows how the data is used.",
    image: "/use-cases/hdv_nih_funded_datasets/images/header-banner.jpg",
    imageAlt: "Microscopy image from the NIH Image Gallery",
    card: { src: "/use-cases/hdv_nih_funded_datasets/images/grei-logo.jpg", fit: "contain" },
    citation: "Gautier, J., Durand, G., Boyd, C., & Barbosa, S. (2025). Use Cases, Harvard Dataverse Repository. Zenodo.",
    doi: "https://doi.org/10.5281/zenodo.14782026",
    body: nihFundedDatasets,
  },
];

export const useCaseRepo = repo;
export const findUseCase = (slug: string) => useCases.find((item) => item.slug === slug);

/** Homepage "Dataverse in Practice" cards that are not published use cases: no Zenodo write-up,
 *  so they link out to the guide and to the archived talks instead of a story page. */
export const practiceFeatures = [
  {
    title: "Indigenous Data With Local Contexts Labels and Notices",
    audience: "Research teams",
    kind: "Feature",
    summary: "Dataverse connects to the Local Contexts Hub, so a dataset page can display the Traditional Knowledge and Biocultural Labels and Notices that an Indigenous community has applied to its data.",
    link: { href: "https://guides.dataverse.org/en/latest/installation/localcontexts.html", label: "Local Contexts guide" },
    talks: [
      { href: "/presentations/australian-data-archive-ada-and-australian-national-university-anu-and", label: "OR 2023" },
      { href: "/presentations/establishing-means-providing-suitable-representation-indigenous-knowledge", label: "IASSIST 2023" },
    ],
  },
];
