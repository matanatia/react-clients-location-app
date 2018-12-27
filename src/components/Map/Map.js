import React, { Component } from 'react';
import "./Map.css";


class Map extends Component {

    constructor() {
      super();
      //if map dosnt work replace spi key in the url
      //if want in heb insert to thr url "&language=heb&" insted "&language=en&"
      loadScript ("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&language=en&callback=initMap");
      //init the map for the first time with the default props
      window.initMap = this.initMap;
    }

    loadMap() { 
        //if the script in the constarctor has loaded init the map
        if (window.google){
          this.initMap();
        }
    }

    initMap = () => {

        var myLatLng = {lat: this.props.lat, lng: this.props.lng};
        var zoom = this.props.zoom;

        //config the map
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: myLatLng ,
          zoom: zoom
        });

        //search for the location (lat, lng) of the address with google geo coder 
        var geocoder = new window.google.maps.Geocoder();
        this.geocodeAddress(geocoder, map);
    }

    //search for the location (lat, lng) of the address with google geo coder and update the map with the location
    geocodeAddress = (geocoder, resultsMap) => {

        var address = this.props.add;

        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);

            //creat maker in the location 
            var marker = new window.google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              title: address,
              //label: { text: address , color: "red", fontWeight: "bold"},
              
              //icon: {
              //  labelOrigin: new window.google.maps.Point(80, 330),
              //  url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless2_hdpi.png',
              //  size: 1
              //},
            });
          } else {//if the location wasn't found
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
    }

    render() {
        
        this.loadMap();

        return (
        <main>
            <div id="map"></div>
        </main>
        );
    }
  }
  
  
  /*
    plain js function for loading the script tag of the map in here and not past him at the index.html file - 

    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

  */
  function loadScript (url) {
    //get the first script tag in the page
    var firstScript = document.querySelector("script");
    //creating the script
    var ourScript = document.createElement("script");
    ourScript.src = url;
    ourScript.async = true;
    ourScript.defer = true;
    //insert the new script to be the first in the page
    firstScript.parentNode.insertBefore(ourScript, firstScript);
  } 

  export default Map;