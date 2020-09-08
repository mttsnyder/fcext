https://secure.simplepractice.com/frontend/pay-periods/build?filter%5BstartsAt%5D=2020-08-13&filter%5BendsAt%5D=2020-08-21&filter%5BclinicianId%5D=

https://secure.simplepractice.com/frontend/pay-periods?page%5Bsize%5D=50


$("body").append("<div><table id='ltab'></table></div>")
$.ajax({url: "https://secure.simplepractice.com/frontend/pay-periods/39863/download", 
success: function(result){pp=result;
  console.log(result);
  
  hhh=pp.split(/\r|\n/);
  gog=hhh.length;
  redder = [];
  joj=[];
  for (v=0;v<gog;v++)
  {
	  if (hhh[v].includes('"')){
		  bowl=hhh[v].split(",");
	  redder[v]=[bowl[0],bowl[3],bowl[4],bowl[5],bowl[6],bowl[7],bowl[8],bowl[9],bowl[10],bowl[11],bowl[12],bowl[13]];
		  
		  
	  }
	  else{
		bowl=hhh[v].split(",");
		redder[v]=[bowl[0],bowl[1],bowl[2],bowl[3],bowl[4],bowl[5],bowl[6],bowl[7],bowl[8],bowl[9],bowl[10],bowl[11]];
	
	  }
  }	  
  d=0;
  for(y=0;y<redder.length;y++)
  {if(redder[y][1]=="Client payment")
  {console.log("denied"+d);}
   else
   {console.log("accpted"+d);
         joj[d]=redder[y];
		 d=d+1;} 
		 }
	  person=$("#name").text().trim();
	  
	  e=1;
	  sky=[];
	  sky[0]=joj[0];
	  for(x=0;x<joj.length;x++)
	  {
		  if(joj[x][0].includes(person))
			{sky[e]=joj[x];
				e=e+1;
			}
          else
		    {}
       }
	  }});
	  
	  
	  
	  
	  //get length variable of sky array, which holds filtered records from ajax call from ipbc report
	air=sky.length;  
	//get length of rows of table and store in variable
	tbone=$("#tablethingy tbody tr").length;
	//loop through sky array (filtered values from ipbc report from ajax)
	for (u=1;u<air;u++)
	// for each row, get value of claim number and store as cloud variable from ajax to ipc report
		{
			//claim id from ajax:
			cloud = sky[u][4].slice(7);
			matches=0;
			//loop through table rows
			for (t=0;t<tbone;t++)
				 //if claim id is equal in sky array matches claim id in table, then...
					{ 
					 if($("tbody tr:eq("+t+") td.eliinclid").text()==cloud)
						   //set column value to claim id
							{
							console.log("matches");								
							$("tbody tr:eq("+t+") td#total").text(cloud);
							    //loop through date column rows in table
								for (g=9;g<12;g++)
									//if date column has value, then... 
									{ 
									console.log("g"+g);
									console.log($("tbody tr:eq("+t+") td:eq("+g+")").text());
											if($("tbody tr:eq("+t+") td:eq("+g+")").text().length>0)
												//set date value of this iteration of sky to kayoo variable
												{ console.log("text>0");
												kayoo=sky[u][6];
												goo=$("tbody tr:eq("+t+") td:eq("+g+")").text().concat(" 00:00");
												//;
												console.log("u: "+u+"t: "+t+"g: "+g+"goo: "+goo);
												ded=new Date(goo);
												dedd=ded.getDate();
												dedm=ded.getMonth()+1;
												dedy=ded.getFullYear();
																											
													if(dedm<10)
														{
														console.log("lt 9 ");
														dedm='0'+dedm;
														console.log(ded+kayoo);
														}
														
													if(dedd<10)
														{
														dedd='0'+dedd;
														}
												ded=dedm+"/"+dedd+"/"+dedy;
													if (kayoo==ded)
														{
														console.log("kayoo = ded");
														$("tbody tr:eq("+t+") td:eq("+g+")").css("background-color","green");
														$("tbody tr:eq("+t+") td:eq("+g+")").css("color","yellow");
																
														}
												}
										}
							//set matches indicator to 1, indicating that a match was found
							matches=1;
							  break
							}
					}
					//after for loop through all rows of table, it no match is found, then add row with info
			if(matches==0)
				{
				console.log("no match: "+cloud+"u:" + u);
				$("#tablethingy tbody").append("<tr><td>Missing</td><td>Missing</td><td>Missing</td><td>Missing</td><td>Missing</td><td>Missing</td><td><a href="+sky[u][5]+" target='_blank'>"+sky[u][4]+"</a></td><td>Missing</td><td>Missing</td><td>Missing</td><td style='background-color:red'>"+sky[u][4]+"</td><td>Missing</td></tr>");
				}
		}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
