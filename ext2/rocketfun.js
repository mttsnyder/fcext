//brings data from simple practice page into new page
//this runs in the new report page

//if window is report.html...
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
				{//get clinician id and store in clinid variable
					clinid=prnm[j].id;
					//get first and last name
					fclnam=prnm[j].attributes.firstName;
					lclnam=prnm[j].attributes.lastName;
					//build option and append to select
				    $("#prac").append("<option value="+clinid+">"+fclnam+" "+lclnam+"</option>");
				//end if
				}
			//end for loop through prnml array
			}
		//end ajax success function 
		}
		//end ajax to get practitioner names
		}); 			
			
//function to add dats to date			
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
    
    "alwaysShowCalendars": true,
    "startDate": "08/26/2020",
    "endDate": "09/01/2020",
	 "opens": "left"
}, function(start, end, label) {
  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});

//segment to add click event listener to td in table
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

	

$("#twopac").on("click", function () {
  //click button to start process
  
  dr=$("input").val();
	er=dr.split(" - ");
	ser = er[0].split("/");
	eer = er[1].split("/");
	
	sta = ser[2]+"-"+ser[0]+"-"+ser[1];
	ena = eer[2]+"-"+eer[0]+"-"+eer[1];
	pprac=$("#prac").val();
				//build url from date range from date range selector and clinician id
				urltmpa="https://secure.simplepractice.com/frontend/reports/appointments?filter%5BstartsAt%5D="+sta+"&filter%5BendsAt%5D="+ena+"&filter%5BincludeInsurance%5D=true&filter%5BclinicianId%5D="+pprac;
						
						  //run ajax SYNCHRONOUSLY to get data from this web page related to claim related to ths page
	            $.ajax({url: urltmpa, 
					//accept data in this form
					headers: {
							'accept': 'application/vnd.api+json'
								},
						  //have to do it synchronously because of for loop which runs independent of ajax calls
					      async: false,
						  //on success of call, run this function, passing result
						  success: function(result){	
								hgh=result.data.attributes.rows;
								lll=hgh.length;
								tott=0
							for (a=0;a<lll;a++){
								
								urltmpb = "https://secure.simplepractice.com/calendar/appointments/"+hgh[a]['id'];
								$("#tablethingy tbody").append("<tr><td><a target='_blank' href=urltmpb >"+hgh[a]['startTime']+"</a></td><td>"+hgh[a]['clientName']+"</td><td>"+hgh[a]['clinicianName']+"</td><td>"+hgh[a]['cptCodes'][0]+"</td><td>"+hgh[a]['ratesForAppointment'][0]+"</td><td>"+hgh[a]['unitsForAppointment'][0]+"</td><td>"+hgh[a]['fee']+"</td><td>"+hgh[a]['clientPaidStatus']+"</td><td>"+hgh[a]['clientCharge']+"</td><td>"+hgh[a]['uninvoicedFee']+"</td><td>"+hgh[a]['clientPaid']+"</td><td>"+hgh[a]['balance']+"</td><td>"+hgh[a]['insurancePaidStatus']+"</td><td>"+hgh[a]['insuranceCharge']+"</td><td>"+hgh[a]['insuranceAmountPaid']+"</td><td>"+hgh[a]['insuranceBalance']+"</td></tr>")
							// end for loop through rows of data array from sessions ajax call
							
							}
							//initialize data table
							tab=$("#tablethingy").DataTable({paging:false});
								var total_fee= sumcol(6);
								var cl_charge = sumcol(8);
								var cl_uninv = sumcol(9);
								var cl_paid = sumcol(10);
								var cl_unpaid = sumcol(11);
								var ins_charge = sumcol(13);
								var ins_paid = sumcol(14);
								var ins_unpaid = sumcol(15);
								
								var cl_copayCharged = sumcol(8,12,"UNPAID") + sumcol(8,12,"PAID") + sumcol(8,12,"UNBILLED");
								var cl_copayPaid = sumcol(10,12,"UNPAID") + sumcol(10,12,"PAID") + sumcol(10,12,"UNBILLED");
								
								var ffsCharged = sumcol(8,12,"null");
								var ffsPaid = sumcol(10,12,"null");
								
								var Ins_Charged = 
								
								
								
								
							
								
								
								
								
								
								
							
							
							
							
							
							
							
						// end ajax success function	
						}
						//end ajax call to get data for appointments
						});
						
  //send query to url and get id of simp prac browser window
    chrome.tabs.query({url: "https://secure.simplepractice.com/*"}, function (tabs) {
      //set id of main window to rocketman
        rocketman = tabs[0].id;
        //log onto console to show this step has occurrred
        console.log("first step"+rocketman);
        //connection established with window
        //send message to the simple practice window
        //message is 'greeting:newrep', when window sends back response, filter response into function and run function
        chrome.tabs.sendMessage(rocketman, {greeting: "newrep"}, function (response) {
           //CREATE TABLE 
				//set response to variable package2
				
				
				$("#clsums").html('');
				// create head for table and set equal to variable DrP
				
				//loop through head cells and set position to static
				
			
			//VARIABLES FOR CALCULTIONS
			//for the session report page
            if (package2["loc"].includes("https://secure.simplepractice.com/reports/appointments")) {
              //if page is the appointments report, then execute the following, identified through includes
              //log onto console 'reports/appointments/page' to show that this step has occurred
                console.log("reports/appointments page");
             //define variables
                //total billed
                totbilled = 0;
                //total charged to client
                totclchrg = 0;
                //count of client paid
                clpaid = 0;
                //sum of amount client paid
                cltpaid = 0;

                tail = 0;
                totfulfee=0;
                tothalfee = 0;
                totsuphalfee = 0;
                wing = 0;
                beak = 0;
				//client unpaid number
                clunpaid = 0;
				//client unbilled number
                clunbilled = 0;
				//number insurance sessions paid
                paid = 0;
				//number insurance sessions unpaid
                unpaid = 0;
				//number insurance sessions unbilled
                unbilled = 0;
                //client unpaid amount total
                cltunpaid = 0;
				//client unbilled amount total
                cltunbilled = 0;
				//total number insurance payments
                tpaid = 0;
				//total number of insurance sessions unpaid
                tunpaid = 0;
				//total number of insurance sessions unbilled
                tunbilled = 0;
				//total number of insurance sessions
                totinsses = 0;
				//total amount of insurance sessions
                totinssesamnt = 0;
				//total amount of sessions that are greater than 49
                greaterthan60 = 0;
				//total amount of sessions that cost less than 50
                lessthan60 = 0;
				//number of sessions that cost more than 49
                numgt60 = 0;
				//Total copay amount
                realcopay = 0;
				//total amount copays paid
                realcopaypaid = 0;
				//estimated income
                EstInc = 0;
                //tot variable length of number of entries
                tot = $("table tbody tr").length;

                totf=0;
			//CALCULTIONS
                //loop through number of rows
                for (v = 0; v < tot; v++) 
				{
                    console.log("first b"+v);
					//get value of 12th cell in this row - Insurance Paid Status
                    sweetcup=$('table tbody tr:eq('+ v +') td')[12].innerText;
					//if this value is null, then...
						if(sweetcup== "null")
						{
							//set 12th cell to empty
							$('table tbody tr:eq('+ v +') td')[12].innerText="";
						}
						//if count of letters in text in 12th cell is greater than 0, then...
						if ($('table tbody tr:eq('+ v +') td')[12].innerText.length>0)
						{ console.log(v);
							//add number to totf variable, count of non zero 12th cell-# of Paid Insurance Sessions
								totf=totf+1;
								console.log(totf);
						}
				//end for loop
                }
				//calculate not paid insurance by difference
                totnf = tot - totf;
                //loop through all rows
                for (i = 0; i < tot; i++) 
				{
					//if 8th cell in table (client charge) is not a number, then skip 
                    if (isNaN(parseFloat($('table tbody tr:eq('+i+') td:eq(8)')[0].innerHTML.trim().substr(1)))) 
					{
                    }
                    //if 8th cell (client charge) is not empty (exists), then process in this function
                    else 
					{
						//add amount to total client charge variable
                        totclchrg = totclchrg + parseFloat($("table tbody tr:eq("+ i +") td:eq(8)").html().trim().substr(1));
                        //if total is more than 50, add to low cost session count (<50)
                        if(parseFloat($("table tbody tr:eq("+ i +") td:eq(8)").html().trim().substr(1))>49)
						{
                        //add unit to variable numgt60 to signify this is greater than 49                        
						numgt60 = numgt60 +1;
						//add numerical total to greaterthan60 variable 
                        greaterthan60 = greaterthan60 + parseFloat($("table tbody tr:eq("+ i +") td:eq(8)").html().trim().substr(1));
                        }
						//if total cost is less than 50, then add total amount to lessthan60 variable
                        else 
						{
						//add total to less than 60 variable
                        lessthan60 = lessthan60 + parseFloat($("table tbody tr:eq("+ i +") td:eq(8)").html().trim().substr(1));
                        }
                    // end client charge else function
					}

                    //if 10th cell (paid amount for client charge) is not a number, skip
                    if (isNaN($("table tbody tr:eq("+i+") td:eq(10)")[0].innerHTML.trim().substr(1))) 
					{}
				    //else, if the 10th cell (paid amount for client charge) is a number, then process accordingly
                    else 
					{
                        //define variable for 7th cell (status string for client charge)
                        var clump = $("table tbody tr:eq("+i+") td:eq(7)").html();
                        //test if it is various values
                        if (clump == "PAID") 
						//if 7th cell (status string for client charge) is paid, then...
						{
                            //count session if indicated as paid
                            clpaid = clpaid + 1;
                        }
                        //if 7th cell (status string for client charge is not a number), skip
                        if (isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(10)")[0].innerHTML.trim().substr(1)))) 
						{
                        }
                        //if 7th cell is paid, and paid amount is not null, then add amount to running total
                        else 
						{
                        cltpaid = cltpaid + parseFloat($("table tbody tr:eq("+i+") td:eq(10)")[0].innerHTML.trim().substr(1));
                        }
						//if status string is "unpaid", then add 1 to counter
                        if (clump == "UNPAID") 
						{
                        //add to client unpaid counter
						clunpaid = clunpaid + 1;
                        }
						//if value of unpaid amount (11th cell) is not a number, then skip
                        if (isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(11)")[0].innerHTML.trim().substr(1)))) 
						{
                        }
                        //if unpaid amount (11th cell) is not nul, then add to running total
                        else 
						{
							//add amount to client unpaid amount total
                            cltunpaid = cltunpaid + parseFloat($("table tbody tr:eq("+i+") td:eq(11)")[0].innerHTML.trim().substr(1));
                        }
						//if status string is 'unbilled', then add 1 to counter
                        if (clump == "UNBILLED") 
						{
							//add to client unbilled counter
                            clunbilled = clunbilled + 1;
							//if amount of unbilled is not a number, skip
                             if (isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(8)")[0].innerHTML.trim().substr(1)))) 
							 {
                             }
                             //if paid amount is not null, then add to running total
                             else 
							 {
						     //
                             cltunbilled = cltunbilled + parseFloat($("table tbody tr:eq("+i+") td:eq(8)")[0].innerHTML.trim().substr(1));
                             }
                        //end unbilled function
						}
				    //end function for else loop for amount in client charge not zero
                    }
            //Insurance totals section
                    //if status string for insurance claim status is greater than 0
                    if ($("table tbody tr:eq("+i+") td:eq(12)").html().length > 0) 
					{
                        //if paid status is not empty, then add one to the count of paid sessions and add amount billed to total billed for insurance sessions
                        totinsses = totinsses + 1;
                        //add amount charged to insurance for each session that was billed to insurance
                        totinssesamnt = totinssesamnt + parseFloat($("table tbody tr:eq("+i+") td:eq(13)")[0].innerHTML.trim().substr(1));
                        //add copay amount for each session billed to insurance
                        if(isNaN($("table tbody tr:eq("+i+") td:eq(8)")[0].innerHTML.trim().substr(1)))
                          {}
                        else
						{
                        //if copay amount is a number, than add to variable                        
						 realcopay = realcopay + parseFloat($("table tbody tr:eq("+i+") td:eq(8)")[0].innerHTML.trim().substr(1));
                          //if amount paid for copay is not a number then skip
						  if (isNaN($("table tbody tr:eq("+i+") td:eq(10)")[0].innerHTML.trim().substr(1)))
                          {}
                          else
						  {
					      //if number of paid copay is a number add to variable for total
                            realcopaypaid = realcopaypaid + parseFloat($("table tbody tr:eq("+i+") td:eq(10)")[0].innerHTML.trim().substr(1));
                          };
						//end else function for copay amount for each session  
                        };
                        //create holding variable for insurance paid status
                        var pump = $("table tbody tr:eq("+i+") td:eq(12)").html();
                        if (pump == "PAID") {
                            paid = paid + 1;
                            if (isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1)))) {}
                            else {
                                tpaid = tpaid + parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1));
                            }
                        }
						//if insurance status string is unpaid or unbilled, then..
                        if (pump == "UNPAID"||pump =="UNBILLED") 
							{
							//add to unpaid counter
                            unpaid = unpaid + 1;
							//if amount paid for insurance is not a number
                            if (isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1)))) {
                            }
							//if amount paid is not not a number, so exists
                            else 
							{
								//add total amount to tunpaid variable
                                tunpaid = tunpaid + parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1));
                                //
								tmpt = parseFloat($("table tbody tr:eq("+i+") td:eq(15)")[0].innerHTML.trim().substr(1));
                                jojo = parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1));
                                if (isNaN(tmpt)) {
									//define suckah variable
                                    suckah = 0;
                                    if (isNaN(jojo)) {
                                        peeps = 0;
                                    }
                                    else {
                                        peeps = parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1));
                                    }
                                } else {
                                    suckah = parseFloat($("table tbody tr:eq("+i+") td:eq(15)")[0].innerHTML.trim().substr(1));
                                    if (isNaN(jojo)) {
                                        peeps = 0;
                                    }
                                    else {
                                        peeps = parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1));
                                    }
                                }
								//calculate estimated total based on assumption of 103.85 avg session total 
                                EstInc = EstInc + 103.85 - suckah - peeps;
                            }
                        }
                        if (pump == "UNBILLED") 
						{
                            unbilled = unbilled + 1;
                            if (isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(15)")[0].innerHTML.trim().substr(1)))) 
							{
                            }
                            else 
							{
                                tunbilled = tunbilled + parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1));
                            }
                        }
                    }
                    else {}
                }
            //FORMAT OUTPUT VARIABLES
                clpaper = parseFloat(cltpaid / totclchrg * 100).toFixed(0);
                totcoll = parseFloat(cltpaid) + parseFloat(tpaid);
                totcollperc = parseFloat(totcoll / totbilled * 100).toFixed(0);
                EstInc = EstInc.toFixed(2);
                EstTot = parseFloat(EstInc) + parseFloat(totcoll);
                EstInP = parseFloat((EstInc / EstTot) * 100).toFixed(0);
                UltPer = (EstTot / totbilled) * 100;
                UltPer = UltPer.toFixed(0);
                tpaid = tpaid.toFixed(2);
                tunpaid = tunpaid.toFixed(2);
                tunbilled = tunbilled.toFixed(2);
                totcoll = totcoll.toFixed(2);
                EstTot = EstTot.toFixed(2);
                totclchrg = totclchrg.toFixed(2);
                cltpaid = cltpaid.toFixed(2);
                totinssesamnt = totinssesamnt.toFixed(2);
                totbilled = totbilled.toFixed(2);
                cltunbilled = cltunbilled.toFixed(2);
                cltunpaid = cltunpaid.toFixed(2);
                avgcltpay=0;
                avgcltpay=(cltpaid/(tot-1));
                avgcltpay=avgcltpay.toFixed(2);
                percopay=(realcopaypaid/realcopay)*100;
                percopay=percopay.toFixed(2);
                noninschrg=(totclchrg-realcopay);
                noninschrg=noninschrg.toFixed(2);
                noninspaid=(cltpaid-realcopaypaid);
                noninspaid=noninspaid.toFixed(2);
                pernonins=(noninspaid/noninschrg)*100;
                pernonins=pernonins.toFixed(2);
                noninssessions=tot-totinsses;
                Avgcopay=(realcopay/totinsses);
                Avgcopay=Avgcopay.toFixed(2);
                Avgnoninsclpay=(noninschrg/noninssessions);
                Avgnoninsclpay=Avgnoninsclpay.toFixed(2);
                Esttotreimb=(totinsses*103.85)-realcopay;
                Esttotreimb=Esttotreimb.toFixed(2);
                avginspay=0;
                avginspay=(Esttotreimb/totinsses);
                avginspay=avginspay.toFixed(2);
                insunpaid=Esttotreimb-tpaid;
                insunpaid=insunpaid.toFixed(2);
                inpaper = parseFloat(paid / totinsses * 100).toFixed(0);
                inamnpaper = parseFloat(tpaid / Esttotreimb * 100).toFixed(0);
                realcopay=realcopay.toFixed(2);
                realcopaypaid=realcopaypaid.toFixed(2);
            //ADD SUMMARY TOTALS TO PAGE
                $("#sign").append("<h2 id='sitit' style='color:darkblue'>Fees Paid By Ins</h2>");
                $("#sign").append("# Ins Sessions: " + totinsses + "</br>");
                $("#sign").append("Estimated To Be Paid By Ins: $" + Esttotreimb + "</br>");
                $("#sign").append("# Sessions Paid: " + paid + " (" + inpaper + "%)</br>");
                $("#sign").append("Amount Paid: <span id='apsf' style=''>" + "$" + tpaid + " (" + inamnpaper + "% est.)</span></br>");
                $("#sign").append("Unpaid: " + unpaid + " ($"+ insunpaid+ " est.)</br>");
                $("#sign").append("Estimated Avg Ins Payment: $"+avginspay+"</br>");
                $("#clsums").append("<h2 id=\"cltit\" style='color:darkblue'>Fees Paid by Client</h2>");
                $("#clsums").append("<h3 id=\"clsubtit\" style='color:darkgreen'><u>Insurance Sessions ("+totinsses+")</u></h3>");
                $("#clsums").append("Copays Charged: $" + realcopay + "</br>");
                $("#clsums").append("Copays Paid: $" + realcopaypaid + " ("+ percopay+"%)</br>");
                $("#clsums").append("Avg Copay: $" + Avgcopay + "</br>");
                $("#clsums").append("<h3 id=\"clsubtit\" style='color:darkgreen'><u>Non-Insurance Sessions ("+noninssessions+")</u></h3>");
                $("#clsums").append("Clients Charged: $" + noninschrg + "</br>");
                $("#clsums").append("Clients Paid: $" + noninspaid + " ("+pernonins+"%)</br>");
                $("#clsums").append("Avg Non-Ins Clt Payment: $" + Avgnoninsclpay + "</br>");
                
                //count sessions above 60
                for (j = 0; j < tot; j++) {
                    feather = parseFloat($("table tbody tr:eq("+j+") td:eq(6)")[0].innerHTML.trim().substr(1));
                    if (isNaN(feather)) {
                    }
                    else {
                        if (feather > 49) {
                            tail = tail + 1;
                            wing = wing +feather;
                        }
                        else {
                            tothalfee = tothalfee + (feather * .16);
                            totsuphalfee = totsuphalfee + (feather * .085);
                            beak = beak + feather;
                        }
                        totfulfee = tail * 14;
                    }
                }
                totf = tot;
                unsix = totf - tail;
                tothalfee = tothalfee.toFixed(2);
                overallfee = parseFloat(totfulfee) + parseFloat(tothalfee);
                perins = parseFloat((totinsses / totf) * 100).toFixed(0);
                ppsess = parseFloat(totf) - parseFloat(totinsses);
                ppsessper = parseFloat((ppsess / totf) * 100).toFixed(0);
                projinstot = parseFloat(tpaid) + parseFloat(EstInc);
                pertotins = parseFloat((parseFloat(projinstot) / parseFloat(EstTot)) * 100).toFixed(0);
                avfe=(totcoll/totf).toFixed(2);
                fgf=parseFloat(totinsses*103.85)+parseFloat(noninschrg);
                fgf=fgf.toFixed(2);
                favg=fgf/tot;
                favg=favg.toFixed(2);
                perpay=parseFloat(parseFloat(overallfee)/parseFloat(fgf))*100;
                perpay=perpay.toFixed(2);
                Amntrem=fgf-totcoll;
                Amntrem=Amntrem.toFixed(2);
                amntpdsofarper=(totcoll/fgf)*100;
                amntpdsofarper=amntpdsofarper.toFixed(0);
                totrev=parseFloat(totinsses*103.85)+parseFloat(noninschrg);
                totrev=totrev.toFixed(2);
                Amntremper=(Amntrem/fgf)*100;
                Amntremper=Amntremper.toFixed(0);
                perfromins=(Esttotreimb/fgf)*100;
                perfromins=perfromins.toFixed(0);
			//ADD AMOUNTS TO SUMS DIV
                $("#sums").append("<h2 id=\"sumtit\" style='color:darkblue'>Monthly Fee Summary</h2>");
                $("#sums").append("Total # of Sessions: " + tot + "<br/>");
                $("#sums").append("Estimated Total Reimbursement: $" + fgf + "<br/>");
                $("#sums").append("Amount Paid for Sessions So Far: $" + totcoll + " ("+amntpdsofarper+"%)</br>");
                $("#sums").append("Estimated Amount Remaining to Be Paid: $" + Amntrem + "<br/>");
                $("#sums").append("Estimated Avg Reimbursement per Session: $" + favg + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp# Sess Costing <em> gt or = $50</em>: " + tail + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMonthly Fee for these sessions </br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp("+tail +" * 14): <b>$" + totfulfee + "</b><br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp# Sess Costing <em>Less than 50</em>: " + unsix + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMonthly Fee for these sessions: </br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp$"+ beak+" * 16%: <b>$" + tothalfee + "</b><br/>");
                $("#sums").append("<b>Total Fee: $"+ totfulfee+" + $"+tothalfee+" = $" + overallfee + "</b></br>");
                $("#sums").append("&nbsp"+ perpay+"% of est tot reimb<br/>");
                $("#sums").css("display", "block");
                $("#repcon").append("</br>" + "Narrative Summary:</br>" + "      There were " + tot + " total sessions during this period. " + totinsses + " of them were billed to insurance, which represented " + perins + "%. " +
                    "There were thus " + ppsess + " sessions remaining that were private pay, or " + ppsessper + "%.  Estimated total revenue billed during this period was $" + totrev + ".  Total revenue " +
                    "collected at this point is " + totcoll + ", which represents " + amntpdsofarper + " % of estimated total billed.  Estimated remaining revenue incoming is " + Amntrem + ", or " + Amntremper + "%.  " +
                    "Percent of total projected revenue coming from insurance is estimated to be " + perfromins + "%, and from private pay is " + (100 - perfromins) + "%.");
            //if package loc reports appointment function closed
			}
            else if (package2["loc"] == "https://secure.simplepractice.com/reports/insurance_claims") {
                tot = $("#tablethingy tr").length;
                rec = 0;
                for (i = 2; i < (tot-3); i++) {

                    $(".left.col_client_name a")[i].innerHTML = $(".col_client_name a")[i].innerHTML.split(" ")[0].substr(0, 1) + $(".col_client_name a")[i].innerHTML.split(" ")[1].substr(0, 1);
                }
                for (i = 0; i < tot; i++) {

                    if ($(".col_submission_status")[i].innerHTML.trim() == "Received") {
                        rec = rec + 1;
                    }
                }
                totf = $(".col_submission_status a").length;
                totnf = tot - totf;
            }
            else {
              console.log('else');
              tot = $("table tbody tr").length;
              totf=0;

              for (v = 0; v < tot; v++) {
                console.log("first b"+v);
                  if ($('table tbody tr:eq('+ v +') td')[12].innerText.length>0)
                    { console.log(v);
                      totf=totf+1;
                      console.log(totf);
                      }
                      }

                totnf = tot - totf;

              /*  to change name into initials
              for (i = 2; i < (tot - 3); i++) {
                    $(".left.col_client_name a")[i].innerHTML = $(".left.col_client_name a")[i].innerHTML.split(" ")[0].substr(0, 1) + $(".left.col_client_name a")[i].innerHTML.split(" ")[1].substr(0, 1);
                } */
                $("#sums").append("Number of Claims: " + tot + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbspNot Filed: " + totnf + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbspFiled: " + totf + "<br/>");

                if (package2["loc"] == "https://secure.simplepractice.com/reports/client_sessions") {
                    $("#sums").appendTo(".container");
                }


                $(document).ready(function () {
                    totbilled = 0;
                    totcopay = 0;
                    totinsb = 0;
                    totinspaid = 0;
                    totinsbal = 0;
                    totinsp = 0;
                    totinsbal = 0;
                    totbalnf = 0;
                    totbalf = 0;
                    totinbf = 0;
                    totinbnf = 0;

                    for (i = 0; i < tot; i++) {
                        if($('table tbody tr:eq('+ i +') td')[12].innerText.length > 0)
                        //if insurance claim status is not blank, then assign value of what client paid to coco
                          {coco = parseFloat($("table tbody tr:eq("+i+") td:eq(10)").html().trim().substr(1));
                            //realcopay=realcopay + coco;
                          }
                        else {};
                        //if insurance claim status is blank, then...
                        if ($('table tbody tr:eq('+ i +') td')[12].innerText.length > 0) {
                          //if insurance claim status is not blank,
                            if (isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(6)").html().trim().substr(1)))) {
                            }
                            //if fee is blank, then...
                            else {
                              //if fee is not blank, then assign fee value to temptotbf and then add to totbalf
                                temptotbf = parseFloat($("table tbody tr:eq("+i+") td:eq(6)").html().trim().substr(1));

                                totbalf = totbalf + temptotbf;
                                  }
                                  //if insurance charge amount is not a number, then...
                            if (isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(13)").html().trim().substr(1)))) {
                                  }
                                  //if insurance charge amount is a number, then get value of insurance charge and assign to temptotinbf, then add to totinbf
                            else {
                                temptotinbf = parseFloat($("table tbody tr:eq("+i+") td:eq(13)").html().trim().substr(1));

                                totinbf = totinbf + temptotinbf;

                            }


                            }
                        else {
                            temptotbnf = parseFloat($(".col_fee:eq(" + i + ")").html().trim().substr(1));
                            totbalnf = totbalnf + temptotbnf;
                        }
                        tempdol = parseFloat($(".col_fee:eq(" + i + ")").html().trim().substr(1));
                        if (isNaN(tempdol)) {
                        }
                        else {
                            totbilled = totbilled + tempdol;
                        }

                        tempco = parseFloat($(".col_client_charge:eq(" + i + ")").html().trim().substr(1));
                        if (isNaN(tempco)) {
                        }
                        else {
                            totcopay = totcopay + tempco;
                        }

                        tempinb = parseFloat($(".col_insurance_charge:eq(" + i + ")").html().trim().substr(1));
                        if (isNaN(tempinb)) {
                        }
                        else {
                            totinsb = totinsb + tempinb;
                        }


                        if ($(".col_insurance_amount_paid:eq(" + i + ")").children(a).length > 0) {
                            tempinp = parseFloat($(".col_insurance_amount_paid:eq(" + i + ")").children(a).html().trim().substr(1));
                            if (isNaN(tempinp)) {
                            }
                            else {
                                totinsp = totinsp + tempinp;
                            }
                        }
                        else {
                        }
                        tempinbal = parseFloat($(".col_insurance_balance:eq(" + i + ")").html().trim().substr(1));

                        if (isNaN(tempinbal)) {
                        }
                        else {
                            totinsbal = totinsbal + tempinbal;
                        }
                    }
                    totinbnf = totinsb - totinbf;
                    $("#sums").append("<h2 id=\"sumtit\">Fees</h2>");
                    $("#sums").append("Total Billed Amount: " + totbilled + "<br/>");
                    $("#sums").append("&nbsp&nbsp&nbsp&nbspNot Filed: " + totbalnf + "<br/>");
                    $("#sums").append("&nbsp&nbsp&nbsp&nbspFiled: " + totbalf + "<br/>");
                    $("#sums").append("Total Copay: " + totcopay + "<br/>");
                    $("#sums").append("Total Insurance Billed: " + totinsb + "<br/>");
                    $("#sums").append("&nbsp&nbsp&nbsp&nbspFiled: " + totinbf + "<br/>");
                    $("#sums").append("&nbsp&nbsp&nbsp&nbspNot Filed: " + totinbnf + "<br/>");
                    $("#sums").append("Total Insurance Paid: " + totinsp + "<br/>");
                    $("#sums").append("Total Insurance Balance: " + totinsbal + "<br/>");


                })

            }
        }); //chrome send message close
       //chrome send message close
    }); //chrome tab query close
	
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
        pearl=$("table tbody tr:eq(0) td:eq(1)")[0].innerHTML.trim().length;
        if(pearl>2){
        for (i = 0; i < totT; i++) {

          if ($("table tbody tr:eq("+i+") td:eq(1)")[0].innerHTML.trim().split(" ").length>2)
          {
            $("table tbody tr:eq("+i+") td:eq(1)")[0].innerHTML = $("table tbody tr:eq("+i+") td:eq(1)")[0].innerHTML.trim().split(" ")[0].substr(0,1) + $("table tbody tr:eq("+i+") td:eq(1)")[0].innerHTML.trim().split(" ")[2].substr(0,1);
          }
          else
            $("table tbody tr:eq("+i+") td:eq(1)")[0].innerHTML = $("table tbody tr:eq("+i+") td:eq(1)")[0].innerHTML.trim().split(" ")[0].substr(0,1) + $("table tbody tr:eq("+i+") td:eq(1)")[0].innerHTML.trim().split(" ")[1].substr(0,1);
        }

    }
    else {
            $("#tablethingy").html("");
        $("#tablethingy").append(package2["head"]);
        $("#tablethingy").append(package2["body"]);
    }});
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
        yoyoma=$("table tbody tr").length;
        for(m=1;m<yoyoma;m++){
            beaver =$("table tbody tr:eq("+m+") td:eq(3)")[0].innerHTML.trim();
            if (beaver="020202"){
             $(".tr:eq(m)").hide();
            }
            else
            {}
            }

    });
    $("#eightpac").click(function () {
        //clear standard html of fee calc
        $("#sums").html("");
        $("#sums").append("<h2 id=\"sumtit\">Low Cost Fees</h2>");
        $("#sums").append("Total Sesions: " + totf +"</br>");
        $("#sums").append("Total Client Charge: " + totclchrg + "</br>");
        $("#sums").append("PAID: " + clpaid + "  ($" + cltpaid + ") " + clpaper + "%</br>");
        $("#sums").append("UNPAID: " + clunpaid + "  ($" + cltunpaid + ")</br>");
        $("#sums").append("UNBILLED: " + clunbilled + "  ($" + cltunbilled + ")</br>");
        var pintamt = cltpaid*.42;
        var pfcamt = cltpaid*.16;
        var intamt= pintamt.toFixed(2);
        var fcamt= pfcamt.toFixed(2);
        $("#sums").append("Intern Amount: "+ intamt +"</br>");
        $("#sums").append("Supervisor Amount: "+ intamt+"</br>");
        $("#sums").append("FC Amount: "+ fcamt+"</br>");

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
          if($("table tbody tr:eq("+i+") td:eq(12)")[0].innerText.length>0) {
			  //if table cell in insurance paid column is not a number...
              if(isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1)))) {
								//add test class and log to console
                                  $("table tbody tr:eq("+i+") td:eq(12)").addClass("test"); console.log(i);
                }
				//if table cell in insurance paid column is a number...
              else {
				  //change cell background color and log to console
                  $("table tbody tr:eq("+i+") td:eq(12)").css("background-color","#f7e4e4"); console.log(i);
                   };
                 };
				 //if charge to client is a number, then...
          if($.isNumeric(parseFloat($("table tbody tr:eq("+i+") td:eq(8)")[0].innerHTML.trim().substr(1)))) {
			  //if amount paid cell to client is number, then...
            if($.isNumeric(parseFloat($("table tbody tr:eq("+i+") td:eq(10)")[0].innerHTML.trim().substr(1)))){
				//change background of cell 
              $("table tbody tr:eq("+i+") td:eq(10)").css("background-color","#cbd3f5");
            }
			//if paid amount is not a number (empty), then...
            else{
				//change background color of cell
              $("table tbody tr:eq("+i+") td:eq(10)").css("background-color","#f5f4d7");
            }
          }
             };
            });
    $("#twelvepac").click(function () {
        tllen=$("table tbody tr").length;
          for (i=0;i<tllen;i++) {
              if($("table tbody tr:eq("+i+") td:eq(12)")[0].innerText.length>0) {

                  if(isNaN(parseFloat($("table tbody tr:eq("+i+") td:eq(14)")[0].innerHTML.trim().substr(1)))) {}

                  else {
                   $("table tbody tr:eq("+i+")").css("display","none");
                   };
              }
              else {
                  $("table tbody tr:eq("+i+")").css("display","none");
                };

        };
      });
    $("#thirteenpac").click(function () {
      $("#sums").html('');
      $("#sums").append("<h2 id=\"sumtit\" style='color:darkblue'>Monthly Audit Report</h2>");
      //$("#sums").append("Total Charged for Sessions: $" + totbilled + "</br>");
      $("#sums").append("Total # of Sessions: " + tot + "<br/>");
      $("#sums").append("Estimated Total Reimbursement: $" + fgf + "<br/>");
      $("#sums").append("Amount Paid for Sessions So Far: $" + totcoll + " ("+amntpdsofarper+"%)</br>");
      $("#sums").append("Estimated Amount Remaining to Be Paid: $" + Amntrem + "<br/>");
      $("#sums").append("Estimated Avg Reimbursement per Session: $" + favg + "<br/>");
      //$("#sums").append("Avg Session Fee: $" + avfe + "<br/>");
      $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp# Sess Costing <em> gt or = $50</em>: " + tail + "<br/>");

      $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp# Sess Costing <em>Less than 50</em>: " + unsix + "<br/>");

      $("#sums").css("display", "block");
      $("#repcon").html('');
      $("#repcon").append("</br>" + "Narrative Summary:</br>" + "      There were " + tot + " total sessions during this period. " + totinsses + " of them were billed to insurance, which represented " + perins + "%. " +
          "There were thus " + ppsess + " sessions remaining that were private pay, or " + ppsessper + "%.  Estimated total revenue billed during this period was $" + totrev + ".  Total revenue " +
          "collected at this point is " + totcoll + ", which represents " + amntpdsofarper + " % of estimated total billed.  Estimated remaining revenue incoming is " + Amntrem + ", or " + Amntremper + "%.  " +
          "Percent of total projected revenue coming from insurance is estimated to be " + perfromins + "%, and from private pay is " + (100 - perfromins) + "%.");

        });
    }); //twopac function close

}

