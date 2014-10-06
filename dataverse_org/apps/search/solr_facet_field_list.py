
DVTYPE_KEY = 'dvtype'
DV_TYPE_VALUES = ( 'dataverses','datasets','files')
DV_TYPE_LABELS = ('Dataverses', 'Datasets', 'Files')
DV_TYPE_CHOICES = zip(DV_TYPE_VALUES, DV_TYPE_LABELS )

facet_field_dict = {
         DVTYPE_KEY : 'Type'\
        , 'affiliation_ss' : 'Affiliation'\
        , 'astroFacility_ss' : 'Astro Facility'\
        , 'astroInstrument_ss' : 'displayName'\
        , 'astroObject_ss' : 'displayName'\
        , 'astroType_ss' : 'displayName'\
        , 'authorAffiliation_ss' : 'displayName'\
        , 'authorName_ss' : 'Author Name'\
        , 'contributorName_ss' : 'displayName'\
        , 'contributorType_ss' : 'displayName'\
        , 'country_ss' : 'displayName'\
        , 'coverage.Spectral.Bandpass_ss' : 'displayName'\
        , 'coverage.Spectral.CentralWavelength_ss' : 'displayName'\
        , 'coverage.Spectral.MaximumWavelength_ss' : 'displayName'\
        , 'coverage.Spectral.MinimumWavelength_ss' : 'displayName'\
        , 'coverage.Temporal.StartTime_ss' : 'displayName'\
        , 'coverage.Temporal.StopTime_ss' : 'displayName'\
        , 'dateOfDeposit_s' : 'Date of Deposit'\
        , 'distributorName_ss' : 'Distributor Name'\
        , 'filetype_s' : 'displayName'\
        , 'keyword_ss' : 'Keyword'\
        , 'language_ss' : 'Language'\
        , 'producerName_ss' : 'Producer Name'\
        , 'productionDate_s' : 'Production Date'\
        , 'publication_date_s' : 'Publication Date'\
        , 'resolution.Spatial_s' : 'displayName'\
        , 'resolution.Spectral_s' : 'displayName'\
        , 'studyAssayCellType_ss' : 'displayName'\
        , 'studyAssayMeasurementType_ss' : 'displayName'\
        , 'studyAssayOrganism_ss' : 'displayName'\
        , 'studyDesignType_ss' : 'displayName'\
        , 'studyFactorType_ss' : 'displayName'\
        , 'subject_ss' : 'Subject'\
        , 'timePeriodCoveredEnd_ss' : 'displayName'\
        , 'timePeriodCoveredStart_ss' : 'displayName'\
        , 'topicClassValue_ss' : 'displayName'\
    }

