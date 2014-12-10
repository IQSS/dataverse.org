
function load_chart(){
        $('#container').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'data file downloads'
            },
            subtitle: {
                text: 'Source: <a href="http://www.iq.harvard.edu/about-us">' +
                    'Harvard University IQSS</a>'
            },
            xAxis: {
                        categories: [{% for stat in download_stats %}'{{ stat.retrieval_date|date:"m/y" }}'{% if not forloop.last %},{% endif %}{% endfor %}],
                        title: {
                            enabled: false
                        },
                         tickInterval: 5,
                         tickPixelInterval: 80,
                         tickmarkPlacement: 'on'
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
                pointFormat: '<b>{point.y:,.0f}</b> files downloaded from dataverse'
            },
            plotOptions: {
                  area: {
                      stacking: 'normal',
                      lineColor: '#666666',
                      lineWidth: 1,
                      marker: {
                          lineWidth: 1,
                          lineColor: '#666666'
                      }
                  }
              },
            series: [
                {
                    name: 'Total Downloaded Data Files',
                    data: [{% for stat in download_stats %}{{ stat.cumulative_count }}{% if not forloop.last %},{% endif %}{% endfor %}]
                //    data: [100, 250, 1000, 3240, 5600, 7900, 11000]
                },
             
                {
                    name: 'Monthly Downloads',
                    data: [{% for stat in download_stats %}{{ stat.month_count }}{% if not forloop.last %},{% endif %}{% endfor %}],
                    marker: {
                                    symbol: 'triangle',
                                    fillColor: '#FFFFFF',
                                    
                                },
            }
            ]
        });
}


