 $(function () {
    $('#container').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'dataset growth'
        },
        subtitle: {
            text: 'Source: <a href="http://www.iq.harvard.edu/about-us">' +
                'Harvard University IQSS</a>'
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: 'Count'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
//            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            pointFormat: '<b>{point.y:,.0f}</b> datasets available in dataverse'
        },
        plotOptions: {
            area: {
                pointStart: 2002,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
              name: 'Total Deposited Datasets',
                data: [100, 250, 1000, 3240, 5600, 7900, 11000,
                        15000, 22000, 29000, 34000, 49000, 57000
                 ]        
            }
            //, {
            //    name: 'Dataverses',
            //data: [1, 10, 19, 125, 127, 232, 265,
             //    277, 350, 355, 465, 595, 772
              //   ]
        //}
        ]
    });
});