
 

 var columnList = ["REGION_NAME","REGION_ECOLOGICAL_CONSIDERATION","REGION_ALTERNATIVE_ENERGY_SOURCES","REGION_WEATHER_CONDITIONS","REGION_PROCESSING_CAPACITY","REGION_AREA",	
                   "REGION_INVESTMENT","REGION_TOTAL_TURNOVER","REGION_WORKFORCE","REGION_LEGAL_CLEARANCE","REGION_NATIONAL_REVENUE","REGION_PERMITS_AND_APPROVALS","	REGION_REFINERY_CONFIGURATION","REGION_LICENSE","REGION_RISK_FACTORS","REGION_PROJECT_DELIVERY_TIME","OVERALL_REGION_PERFORMANCE",
                   "SITE_NAME","SITE_RECYCLING","SITE_MAINTENANCE_COST","SITE_SAFETY_FEATURES","SITE_WORKFORCE","SITE_WASTE_WATER_TREATMENT","SITE_AIR_POLLUTION_CONTROL",
                   "SITE_ELECTRIC_POWER_SUPPLY","SITE_NATURE_SOURCE_OF_CRUDE_OILS","SITE_LOCATION","SITE_TRANSPORTATION_COST","SITE_OPERATING_COST","SITE_ENERGY_DEMANDS",
                   "SITE_PRODUCTION","SITE_RESOURCES_AVAILABILITY","SITE_FEEDSTOCK_SUPPLY","SITE_PROCESS_TECHNOLOGY","OVERALL_SITE_PERFORMANCE",
                   "REFINERY_NAME","CRUDE_OIL_API_GRAVITY","THERMAL_CRACKING_TEMPERATURE","THERMAL_CRACKING_PRESSURE","CRUDE_OIL_VISCOSITY","CRUDE_OIL_DENSITY",
                   "CRUDE_OIL_BOILING_POINT","FURNANCE_FUEL_OIL","HYDROTREATING_ORGANIC_SULPHUR_COMPOUNDS","CONDENSOR_WATER","CRUDE_OIL_ASTM_DISTILLATION",
                   "VACCUM_RESIDUE_HEAVIER_HYDROCARBONS","CRACKING_SIDE_CHAINED_AROMATICS_CHAINED_AROMATICS","CONDENSOR_NAPHTHA","COKING_FEED","GAS_PROCESSING_METHANE",
                   "REACTION_MECHANISM_PRESSURE","OLEFIN_POLYMERIZATION_PROCESS_TECHNOLOGY_C3_C4_OLEFIN_FEED","PETROLEUM_REFINERY_HYDROCARBON_BALANCES","HYDROGEN_PRODUCTION_METHANE_REFORMING","HYDROGEN_PRODUCTION_TECHNOLOGY_SULPHUR","CLAUS_H2S","OVERALL_REFINERY_PERFORMANCE","CALCULATED_REGION_PERFORMANCE",
                   "CALCULATED_SITE_PERFORMANCE"];

 
//true - disabled ; false - enabled 
var refineryColumnIsDisabledList = {"Overall_Refinery_Performance":true,"Crude_Oil_Viscosity":true,
"Claus_H2S":true,"Condensor_Water":true,"Reaction_Mechanism_Pressure":true,"Vaccum_Residue_Heavier_Hydrocarbons":false,
"Olefin_Polymerization_Process_Technology_C3_C4_Olefin_Feed":false,"Site_Name":false,"Crude_Oil_Boiling_Point":false,
"Crude_Oil_ASTM_Distillation":true,"Refinery_Name":false,"Furnance_Fuel_Oil":true,
"Cracking_Side_Chained_Aromatics_Chained_Aromatics":true,"Hydrogen_Production_Methane_Reforming":false,
"Thermal_Cracking_Temperature":true,"Thermal_Cracking_Pressure":false,"Coking_Feed":true,
"Petroleum_Refinery_Hydrocarbon_Balances":false,"Crude_Oil_Density":false,"Hydrotreating_Organic_Sulphur_Compounds":true,
"Crude_Oil_API_Gravity":true,"Gas_Processing_Methane":false,"Condensor_Naphtha":false,
"Hydrogen_Production_Technology_Sulphur":true};



