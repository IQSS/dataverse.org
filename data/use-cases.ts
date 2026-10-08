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
  kind: "Data sharing story" | "Worked scenario";
  summary: string;
  image: string;
  imageAlt: string;
  /** Card thumbnail when the hero image carries baked-in text; "contain" shows a logo on white. */
  card?: { src: string; fit: "cover" | "contain" };
  citation: string;
  doi: string;
  featured?: boolean;
  body: string;
};

const repo = "https://github.com/IQSS/dataverse-use-cases/tree/main/use_cases";

export const useCases: UseCase[] = [
  {
    slug: "cafe_grei",
    title: "A data-sharing community for health and extreme weather",
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
    title: "Sharing big data",
    audience: "Researchers",
    kind: "Worked scenario",
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
    title: "Meeting an NIH data management and sharing plan",
    audience: "Researchers",
    kind: "Worked scenario",
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
    title: "Finding data to reuse",
    audience: "Researchers",
    kind: "Worked scenario",
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
    title: "Harvard Dataverse as an institutional data repository",
    audience: "Institutions",
    kind: "Worked scenario",
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
    title: "Reporting on an institution's datasets",
    audience: "Institutions",
    kind: "Worked scenario",
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
    title: "Tracking NIH-funded datasets",
    audience: "Funders",
    kind: "Worked scenario",
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
