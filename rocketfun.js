//brings data from simple practice page into new page
//this runs in the new report page
$("#twopac").click(function () {
  //click button to start process
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
				package2 = response;
				//log onto console content of package2 variable to show it happened
				console.log("second step"+package2);
				//series of functions to set div's that are created on base html page to clear
				$("#tablethingy").html('');
				$("#date").html('');
				$("#name").html('');
				$("#clsums").html('');
				// create head for table and set equal to variable DrP
				DrP = {head:"<thead><tr><th colspan='7'>Appointment</th><th colspan='5'>Client Responsibility</th><th colspan='4'>Insurance Responsibility</th></tr></br><tr><th> Date of Service </th><th>Client</th><th>Clinician</th><th>Billing Code</th><th>Rate per Unit</th><th>Units</th><th style='border-right: 1px solid #111366;'>Total Fee</th><th>Status</th><th>Charge</th><th>Uninvoiced</th><th>Paid</th><th style='border-right: 1px solid #111366;'>Unpaid</th><th>Status</th><th>Charge</th><th>Insurance Paid</th><th>Unpaid</th></tr></thead>"};
				//add head to table
				$("table").append(DrP.head);
				//append 'body' value from package2 object to table with id tablethingy
				$("#tablethingy").append(package2["body"]);
				//append 'date' value from package2 object to date div
				$("#date").append(package2["date"]);
				  //append 'name' value from package2 object to name div
				$("#name").append(package2["name"]);
				//set head position to relative
				$("thead").css('position','relative');
				//loop through head cells and set position to static
				for (i=0;i<19;i++)
				{$("th:eq("+i+")").css("position","static")};
            //here is where we need to put in gates for different reporting option
            
			//change any credits to negative number
			
			
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

//button click and function for electronic payments reports report/search thingamagigg
$("#twopac2").click(function(){
    //click button to start process
	
	$("#wait").css("display","block");
    //send query to url and get id of simp prac browser window
    chrome.tabs.query({url: "https://secure.simplepractice.com/*"}, function (tabs) {
        //set id of main window to rocketman
        rocketman = tabs[0].id;
        //log onto console to show this step has occurrred
        console.log("first step"+rocketman);
        //send message to the simple practice window
        //message is 'greeting:newrep2', when window sends back response, filter response into function and run function
        chrome.tabs.sendMessage(rocketman, {greeting: "newrep2"}, function (response) {
            //set response to package2 variable
			package2 = response;
            //log message to console that package has been set
			console.log("second step"+package2);
            //clear tablethingy
			$("#tablethingy").html('');
            //clear date
			$("#date").html('');
			//clear name
            $("#name").html('');
			//clear clsums
            $("#clsums").html('');
			//create head object and set to DrP variable
            DrP = {head:"<thead><tr><th> Date Received </th><th>Client</th><th>Payer</th><th>Paid</th><th>Clearinghouse Ref#</th><th>Payer Claim #</th><th style='border-right: 1px solid #111366;'>Payment Reference #</th><th>Claim Hash Id#</th><th>Elig Ins Claim Id#</th><th>Date of Service</th><th>Date of Service</th><th>Date of Service</th><th>Date of Service</th><th>Date of Service</th><th>Total Amount Billed</th><th>NPI</th></tr></thead>"};
			//append head to table
            $("table").append(DrP.head);
			//add body sent through with respopnse to body of table
            $("#tablethingy").append(package2["body"]);
			//add date of response to date  div
            $("#date").append(package2["date"]);
			//add name of response to name div
            $("#name").append(package2["name"]);
			//set thead position to relative
            $("thead").css('position','relative');
			//excute datatable on tablethingy table
            $("#tablethingy").DataTable({paging:false});
			//get number of rows in table and set to nrl variable
            nrl=$("#tablethingy tbody tr").length;
			//create totalpay variable
            totalpay=0;
			//loop through rows in table
				  for (i=0; i<nrl; i++)
					  //for each row, get numerical value of payment
				  {hunger=parseFloat($("#tablethingy tbody tr:eq("+i+") td")[3].innerHTML.substr(1));
					//if it is not a number, skip
					if(isNaN(hunger))
						{}
				    //if it is a number, add to total
					else{
						   unitt=parseFloat($("#tablethingy tbody tr:eq("+i+") td")[3].innerHTML.substr(1));
						   totalpay=totalpay+unitt;
						}
				  }	
			  //fix decimals to 2 for totalpay variable
             totalpay=totalpay.toFixed(2);
			 //add total pay value to clsums div
             $("#clsums").append("Total Paid:"+totalpay);
			 //add hiddiv3 to body
			 $("body").append("<div id='hiddiv3' style='display:none'></div>");
			 //ajax call for date data
			 tlen=$("table tbody tr").length;
			 //get number of rows in the body of the table
			 //create for loop through rows of table
			  for (d=0;d<tlen;d++){
				  //get value of insurance hash id in this row and save in hid variable
				  hid=$(".inclhashid:eq("+d+")").text();
                  //get value of eligible claim id in this row and save to elid variable
				  elid=$(".eliinclid:eq("+d+")").text();
				  //build the url from these variables related to this row
				  urltmp="https://secure.simplepractice.com/clients/"+hid+"/insurance_claims/"+elid
				  //if either hid or elid are null, then skiparoo
				  if (hid=="null"||elid== "null")
				  {}
			      //if both hid and elid are not null, then function it up
			      else {
					  //run ajax SYNCHRONOUSLY to get data from this web page related to claim related to ths page
				  $.ajax({url: urltmp, 
						  //have to do it synchronously because of for loop which runs independent of ajax calls
					      async: false,
						  //on success of call, run this function, passing result
						  success: function(result){
						  //log into console that it is complete
						  console.log("ajax complete, data gathered");
						  //add result into hidden div
						  $("#hiddiv3").append(result);
						  //get keys for service line object and measure length as index
						  len=Object.keys(gon.claim_params.claim.service_lines).length;
							//create for loop to loop through number of keys
							for (j=0;j<len;j++)
							{
							 //access gon variable for this line of the services
							 ggg=gon.claim_params.claim.service_lines[j];
							 //create variable shifted from index to match data class
							 jj=j+1;
							 //enter date into table cell on this row
							 $("tbody tr:eq("+d+") #date"+jj).text(ggg.service_date_from);
							 //log onto console ggg variable
							 console.log(ggg);
							 //end for loop for object keys length (service dates)
							}
						//end ajax success function call
						$("#wait").css("display","none");
						  }
				  //end ajax object
				  });
				  //end if hid and elid exists condition function
				  }
				  
				//end table row for loop
			  }
 		//end chrome send message function
		});
	//chrome query function end		
    }); 
//end twopac2 button click function
});
