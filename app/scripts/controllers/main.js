app.controller('MainCtrl', function($scope) {

  $scope.stores = [{
    'lat': 19.191766,
    'long': 72.9660344,
    'fname': 'DG Mobile Service',
    'address': 'Shop No 5, Dev prayag CHS, Bhakti Mandir Road, Opp Thanawala Garage, Hariniwas Circle, Thane, Maharashtra, 400601',
    'phone': '022-25443357',
    'name': 'B2X THANE MUMBAI'
  },
  {
    'lat': 18.5155098,
    'long': 73.8489701,
    'fname': 'Pulse Enterprise Solutions',
    'address': 'Shop No 7 , Garud Apartment , 518 , Narayan Peth , Near Modi Ganpati Temple,Front Of Maharashtra Rashtrabhasha Bhavan, Pune, Maharashtra, 411030',
    'phone': '02030261117',
    'name': 'B2X PUNE 2'
  },
  {
    'lat': 18.5262858,
    'long': 73.8427269,
    'fname': 'Kavya Enterprises',
    'address': 'Shop-3/4,C Wing,Shrinath Plaza,Dnyaneshwar Paduka Chauk,F.C.Road,Shivajinagar, Pune, Maharashtra, 411005',
    'phone': 2030473030,
    'name': 'B2X PUNE 3'
  },
  {
    'lat': 28.6902444,
    'long': 77.1343118,
    'fname': 'Max Mobile Care ',
    'address': 'Shop No. 56, 57, Aggarwal City Mall, Pitampura, North Delhi, Delhi, 110036',
    'phone': 9999266600,
    'name': 'B2X PITAMPURA DELHI'
  },
  {
    'lat': 28.6305271,
    'long': 77.0796378,
    'fname': 'APS System',
    'address': 'UG 7, Westend Tower, District Center, Janakpuri, West Delhi, Delhi, 110058',
    'phone': 9136512345,
    'name': 'B2X JANAKPURI DELHI'
  },
  {
    'lat': 28.6271433,
    'long': 77.2795273,
    'fname': 'Vanshika Electronics',
    'address': 'WA - 118, Shakarpur Mother Dairy Road, Delhi, 110092',
    'name': 'B2X EAST DELHI'
  },
  {
    'lat': 26.9157724,
    'long': 75.8093011,
    'fname': 'Kanchan Infocom',
    'address': '117 Mall 21, Opp Raj Mandir, PanchBati, M.I Road, Jaipur, Rajsthan, 302003',
    'phone': 9829019021,
    'name': 'B2X MI ROAD JAIPUR'
  },
  {
    'lat': 28.5714138,
    'long': 77.3280835,
    'fname': 'Vanshika Electronics',
    'address': 'G-7 & 8 Ground Floor, Dharampali Place, Bhoj Mkt, Behind Vinayak Hospital, Noida, Delhi, 201301',
    'phone': 9582443363,
    'name': 'B2X BHOJ MARKET NOIDA'
  },
  {
    'lat': 28.6627029,
    'long': 77.4349815,
    'fname': 'Immortal Services',
    'address': '92, 1st Floor, Ambedkar Road, Near Kalka Garhi Chowk, Ghazibad, UP, 201001',
    'phone': '0120-2791122',
    'name': 'B2X GHAZIABAD'
  },
  {
    'lat': 28.5027291,
    'long': 77.0290977,
    'fname': 'Novatta Innovatie',
    'address': 'GF-13 Spanish Court, Ansal Palam Vihar,Gurgaon, Haryana, 122017',
    'phone': 9873583020,
    'name': 'B2X ANSAL PALAM GURGAON'
  },
  {
    'lat': 28.4805,
    'long': 77.3104,
    'fname': 'Viaan Services',
    'address': 'SCF 143, 1st  Floor, HUDA Market, Sector-37 Faridabad, Haryana, 121003',
    'phone': 1294103222,
    'name': 'B2X SEC 37 FARIDABAD'
  }
  ];

  /*======= JSON to CSV Code STARTS =========*/
  $scope.downloadReport = function(JSONData, showLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line
    //CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (showLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ',';
      }

      row = row.slice(0, -1);
      //append Label row with line break
      CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
        // row += '="' + arrData[i][index] + '",';
        // row += "'" + arrData[i][index] + ",";
        //"=""Data Here"""
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + '\r\n';
    }

    if (CSV == '') {
      alert("Invalid data");
      return;
    }

    //Generate a file name
    var fileName = "StoreList";

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    // link.download = fileName + ".csv";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }; //JSONToCSVConvertor

  /*======= JSON to CSV Code ENDS =========*/
  $scope.$on('mapInitialized', function(event, map) {
    $scope.objMapa = map;
  });

  $scope.showInfoWindow = function(event, p) {
    // console.log('11111', p);
    var infowindow = new google.maps.InfoWindow();
    var center = new google.maps.LatLng(p.lat, p.long);

    infowindow.setContent(
      '<h4>' + p.name + '</h4><br /> ' + p.address);

    infowindow.setPosition(center);
    infowindow.open($scope.objMapa);
  };

});
