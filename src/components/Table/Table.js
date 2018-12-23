import React, { Component } from 'react';
import ClientsJson from '../../data/clients.json';
import './Table.css';

import List from "../List/List";
import Map from "../Map/Map";

class Table extends Component {
    
    constructor(){
        super();

        //get the date from json
        this.customersData = ClientsJson.Customers;
        //get the contries in data - remove duplecate and sort
        this.countries = this.customersData.map(customer => customer.Country)
        .filter((contry, index, self) => index === self.indexOf(contry)).sort();

        this.state = {
            coloredElements : { contry: null , city: null, company: null},
            cities : [],
            companies : [],
            lngForMap : 0,
            latForMap : 0,
            addForMap : "Israel",
            mapZoom : 7
        }
     }
    
    //toggle the Color between the <li> the user pressed
    toggleColor = (id, type) => {
        //get the element the user clicked
        var element = document.querySelector("[data-id="+id+"]");

        //check if their is an other element colored with the same type (contry/city/company) of the element that was clicked
        if (this.state.coloredElements[type] !== null) {
            //remove the color from the previose selected element
            this.state.coloredElements[type].classList.toggle("selected");
        }

        //colored the current selected element
        element.classList.toggle("selected");
        //save the element in the state
        var newColoredElements = this.state.coloredElements;
        newColoredElements[type] = element;
        this.setState({ coloredElements : newColoredElements });
    }

    //when user clicked on a contry
    countrySelected = e => {
        var contry = e.currentTarget.dataset.id;
        //toggle color for the li the user clicked
        this.toggleColor(contry, "contry");
        
        //get the cities that are in the selected contry 
        var cities = this.customersData.filter(customer => customer.Country.replace(/[. ,:-]+/g, "-") === contry)
                       .map(customer => customer.City)
                       .filter((city, index, self) => index === self.indexOf(city)).sort();

        //set the new cities data to the table
        this.setState({cities : cities});
        //update map to focus on the contry the user clicked 
        this.setState({addForMap : contry });
        //clean the other data in the table from the previos selections the user do
        this.setState({companies : []});
    }

    //when user clicked on a city
    citySelected = e => {
        var city = e.currentTarget.dataset.id;
        //toggle color for the li the user clicked
        this.toggleColor(city, "city");

        //get the companies names that are in the selected city
        var companies = this.customersData.filter(customer => customer.City.replace(/[. ,:-]+/g, "-") === city)
                            .map(customer => customer.CompanyName)
                            .filter((company, index, self) => index === self.indexOf(company)).sort();
        //update the companies data in the table
        this.setState({companies : companies});
        //update map to focus on the city the user clicked
        this.setState({addForMap : city });
        this.setState({mapZoom : 9 });
    }

    //when user clicked on a company
    companySelected = e => {
        var company = e.currentTarget.dataset.id;
        //toggle color for the li the user clicked
        this.toggleColor(company, "company");

        //get the object with the company data
        var companyObj = this.customersData.filter(customer => customer.CompanyName.replace(/[. ,:-]+/g, "-") === company);
        //get the address of the company
        var companyAdd = companyObj[0].Country+" "+companyObj[0].City+" "+companyObj[0].Address;
        //update the address in the map
        this.setState({ addForMap : companyAdd });
        this.setState({mapZoom : 18 });
    }

    render() {

        return (
        <div className="container">
        <table>
            <thead>
                <tr>
                    <th><h3>countries</h3></th>
                    <th><h3>cities</h3></th> 
                    <th><h3>company</h3></th>
                    <th className="mapSection"><h3>map</h3></th>
                </tr>
            </thead>
                
            <tbody>
                    
                <tr>
                    <td><List arr = {this.countries} sendData = {this.countrySelected}/></td>

                    <td><List arr = {this.state.cities} sendData = {this.citySelected}/></td>
                        
                    <td><List arr = {this.state.companies} sendData = {this.companySelected}/></td>
                        
                    <td><Map lng = { this.state.lngForMap }  
                             lat = { this.state.latForMap } 
                             add = { this.state.addForMap }
                             zoom = { this.state.mapZoom} />
                    </td>
                        
                </tr>
                    
            </tbody>
                
        </table> 
        </div>
        );
    }
  }
  
  export default Table;