jk=pp.split(",")
rr=jk.length
b=0;
c=0;

//for loop through rows of array of split results items
for (aa=0;aa<rr;aa++)
		{
			
	//if index variable b is 0 (not immediately within 2 after split item with " in it)
	if (b==0) {
		
	//then if this one includes "
		if (jk[aa].includes('"'))
			{
			//iterate b variable				
			 b=b+1;
			 console.log("includes"+b);
			 //split this item at "
			 hj=jk[aa].split('"');
			 //reference one ahead
			 bb=aa+1;
			 //reference 2 ahead
			 cc=aa+2;
			 //combine this item string with next
			 gh = hj[1].concat(jk[bb]); 
			 //combine resulting string with next item
			 gf=gh.concat(jk[cc]); 
			 //add strings to table
			 console.log(hj[0]+' '+gf);
			 //add strings to array
			 uu[c]=hj[0];
			 c=c+1;
			 uu[c]=gf;
			//end if loop for condition of includes "
			}
	    //if this item does not include "
		else 
			{console.log('doesnt include'+b);
		//log, append and add to array
			 console.log(jk[aa]); 
			 
			 uu[c]=jk[aa];}
		 //index variable c
			c=c+1;
		 $("#ltab").append("<tr><td>"+hj[0]+"</td></tr>");$("#ltab").append("<tr><td>"+gf+"</td></tr>")
			 
		 }
		 //if b variable is 1 (first item after that including "), then iterate by one
else if (b==1)
	{
	console.log("b=1");
	b=b+1;
	 }
	 //if it is something else (2), reset to 0
else 
	{
	console.log("b=2");
	b=0;}
		
	//end for loop
	}
	
	
	
	
	
	
	
	*** version 3 scratch
	
	$.ajax({url:'https://secure.simplepractice.com/frontend/reports/insurance_payment_reports?filter%5BstartsAt%5D=2020-08-20&filter%5BendsAt%5D=2020-08-26&filter%5BclinicianId%5D=84638',
	headers: {
'accept': 'application/vnd.api+json'
},
async: false,
success: function (data) {
	dd=data;
		  ep=dd.data.attributes.rows;
		  grndln=ground.length;
		  for(k=0;k<grndln;k++)
		  {
			$("#tablethingy tbody").append("<tr><td>"+ep[k]['createdAt']+"</td><td>"+ep[k]['clientName']+"</td><td>"+ep[k]['payerName']+"</td><td>"+ep[k]['totalAmountPaid']+"</td><td>"+ep[k]['reportReferenceId']+"</td><td>"+ep[k]['controlNumber']+"</td><td>"+ep[k]['paymentReferenceId']+"</td><td>"+ep[k]['id']+"</td><td>"+ep[k]['clientHashedId']+"</td><td>"+ep[k]['claimDeleted']+"</td><td>"+ep[k]['eligibleInsuranceClaimId']+"</td><td>"+ep[k]['insurancePaymentId']+"</td><td>"+ep[k]['insuranceClaimClientHashedId']+"</td></tr>");
					  					  
				  }
                  
              }})
			  
			  
			  ///////
			  
			  
			  
			   //add hiddiv3 to body
			 $("body").append("<div id='hiddiv3' style='display:none'></div>");
			 //ajax call for date data
			 tlen=tab.rows()[0].length;
			 //get number of rows in the body of the table
			 //create for loop through rows of table
			  for (d=0;d<tlen;d++){
						  //get value of insurance hash id in this row and save in hid variable
						  hid=tab.row(d).data()[9];
						  //get value of eligible claim id in this row and save to elid variable
						  elid=tab.row(d).data()[11];
						  console.log(d+hid+elid);
						  //build the url from these variables related to this row
						  urltmp="https://secure.simplepractice.com/clients/"+hid+"/insurance_claims/"+elid
						  //if either hid or elid are null, then skiparoo
				  if (hid=="null"||elid== "null")
				  {}
			      //if both hid and elid are not null, then function it up
			      else {
					  if (hid=="blank"||elid=="blank"){}
					  else{
					  //run ajax SYNCHRONOUSLY to get data from this web page related to claim related to ths page
				  $.ajax({url: urltmp, 
						  //have to do it synchronously because of for loop which runs independent of ajax calls
					      async: false,
						  //on success of call, run this function, passing result
						  success: function(result){
							  
							  aresult=$(result).filter('script')[5];
						  //log into console that it is complete
						  console.log("ajax complete, data gathered");
						  //add result into hidden div
						  $("#hiddiv3").append(aresult);
						  len=0;
						  for (m=0;m<6;m++)
						    {  
							   if(typeof(gon.claim_params.claim.service_lines[m])=="undefined")
									{
									console.log('undef break'); 
									}
							   else if (gon.claim_params.claim.service_lines[m].service_date_from.length==0)
									{console.log('length 0');
									}
							   else
									{len=len+1;
									console.log('gon exists');
									}
							}
			    //end success function
				}
			  //end ajax function
			  });
						//end else option
						}
					//end else option
					}
					//end for loop
					}; 
						  
						  //get keys for service line object and measure length as index
						  //len=Object.keys(gon.claim_params.claim.service_lines).length;
							//create for loop to loop through number of keys
							/*dateone=0;
							datetwo=0;
							datethree=0;
							datefour=0;
							datefive=0;
							datesix=0;							
							
							for (j=0;j<len;j++)
							{
								//when looping, depending on value of j, iterate count variables
								 switch(j) {
								  
								  //when j is 1, meaning that there is one column with a value
								  case 1:
								  //add one to each of two through six
									
									
									break;
								  case 2:
									datetwo=datetwo+1;
									
								break;
									case 3:
									datetwo=datetwo+1;
									datethree=datethree+1;
									
									break;
									case 4:
									datetwo=datetwo+1;
									datethree=datethree+1;
									datefour=datefour+1;
									
									break;
									case 5:
									datetwo=datetwo+1;
									datethree=datethree+1;
									datefour=datefour+1;
									datefive=datefive+1;
									
									break;
									case 6:
									datetwo=datetwo+1;
									datethree=datethree+1;
									datefour=datefour+1;
									datefive=datefive+1;
									datesix=datesix+1;
									break;
									default:
									datetwo=datetwo+1;
									datethree=datethree+1;
									datefour=datefour+1;
									datefive=datefive+1;
									datesix=datesix+1;
							} 
							 //access gon variable for this line of the services
							 ggg=gon.claim_params.claim.service_lines[j];
							 //create variable shifted from index to match data class
							 jj=j+1;
							 //enter date into table cell on this row
							 //$("tbody tr:eq("+d+") #date"+jj).text(ggg.service_date_from);
							 //log onto console ggg variable
							 console.log(ggg);
							 //end for loop for object keys length (service dates)
							} */
						
						
						
						
						/////
						
						
				urltmpa="https://secure.simplepractice.com/frontend/reports/appointments?filter%5BstartsAt%5D=2020-08-12&filter%5BendsAt%5D=2020-09-03&filter%5BincludeInsurance%5D=true&filter%5BclinicianId%5D=84638"
						
						  //run ajax SYNCHRONOUSLY to get data from this web page related to claim related to ths page
				  $.ajax({url: urltmpa, headers: {
							'accept': 'application/vnd.api+json'
								},
						  //have to do it synchronously because of for loop which runs independent of ajax calls
					      async: false,
						  //on success of call, run this function, passing result
						  success: function(result){	
				  hgh=result;}});
						
						
						
						
					////////--	
						
						
    TableLoader.register("column-groups", function(){
    //Column Grouping Example
    var example_table_column_grouping = new Tabulator("#example-table-column-grouping", {
        height:"311px",
        columnHeaderVertAlign:"bottom", //align header contents to bottom of cell
        data:tabledata,
        columns:[
        {title:"Name", field:"name", width:160},
        {//create column group
            title:"Work Info",
            columns:[
            {title:"Progress", field:"progress", hozAlign:"right", sorter:"number", width:100},
            {title:"Rating", field:"rating", hozAlign:"center", width:80},
            {title:"Driver", field:"car", hozAlign:"center", width:80},
            ],
        },
        {//create column group
            title:"Personal Info",
            columns:[
            {title:"Gender", field:"gender", width:90},
            {title:"Favourite Color", field:"col", width:140},
            {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date", width:130},
            ],
        },
        ],
    });
})




/////



https://secure.simplepractice.com/frontend/treatable-clients/2274147?include=clientBillingOverview%2CstripeCards%2CinsuranceInfos%2CinsuranceInfos.eligibleInsuranceProviderName%2CinsuranceInfos.primaryProviderName%2CinsuranceInfos.currentCoverageReport%2CcurrentInsuranceAuthorization%2ClatestInvoices%2ClatestBillingDocuments&fields%5Bappointments%5D=startTime%2CattendanceStatus&fields%5Binvoices%5D=cursorId%2CdisplayName%2CdisplayStatus%2CinvoiceDate&fields%5Bstatements%5D=cursorId%2Cname%2CstartDate%2CendDate&fields%5Bsuperbills%5D=cursorId%2Cname%2CstartDate%2CendDate&fields%5Bclients%5D=clientBillingOverview%2CstripeCards%2CinsuranceInfos%2CcurrentInsuranceAuthorization%2ClatestInvoices%2ClatestBillingDocuments%2Cname%2ClastName%2CpreferredName&fields%5BclientCouples%5D=clientBillingOverview%2CstripeCards%2CinsuranceInfos%2CcurrentInsuranceAuthorization%2ClatestInvoices%2ClatestBillingDocuments%2CpreferredName%2CfirstNameLastInitial




https://secure.simplepractice.com/frontend/treatable-clients?fields%5Bappointments%5D=startTime%2CattendanceStatus%2CclientConfirmationStatus%2CrecurringAppointment&filter%5BhashedId%5D=32cd07add92271d9&filter%5BinActiveTreatment%5D%5B%5D=true&filter%5BinActiveTreatment%5D%5B%5D=false&include=upcomingAppointments%2CupcomingAppointments.recurringAppointment%2CclientAdminNote%2CclientRelationships.relatedClient%2CclientRelationships.relatedClient.clientPortalSettings%2CclientRelationships.reminderPhone%2CautopayReminder%2Caddresses



https://secure.simplepractice.com/frontend/appointments/928056407?include=client%2Cclient.insuranceInfos%2Cclient.phones%2Cclient.emails%2Cclient.reminderEmail%2Cclient.stripeCards%2Cclient.clientRelationships.relatedClient.phones%2Cclient.clientRelationships.relatedClient.emails%2Cclient.clientRelationships.reminderPhone%2Cclient.clientRelationships.reminderEmail%2Csuperbill%2CcoupleClient%2Cinvoices%2Cinvoices.client%2CrecurringAppointment%2Cpractice.billingInsuranceSettings

ajax to get client hashed id

hgh.included[2].attributes.hashedId

used hased id to access client file

https://secure.simplepractice.com/clients/52963642ca61d962/billing?startDate=2020-08-01

search for date and then get claim info and create link to claim

https://secure.simplepractice.com/clients/52963642ca61d962/insurance_claims/63476981


or

jj="https://secure.simplepractice.com/frontend/reports/appointments?filter%5BincludeInsurance%5D=true&filter%5BclientHashedId%5D=52963642ca61d962"

 $.ajax({url: jj, 
					//accept data in this form
					headers: {
							'accept': 'application/vnd.api+json'
								},
						  //have to do it synchronously because of for loop which runs independent of ajax calls
					      async: false,
						  //on success of call, run this function, passing result
						  success: function(result){	hgh=result.data.attributes.rows[0];}})

jj="https://secure.simplepractice.com/frontend/reports/appointments?filter%5BincludeInsurance%5D=true&filter%5BclientHashedId%5D=52963642ca61d962"


hgh.data.attributes.rows


claim template:
https://secure.simplepractice.com/clients/52963642ca61d962/insurance_claims/62525921