// Fixed figures already used by this preview, not a new metrics refresh.
// Citation aggregates: citation_history.json record with unique total 3,832,052.
// Network/Harvard counts: original site source commit ae8afcc.
export const headlineMetrics = {
  installations: "150+",
  scholarlyCitations: 3832052,
  datasetsWithScholarlyCitations: 38807,
  networkDatasets: 596880,
  respondingInstallations: 123,
  datasetCitations: 15072,
  harvardDatasets: 116469,
  citationStudyDatasets: 102650,
  dataciteMatched: 102638,
  datasetsWithDatasetCitations: 11052,
};

export const formatMetric = (value: number) => value.toLocaleString("en-US");