function showFileName (fileInstance, fileSpanId) {
	  $("#"+fileSpanId).html(fileInstance.files[0].name);
	};

  var parentPoint = "";
  function BindChart(seriesArr) {  
	  
	  a = seriesArr;
      var columnChart = new Highcharts.chart('container', {  
          chart: {  
              
            defaultSeriesType: 'column',  
              borderWidth: 0,
              width: 650,  
               zoomType: 'x',
               backgroundColor: null,
 /*                      options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
        },*/

              events: {  
            	  

                load : function (){
       
  var content = "<h2 align='center' style='margin-top:2%;margin-bottom:4%;word-wrap: break-word;'><b><i class='fa fa-wpforms' style='margin-right:2%'></i>" + regionPoint["type"] + " Demographic Data </b></h2>"; 


     if(regionPoint.hasOwnProperty("Refinery_Name")){
	  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Refinery Name:</b></div>" ; 
	  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + regionPoint["Refinery_Name"] + "</div></div>";
	  }
     
     if(regionPoint.hasOwnProperty("Site_Name")){
   	  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Site Name:</b></div>" ; 
   	  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + regionPoint["Site_Name"] + "</div></div>";
   	  }
     
     if(regionPoint.hasOwnProperty("Region_Name")){
    	  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Region Name:</b></div>" ; 
    	  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + regionPoint["Region_Name"] + "</div></div>";
    	  }
    	  
                      for (key in regionPoint) {
                       if (regionPoint.hasOwnProperty(key) && columnList.includes(key.toUpperCase()) && (key != "type") && (key != "Region_Name") && (key != "Site_Name") && (key != "Refinery_Name")) {
                    	  keyName = key.replace(/_/g,' ');

                       content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>"+keyName+ ":</b></div>" ; 
                      content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + regionPoint[key] + "</div></div>";
                       }
                    }

                    $("#detail").html(content);
                    $("#detail").show("slide", { direction: "left" }, 1000);
                },

                  drillup : function(e) {

              

                	  var content = "<h2 align='center' style='margin-top:2%;margin-bottom:4%;word-wrap: break-word;'><b><i class='fa fa-wpforms' style='margin-right:1%'></i>" + e.seriesOptions.data[0]["type"] + " Demographic Data </b></h2>";                    
                	  
                	  
                	  if(e.seriesOptions.data[0].type == "Site"){
                    		  
                    		     if(currentSitePoint.hasOwnProperty("Refinery_Name")){
                    			  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Refinery Name:</b></div>" ; 
                    			  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + currentSitePoint["Refinery_Name"] + "</div></div>";
                    			  }	  
                    		     
                       		     if(currentSitePoint.hasOwnProperty("Site_Name")){
                       			  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Site Name:</b></div>" ; 
                       			  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + currentSitePoint["Site_Name"] + "</div></div>";
                       			  }
                		  
                           	  if(currentSitePoint.hasOwnProperty("Region_Name")){
                        		  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Region Name:</b></div>" ; 
                        		  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + currentSitePoint["Region_Name"] + "</div></div>";
                        		  }
                		  
                    for (key in currentSitePoint) {
                       if (currentSitePoint.hasOwnProperty(key) && columnList.includes(key.toUpperCase()) && (key != "type") && (key != "Region_Name") && (key != "Site_Name") && (key != "Refinery_Name")) {
                    	   
                    	   keyName = key.replace(/_/g,' ');
                           content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>"+keyName+ ":</b></div>" ; 
                          content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + currentSitePoint[key] + "</div></div>";
                    	   
                       }
                    }




                    var pieChart = new Highcharts.chart('pieContainer', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: null,
       
        type: 'pie',
 /*              options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }*/
    },
    title: {
        text: 'United Arab Emirates - Demographic Data',
                      style: {
         color: '#FFF',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },
        exporting: {
         enabled: false
},
                      credits: {
        enabled: false
    },

        tooltip : {
        formatter: function() {
            var tooltip;

          t=this;
          var performance ;

            if(this.color == "green"){
          performance = "Overall Performance : GOOD";
            }
              else    if(this.color == "yellow"){
              performance = "Overall Performance : AVERAGE";
            }
              else if(this.color == "red"){
              performance = "Overall Performance : BAD"
            }
            tooltip =  '<span style="color:' + this.color + '">' + this.key+ '<br>'+Performance +'</span><br/>';
    
            return tooltip;
        }
    }, 
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
              format: '<b>{point.name}</b>',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Regions',
        colorByPoint: true,
        data: sitePieData
    }]
});

                  }

                  else {
                		  
                		     if(currentRegionPoint.hasOwnProperty("Refinery_Name")){
                			  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Refinery Name:</b></div>" ; 
                			  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + currentRegionPoint["Refinery_Name"] + "</div></div>";
                			  }
                		     
                		     if(currentRegionPoint.hasOwnProperty("Site_Name")){
                   			  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Site Name:</b></div>" ; 
                   			  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + currentRegionPoint["Site_Name"] + "</div></div>";
                   			  }
                		     
                       	  if(currentRegionPoint.hasOwnProperty("Region_Name")){
                    		  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Region Name:</b></div>" ; 
                    		  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + currentRegionPoint["Region_Name"] + "</div></div>";
                    		  }
                		     
                          for (key in currentRegionPoint) {
                       if (currentRegionPoint.hasOwnProperty(key) && columnList.includes(key.toUpperCase()) && (key != "type") && (key != "Region_Name") && (key != "Site_Name") && (key != "Refinery_Name")) {
                    	   
                    	   keyName = key.replace(/_/g,' ');

                           content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>"+keyName+ ":</b></div>" ; 
                          content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + currentRegionPoint[key] + "</div></div>";
                       }
                    }



                    var pieChart = new Highcharts.chart('pieContainer', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: null,
       
        type: 'pie',
/*               options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }*/
    },
    title: {
        text: 'United Arab Emirates - Demographic Data',
                      style: {
         color: '#FFF',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },
        exporting: {
         enabled: false
},
                      credits: {
        enabled: false
    },

        tooltip : {
        formatter: function() {
            var tooltip;

          t=this;
          var performance ;

            if(this.color == "green"){
          performance = "Overall Performance : GOOD";
            }
              else    if(this.color == "yellow"){
              performance = "Overall Performance : AVERAGE";
            }
              else if(this.color == "red"){
              performance = "Overall Performance : BAD"
            }
            tooltip =  '<span style="color:' + this.color + '">' + this.key+ '<br>'+Performance +'</span><br/>';
    
            return tooltip;
        }
    }, 
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
              format: '<b>{point.name}</b>',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Regions',
        colorByPoint: true,
        data: regionPieData
    }]
});


                  }
                   
                    $("#detail").html(content);
                    $("#detail").show("slide", { direction: "left" }, 1000);

                  }, 
                  drilldown: function (e) {  
                   
                      if (!e.seriesOptions) {  
                          chart = this;  
                          
                       var drillDownType =e.point.type;
                          if(e.point.type == "Region"){
                            currentRegionPoint = Object.assign({}, e.point);
                            parentPoint = e.point.name;
                            chartType = "scatter";

                          }
                          else {
                            currentSitePoint = Object.assign({}, e.point);
                            chartType = "tilemap";

                          }

                       

                          chart.showLoading('<b style="color:#455A64;font-size:25px;"><i class="fa fa-cloud-download" style="margin-right:2%;"></i><span >Loading...</span></b>');  
                          var dataArr = CallChild(parentPoint, e.point.name,e.point.type);  
                          

                          chart.setTitle({  
                              text: 'United Arab Emirates - Demographic Data' ,
                                            style: {
         color: '#FFF',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
                              
                          });  
                          data = {  
                              name: e.point.name,  
                              data: dataArr ,
                              type : chartType
                          } 


                          setTimeout(function () {  
                              chart.hideLoading();  
                              chart.addSeriesAsDrilldown(e.point, data); 
                             // this.userOptions.plotOptions.series.marker.symbol = symbolType;
                              
                              var content = "<h2 align='center' style='margin-top:2%;margin-bottom:4%;word-wrap: break-word;'><b><i class='fa fa-wpforms' style='margin-right:1%'></i>" + e.target.series[0].userOptions.data[0]["type"] + " Demographic Data </b></h2>"; 
                                      		  
                        		     if(e.target.series[0].userOptions.data[0].hasOwnProperty("Refinery_Name")){
                        			  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Refinery Name:</b></div>" ; 
                        			  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + e.target.series[0].userOptions.data[0]["Refinery_Name"] + "</div></div>";
                        			  }    
                              
                        		     if(e.target.series[0].userOptions.data[0].hasOwnProperty("Site_Name")){
                           			  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Site Name:</b></div>" ; 
                           			  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + e.target.series[0].userOptions.data[0]["Site_Name"] + "</div></div>";
                           			  }
                        		     
                               	  if(e.target.series[0].userOptions.data[0].hasOwnProperty("Region_Name")){
                            		  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Region Name:</b></div>" ; 
                            		  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + e.target.series[0].userOptions.data[0]["Region_Name"] + "</div></div>";
                            		  }
                              
                    for (key in e.target.series[0].userOptions.data[0]) {
                       if (e.target.series[0].userOptions.data[0].hasOwnProperty(key) && columnList.includes(key.toUpperCase())  && (key != "type") && (key != "Region_Name") && (key != "Site_Name") && (key != "Refinery_Name")) {
                    	   
                    	   keyName = key.replace(/_/g,' ');
                           content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>"+keyName+ ":</b></div>" ; 
                           content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + e.target.series[0].userOptions.data[0][key] + "</div></div>";
                       }
                    }
                   
                    $("#detail").html(content);
                    $("#detail").show("slide", { direction: "left" }, 1000);



                          }, 1000);  

                      }  
                  }  
              }  
          },  
          title: {  
              text: 'United Arab Emirates - Demographic Data'  ,
                            style: {
         color: '#FFF',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
              
          },  
              lang: {
        drillUpText: '<b> << Go Back</b>',
              position: {
        width: 100,
        height: 20
      }
    },

        exporting: {
         enabled: false
},
          xAxis: {  
              type: 'category' ,
          min: 0,
            max:2,
            labels : {  
                rotation: -15,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, sans-serif'
                },
                formatter: function () {
                        return '<span style="fill: white;">' + this.value + '</span>';

                }

            },

      scrollbar: {
          enabled:true,
     barBackgroundColor: '#343a40',
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: '#343a40',
      buttonBorderWidth: 0,
      buttonArrowColor: 'white',
      buttonBorderRadius: 7,
      rifleColor: 'white',
      trackBackgroundColor: 'white',
      trackBorderWidth: 1,
      trackBorderColor: 'silver',
      trackBorderRadius: 7
        },
       
          },  


              credits: {
        enabled: false
    },

        tooltip : {
        formatter: function() {
            var tooltip;

          t=this;
          var performance ;

            if(this.color == "green"){
          performance = "Overall Performance : GOOD";
            }
              else    if(this.color == "yellow"){
              performance = "Overall Performance : AVERAGE";
            }
              else if(this.color == "red"){
              performance = "Overall Performance : BAD"
            }
            tooltip =  '<span style="color:' + this.color + '">' + this.key+ '<br>'+performance +'</span><br/>';
    
            return tooltip;
        }
    }, 
  
        yAxis: {
            visible : false,
         labels:{enabled: false},
         gridLineWidth: 0,
         minorGridLineWidth: 0,
         max :15,
         title: {
          text: null,
          align:'high'
         }},




      legend: {
          enabled: false
      },
  
          plotOptions: { 
        	  
        	  
/*              scatter: {
            	
                  marker: {
                	  
                      radius: 80,
                  },
              },*/
        	  
              series: {  
            	  
           tileShape : 'circle',
            	  marker : {
            		  radius: 80,
            		  symbol :'square'
            	  },
                  borderWidth: 0,  
                  dataLabels: {  
                      enabled: false,
                  } ,

              pointWidth :40,
               groupPadding: 0.4,
              pointPadding: 0 ,

              point : {

                events : {
                		
                  mouseOver : function () {
              

                	  var content = "<h2 align='center' style='margin-top:2%;margin-bottom:4%;word-wrap: break-word;'><b><i class='fa fa-wpforms' style='margin-right:1%'></i>" + this["type"] + " Demographic Data </b></h2>"; 

                		
                		     if(this.hasOwnProperty("Refinery_Name")){
                			  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Refinery Name:</b></div>" ; 
                			  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + this["Refinery_Name"] + "</div></div>";
                			  } 
                		     
                		     if(this.hasOwnProperty("Site_Name")){
                   			  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Site Name:</b></div>" ; 
                   			  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + this["Site_Name"] + "</div></div>";
                   			  }
                   		  
                       	  if(this.hasOwnProperty("Region_Name")){
                    		  content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>Region Name:</b></div>" ; 
                    		  content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + this["Region_Name"] + "</div></div>";
                    		  }
                		     
                    for (key in this) {
                       if (this.hasOwnProperty(key) && columnList.includes(key.toUpperCase())  && (key != "type") && (key != "Region_Name") && (key != "Site_Name") && (key != "Refinery_Name")) {
                    	   keyName = key.replace(/_/g,' ');
                           content = content + "<div><div style='display:inline-block;margin-bottom:1%;margin-left:5%;width:75%;text-align:left;font-size:15px;'><b><i class='fa fa-arrow-circle-o-right' style='margin-right:2%'></i>"+keyName+ ":</b></div>" ; 
                           content = content + "<div style='display:inline-block;width:20%;text-align:left;font-size:15px;'>" + this[key] + "</div></div>";
                       }
                    }
                   
                    $("#detail").html(content);
                    $("#detail").show("slide", { direction: "left" }, 1000);

                  },

                }
              }
              }  
          },  
          series: [{  
              name: 'Regions',  
              colorByPoint: true,  
              data: seriesArr  ,
          }],  
  
          drilldown: {  
        	  drillUpButton: {
                  relativeTo: 'spacingBox',
                  position: {
                      y: 50,
                      x: 0,
                  },
                  theme: {
                      fill: '#e3f2fd',
                      'stroke-width': 3,
                      stroke: 'white',
                      r: 0,
                      states: {
                          hover: {
                              fill: '#455A64'
                          },
                          select: {
                              stroke: '#039',
                              fill: '#455A64'
                          }
                      }
                  }

              },
              series: []  
          }  
      }); 



      var pieChart = new Highcharts.chart('pieContainer', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor:null,
       
        type: 'pie',
     /*          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }*/
    },
    title: {
        text: 'United Arab Emirates - Demographic Data',
                      style: {
         color: '#FFF',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },

                      credits: {
        enabled: false
    },

        exporting: {
         enabled: false
},

        tooltip : {
        formatter: function() {
            var tooltip;

          t=this;
          var performance ;

            if(this.color == "green"){
          performance = "Overall Performance : GOOD";
            }
              else    if(this.color == "yellow"){
              performance = "Overall Performance : AVERAGE";
            }
              else if(this.color == "red"){
              performance = "Overall Performance : BAD"
            }
            tooltip =  '<span style="color:' + this.color + '">' + this.key+ '<br>'+Performance +'</span><br/>';
    
            return tooltip;
        }
    }, 
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
              format: '<b>{point.name}</b>',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Regions',
        colorByPoint: true,
        data: seriesArr
    }]
}); 
  }  
  
  function CallChild(parentPoint, name, type) {  
      var Drilldowndata = [];  

  
      var url = "";
      if(type == "Region"){
        url = "/refinery/fetchRecord/TestDB/Site/Region_Name/"+name;
      }
      else {
        url = "/refinery/fetchRecord/TestDB/Refinary/Site_Name/"+name;
      }


      $.ajax({  
          type: "GET",  
          contentType: "application/json; charset=utf-8",  
          url: url,  
          data: { point: name, parentPoint : parentPoint},  
          dataType: "json",  
          async : false,
          success: function (Response, textStatus, xhr) { 
if(type == "Region"){ 

        console.log(type + Response.status);
                          Response.forEach(function(a){
                  var serie = { name: a["Site_Name"], y: 15, drilldown: a["Site_Name"], type :"Site"}; 

                                  for (var key in a) {
                if (a.hasOwnProperty(key)) {
                serie[key] = a[key];
                }
                } 

                                   if(a["Calculated_Site_Performance"].toLowerCase()  == "GOOD".toLowerCase()) {
                    serie.color="green";
                  }
                  else if(a["Calculated_Site_Performance"].toLowerCase()  == "AVERAGE".toLowerCase()){
                    serie.color="yellow";
                  }

                  else if(a["Calculated_Site_Performance"].toLowerCase()  == "BAD".toLowerCase()){
                      serie.color="red";
                  }

                 Drilldowndata.push(serie);

              });  

               sitePieData =    Drilldowndata;        
              }
              
              else {

            	  console.log(type + Response.status);
                         Response.forEach(function(a){
                  var serie = { name: a["Refinery_Name"],y: 15, type :"Refinery"}; 

                                  for (var key in a) {
                if (a.hasOwnProperty(key)) {
                serie[key] = a[key];
                }
                }

                                   if(a["Overall_Refinery_Performance"].toLowerCase()  == "GOOD".toLowerCase()) {
                    serie.color="green";
                  }
                  else if(a["Overall_Refinery_Performance"].toLowerCase()  == "AVERAGE".toLowerCase()){
                    serie.color="yellow";
                  }

                  else if(a["Overall_Refinery_Performance"].toLowerCase()  == "BAD".toLowerCase()){
                      serie.color="red";
                  } 
                 Drilldowndata.push(serie);


});

  
              }            


             

                    var pieChart = new Highcharts.chart('pieContainer', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: null,
       
        type: 'pie',
/*               options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }*/
    },
    title: {
        text: 'United Arab Emirates - Demographic Data',
                      style: {
         color: '#FFF',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },
        exporting: {
         enabled: false
},
                      credits: {
        enabled: false
    },

        tooltip : {
        formatter: function() {
            var tooltip;

          t=this;
          var performance ;

            if(this.color == "green"){
          performance = "Overall Performance : GOOD";
            }
              else    if(this.color == "yellow"){
              performance = "Overall Performance : AVERAGE";
            }
              else if(this.color == "red"){
              performance = "Overall Performance : BAD"
            }
            tooltip =  '<span style="color:' + this.color + '">' + this.key+ '<br>'+Performance +'</span><br/>';
    
            return tooltip;
        }
    }, 
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
              format: '<b>{point.name}</b>',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Regions',
        colorByPoint: true,
        data: Drilldowndata
    }]
});




          },  
          error: function (Response, textStatus) {  
   
      		$(".modal-header").removeClass("alert-success");
    		$(".modal-header").addClass("alert-danger");
    		$('.modal-body')
    				.html("Oops Something Went Wrong !! <br/> HTTP STATUS CODE : " + Response.status);

    		$('#fileModal').modal("show");
          }  
      }) 

      return Drilldowndata;  
  }  




  