facet_field_list = facet_field_dict.keys()
'''q=foobar&sort=score+desc&hl=true&hl.snippets=1&hl.simple.pre=%3Cspan+class%3D%22search-term-match%22%3E&hl.simple.post=%3C%2Fspan%3E&hl.fl=astroFacility&hl.fl=producerAffiliation&hl.fl=kindOfData&hl.fl=grantNumberValue&hl.fl=timePeriodCoveredStart&hl.fl=filetype_en&hl.fl=dsDescription&hl.fl=studyDesignType&hl.fl=city&hl.fl=contributor&hl.fl=sampleFrame&hl.fl=variable_name_en&hl.fl=studyAssayMeasurementType&hl.fl=geographicUnit&hl.fl=dateOfDeposit&hl.fl=coverage.ObjectDensity&hl.fl=otherIdValue&hl.fl=universe&hl.fl=datasetContact&hl.fl=geographicCoverage&hl.fl=producerName&hl.fl=distributorAbbreviation&hl.fl=relatedDatasets&hl.fl=redshiftType&hl.fl=publicationIDNumber&hl.fl=grantNumber&hl.fl=language&hl.fl=otherId&hl.fl=publicationCitation&hl.fl=originOfSources&hl.fl=resolution.Spectral&hl.fl=series&hl.fl=westLongitude&hl.fl=subject&hl.fl=dateOfCollectionStart&hl.fl=otherDataAppraisal&hl.fl=coverage.SkyFraction&hl.fl=distributorAffiliation&hl.fl=title&hl.fl=southLongitude&hl.fl=coverage.Depth&hl.fl=coverage.Redshift.MaximumValue&hl.fl=coverage.Spectral.Wavelength&hl.fl=coverage.Spectral.Bandpass&hl.fl=otherGeographicCoverage&hl.fl=geographicBoundingBox&hl.fl=resolution.Redshift&hl.fl=studyAssayCellType&hl.fl=topicClassValue&hl.fl=variable_label_en&hl.fl=otherReferences&hl.fl=timeMethod&hl.fl=researchInstrument&hl.fl=coverage.Spectral.CentralWavelength&hl.fl=contributorType&hl.fl=collectorTraining&hl.fl=accessToSources&hl.fl=publicationIDType&hl.fl=frequencyOfDataCollection&hl.fl=coverage.Redshift.MinimumValue&hl.fl=dataCollectionSituation&hl.fl=producer&hl.fl=unitOfAnalysis&hl.fl=coverage.Temporal&hl.fl=coverage.Spectral.MaximumWavelength&hl.fl=astroObject&hl.fl=publicationURL&hl.fl=northLongitude&hl.fl=characteristicOfSources&hl.fl=timePeriodCovered&hl.fl=software&hl.fl=otherIdAgency&hl.fl=dateOfCollection&hl.fl=responseRate&hl.fl=topicClassVocabURI&hl.fl=description&hl.fl=studyAssayOrganism&hl.fl=deviationsFromSampleDesign&hl.fl=coverage.Temporal.StartTime&hl.fl=notesText&hl.fl=grantNumberAgency&hl.fl=eastLongitude&hl.fl=topicClassVocab&hl.fl=filetypemime_s&hl.fl=topicClassification&hl.fl=samplingProcedure&hl.fl=country&hl.fl=authorAffiliation&hl.fl=actionsToMinimizeLoss&hl.fl=authorIdentifierScheme&hl.fl=authorName&hl.fl=targetSampleSize&hl.fl=coverage.Spectral.MinimumWavelength&hl.fl=collectionMode&hl.fl=coverage.Polarization&hl.fl=resolution.Temporal&hl.fl=producerAbbreviation&hl.fl=dataCollector&hl.fl=state&hl.fl=productionDate&hl.fl=coverage.Spatial&hl.fl=samplingErrorEstimates&hl.fl=authorIdentifier&hl.fl=author&hl.fl=studyFactorType&hl.fl=coverage.RedshiftValue&hl.fl=name&hl.fl=coverage.Temporal.StopTime&hl.fl=softwareVersion&hl.fl=distributor&hl.fl=timePeriodCoveredEnd&hl.fl=filename_without_extension_en&hl.fl=astroType&hl.fl=keyword&hl.fl=cleaningOperations&hl.fl=contributorName&hl.fl=coverage.ObjectCount&hl.fl=dateOfCollectionEnd&hl.fl=affiliation_ss&hl.fl=softwareName&hl.fl=publication&hl.fl=astroInstrument&hl.fl=distributorName&hl.fl=relatedMaterial&hl.fl=seriesName&hl.fl=weighting&hl.fl=datasetLevelErrorNotes&hl.fl=controlOperations&hl.fl=seriesInformation&hl.fl=dataSources&hl.fl=depositor&hl.fl=productionPlace&hl.fl=resolution.Spatial&qt=%2Fspell&facet=true&facet.query=*&fq=dvtype%3A%28dataverses+OR+datasets+OR+files%29&fq=%7B%21join+from%3Dgroups_s+to%3Dperms_ss%7Did%3Agroup_public&facet.field=affiliation_ss&facet.field=publication_date_s&facet.field=authorName_ss&facet.field=authorAffiliation_ss&facet.field=subject_ss&facet.field=keyword_ss&facet.field=language_ss&facet.field=timePeriodCoveredStart_ss&facet.field=timePeriodCoveredEnd_ss&facet.field=producerName_ss&facet.field=productionDate_s&facet.field=contributorType_ss&facet.field=contributorName_ss&facet.field=distributorName_ss&facet.field=dateOfDeposit_s&facet.field=country_ss&facet.field=topicClassValue_ss&facet.field=astroType_ss&facet.field=astroFacility_ss&facet.field=astroInstrument_ss&facet.field=astroObject_ss&facet.field=resolution.Spatial_s&facet.field=resolution.Spectral_s&facet.field=coverage.Spectral.Bandpass_ss&facet.field=coverage.Spectral.CentralWavelength_ss&facet.field=coverage.Spectral.MinimumWavelength_ss&facet.field=coverage.Spectral.MaximumWavelength_ss&facet.field=coverage.Temporal.StartTime_ss&facet.field=coverage.Temporal.StopTime_ss&facet.field=studyDesignType_ss&facet.field=studyFactorType_ss&facet.field=studyAssayMeasurementType_ss&facet.field=studyAssayOrganism_ss&facet.field=studyAssayCellType_ss&facet.field=filetype_s&facet.field=dvtype&start=0&rows=10'''
