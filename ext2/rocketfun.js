//brings data from simple practice page into new page
//this runs in the new report page

//if window is report.html (for insurance report thingy)...
if (window.location.href.includes('report.html'))
{
	//run ajax to get practitioner names...
	$.ajax({url: "https://secure.simplepractice.com/reports/insurance-payment-reports?clinicianId=84638&endsAt=2020-08-31&startsAt=2020-08-25", 
		//on success of ajax call, then do execute this function
		success: function(response)
		//filter response to get script and store in variable clnames
		{clnames=$(response).filter("script");
		//create hidden div and attach to body
			$("body").append("<div id='hdiv' style='display:none'></div>");
			//paste script in hidden div to activate
			$("#hdiv").html(clnames[6]);
			//gather practitioner name data 
			prnm = window.currentUser.included;
			//get length of response array
			prnml=prnm.length;
			//loop through response array
			for (j=0;j<prnml;j++)
			{
				//if data type is teamMembers, then..
				if(prnm[j].type=="teamMembers")
				{
					if(prnm[j].attributes['isDeleted']=="false")
					{
					//get clinician id and store in clinid variable
					clinid=prnm[j].id;
					//get first and last name
					fclnam=prnm[j].attributes.firstName;
					lclnam=prnm[j].attributes.lastName;
					//build option and append to select
				    $("#prac").append("<option value="+clinid+">"+fclnam+" "+lclnam+"</option>");
				    }
				//end if
				}
			//end for loop through prnml array
			}
		//end ajax success function 
		}
		//end ajax to get practitioner names
		}); 			
	//function to add dates to date			
function addDays(date, days) {
	//create new date object
		var result = new Date(date);
		//set new date as day of date plus passed days
		result.setDate(result.getDate() + days);
		//return result
		return result;
		}
       //create new date object
	  nd = new Date();
	  //break it up by extracting day month year
	  st= nd.getMonth()+1+"/"+nd.getDate()+"/"+nd.getFullYear();
	  //add 14 days to date and store as en var
	  en=addDays(st, 14);
	  //create date range and activate on input in hmtl
 $('input[name="daterange"]').daterangepicker({
    "ranges": {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    "alwaysShowCalendars": true,
    "startDate": "09/01/2020",
    "endDate": "09/07/2020"
}, function(start, end, label) {
  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});
//on click of twopac button, get data and run function...
	$("#twopac").on("click", function () {
	//add column hiding links
	$("#waitdivs2").css("display","block");
	$('#togdiv').css("display","block");
	$("#togdivg").css("display","block");
			//if data table exists, clear and destroy
			if($.fn.DataTable.isDataTable( '#tablethingy')){
				//console.log('destroy tab');
					tab.destroy();
				//console.log($.fn.DataTable.isDataTable( '#tablethingy' )) 
				//console.log('clear tbod');
				$("#tablethingy tbody").html("");
				$("#sums").html("");
				$("#clsums").html("");
				$("#sign").html("");
				$("#ch_container").html("");
				$("#ch_container2").html("");
				$("#ch_container3").html("");}
			 	dr=$("input").val();
				er=dr.split(" - ");
				ser = er[0].split("/");
				eer = er[1].split("/");
				sta = ser[2]+"-"+ser[0]+"-"+ser[1];
				ena = eer[2]+"-"+eer[0]+"-"+eer[1];
				pprac=$("#prac").val();
				//build url from date range from date range selector and clinician id
				urltmpa="https://secure.simplepractice.com/frontend/reports/appointments?filter%5BstartsAt%5D="+sta+"&filter%5BendsAt%5D="+ena+"&filter%5BincludeInsurance%5D=true&filter%5BclinicianId%5D="+pprac;
				//run ajax to get data from this web page related to claim related to ths page
	            $.ajax({url: urltmpa, 
						//accept data in this form
						headers: {
							'accept': 'application/vnd.api+json'
								},
						//have to do it synchronously because of for loop which runs independent of ajax calls
					    //async: false,
						//on success of call, run this function, passing result
						success: function(result)
											{
											//store data in hgh variable
											hgh=result.data.attributes.rows;
											hgg=[];
											//get length of resulting data
											lll=hgh.length;
											//set tott variable to 0
											tott=0
											//loop through data set array
													for (a=0;a<lll;a++)
													{
														//if cptcodes are 0990 or 020202, exclude, otherwise...
														if (hgh[a]['cptCodes'][0]=='0990'||hgh[a]['cptCodes'][0]=='020202')
														{}
														else
														{
														//build url from hgh data to create a tag/link below 
														urltmpb = "https://secure.simplepractice.com/calendar/appointments/"+hgh[a]['id'];
														//if insurance paid status is unbilled or unpaid, then... 									
															if(hgh[a]['insurancePaidStatus']=="UNBILLED"||hgh[a]['insurancePaidStatus']=="UNPAID")
															{
																//add row to table
																$("#tablethingy tbody").append("<tr><td id='indexbut' class='details-controla'></td><td><a target='_blank' href="+urltmpb+">"+hgh[a]['startTime']+"</a></td><td>"+hgh[a]['clientName']+"</td><td>"+hgh[a]['clinicianName']+"</td><td>"+hgh[a]['cptCodes'][0]+"</td><td>"+hgh[a]['ratesForAppointment'][0]+"</td><td>"+hgh[a]['unitsForAppointment'][0]+"</td><td style='border-right:1px solid green'>"+hgh[a]['fee']+"</td><td>"+hgh[a]['clientPaidStatus']+"</td><td>"+hgh[a]['clientCharge']+"</td><td>"+hgh[a]['uninvoicedFee']+"</td><td>"+hgh[a]['clientPaid']+"</td><td style='border-right:1px solid green'>"+hgh[a]['balance']+"</td><td>"+hgh[a]['insurancePaidStatus']+"</td><td>"+hgh[a]['insuranceCharge']+"</td><td>"+hgh[a]['insuranceAmountPaid']+"</td><td>"+hgh[a]['insuranceBalance']+"</td></tr>");								
															}
															else
															{   
																//add row to table
																$("#tablethingy tbody").append("<tr><td id='indexbut'></td><td><a target='_blank' href="+urltmpb+">"+hgh[a]['startTime']+"</a></td><td>"+hgh[a]['clientName']+"</td><td>"+hgh[a]['clinicianName']+"</td><td>"+hgh[a]['cptCodes'][0]+"</td><td>"+hgh[a]['ratesForAppointment'][0]+"</td><td>"+hgh[a]['unitsForAppointment'][0]+"</td><td style='border-right:1px solid green'>"+hgh[a]['fee']+"</td><td>"+hgh[a]['clientPaidStatus']+"</td><td>"+hgh[a]['clientCharge']+"</td><td>"+hgh[a]['uninvoicedFee']+"</td><td>"+hgh[a]['clientPaid']+"</td><td style='border-right:1px solid green'>"+hgh[a]['balance']+"</td><td>"+hgh[a]['insurancePaidStatus']+"</td><td>"+hgh[a]['insuranceCharge']+"</td><td>"+hgh[a]['insuranceAmountPaid']+"</td><td>"+hgh[a]['insuranceBalance']+"</td></tr>");
															}
														//end else loop for cpt code
														}	
													// end for loop through rows of data array from sessions ajax call
													}
											//create data table js object
											tab=$("#tablethingy").DataTable({paging:false});
											//end ajax success function	
											}
						//end ajax call to get data for appointments and table set up
						}).done(function() 
									{		
									//get length of table rows array and store as gog
									var goo=tab.rows().data().length;
									//get length of hgh array and store in gog variable
									var gog=hgh.length;
									//define i variable
									i=0;
												//loop through array of hgh using index 'g'
												for (g=0;g<gog;g++)
												{									
													//loop through hgh and select non "0990" and "020202" sessions and store in new array hgg with index i,
													if(hgh[g]['cptCodes'][0]=="0990"||hgh[g]['cptCodes'][0]=="020202")
													{}
													else 
													{hgg[i]=hgh[g];
													//iterate i index variable
													i=i+1;
													}
												}
												//at this point data has been filtered and transfered to new array hgg
												//loop through table rows using index 'i'
												for (i=0;i<goo;i++)
												{
													if(tab.row(i).data()[13]=='UNPAID'||tab.row(i).data()[13]=='UNBILLED')
													{
													//create third url from first url and data from return of first ajax call for each table row
														urltmpc=urltmpa+"&filter%5BclientHashedId%5D="+hgg[i]['clientHashedId'];
														//console.log("urltmpc:"+urltmpc);
														//ajax on this newly created url to get claim info for the client on this row
														$.ajax({url: urltmpc, 
															//accept data in this form
															headers: {
															'accept': 'application/vnd.api+json'
															},
															ajaxI: i,
															//have to do it synchronously because of for loop which runs independent of ajax calls
															//async: false,
															error: function(xhr, status, error){
																	 var errorMessage = xhr.status + ': ' + xhr.statusText
																	 alert('Error - ' + errorMessage);
																 },
															//on success of call, run this function, passing result
																success: function(data){ 
																			//console.log("success");
																			//store index in ajaxG variable that is passed with results in i variable
																			i=this.ajaxI;
																			//console.log("i:"+i);
																			//store resulting claim data in hg variable
																			hg=data.data.attributes.rows;
																			//console.log(hg);
																			//get length of resulting data set (hg) and store in redtail variable
																			var redtail=hg.length;
																				//loop through resulting data array hg
																				for (f=0;f<redtail;f++)
																				{																
																					//if data exists for this row in the table, then... 
																					if(hgg[i])
																					{ 
																						//compare date of each resulting row in hg array and compare to date of row of table, if they match...
																						if(hg[f]['startTime']==hgg[i]['startTime'])
																						{
																							//get claim number for this claim and store in blackhawk variable
																							var blackhawk=hg[f]['insuranceClaims'][0];
																							//get client hashed id and store in bluehawk variable
																							var bluehawk = hg[f]['clientHashedId'];
																							//console.log("f:"+f+"g:"+g+blackhawk+bluehawk);
																							//create temp url from these parameters
																							urltmpe="https://secure.simplepractice.com/clients/"+bluehawk+"/insurance_claims/"+blackhawk+"/payment_reports";
																							//ajax call to constructed url for claim data 	
																							$.ajax({url: urltmpe, 
																									//pass this variable
																									ajaxG:i,
																									//have to do it synchronously because of for loop which runs independent of ajax calls
																									//async: false,
																									//on success of call, run this function, passing result
																									success: function(data)
																												{
																														var ghgh=$(data).find(".claim-history").find('li').text().trim();
																														var rr=this.ajaxG;
																														//get this table row object and store as tre	
																														tre=tab.row(rr);
																														if(ghgh.includes("deductible"))
																														{
																															//console.log("deduct: "+rr);
																															tab.row(rr).data()[13]="DEDUCTIBLE";
																															$("table tbody tr:eq("+rr+") td")[13].innerText="DEDUCTIBLE";
																															$(tre.node())[0].style.backgroundColor="#fccd68";
																														}
																														if(ghgh.includes("denied"))
																														{
																															//console.log("deduct: "+rr);
																															tab.row(rr).data()[13]="DENIED";
																															$("table tbody tr:eq("+rr+") td")[13].innerText="DENIED";
																															$(tre.node())[0].style.backgroundColor="#e0e874";
																														}
																														if(ghgh.includes("accepted")||ghgh.includes("Accepted"))
																														{
																															//console.log("accept: "+rr);
																															tab.row(rr).data()[13]="ACCEPTED";
																															$("table tbody tr:eq("+rr+") td")[13].innerText="ACCEPTED";
																															$(tre.node())[0].style.backgroundColor="#ffebfa";
																														}
																														//console.log(tre);
																														//get row object and add child row 
																														tab.row(tre).child( "<table><tr style='background-color:#e1f4f7'>"+
																														"<td>/-----Spacer-----/</td>"+
																														"<td>"+$(tre.node()).children()[1].textContent+"</td>"+
																														"<td>"+$(tre.node()).children()[2].textContent+"</td>"+
																														"<td></td>"+
																														"<td><a target='_blank' href='https://secure.simplepractice.com/clients/"+hgg[rr]['clientHashedId']+"/insurance_claims/"+blackhawk+"/payment_reports'>"+ghgh+"</a></td>"+
																														"</tr></table>");
																												//end success function
																												 }
																												 //end ajax function
																												 }).done(function() 
																															{
																													 
																															if($("#deddiv").length>0){
																															//console.log('exists');
																															var deduct = sumcol(14,13,"DEDUCTIBLE").toFixed(2);
																															$("#deddiv").html("Deductible: "+deduct);
																															$("#undiv").html("Unpaid w/o Deduct: "+(parseFloat(ins_unpaid)-parseFloat(deduct)).toFixed(2));
																															}
																															else 
																															{
																															var deduct = sumcol(14,13,"DEDUCTIBLE");
																															$("#sign").append("<div id='deddiv'>Deductible: "+deduct+"</div>");
																															$("#sign").append("<div id='undiv'>Unpaid w/o Deduct: "+(parseFloat(ins_unpaid)-parseFloat(deduct)).toFixed(2)+"</div>");
																															}
																														//end done function
																														});
																						//end if statement for dates matching
																						}
																						//if the don't match
																						else
																						{ 
																						//console.log('dnt mat');
																						}																												
																					//end if statement for hgh data exists
																					}
																				//end for loop through resulting data array	
																				}
																				//end ajax success function
																				$("label")[2].style.fontSize="16px";
																				$("#waitdivs2").css("display","none");		
																			}
														 //end ajax call
														 })
													}			 
												//end for loop through table rows
												};							
							//segment to add click event listener to td in table
							$('#tablethingy tbody td.details-controla').on('click', function () 
								{ 
								//console.log('clicked');
								//get closes tr object and store in tr variable
								 tr = $(this).closest('tr');
								 //use this to get row object in datatable object and store as row
								 row = tab.row( tr );
								//condition if child row is shown, then..
							if (row.child.isShown()) 
								{
								// This row is already open - close it
								row.child.hide();
								//remove class from row
								tr.removeClass('shown');
								}
							else 
								{
								// Show this row
								row.child.show();
								//add class to row
								tr.addClass('shown');
								}
							//end click function
							});
							$("#tablethingy thead th.details-controlh").on('click', function() {
								//console.log("clicked");
								if(tab.column(5).visible()){
									tab.columns([5,6,7]).visible(false);
								}
								else{
									tab.columns([5,6,7]).visible(true);
								}
								});
							$("#toggle-gvisa").on('click', function() {
								//console.log("clicked ha");
								if(tab.column(9).visible()){
									tab.columns([8,9,10,11,12]).visible(false);
								}
								else{
									tab.columns([8,9,10,11,12]).visible(true);
								}
							});
							$("#toggle-gvisb").on('click', function() {
								//console.log("clicked hb");
								if(tab.column(14).visible()){
									tab.columns([13,14,15,16]).visible(false);
								}
								else{
									tab.columns([13,14,15,16]).visible(true);
								}
							});
								//define variables and use functions to get data for summary
								var total_fee= sumcol(7);
								var Num_tot_sess = countcol(1);
								
								var cl_charge = sumcol(9);
								var cl_uninv = sumcol(10);
								var cl_paid = sumcol(11);
								var cl_unpaid = sumcol(12);
								var Num_cl_charge = countcol(8,"UNPAID")+countcol(8,"PAID");
								var Num_cl_paid = countcol(8,"PAID");
								var Per_cl_paid = ((Num_cl_paid/Num_cl_charge)*100).toFixed(2);
								var Num_cl_unpaid = parseFloat(Num_cl_charge) - parseFloat(Num_cl_paid);
								
								var cl_copayCharged = parseFloat(parseFloat(sumcol(9,13,"UNPAID")) + parseFloat(sumcol(9,13,"PAID")) + parseFloat(sumcol(9,13,"UNBILLED"))).toFixed(2);
								var cl_copayPaid = parseFloat(sumcol(11,13,"UNPAID") + sumcol(11,13,"PAID") + sumcol(11,13,"UNBILLED")).toFixed(2);
								var Per_copay_paid = ((cl_copayPaid/cl_copayCharged)*100).toFixed(2);
								var Num_Ins_paid = countcol(13, "PAID");
								var Avg_copay_paid = (cl_copayPaid/Num_Ins_paid).toFixed(2);
								
								var ffs_charge = sumcol(9,13,"null");
								var ffs_paid = sumcol(11,13,"null");
								
								var Num_Ins_Sess = countcol(13,"PAID")+countcol(13,"UNPAID")+countcol(13,"UNBILLED")+countcol(13,"ACCEPTED")+countcol(13,"DEDUCTIBLE");
								
								var Per_Ins_paid = ((Num_Ins_paid/Num_Ins_Sess)*100).toFixed(2);
								
								var Num_Ins_unpaid = Num_Ins_Sess - Num_Ins_paid;
								var Ins_Est = (Num_Ins_Sess*96).toFixed(2);
								
								var Num_ffs_sess = Num_tot_sess - Num_Ins_Sess;
								var Avg_ffs_paid = (ffs_paid/Num_ffs_sess).toFixed(2);
								var Per_ffs_paid = ((ffs_paid/ffs_charge)*100).toFixed(2); 
								
								var ins_charge = sumcol(14);
								
								var ins_paid = sumcol(15).toFixed(2);
								var ins_unpaid = parseFloat(parseFloat(Ins_Est)-parseFloat(ins_paid)).toFixed(2);
								var Per_Amn_Ins_paid = ((ins_paid/Ins_Est)*100).toFixed(2);
								var Avg_Ins_paid = ((ins_paid/Num_Ins_paid)).toFixed(2);
								
								var tot_amt_paid = parseFloat(parseFloat(ffs_paid)+parseFloat(cl_copayPaid)+parseFloat(ins_paid)).toFixed(2);
								var Est_tot_reimb =(parseFloat(Ins_Est)+parseFloat(ffs_charge)+parseFloat(cl_copayCharged));
								var Per_tot_amt_paid = ((tot_amt_paid/Est_tot_reimb)*100).toFixed(2);
								var Est_Amt_Remain = parseFloat((parseFloat(Est_tot_reimb)-parseFloat(tot_amt_paid))).toFixed(2);
								var Avg_Reimb_Sess = (Est_tot_reimb/Num_tot_sess).toFixed(2);
								var Num_gt = Highlow(7)['ngt'];
								var Amt_gt = Highlow(7)['agt'];
								var Num_lt = Highlow(7)['nlt'];
								var Amt_lt = Highlow(7)['alt'];
								var Fee_gt = (Num_gt*14).toFixed(2);
								var Fee_lt = (Amt_lt*.16).toFixed(2);
								var Fee_tot = parseFloat(Fee_gt)+parseFloat(Fee_lt);
								var per_tot_reimb = ((Fee_tot/Est_tot_reimb)*100).toFixed(2);
																
								//ADD SUMMARY TOTALS TO PAGE
                $("#sign").append("<h2 id='sitit' style='color:darkblue'>Fees Paid By Ins</h2>");
                $("#sign").append("<h3 style='color:darkgreen'><u># Ins Sessions: (" + Num_Ins_Sess + ")</u></h3>");
                $("#sign").append("Estimated To Be Paid By Ins: $" + Ins_Est + "</br>");
				
                $("#sign").append("# Sessions Paid: " + Num_Ins_paid + " (" + Per_Ins_paid + "%)</br>");
                $("#sign").append("Amount Paid: <span id='apsf' style=''>" + "$" + ins_paid + " (" + Per_Amn_Ins_paid + "% est.)</span></br>");
                $("#sign").append("# Unpaid: " + Num_Ins_unpaid + " ($"+ ins_unpaid + " est.)</br>");
                $("#sign").append("Estimated Avg Ins Payment: $"+Avg_Ins_paid+"</br>");
				
                $("#clsums").append("<h2 id=\"cltit\" style='color:darkblue'>Fees Paid by Client</h2>");
                $("#clsums").append("<h3 id=\"clsubtit\" style='color:darkgreen'><u># Ins Sessions ("+Num_Ins_Sess+")</u></h3>");
                $("#clsums").append("Copays Charged: $" + cl_copayCharged + "</br>");
                $("#clsums").append("Copays Paid: $" + cl_copayPaid + " ("+ Per_copay_paid+"%)</br>");
                $("#clsums").append("Avg Copay: $" + Avg_copay_paid + "</br>");
                $("#clsums").append("<h3 id=\"clsubtit\" style='color:darkgreen'><u>Non-Insurance Sessions ("+(Num_tot_sess-Num_Ins_Sess)+")</u></h3>");
                $("#clsums").append("Clients Charged: $" + ffs_charge + "</br>");
                $("#clsums").append("Clients Paid: $" + ffs_paid + " ("+Per_ffs_paid+"%)</br>");
                $("#clsums").append("Avg Non-Ins Clt Payment: $" + Avg_ffs_paid + "</br>");
                
							//ADD AMOUNTS TO SUMS DIV
                $("#sums").append("<h2 id=\"sumtit\" style='color:darkblue'>Monthly Fee Summary</h2>");
                $("#sums").append("<h3 style='color:darkgreen'><u>Total # of Sessions: (" + Num_tot_sess + ")</u></h3>");
                $("#sums").append("Est Tot Reimb: $" + Est_tot_reimb + "<br/>");
                $("#sums").append("Amt Paid So Far: $" + tot_amt_paid + " ("+Per_tot_amt_paid+"%)</br>");
                $("#sums").append("Est Amt Remain: $" + parseFloat(Est_tot_reimb-tot_amt_paid).toFixed(2) + "<br/>");
                $("#sums").append("Est Avg Reimb: $" + Avg_Reimb_Sess + "<br/>");
				
                $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp# Sess Costing <em> gt or = $50</em>: " + Num_gt + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMonthly Fee for these sessions </br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp("+Num_gt +" * 14): <b>$" + Fee_gt + "</b><br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp# Sess Costing <em>Less than 50</em>: " + Num_lt + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMonthly Fee for these sessions: </br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp$"+ Amt_lt+" * 16%: <b>$" + Fee_lt + "</b><br/>");
                $("#sums").append("<b>Total Fee: $"+ (Num_gt*14)+" + $"+parseFloat(Amt_lt*.16).toFixed(2)+" = $" + Fee_tot + "</b></br>");
                $("#sums").append("&nbsp"+ per_tot_reimb+"% of est tot reimb<br/>");
                $("#sums").css("display", "block");
					
              
			var cl_tot_crg=parseFloat(cl_copayCharged)+parseFloat(ffs_charge);
			var cl_tot_pd=parseFloat(cl_copayPaid)+parseFloat(ffs_paid);
			var cl_tot_unpaid = parseFloat(cl_tot_crg)-parseFloat(cl_tot_pd);
			vv3=parseFloat(Est_tot_reimb-tot_amt_paid).toFixed(2);
			
				vdd=[{
				name: 'Paid',
				y: parseFloat(cl_tot_pd),
				sliced: true,
				selected: true,
				color: "#56b86d"
				}, 
				{
					name: 'UnPaid',
					y: parseFloat(cl_tot_unpaid),
					color: "#b36269",
					sliced: true,
					selected: true
				}];
				
				vdd2=[{
				name: 'Paid',
				y: parseFloat(ins_paid),
				sliced: true,
				selected: true,
				color: "#326fa8"
				}, 
				{
					name: 'UnPaid',
					y: parseFloat(ins_unpaid),
					color: "#eded61",
					sliced: true,
					selected: true
				}];
				vdd3=[{
				name: 'Paid',
				y: parseFloat(tot_amt_paid),
				sliced: true,
				selected: true,
				color: "#de9221"
				}, 
				{
					name: 'UnPaid',
					y: parseFloat(vv3),
					color: "#0d0d0c",
					sliced: true,
					selected: true
				}];
					
				Highcharts.chart('ch_container', {
										chart: {
											plotBackgroundColor: null,
											plotBorderWidth: null,
											plotShadow: false,
											type: 'pie'
										},
										title: {
											text: 'Clt Paid vs. Unpaid'
										},
										tooltip: {
											pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
										},
										accessibility: {
											point: {
												valueSuffix: '%'
											}
										},
										plotOptions: {
											pie: {
												allowPointSelect: true,
												cursor: 'pointer',
												dataLabels: {
													enabled: true,
													format: '<b>{point.name}</b>: {point.percentage:.1f} %'
												}
											}
										},
										series: [{
											data: vdd
										}]	
								});
				Highcharts.chart('ch_container2', {
										chart: {
											plotBackgroundColor: null,
											plotBorderWidth: null,
											plotShadow: false,
											type: 'pie'
										},
										title: {
											text: 'Ins Paid vs. Unpaid'
										},
										tooltip: {
											pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
										},
										accessibility: {
											point: {
												valueSuffix: '%'
											}
										},
										plotOptions: {
											pie: {
												allowPointSelect: true,
												cursor: 'pointer',
												dataLabels: {
													enabled: true,
													format: '<b>{point.name}</b>: {point.percentage:.1f} %'
												}
											}
										},
										series: [{
											data: vdd2
										}]	
								});
				Highcharts.chart('ch_container3', {
								chart: {
									plotBackgroundColor: null,
									plotBorderWidth: null,
									plotShadow: false,
									type: 'pie'
								},
								title: {
									text: 'Tot Paid vs. Unpaid'
								},
								tooltip: {
									pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
								},
								accessibility: {
									point: {
										valueSuffix: '%'
									}
								},
								plotOptions: {
									pie: {
										allowPointSelect: true,
										cursor: 'pointer',
										dataLabels: {
											enabled: true,
											format: '<b>{point.name}</b>: {point.percentage:.1f} %'
										}
									}
								},
								series: [{
									data: vdd3
								}]	
						});
					
					$("#eightpac").click(function () {
								//clear standard html of fee calc
								$("#sums").html("");
								$("#sums").append("<h2 id=\"sumtit\">Low Cost Fees</h2>");
								$("#sums").append("Total Sesions: " + Num_tot_sess +"</br>");
								$("#sums").append("Total Client Charge: " + cl_charge + "</br>");
								$("#sums").append("PAID: " + Num_cl_paid + "  ($" + cl_paid + ") " + Per_cl_paid + "%</br>");
								$("#sums").append("UNPAID: " + Num_cl_unpaid + "  ($" + cl_unpaid + ")</br>");
								//$("#sums").append("UNBILLED: " + clunbilled + "  ($" + cltunbilled + ")</br>");
								var pintamt = (cl_paid*.42).toFixed(2);
								var pfcamt = (cl_paid*.16).toFixed(2);
								
								$("#sums").append("Intern Amount (42%): "+ pintamt +"</br>");
								$("#sums").append("Supervisor Amount (42%): "+ pintamt+"</br>");
								$("#sums").append("FC Amount (16%): "+ pfcamt+"</br>");

					});			
					$("#thirteenpac").click(function () {
					  $("#sums").html('');
					  $("#sums").append("<h2 id=\"sumtit\" style='color:darkblue'>Monthly Audit Report</h2>");
					  //$("#sums").append("Total Charged for Sessions: $" + totbilled + "</br>");
					  $("#sums").append("<h3 style='color:darkgreen'><u>Total # of Sessions: (" + Num_tot_sess + ")</u></h3>");
					  $("#sums").append("Estimated Total Reimbursement: $" + Est_tot_reimb + "<br/>");
					  $("#sums").append("Amount Paid for Sessions So Far: $" + tot_amt_paid + " ("+Per_tot_amt_paid+"%)</br>");
					  $("#sums").append("Estimated Amount Remaining to Be Paid: $" + Est_Amt_Remain + "<br/>");
					  $("#sums").append("Estimated Avg Reimbursement per Session: $" + Avg_Reimb_Sess + "<br/>");
					  //$("#sums").append("Avg Session Fee: $" + avfe + "<br/>");
					  $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp# Sess Costing <em> gt or = $50</em>: " + Num_gt + "<br/>");
					  $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp# Sess Costing <em>Less than 50</em>: " + Num_lt + "<br/>");
					  $("#sums").css("display", "block");
						});
																	
						$('a.toggle-vis').on( 'click', function (e) {
									e.preventDefault();
									hhh=$(this).index();
								  if($('a.toggle-gvis:eq('+hhh+')').css("color")=="rgb(35, 82, 124)") {
									   $('a.toggle-gvis:eq('+hhh+')').css("color","rgb(184, 84, 66)")
											//console.log("color changed");						   
								   }
									else if ($('a.toggle-gvis:eq('+hhh+')').css("color")=="rgb(184, 84, 66)") {
									   $('a.toggle-gvis:eq('+hhh+')').css("color","rgb(35, 82, 124)")
														//console.log("color changed back");				   
								  }
								  else {}
									// Get the column API object
									 column = tab.column( $(this).attr('data-column') );
							 
									// Toggle the visibility
									column.visible( ! column.visible() );
								});	
						$('a.toggle-gvis').on( 'click', function (e) {
						e.preventDefault();
						    ahhh=$(this).index();
								});
								
								$("#waitdivs2").css("display","none");
								
						//end done function	
						});
    //twopac function close  
    }); 
	
	//function to hide sums div on click
    $("#threepac").click(function () {
		//set display status of sums div to gump variable
        gump=$("#sums").css("display");
        if (gump=="none"){
			//if display of sums is set to none, change to block
            $("#sums").css("display","block");
        }
        else {
			//if display is set to something else (block) set to none
        $("#sums").css("display","none");
            }
    });
    //function to hide sign div on click
	$("#fourpac").click(function () {
        sgump=$("#sign").css("display");
        if (sgump=="none"){
            $("#sign").css("display","block");
        }
        else {
            $("#sign").css("display","none");
        }
    });
    //function to abbreviate names
	$("#fivepac").click(function () {
        totT=$("table tbody tr").length;
       for (i = 0; i < totT; i++) {

          if ($("table tbody tr:eq("+i+") td:eq(2)")[0].innerHTML.trim().split(" ").length>2)
          {
            $("table tbody tr:eq("+i+") td:eq(2)")[0].innerHTML = $("table tbody tr:eq("+i+") td:eq(2)")[0].innerHTML.trim().split(" ")[0].substr(0,1) + $("table tbody tr:eq("+i+") td:eq(2)")[0].innerHTML.trim().split(" ")[1].substr(0,1);
          }
          else
            $("table tbody tr:eq("+i+") td:eq(2)")[0].innerHTML = $("table tbody tr:eq("+i+") td:eq(2)")[0].innerHTML.trim().split(" ")[0].substr(0,1) + $("table tbody tr:eq("+i+") td:eq(2)")[0].innerHTML.trim().split(" ")[1].substr(0,1);
        }
    });
    $("#sixpac").click(function () {
        lump=$("#tablethingy").css("display");
        if (lump=="none"){
            $("#tablethingy").css("display","block");
        }
        else {
            $("#tablethingy").css("display","none");
        }
    });
    $("#sevenpac").click(function () {
        var yoyoma=tab.rows()[1].length;
        for(m=1;m<yoyoma;m++){
            beaver =tab.row(m).data()[4]
            if (beaver=="020202"||beaver=="0990"){
             $(".tr:eq(m)").hide();
            }
            else
            {}
            }
    });
    $("#ninepac").click(function () {
        ump=$("#clsums").css("display");
        if (ump=="none"){
            $("#clsums").css("display","block");
        }
        else {
            $("#clsums").css("display","none");
        }
    });
    $("#tenpac").click(function () {
        $("#sums").html("");
        $("#sums").append("<h2 id=\"sumtit\">LPCA Fees</h2>");
        $("#sums").append("Total Sesions: " + totf +"</br>");
        $("#sums").append("Total Client Charge: " + totclchrg + "</br>");
        $("#sums").append("Total Sessions >=50: " + tail + "  (" + wing+"$)</br>");
        $("#sums").append("Total Sessions <50: " + unsix + "  ("+beak+"$)</br>");

        var lpcaamt = tail*14;
        var lpasupamt = tail*5;
        totsuphalfee = totsuphalfee.toFixed(2);

        $("#sums").append("Total Fee to FC for Sessions >60: " + lpcaamt + "</br>");
        $("#sums").append("Total Fee to Supervisor for Sessions >60: " + lpasupamt + "</br>");
        $("#sums").append("Total Fee to FC for Sessions <60: " + tothalfee + "</br>");
        $("#sums").append("Total Fee to Supervisor for Sessions <60: " + totsuphalfee + "</br>");
        var numr= $("#tablethingy tr.even").length + $("#tablethingy tr.odd").length;

         lpcatofc = parseFloat(lpcaamt)+parseFloat(tothalfee);
         lpcatosup = parseFloat(lpasupamt)+parseFloat(totsuphalfee);

        $("#sums").append("LPCA Pays to Full Circle: "+ lpcatofc +"</br>");
        $("#sums").append("LPCA Pays to Supervisor: "+ lpcatosup +"</br>");

    });
	//button to change color of unpaid sessions, on click run function...
    $("#elevenpac").click(function () {
		//get length of table rows
       llen=$("table tbody tr").length;
	   //change background color of amount in summary field
        $("#apsf").css("background-color","#e8faec");
		//loop through rows in table
        for (i=0;i<llen;i++) {
			//if insurance status is not empty
          if($("table tbody tr:eq("+i+") td:eq(13)")[0].innerText.length>0) {
			  //if table cell in insurance paid column is not a number...
              if(isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(15)")[0].innerHTML.trim().substr(1)))) {
								//add test class and log to console
                                  $("table tbody tr:eq("+i+") td:eq(13)").addClass("test"); console.log(i);
                }
				//if table cell in insurance paid column is a number...
              else {
				  //change cell background color and log to console
                  $("table tbody tr:eq("+i+") td:eq(13)").css("background-color","#f7e4e4"); console.log(i);
                   };
                 };
				 //if charge to client is a number, then...
          if($.isNumeric(parseFloat($("table tbody tr:eq("+i+") td:eq(9)")[0].innerHTML.trim().substr(1)))) {
			  //if amount paid cell to client is number, then...
            if($.isNumeric(parseFloat($("table tbody tr:eq("+i+") td:eq(11)")[0].innerHTML.trim().substr(1)))){
				//change background of cell 
              $("table tbody tr:eq("+i+") td:eq(11)").css("background-color","#cbd3f5");
            }
			//if paid amount is not a number (empty), then...
            else{
				//change background color of cell
              $("table tbody tr:eq("+i+") td:eq(11)").css("background-color","#f5f4d7");
            }
          }
             };
            });
	$("#twelvepac").click(function () {
        tllen=tab.rows()[0].length;
          for (i=0;i<tllen;i++) {
             if(roww(i)[13]=="UNPAID"||roww(i)[13]=="UNBILLED"||roww(i)[13]=="DEDUCTIBLE"||roww(i)[13]=="ACCEPTED")
			 {
				 
			 }
		  else
		     {
			 var hug = $(tab.row(i).node()).css("display");
				if (hug=="none")
				{
					$(tab.row(i).node()).css("display","table-row");
					
				}
				else
				{
					$(tab.row(i).node()).css("display","none");
				}
			 }
        };
      });
//end if window report function...
}


// if practitioner report page is active...
else if (window.location.href.includes('report3.html'))
{
	//run ajax to get practitioner names...
	$.ajax({url: "https://secure.simplepractice.com/reports/insurance-payment-reports?clinicianId=84638&endsAt=2020-08-31&startsAt=2020-08-25", 
		//on success of ajax call, then do execute this function
		success: function(response)
		//filter response to get script and store in variable clnames
		{$("#prac").append("<option value='all'>All Practitioners</option>");
			clnames=$(response).filter("script");
		//create hidden div and attach to body
			$("body").append("<div id='hdiv' style='display:none'></div>");
			//paste script in hidden div to activate
			$("#hdiv").html(clnames[6]);
			//gather practitioner name data 
			prnm = window.currentUser.included;
			//get length of response array
			prnml=prnm.length;
			//loop through response array
			for (j=0;j<prnml;j++)
			{
				//if data type is teamMembers, then..
				if(prnm[j].type=="teamMembers")
				{
					if(prnm[j].attributes['isDeleted']=="false")
					{
					//get clinician id and store in clinid variable
					clinid=prnm[j].id;
					//get first and last name
					fclnam=prnm[j].attributes.firstName;
					lclnam=prnm[j].attributes.lastName;
					//build option and append to select
				    $("#prac").append("<option value="+clinid+">"+fclnam+" "+lclnam+"</option>");
				    }
				//end if
				}
			//end for loop through prnml array
			}
		//end ajax success function 
		}
		//end ajax to get practitioner names
		}); 			
	//function to add dates to date			
function addDays(date, days) {
	//create new date object
		var result = new Date(date);
		//set new date as day of date plus passed days
		result.setDate(result.getDate() + days);
		//return result
		return result;
		}
       //create new date object
	  nd = new Date();
	  //break it up by extracting day month year
	  st= nd.getMonth()+1+"/"+nd.getDate()+"/"+nd.getFullYear();
	  //add 14 days to date and store as en var
	  en=addDays(st, 14);
	  //create date range and activate on input in hmtl
		$('input[name="daterange"]').daterangepicker({
			"ranges": {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				},
			"alwaysShowCalendars": true,
			"startDate": "09/01/2020",
			"endDate": "09/07/2020"
			}, function(start, end, label) {
		  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
			});

//on click of twopac3 button, get data and run function...
$("#twopac3").on("click", function () {
	//add column hiding links
	$("#waitdivs2").css("display","block");
	//$('#togdiv').css("display","block");
	//$("#togdivg").css("display","block");
			//if data table exists, clear and destroy
			if($.fn.DataTable.isDataTable( '#tablethingy')){
				//console.log('destroy tab');
				tab.destroy();
				//console.log($.fn.DataTable.isDataTable( '#tablethingy' )) 
				//console.log('clear tbod');
				$("#tablethingy tbody").html("");
				$("#sums").html("");
				$("#clsums").html("");
				$("#sign").html("");
				$("#ch_container").html("");
				$("#ch_container2").html("");
				$("#ch_container3").html("");}
				
				//get date range and format...
			 	dr=$("input").val();
				er=dr.split(" - ");
				ser = er[0].split("/");
				eer = er[1].split("/");
				sta = ser[2]+"-"+ser[0]+"-"+ser[1];
				ena = eer[2]+"-"+eer[0]+"-"+eer[1];
				//get practitioner name
				pprac=$("#prac option:selected").text();
				//build url from date range from date range selector and clinician id
				urltmpa="https://secure.simplepractice.com/frontend/reports/appointments?filter%5BstartsAt%5D="+sta+"&filter%5BendsAt%5D="+ena+"&filter%5BincludeInsurance%5D=true&filter%5BclinicianId%5D=84638";
				
				//run ajax to get data from this web page related to claim related to ths page
	            $.ajax({url: urltmpa, 
						//accept data in this form
						headers: {
							'accept': 'application/vnd.api+json'
								},
						//have to do it synchronously because of for loop which runs independent of ajax calls
					    //async: false,
						//on success of call, run this function, passing result
						success: function(result)
											{
											//store data in hgh variable
											hgh=result.data.attributes.rows;
											hgg=[];
											//get length of resulting data
											lll=hgh.length;
											//set tott variable to 0
											tott=0
											//loop through data set array
													for (a=0;a<lll;a++)
													{
														//if cptcodes are 0990 or 020202, exclude, otherwise...
														if (hgh[a]['cptCodes'][0]!='0990'&&hgh[a]['cptCodes'][0]!='020202')
														{}
														else
														{
															if(pprac=='All Practitioners'){
														//build url from hgh data to create a tag/link below 
														urltmpb = "https://secure.simplepractice.com/calendar/appointments/"+hgh[a]['id'];
														//if insurance paid status is unbilled or unpaid, then... 									
																															//add row to table
																$("#tablethingy tbody").append("<tr><td id='indexbut' class='details-controla'></td><td><a target='_blank' href="+urltmpb+">"+hgh[a]['startTime']+"</a></td><td>"+hgh[a]['clientName']+"</td><td>"+hgh[a]['cptCodes'][0]+"</td><td>"+hgh[a]['ratesForAppointment'][0]+"</td><td>"+hgh[a]['clientPaid']+"</td><td>"+hgh[a]['clientPaidStatus']+"</td><td>"+hgh[a]['balance']+"</td></tr>");								
																}
																else {
																	if( hgh[a]['clientName']==pprac){
																	urltmpb = "https://secure.simplepractice.com/calendar/appointments/"+hgh[a]['id'];
														//if insurance paid status is unbilled or unpaid, then... 									
																															//add row to table
																$("#tablethingy tbody").append("<tr><td id='indexbut' class='details-controla'></td><td><a target='_blank' href="+urltmpb+">"+hgh[a]['startTime']+"</a></td><td>"+hgh[a]['clientName']+"</td><td>"+hgh[a]['cptCodes'][0]+"</td><td>"+hgh[a]['ratesForAppointment'][0]+"</td><td>"+hgh[a]['clientPaid']+"</td><td>"+hgh[a]['clientPaidStatus']+"</td><td>"+hgh[a]['balance']+"</td></tr>");								
																
																	}
																	else {}
																}
														//end else loop for cpt code
														}	
													// end for loop through rows of data array from sessions ajax call
													}
													 $("#tablethingy").css('display','table');
											//create data table js object
											tab=$("#tablethingy").DataTable({paging:false});
											//end ajax success function	
											//add totals to fields on form
									$("#totalpbc").html('');
									$("#totalpot").html('');
									$("#totalowe").html('');
								
									$("#totalpbc").append("Total Charged to Practitioner: "+sumcol(4).toFixed(2)+" </br> &nbsp;&nbsp;&nbsp; Fee: "+sumcol(4,3,'020202').toFixed(2)+" </br>&nbsp;&nbsp;&nbsp; Supervision: "+sumcol(4,3,'0990').toFixed(2));
									$("#totalpot").append("Total Paid By Practitioner: "+sumcol(5).toFixed(2)+" </br> &nbsp;&nbsp;&nbsp; Fee: "+sumcol(5,3,'020202').toFixed(2)+" </br> &nbsp;&nbsp;&nbsp; Supervision: "+sumcol(5,3,'0990').toFixed(2));
									$("#totalowe").append("Total Owed By Practitioner: "+sumcol(7).toFixed(2)+" </br> &nbsp;&nbsp;&nbsp; Fee: "+sumcol(7,3,'020202').toFixed(2)+" </br> &nbsp;&nbsp;&nbsp; Supervision: "+sumcol(7,3,'0990').toFixed(2));
											}
						//end ajax call to get data for appointments and table set up
						}).done(
						     function() {$("#waitdivs2").css("display","none");});
						
    //twopac function close  
    }); 
	

//end if window report function...
}


//if window is report2 (for epr search thingy)...
else (window.location.href.includes('report2.html'))
{
	//function to add days to date
		function addDays(date, days) {
				var result = new Date(date);
				result.setDate(result.getDate() + days);
				return result;
				}
      //set new date object and assign to variable nd 
	  nd = new Date();
	  st= nd.getMonth()+1+"/"+nd.getDate()+"/"+nd.getFullYear();
	  //add 14 days to date and create new date assigned to en
	  en=addDays(st, 14);
	  //create daterangepicker
		 $('input[name="daterange"]').daterangepicker({
			
			"alwaysShowCalendars": true,
			"startDate": "08/26/2020",
			"endDate": "09/01/2020",
			 "opens": "left",
			 "ranges": {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
		}, function(start, end, label) {
		  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
		});
//on clicking detail control circle in table, then run this function...
 $('#tablethingy tbody').on('click', 'td.details-control', function () {
			  console.log("clicked");
				 tr = $(this).closest('tr');
				 row = tab.row( tr );
				 console.log(tr);
				 console.log(row.child.isShown());
				if (row.child.isShown() ) {
					console.log("shown");
					// This row is already open - close it
					row.child.hide();
					tr.removeClass('shown');
					console.log("class removed");
					}
				else {
					// Open this row
					console.log("not shown");
					row.child.show();
					tr.addClass('shown');
					console.log("class added");
					}
					});
//get date range value
	dr=$("input").val();
	er=dr.split(" - ");
	ser = er[0].split("/");
	eer = er[1].split("/");
	//built start and end date and store in variables
	sta = ser[2]+"-"+ser[0]+"-"+ser[1];
	ena = eer[2]+"-"+eer[0]+"-"+eer[1];

//run ajax call to get clinician names		
 $.ajax({url: "https://secure.simplepractice.com/reports/insurance-payment-reports?clinicianId=84638&endsAt=2020-08-31&startsAt=2020-08-25", 
		//on success of ajax call, then do execute this function
		success: function(response)
		{
			//get script tag from response and assign clnames
			clnames=$(response).filter("script");
			$("body").append("<div id='hdiv' style='display:none'></div>");
			$("#hdiv").html(clnames[6]);
			prnm = window.currentUser.included;
			
			prnml=prnm.length;
			
			for (j=0;j<prnml;j++)
			{
				if(prnm[j].type=="teamMembers")
				{
					clinid=prnm[j].id;
					fclnam=prnm[j].attributes.firstName;
					lclnam=prnm[j].attributes.lastName;
				    $("#prac").append("<option value="+clinid+">"+fclnam+" "+lclnam+"</option>");
				}
			}
		}		
		}); 

$("#stripepac").on("click", function(){
	//click button to start process
	//display loading div
	$("#waitdivs2").css("display","block");
	//clear table
	$("#tablethingy tbody").html("");
	$("#tabsum2 tbody").html("");
	//get team members
	DOBJ=new Object();
	DOBJ.data={};
	DOBJ.prac={};
	//DOBJ.totals={};
	DOBJ.holds={};
	iii=0;
	//get date range value
	dr=$("input").val();
	er=dr.split(" - ");
	ser = er[0].split("/");
	eer = er[1].split("/");
	//built start and end date and store in variables
	sta = ser[2]+"-"+ser[0]+"-"+ser[1];
	ena = eer[2]+"-"+eer[0]+"-"+eer[1];
	stripeurl='https://secure.simplepractice.com/frontend/stripe-balance-transactions?fields%5Bclients%5D=hashedId&filter%5BstartsAt%5D='+sta+'&filter%5BendsAt%5D='+ena+'&filter%5BpayoutStartsAt%5D=&filter%5BpayoutEndsAt%5D=&filter%5Bpayout%5D=&filter%5BtransactionType%5D=charge&filter%5BclientName%5D=&include=payment%2Cclient&page%5Bnumber%5D=1&page%5Bsize%5D=50';
	
	
	
	
	
	$.ajax({url: "https://secure.simplepractice.com/frontend/team-members?filter%5BisDeleted%5D=false",
			headers: {
							'accept': 'application/vnd.api+json'
								},
						//have to do it synchronously because of for loop which runs independent of ajax calls
					    //async: false,
						//on success of call, run this function, passing result
						success: function(result){
							huggg=result;
							hugglength=huggg.data.length;
							for (t=0;t<hugglength;t++){
								var purp=huggg.data[t].id;
							DOBJ.prac[purp]={name:huggg.data[t].attributes.legalName,total:0};
							
							}
	}}).done(function(){
	
	
	//DOBJ.matt=0;

			$.ajax({url:stripeurl, 
						//accept data in this form
						headers: {
							'accept': 'application/vnd.api+json'
								},
						//have to do it synchronously because of for loop which runs independent of ajax calls
					    //async: false,
						//on success of call, run this function, passing result
						success: function(result){ gg=result; console.log('ready'); 
										
									glength = gg.data.length;
									
									for (i=0;i<glength;i++){
										
										clientId=gg.data[i].relationships.client.data.id;
										clientUrl = "https://secure.simplepractice.com/frontend/clients/"+clientId;
														
										$.ajax({url: clientUrl, ajaxI: i,headers: {
										'accept': 'application/vnd.api+json'
												},
											//on success of call, run this function, passing result
										success: function(xml){ i=this.ajaxI;
													jjj=xml;
												 iii=iii+1;
												 console.log("iii:"+iii);
													gotthis=jjj.data.relationships.clinician.data.id;
													vvv=gg.data[i].attributes.fee;
													yuy=gg.data[i].attributes.amount;
													zuz=gg.data[i].attributes.amount-gg.data[i].attributes.fee;
													$("#tablethingy tbody tr:eq("+i+") td:eq(2)").html(DOBJ.prac[gotthis]['name']+" (<span style='font-size:11px'>"+gotthis+"</span>)");
													DOBJ.data[i]={Clinician:gotthis+", "+DOBJ.prac[gotthis].name,Amount:yuy,Fee:vvv,Net:zuz};
													if(gotthis in DOBJ.holds){
														  console.log("yes"); 
														  DOBJ.prac[gotthis].total=DOBJ.prac[gotthis].total+yuy;
														  DOBJ.prac[gotthis].fee=DOBJ.prac[gotthis].fee+vvv;
														  DOBJ.prac[gotthis].net=DOBJ.prac[gotthis].net+zuz;
													}
													else{ DOBJ.holds[gotthis]=0; 
														  DOBJ.prac[gotthis].total=yuy;
														  DOBJ.prac[gotthis].fee=vvv;
														  DOBJ.prac[gotthis].net=zuz;
														  console.log('no')}
													
													console.log("i:"+i);
													
														
						                                } }).done(function(){console.log(DOBJ.holds);
														if(iii==(glength)){
													console.log("i:"+i+"iii: "+iii);
													
													
														qqq=Object.keys(DOBJ.holds).length;
													console.log("DOBJ.holds:"+Object.keys(DOBJ.holds));
													console.log("qqq:"+qqq);
													
				
													CTo=0;
													CTp=0;
													CTq=0;
													for (q=0;q<qqq;q++) {
														var tyrone = Object.keys(DOBJ.holds)[q];
														
														$("#tabsum2 tbody").append("<tr><td>"+DOBJ.prac[tyrone].name+"</td><td>"+DOBJ.prac[tyrone].total.toFixed(2)+"</td><td>"+DOBJ.prac[tyrone].fee.toFixed(2)+"</td><td>"+DOBJ.prac[tyrone].net.toFixed(2)+"</td></tr>");
														console.log(DOBJ.prac[tyrone].name);
														CTo=CTo+DOBJ.prac[tyrone].total;
														CTp=CTp+DOBJ.prac[tyrone].fee;
														CTq=CTq+DOBJ.prac[tyrone].net;
													}
													$("#tabsum2 tbody").append("<tr><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td></tr>");
														
													$("#tabsum2 tbody").append("<tr><strong><td>Totals for All</td><td>"+CTo.toFixed(2)+"</td><td>"+CTp.toFixed(2)+"</td><td>"+CTq.toFixed(2)+"</td></strong></tr>");
														}});
										
										
										
										yyy=gg.data[i].attributes.arrivalDate;
										zzz=new Date(yyy).toDateString();
										net=gg.data[i].attributes.amount-gg.data[i].attributes.fee;
									//create and append table row	
									$("#tablethingy tbody").append("<tr> <td>"+zzz+"</td> <td>"+gg.data[i].attributes.clientName+"</td> <td>   </td> <td>"+net+"</td> <td>"+gg.data[i].attributes.amount+"</td> <td>"+gg.data[i].attributes.fee+"</td> </tr>");
									
									//end for loop
														}
								
									
									
								},
						
								
								}).done(function () {
							$("#waitdivs2").css("display","none");
								
							
							
							
							
								
						
							
							
							
							//end 2nd done function ajax
						});
						//end 1st done function ajax
						
								
						
						});
						
						
});

		
//button click and function for electronic payments reports report/search thingamagigg
$("#twopac2").on("click", function() {
	//click button to start process
	//display loading div
	$("#waitdivs2").css("display","block");
   	//add hidden div to store ajax results
	$("body").append("<div id='hiddiv3' style='display:none'></div>");
	//check to see if datatable is initiated, if it is, destroy it!! and clear table body
		if($.fn.DataTable.isDataTable( '#tablethingy')){
			//console.log('destroy tab');
			tab.destroy();
			//console.log($.fn.DataTable.isDataTable( '#tablethingy' )) 
			//console.log('clear tbod');
			$("#tablethingy tbody").html("");}
	//get dates from date range picker, process into useable form		
	dr=$("input").val();
	er=dr.split(" - ");
	ser = er[0].split("/");
	eer = er[1].split("/");
	//set dates to variables sta and ena
	sta = ser[2]+"-"+ser[0]+"-"+ser[1];
	ena = eer[2]+"-"+eer[0]+"-"+eer[1];
	//get practitioner numerical id from select input
	pprac=$("#prac").val();
	//construct url for ajax call
	turl='https://secure.simplepractice.com/frontend/reports/insurance_payment_reports?filter%5BstartsAt%5D='+sta+'&filter%5BendsAt%5D='+ena+'&filter%5BclinicianId%5D='+pprac;
	//ajax to get epr data for start date and end date and practitioner
		$.ajax({ url:turl, 
		//weird header thing that allows all data to be passed for  some reason
					headers: {
					'accept': 'application/vnd.api+json'
					//end headers
					},
					//make sync
					//async: false,
					//on success, run this , pass data
					success: function (data) {
						 //save data in dd
					  dd=data;
					  //get row data and store in ep
					  ep=dd.data.attributes.rows;
					  //get length of array of data
					  grndln=ep.length;
					  tot_bcbs=0;
					  tot_oth = 0;
					  //loop through ep array (epr data)
								  for(k=0;k<grndln;k++)
								  {
												  //get value of insurance hash id in this row of table and save in hid variable
												  hid=ep[k]['clientHashedId'];
												  //get value of eligible claim id in this row of table and save to elid variable
												  elid=ep[k]['eligibleInsuranceClaimId'];
												  console.log(k+hid+elid);
												  //build the urls from these variables related to this row of data from epr
												  urltmp="https://secure.simplepractice.com/clients/"+hid+"/insurance_claims/"+elid
												  urltmp2="https://secure.simplepractice.com/clients/"+hid+"/overview";
												  urltmp3="https://secure.simplepractice.com/billings/insurance_payments/"+ep[k]['insurancePaymentId'];
												  urltmp4="https://secure.simplepractice.com/reports/appointments?clientHashedId="+hid+"&includeInsurance=true";
										  //construct table row and append to table	  
										  $("#tablethingy tbody").append("<tr><td class=''></td><td><a target='_blank' href="+urltmp4+">"+ep[k]['createdAt']+"</a></td><td><a target='_blank' href="+urltmp2+">"+ep[k]['clientName']+"</a></td><td>"+ep[k]['payerName']+"</td><td>"+ep[k]['totalAmountPaid']+"</td><td><a target='_blank' href="+urltmp+" >"+ep[k]['reportReferenceId']+"</a></td><td><a target='_blank' href=>"+ep[k]['controlNumber']+"</a></td><td><a target='_blank' href="+urltmp3+">"+ep[k]['paymentReferenceId']+"</td><td>"+ep[k]['id']+"</td><td>"+ep[k]['clientHashedId']+"</td><td>"+ep[k]['claimDeleted']+"</td><td>"+ep[k]['eligibleInsuranceClaimId']+"</td><td>"+ep[k]['insurancePaymentId']+"</td><td>"+ep[k]['insuranceClaimClientHashedId']+"</td><td class='date1'></td><td class='date2'></td><td class='date3'></td><td class='date4'></td><td class='date5'></td><td class='date6'></td></tr>");
										//if payer name includes specific insurances, add to totals and store in variables	
										if(ep[k]['payerName'].includes("Blue Cross Blue Shield of North Carolina"))
											{
											 tot_bcbs=tot_bcbs+cash(ep[k]['totalAmountPaid']);
											}
											else 
											{
												 tot_oth = tot_oth + cash(ep[k]['totalAmountPaid']);
											};
										 															  
								  //end for loop through epr data array (k)
								  }
								  //display tablethingy
								   $("#tablethingy").css('display','table');
								   //create datatable object of table
								   tab=$("#tablethingy").DataTable({paging:false});
								//add totals to fields on form
									$("#totalpbc").html('');
									$("#totalpot").html('');
								
									$("#totalpbc").append(tot_bcbs.toFixed(2));
									$("#totalpot").append(tot_oth.toFixed(2));
									//end ajax success function
									}
								//end ajax function, then, run this function..
								}).then(function() {
											//run through for loop through ep variable for amount of rows in table
										  for(c=0;c<grndln;c++)
												{
												  //get value of insurance hash id in this row of table and save in hid variable
														  hid=ep[c]['clientHashedId'];
														  //get value of eligible claim id in this row of table and save to elid variable
														  elid=ep[c]['eligibleInsuranceClaimId'];
														  console.log(c+hid+elid);
														  //build the urls from these variables related to this row of data from epr
														  urltmp="https://secure.simplepractice.com/clients/"+hid+"/insurance_claims/"+elid
														  urltmp2="https://secure.simplepractice.com/clients/"+hid+"/overview";
														  urltmp3="https://secure.simplepractice.com/billings/insurance_payments/"+ep[c]['insurancePaymentId'];
														  urltmp4="https://secure.simplepractice.com/reports/appointments?clientHashedId="+hid+"&includeInsurance=true";
												 //if hid or elid are null, skiparoo..
												  if (hid=="null"||elid== "null")
												  {}
												  //if both are not null, then ... 
												  else 
													{
													  //if either hid or elid are blank, then skiparoo
													  if (hid=="blank"||elid=="blank"){}
													  //if both are not blank, then... 
													  else
													  {
														//run ajax SYNCHRONOUSLY to get data from claim 
															ajaxstop();
														//end passed else option
														}
													//end else
													}
												//end for loop
												}
					 //get length of table rows 
					 var util = tab.rows()[0].length;
					  //run loop over table rows
					  for (h=0;h<util;h++){
						//if date field is empty, then... 							  
						if (tab.row(h).data()[16]=="")  
						{	
							tab.column(16).visible(false);
							tab.column(17).visible(false);
							tab.column(18).visible(false);
							tab.column(19).visible(false);
							$('a.toggle-vis:eq(15)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(16)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(17)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(18)').css("color","rgb(184, 84, 66)");
							
							break;
						}
						if(tab.row(h).data()[17]=="")
						{
							tab.column(17).visible(false);
							tab.column(18).visible(false);
							tab.column(19).visible(false);
							$('a.toggle-vis:eq(16)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(17)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(18)').css("color","rgb(184, 84, 66)");
							break;
						}
						if(tab.row(h).data()[18]=="")
						{
							tab.column(18).visible(false);
							tab.column(19).visible(false);
							$('a.toggle-vis:eq(17)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(18)').css("color","rgb(184, 84, 66)");
							break;
						}
						if (tab.row(h).data()[19]=="")
						{
							tab.column(19).visible(false);
							$('a.toggle-vis:eq(18)').css("color","rgb(184, 84, 66)");
							break;
						}
								  
					  }
					  		tab.column(10).visible(false);
							tab.column(13).visible(false);
							tab.column(7).visible(false);
							tab.column(12).visible(false);
							tab.column(8).visible(false);
							$('a.toggle-vis:eq(9)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(12)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(6)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(11)').css("color","rgb(184, 84, 66)");
							$('a.toggle-vis:eq(7)').css("color","rgb(184, 84, 66)");
					 
							$("#togdiv").css("display","block");
														

								
									$('a.toggle-vis').on( 'click', function (e) {
									e.preventDefault();
									hhh=$(this).index();
									if($('a.toggle-vis:eq('+hhh+')').css("color")=="rgb(49, 116, 199)") {
									   $('a.toggle-vis:eq('+hhh+')').css("color","rgb(184, 84, 66)")
											console.log("color changed");						   
									}
								    else if ($('a.toggle-vis:eq('+hhh+')').css("color")=="rgb(184, 84, 66)") {
									   $('a.toggle-vis:eq('+hhh+')').css("color","rgb(49, 116, 199)")
														console.log("color changed back");				   
									}
									else {}
									// Get the column API object
									 column = tab.column( $(this).attr('data-column') );
							 
									// Toggle the visibility
									column.visible( ! column.visible() );
									//end on click function
									} );
									//end then function
									}
										  //end then function
										  );
						//create ajax function 
					  function ajaxstop() {
						  //send ajax call to get claim info, pass ajaxI parameter to 'save' index reference with this call
						 $.ajax({url: urltmp, ajaxI: c, success: function(xml) {

								 //set 'c' to index reference number saved for xml results of this call
													 c=this.ajaxI;
													   //filter result for scripts and store [5] in aresult variable
															  aresult=$(xml).filter('script')[5];
															  //log into console that it is complete
															  console.log("ajax complete, data gathered");
															  //add script into hidden div
															  $("#hiddiv3").append(aresult);
															  				  
																//for loop through service dates
																 for (m=0;m<6;m++)
																	{		//if service line on claim is undefinted, then break and move on...
																		   if(typeof(gon.claim_params.claim.service_lines[m])=="undefined")
																				{
																				
																				break;
																				}
																				//if service line on claim is empty, then break and move on..
																		   else if (gon.claim_params.claim.service_lines[m].service_date_from.length==0)
																				{
																				break;
																				}
																				//if service line in claim is defined and contains a date, then...
																		   else
																				{
																					
																																									
																					switch (m) {
																					  case 0:
																						$(".date1:eq("+c+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
																						
																						break;
																					  case 1:
																						$(".date2:eq("+c+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
																						break;
																					  case 2:
																						$(".date3:eq("+c+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
																						break;
																					  case 3:
																						$(".date4:eq("+c+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
																						break;
																					  case 4:
																						$(".date5:eq("+c+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
																						break;
																					  case 5:
																						$(".date6:eq("+c+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
																						break;
																					 //end switch
																								}
																																							
																			//end else
																				}	
																	//end for loop
																	}
													  //if index is the last one in the table, hide loading field
													 if (c==tab.rows()[0].length-1)
													 {
														 $("#waitdivs2").css("display","none");
													 }
													  //end success function
													  }
														//end ajax
													  });
					  //function ajax stop
					  };
					  
//end twopac2 button click function
});

//function for when threepac2 button is clicked
$("#threepac2").click(function() {
	//when button is clicked, display loading message...
	$("#waitdivs2").css("display","block");
	//make ajax call
		$.ajax({url: "https://secure.simplepractice.com/frontend/pay-periods?page%5Bsize%5D=50", 
		//on success of ajax call, then do execute this function
		success: function(result){ 
			//set result to qq variable
			qq=result;
			//get length of qq variable and set to lennn
			lennn=qq.data.length;
			//loop through qq
			for (n=0;n<lennn;n++)
				{
				//set row of data n, id to stid
				stid = qq.data[n].id;
				//set starts at attr of row to star
				star = qq.data[n].attributes.startsAt;
				//translate star into date object and store as stard
				stard = new Date(star);
				//format date and store as stardd
				stardd = stard.toLocaleDateString();
				//get ending date and store in Enn
				Enn= qq.data[n].attributes.endsAt;
				//create new date object from end date
				Ennd = new Date(Enn);
				//formate date and store in Enndd
				Enndd = Ennd.toLocaleDateString();
				//add date option into select option field
				$("#irbc").append("<option value='"+stid+"'>"+stardd+" - "+Enndd+"</option>");
				//end for loop for qq date set
				}
			//append button irbcbut2 to irbccon
			$("#irbccon").append("<button id='irbcbut2' style=''>Compare EPR and IRBC</button>");
			//hide loading message
			//$("#wait").css("display","none");
			 //onclick of irbc2 ajax button, run this function...
			$("#irbcbut2").click(function(){
			//display loading field	
				$("#waitdivs2").css("display","block");
				//add hidden table to body to store ajax data
				$("body").append("<div style='display:none'><table id='ltab'></table></div>")
				//run ajax to get dates from irbc reports
				 $.ajax({url: "https://secure.simplepractice.com/frontend/pay-periods/"+$("#irbc").val()+"/download", 
				  //on success, run this function...
				  success: function(result){
				  //store result in pp variable and log onto console
				  pp=result;
				  //split pp text string (csv) by new line character and store as hhh...
				  hhh=pp.split(/\r|\n/);
				  //store length of hhh array in ggg variable
				  gog=hhh.length;
				  //create two arrays, redder and joj
				  redder = [];
				  joj=[];
				  //loop through all items of array
				  for (v=0;v<gog;v++)
				  {
					  //if hhh array item includes quotations, format...
					  if (hhh[v].includes('"'))
						  {
						  //split hhh item at comma, store in bowl variable
						  bowl=hhh[v].split(",");
						  //create and store in redder array a new array line item with each line from csv and formatted text
						  redder[v]=[bowl[0],bowl[3],bowl[4],bowl[5],bowl[6],bowl[7],bowl[8],bowl[9],bowl[10],bowl[11],bowl[12],bowl[13]];		  
							//end if condition function
						   }
					  //if hhh array item does not contain quotations, then...
					  else
						   {
							//split and store in array
							bowl=hhh[v].split(",");
							redder[v]=[bowl[0],bowl[1],bowl[2],bowl[3],bowl[4],bowl[5],bowl[6],bowl[7],bowl[8],bowl[9],bowl[10],bowl[11]];
							//end else condition functino
							}
				  //end for loop and have new array of organized data
				  }
				  //create index variable d, set to 0
				  d=0;
				  //create for loop through new array
				  for(y=0;y<redder.length;y++)
					{
					  //if this line in redder array is a client payment, exclude
					  if(redder[y][1]=="Client payment")
						{
						}
					  //if this line of array doesn't contain client payment, then...
					  else
						{
						 //set line in joj array to current line in redder array
						 joj[d]=redder[y];
						 //advance index variable by 1	
						 d=d+1;
						 //end else condition function
						} 
					//end for loop through redder array and have new filtered array joj
					}
					//set person variable to name of data from other page
					person=$("#prac option:selected").text();
					//create index variable e and set to 1 (to skip header line in array)  
					e=1;
					//create sky array
					sky=[];
					//set header row of joj array equal to sky array
					sky[0]=joj[0];
					//loop through joj array and filter to name of therapist only
					for(x=0;x<joj.length;x++)
					  {
					  //if array item line includes person name, set equal to row in sky array	  
					  if(joj[x][0].includes(person))
						{
						sky[e]=joj[x];
						//advance index variable
						e=e+1;
						}
						//if it doesn't include therapist name, exclude
						else
						{}
					   //end for loop through joj array
					   }
						//get length variable of sky array, which holds filtered records from ajax call from ipbc report
						air=sky.length;  
						//get length of rows of table and store in variable
						tbone=$("#tablethingy tbody tr").length;
						//loop through sky array (filtered values from ipbc report from ajax)
						for (u=1;u<air;u++)
						// for each row, get value of claim number and store as cloud variable from ajax to ipc report
							{
								if (sky[u][0].length>0){
							//claim id from ajax:
							cloud = sky[u][4].slice(7);
							//create match variable and set to 0
							matches=0;
							/* Formatting function for row details - modify as you need */
								//loop through table rows
								for (t=0;t<tbone;t++)
								//if claim id is equal in sky array matches claim id in table, then...
									{ 
									if(tab.row(t).data()[11]==cloud)
									//set column value to claim id
									{	console.log('matches');
										if (tab.row(t).child()==undefined){
											tre=tab.row(t);
											$( tab.row(tre).node()).children().first().addClass('details-control');
											tab.row(tre).child( "<table><tr style='background-color:#a8d0e0;'>"+
											"<td style='width:55px'></td>"+
											"<td>"+sky[u][3]+"</td>"+
											"<td>"+sky[u][8]+"</td>"+
											"<td>"+sky[u][2]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+"blank"+"</td>"+
											"<td>"+"blank"+"</td>"+
											"<td>"+sky[u][10]+"</td>"+
											
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][4]+"</td>"+
											"<td>"+sky[u][6]+"</td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td id='date1'></td><td id='date2'></td><td id='date3'></td><td id='date4'></td><td id='date5'></td><td id='date6'></td>"+
											"</tr></table>");
									//loop through date column rows in table
										
									//set matches indicator to 1, indicating that a match was found
									matches=1;
									}
									else {
										tre=tab.row(t);
											$( tab.row(tre).node()).children().first().addClass('details-control');
											tab.row(tre).child("<table style='background-color:#a8d0e0'>"+"<tr style='background-color:#a8d0e0'>"+
											"<td style='width:55px'></td>"+
											"<td>"+sky[u][3]+"</td>"+
											"<td>"+sky[u][8]+"</td>"+
											"<td>"+sky[u][2]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+"blank"+"</td>"+
											"<td>"+"blank"+"</td>"+
											"<td>"+sky[u][10]+"</td>"+
											
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][4]+"</td>"+
											"<td>"+sky[u][6]+"</td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td></td>"+
											"<td id='date1'></td><td id='date2'></td><td id='date3'></td><td id='date4'></td><td id='date5'></td><td id='date6'></td>"+
											"</tr>"+$(tab.row(t).child()).find('tbody tr')[0].innerHTML+"</table>");
									//$("tbody tr:eq("+t+") td#total").text(cloud);
										//loop through date column rows in table
										
									//set matches indicator to 1, indicating that a match was found
									matches=1;
									}
									}
									
									
									//end for loop through table rows
								}
								if(matches==0){
							var rowNode = tab.row.add([ sky[u][3],sky[u][8],sky[u][2],sky[u][11],'blank','blank',sky[u][10],sky[u][6],'blank','blank','blank','blank','blank','blank','blank','blank','blank','blank','blank','blank'])
							.draw()
							.node();
 
						$( rowNode )
							.css( 'color', 'red' )
							.animate( { color: 'black' } );
								}
								}
							//after for loop through all rows of table, it no match is found, then add row with info
							
						//end for loop through sky array items
					
						//end 'u' for loop
						  }
						  
						  $("#waitdivs2").css("display","none");
						  
						  //end ajax success function call
						  }
				  //end ajax object
				  });
				  	
				  //end click function
				  });
				  
				//end table row for loop			
					
					//end ajax success function
						
					 			//hide loading field
		$("#waitdivs2").css("display","none");	
					 }
					  //end ajax call
					});
			
		//end click irbcbut button function	

//end threepac2 cluck button function	
});

};

			   