else (window.location.href.includes('report2.html'))
{
function addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
		}
       
	  nd = new Date();
	  st= nd.getMonth()+1+"/"+nd.getDate()+"/"+nd.getFullYear();
	  en=addDays(st, 14);
	  
 $('input[name="daterange"]').daterangepicker({
    
    "alwaysShowCalendars": true,
    "startDate": "08/26/2020",
    "endDate": "09/01/2020",
	 "opens": "left"
}, function(start, end, label) {
  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});

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

	dr=$("input").val();
	er=dr.split(" - ");
	ser = er[0].split("/");
	eer = er[1].split("/");
	
	sta = ser[2]+"-"+ser[0]+"-"+ser[1];
	ena = eer[2]+"-"+eer[0]+"-"+eer[1];
		
 $.ajax({url: "https://secure.simplepractice.com/reports/insurance-payment-reports?clinicianId=84638&endsAt=2020-08-31&startsAt=2020-08-25", 
		//on success of ajax call, then do execute this function
		success: function(response)
		{clnames=$(response).filter("script");
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
		
//button click and function for electronic payments reports report/search thingamagigg
$("#twopac2").on("click", function() {
	//click button to start process
	//display loading div
	$("#waitdivs").append("<h1 id='waits' >Please Wait... Loading</h1></br>");
	
    	//add hidden div to store ajax results
	$("body").append("<div id='hiddiv3' style='display:none'></div>");
	//check to see if datatable is initiated, if it is, destroy it!! and clear table body
		if($.fn.DataTable.isDataTable( '#tablethingy')){
			console.log('destroy tab');
			tab.destroy();
			console.log($.fn.DataTable.isDataTable( '#tablethingy' )) 
			console.log('clear tbod');
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
	//ajax to get epr data
		$.ajax({ url:turl, 
		//weird header thing that allows all data to be passed for  some reason
					headers: {
					'accept': 'application/vnd.api+json'
					//end headers
					},
					//make sync
					async: false,
					//on success, run this , pass data
					success: function (data) {
						
					  //save data in dd
					  dd=data;
					  //get row data and store in ep
					  ep=dd.data.attributes.rows;
					  //get length of array of data
					  grndln=ep.length;
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
						
							  //if either hid or elid are null, then skiparoo
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
										$.ajax({url: urltmp, 
										//have to do it synchronously because of for loop which runs independent of ajax calls
										async: false,
										//on success of call, run this function, passing result
											success: function(result){
										  //filter result for scripts and store [5] in aresult variable
										  aresult=$(result).filter('script')[5];
										  //log into console that it is complete
										  console.log("ajax complete, data gathered");
										  //add script into hidden div
										  $("#hiddiv3").append(aresult);
										  //set len to 0						  
										  len=0;				  
										  
											 for (m=0;m<6;m++)
											{  
										   if(typeof(gon.claim_params.claim.service_lines[m])=="undefined")
												{
												console.log('undef break'); 
												break;
												}
										   else if (gon.claim_params.claim.service_lines[m].service_date_from.length==0)
												{console.log('length 0');
												break;
												}
										   else
												{len=len+1;
											if($(".date1:eq("+k+")").length==0) {}
											else{
													switch (m) {
														case 0:
														$(".date1:eq("+k+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
														break;
													  case 1:
														$(".date2:eq("+k+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
														break;
													  case 2:
														$(".date3:eq("+k+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
														break;
													  case 3:
														$(".date4:eq("+k+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
														break;
													  case 4:
														$(".date5:eq("+k+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
														break;
													  case 5:
														$(".date6:eq("+k+")").html(gon.claim_params.claim.service_lines[m]['service_date_from']);
														break;
													 
																}
												console.log('gon exists');
											}
											}
										} 
							//end success function
							}
										  //end ajax function
										  });
									//end 2nd else option
								  }
								//end 1st else option
								}					  
					  //end for loop through epr data array (k)
					  }
					  
					  //initiate datatable and store in tab variable
					  tab=$("#tablethingy").DataTable({paging:false});
					  //tab.column(13).visible(false);
												  
								$('a.toggle-vis').on( 'click', function (e) {
									e.preventDefault();
							 
									// Get the column API object
									var column = tab.column( $(this).attr('data-column') );
							 
									// Toggle the visibility
									column.visible( ! column.visible() );
								} );
							
					//end ajax success function for call to get epr data
					}
						//end ajax for call to get epr data 
			});
	$("#waitdivs").css("display","none");
//end twopac2 button click function
});

//function for when threepac2 button is clicked
$("#threepac2").click(function() {
	//when button is clicked, display loading message...
	$("#waitdiv").css("display","block");
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
				$("#wait").css("display","block");
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
										
										tre=tab.row(t);
											$( tab.row(tre).node()).children().first().addClass('details-control');
											tab.row(tre).child( "<table><tr style='background-color:#a8d0e0'>"+
							
											"<td>"+sky[u][3]+"</td>"+
											"<td>"+sky[u][8]+"</td>"+
											"<td>"+sky[u][2]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+"blank"+"</td>"+
											"<td>"+"blank"+"</td>"+
											"<td>"+sky[u][10]+"</td>"+
											"<td>"+sky[u][6]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td>"+sky[u][11]+"</td>"+
											"<td id='date1'></td><td id='date2'></td><td id='date3'></td><td id='date4'></td><td id='date5'></td><td id='date6'></td>"+
											"</tr></table>");
									//$("tbody tr:eq("+t+") td#total").text(cloud);
										//loop through date column rows in table
										
									//set matches indicator to 1, indicating that a match was found
									matches=1;
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
						  //end ajax success function call
						  }
				  //end ajax object
				  });
				  	$("#wait").css("display","none");
				  //end click function
				  });
				  
				//end table row for loop			
					
					//end ajax success function
						
					}
					  //end ajax call
					});
						//hide loading field
		$("#wait").css("display","none");	
		//end click irbcbut button function	

	//end ajas success function
	
		 //end ajax call
		
//end threepac2 cluck button function	
});

};

			   