$(document).ready(function() {
  
  var data = [
    {
      "date":"2013-11-01T08:18:24",
      "scale":"1",
    },
    {
      "date":"2013-11-02T08:16:57.906",
      "scale":"2",
    },
    {
      "date":"2013-11-03T06:17:52",
      "scale":"3",
    },
    {
      "date":"2013-11-04T08:17",
      "scale":"4",
    },
    {
      "date":"2013-11-05T08:17",
      "scale":"5",
    },
    {
      "date":"2013-11-06T08:17",
      "scale":"6",
    },
    {
      "date":"2013-11-07T08:17",
      "scale":"7",
    },
    {
      "date":"2013-11-01T08:18:24",
      "scale":"1",
    },
    {
      "date":"2013-11-02T08:16:57.906",
      "scale":"1",
    },
    {
      "date":"2013-11-03T06:17:52",
      "scale":"1",
    },
    {
      "date":"2013-11-04T08:17",
      "scale":"1",
    },
    {
      "date":"2013-11-05T08:17",
      "scale":"1",
    },
    {
      "date":"2013-11-06T08:17",
      "scale":"1",
    },
    {
      "date":"2013-11-07T08:17",
      "scale":"1",
    }
  ];

  // Format proper array from data
  var dataArray = []; // this will be our final array
  for (var i = 0; i < data.length; i++) {
    var getDate = data[i].date,
        newDate = moment(getDate).format("MDYYYY"),
        datesObj = {
                    date: newDate,
                    scale: parseInt(data[i].scale)
                  };
    dataArray.push(datesObj);
  }

  var daysAmt = 7;

  // Creates Array for date with 'daysAmt'
  var dates = [];
  for (var i = 0; i < daysAmt; i++) {
    var formattedDate = new Date('2013-11-07T08:17'),
        dayOfWeek = null;
    formattedDate.setDate(formattedDate.getDate() - (1 * i));
    dayOfWeek = moment(formattedDate).format('ddd');
    formattedDate = moment(formattedDate).format("MDYYYY");
    var dateObj = {
      date: formattedDate,
      day: dayOfWeek
    };
    dates.push(dateObj);
  }
  
  // Creates array for x and y axis on graph
  var axisArray = [],
      scale,
      date,
      day,
      amt;
  for (var i = 0; i < dates.length; i++) {
      scale = 0;
      amt = 0;
      for (var j = 0; j < dataArray.length; j++) {
          date = dates[i].date;
          day = dates[i].day;
          if (dates[i].date === dataArray[j].date) {
            amt += 1;
            scale += dataArray[j].scale;
          }
      }
    if (scale !== 0) {
      scale /= amt;
    }

    var axisObj = {
      x: day,
      y: scale
    };
    axisArray.push(axisObj);
  }

  // Formats graph if there is no data
  var emptyArray;

  for (var i = 0; i < axisArray.length; i++) {
    if (axisArray[i].y === 0) {
      emptyArray = true;
    } else {
      emptyArray = false;
      break;
    }
  }

  if (emptyArray) {
    axisArray = [];
    $('.graph-title').text('Graph available upon data input for last 7 days.');
    $('.graph-container').css('height', '36px');
  } else {
    axisArray = axisArray.reverse();
  }

  //Create object to be put into graph
 var graphData = [
                  {
                    key: 'Series #1',
                    values: axisArray,
                    color: '#000'
                  }
                ];



  nv.addGraph(function() {
    var chart = nv.models.discreteBarChart()
                .tooltips(false)
                .showValues(true)
                .valueFormat(d3.format(',r'));

    chart.yDomain([0, 10]);

    // Adds different colors based on number
    chart.color(function(d) {
      if (d.y <= "3") {
        return '#28BE68';
      }
      if (d.y >= "4" && d.y <= "7") {
        return '#F1C410';
      }
      if (d.y >= "8") {
        return '#C0392B';
      }
    });

    chart.noData('No data for last 7 days.');

    chart.xAxis
      .axisLabel("Previous 7 days");

    chart.yAxis
      .axisLabel("Severity")
      .tickFormat(d3.format(',r'));

    d3.select('#chart svg')
      .datum(graphData)
      .transition().duration(250).call(chart);

    nv.utils.windowResize(
        function() {
          chart.update();
        }
      );

      return chart;
    });
});