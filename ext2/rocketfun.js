//brings data from simple practice page into new page
$("#twopac").click(function () {
    chrome.tabs.query({url: "https://secure.simplepractice.com/*"}, function (tabs) {
        rocketman = tabs[0].id;
        console.log("first step"+rocketman);

        chrome.tabs.sendMessage(rocketman, {greeting: "newrep"}, function (response) {
            package2 = response;
            console.log("second step"+package2);
            $("#tablethingy").html('');
            $("#date").html('');
            $("#name").html('');
            $("#sums").html('');
            $("#clsums").html('');
            $("#sign").html('');
            $("#tablethingy").append(package2["head"]);
            $("#tablethingy").append(package2["body"]);
            $("#date").append(package2["date"]);
            $("#name").append(package2["name"]);

            //here is where we need to put in gates for different reporting option
            //for the session report page
            if (package2["loc"] == "https://secure.simplepractice.com/reports/appointments") {

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
                tothalfee = 0;
                totsuphalfee = 0;
                wing = 0;
                beak = 0;
                clunpaid = 0;
                clunbilled = 0;
                paid = 0;
                unpaid = 0;
                unbilled = 0;

                cltunpaid = 0;
                cltunbilled = 0;
                tpaid = 0;
                tunpaid = 0;
                tunbilled = 0;
                totinsses = 0;
                totinssesamnt = 0;
                greaterthan60 = 0;
                lessthan60 = 0;
                numgt60 = 0;
                realcopay = 0;
                realcopaypaid = 0;

                EstInc = 0;
                //tot variable length of number of entries
                tot = $(".col_fee").length-1;

                //loop through all rows

                for (k = 1; k <= tot; k++) {

                    //calculate Total Amount Billed for Time Period; if fee is empty, skip
                    if (isNaN(parseFloat($(".col_fee")[k].innerHTML.trim().substr(1)))) {
                    }
                    //if fee is not empty, then add to running total of amount billed
                    else {
                        totbilled = totbilled + parseFloat($(".col_fee")[k].innerHTML.trim().substr(1));
                    }
                    //Calculate total charged to client for Time period; if copay/client charge is empty, skip
                    if (isNaN(parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1)))) {
                    }
                    //if client charge is not empty, then add to running tally for total billed to client
                    else {
                        totclchrg = totclchrg + parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1));
                        //calculate number of low cost session (<50)
                        if(parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1))>50){
                            numgt60 = numgt60 +1;
                            greaterthan60 = greaterthan60 + parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1));
                        }
                        else {
                            lessthan60 = lessthan60 + parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1));
                        }
                    }

                    //if paid amount for client charge is not zero, then count it and count the amount
                    if ($(".col_client_paid_status")[k].children.length > 0) {
                        //define variable for status string for client charge
                        var clump = $(".col_client_paid_status")[k].children[0].innerHTML;
                        //test if it is various values
                        if (clump == "PAID") {
                            //count session if indicated as paid
                            clpaid = clpaid + 1;
                        }
                        //if paid amount is null, skip
                        if (isNaN(parseFloat($(".col_client_paid")[k].innerHTML.trim().substr(1)))) {
                        }
                        //if paid amount is not null, then add to running total
                        else {
                            cltpaid = cltpaid + parseFloat($(".col_client_paid")[k].innerHTML.trim().substr(1));
                        }

                        if (clump == "UNPAID") {
                            clunpaid = clunpaid + 1;
                        }

                        if (isNaN(parseFloat($(".col_balance")[k].innerHTML.trim().substr(1)))) {
                        }
                        //if paid amount is not nul, then add to running total
                        else {
                            cltunpaid = cltunpaid + parseFloat($(".col_balance")[k].innerHTML.trim().substr(1));
                        }
                        if (clump == "UNBILLED") {
                            clunbilled = clunbilled + 1;


                        if (isNaN(parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1)))) {
                        }
                        //if paid amount is not nul, then add to running total
                        else {
                            cltunbilled = cltunbilled + parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1));
                        }}
                    }
                    else {
                    }



            //Insurance totals

                    //repeat for insurance payments

                    if ($(".col_insurance_paid_status")[k].children.length > 0) {

                        //if paid status is not empty, then add one to the count of paid sessions and add amount billed to total billed for insurance sessions
                        totinsses = totinsses + 1;
                        //add amount charged to insurance for each session that was billed to insurance
                        totinssesamnt = totinssesamnt + parseFloat($(".col_insurance_charge")[k].innerHTML.trim().substr(1));
                        //add copay amount for each session billed to insurance
                        if($(".col_client_charge")[k].innerHTML.trim().substr(1).length>0)
                          {
                          realcopay = realcopay + parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1));
                          if ($(".col_client_paid")[k].innerHTML.trim().substr(1).length>0)
                          {
                            realcopaypaid = realcopaypaid + parseFloat($(".col_client_paid")[k].innerHTML.trim().substr(1));
                          };
                        };
                        //create holding variable for insurance paid status
                        var pump = $(".col_insurance_paid_status")[k].children[0].innerHTML;

                        if (pump == "PAID") {
                            paid = paid + 1;
                            if (isNaN(parseFloat($(".col_insurance_amount_paid")[k].innerHTML.trim().substr(1)))) {
                            }
                            else {
                                tpaid = tpaid + parseFloat($(".col_insurance_amount_paid")[k].innerHTML.trim().substr(1));
                            }
                        }




                        if (pump == "UNPAID"||"UNBILLED") {
                            unpaid = unpaid + 1;

                            if (isNaN(parseFloat($(".col_insurance_balance")[k].innerHTML.trim().substr(1)))) {
                            }
                            else {
                                tunpaid = tunpaid + parseFloat($(".col_insurance_balance")[k].innerHTML.trim().substr(1));

                                tmpt = parseFloat($(".col_balance")[k].innerHTML.trim().substr(1));
                                jojo = parseFloat($(".col_insurance_amount_paid")[k].innerHTML.trim().substr(1));


                                if (isNaN(tmpt)) {
                                    suckah = 0;
                                    if (isNaN(jojo)) {
                                        peeps = 0;
                                    }
                                    else {
                                        peeps = parseFloat($(".col_insurance_amount_paid")[k].innerHTML.trim().substr(1));
                                    }
                                } else {
                                    suckah = parseFloat($(".col_balance")[k].innerHTML.trim().substr(1));
                                    if (isNaN(jojo)) {
                                        peeps = 0;
                                    }
                                    else {
                                        peeps = parseFloat($(".col_insurance_amount_paid")[k].innerHTML.trim().substr(1));
                                    }

                                }
                                EstInc = EstInc + 103.85 - suckah - peeps;
                            }
                        }
                        if (pump == "UNBILLED") {
                            unbilled = unbilled + 1;

                            if (isNaN(parseFloat($(".col_insurance_balance")[k].innerHTML.trim().substr(1)))) {
                            }
                            else {

                                tunbilled = tunbilled + parseFloat($(".col_insurance_charge")[k].innerHTML.trim().substr(1));
                            }
                        }
                    }

                    else {
                    }
                }
                //define variables for calculations


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
                //add amounts to page
                $("#sign").append("<h2 id='sitit' style='color:darkblue'>Fees Paid By Ins</h2>");
                $("#sign").append("# Ins Sessions: " + totinsses + "</br>");
                $("#sign").append("Estimated To Be Paid By Ins: $" + Esttotreimb + "</br>");
                $("#sign").append("# Sessions Paid: " + paid + " (" + inpaper + "%)</br>");
                $("#sign").append("Amount Paid: <span id='apsf' style=''>" + "$" + tpaid + " (" + inamnpaper + "% est.)</span></br>");
                $("#sign").append("Unpaid: " + unpaid + " ($"+ insunpaid+ " est.)</br>");

                $("#sign").append("Estimated Avg Ins Payment: $"+avginspay+"</br>");

                //$("#sign").append("Tot coll: $" + totcoll + " (" + totcollperc + "%)</br>");
                //$("#sign").append("Tot billed: $" + totbilled + "</br>");
                //$("#sign").append("Est. Proj. Inc.: $" + EstInc + " ($" + EstTot + ") " + UltPer + " %");


                $("#clsums").append("<h2 id=\"cltit\" style='color:darkblue'>Fees Paid by Client</h2>");
                $("#clsums").append("<h3 id=\"clsubtit\" style='color:darkgreen'><u>Insurance Sessions ("+totinsses+")</u></h3>");
                $("#clsums").append("Copays Charged: $" + realcopay + "</br>");
                $("#clsums").append("Copays Paid: $" + realcopaypaid + " ("+ percopay+"%)</br>");
                $("#clsums").append("Avg Copay: $" + Avgcopay + "</br>");
                $("#clsums").append("<h3 id=\"clsubtit\" style='color:darkgreen'><u>Non-Insurance Sessions ("+noninssessions+")</u></h3>");
                $("#clsums").append("Clients Charged: $" + noninschrg + "</br>");
                $("#clsums").append("Clients Paid: $" + noninspaid + " ("+pernonins+"%)</br>");
                $("#clsums").append("Avg Non-Ins Clt Payment: $" + Avgnoninsclpay + "</br>");
                //$("#clsums").append("PAID: " + clpaid + "  ($" + cltpaid + ") " + clpaper + "%</br>");
                //$("#clsums").append("UNPAID: " + clunpaid + "  ($" + cltunpaid + ")</br>");
                //$("#clsums").append("UNBILLED: " + clunbilled + "  ($" + cltunbilled + ")</br>");

                //$("#clsums").append("Copays Charged: $" + realcopay + "</br>");

                //count sessions above 60
                for (j = 1; j <= tot; j++) {

                    feather = parseFloat($(".right.col_fee")[j].innerHTML.trim().substr(1));
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
                totf = tot - 1;
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

                $("#sums").append("<h2 id=\"sumtit\" style='color:darkblue'>Monthly Fee Summary</h2>");
                //$("#sums").append("Total Charged for Sessions: $" + totbilled + "</br>");
                $("#sums").append("Total # of Sessions: " + tot + "<br/>");
                $("#sums").append("Estimated Total Reimbursement: $" + fgf + "<br/>");
                $("#sums").append("Amount Paid for Sessions So Far: $" + totcoll + " ("+amntpdsofarper+"%)</br>");
                $("#sums").append("Estimated Amount Remaining to Be Paid: $" + Amntrem + "<br/>");
                $("#sums").append("Estimated Avg Reimbursement per Session: $" + favg + "<br/>");
                //$("#sums").append("Avg Session Fee: $" + avfe + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp# Sess Costing <em>More than $50</em>: " + tail + "<br/>");
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
                tot = $("#tablethingy tr").length;
                totf = $("td.col_insurance_claims a").length;
                totnf = tot - totf;
                for (i = 2; i < (tot - 3); i++) {

                    $(".left.col_client_name a")[i].innerHTML = $(".left.col_client_name a")[i].innerHTML.split(" ")[0].substr(0, 1) + $(".left.col_client_name a")[i].innerHTML.split(" ")[1].substr(0, 1);
                }
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

                    for (i = 1; i < (tot-1); i++) {
                        if($(".left.col_insurance_paid_status:eq("+ i +")").children().length > 0)
                          {coco = parseFloat($(".col_client_paid:eq(" + i + ")").html().trim().substr(1));
                            //realcopay=realcopay + coco;
                          }
                        else {};
                        if ($(".col_insurance_claims:eq(" + i + ")").children().length > 0) {
                            if (isNaN(parseFloat($(".col_fee:eq(" + i + ")").html().trim().substr(1)))) {
                            }
                            else {
                                temptotbf = parseFloat($(".col_fee:eq(" + i + ")").html().trim().substr(1));

                                totbalf = totbalf + temptotbf;
                            }
                            if (isNaN(parseFloat($(".col_insurance_charge:eq(" + i + ")").html().trim().substr(1)))) {
                            }
                            else {
                                temptotinbf = parseFloat($(".col_insurance_charge:eq(" + i + ")").html().trim().substr(1));

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

    }); //chrome tab query close
    $("#threepac").click(function () {
        gump=$("#sums").css("display");
        if (gump=="none"){
            $("#sums").css("display","block");
        }
        else {
        $("#sums").css("display","none");
            }
    });
    $("#fourpac").click(function () {
        sgump=$("#sign").css("display");
        if (sgump=="none"){
            $("#sign").css("display","block");
        }
        else {
            $("#sign").css("display","none");
        }
    });
    $("#fivepac").click(function () {
        totT=$(".left.col_client_name a").length;
        pearl=$(".left.col_client_name a")[0].innerHTML.length;
        if(pearl>2){
        for (i = 0; i < totT; i++) {

            $(".left.col_client_name a")[i].innerHTML = $(".left.col_client_name a")[i].innerHTML.split(" ")[0].substr(0, 1) + $(".left.col_client_name a")[i].innerHTML.split(" ")[1].substr(0, 1);
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
        yoyoma=$(".col_primary_code").length;
        for(m=1;m<yoyoma;m++){
            beaver =$(".col_primary_code")[m].innerHTML.trim();
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
       /* $("#sums").append("PAID: " + clpaid + "  ($" + cltpaid + ") " + clpaper + "%</br>");
        $("#sums").append("UNPAID: " + clunpaid + "  ($" + cltunpaid + ")</br>");
        $("#sums").append("UNBILLED: " + clunbilled + "  ($" + cltunbilled + ")</br>");*/


        $("#sums").append("Total Sessions >50: " + tail + "  (" + wing+"$)</br>");
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
    $("#elevenpac").click(function () {
        llen=$(".left.col_insurance_paid_status").length;
        $("#apsf").css("background-color","#e8faec");
        for (i=1;i<llen;i++) {
          if($(".left.col_insurance_paid_status:eq("+i+")").children().length>0) {
              if($(".col_insurance_amount_paid:eq("+i+")")[0].innerHTML.trim().length>1) {
                  $(".col_insurance_amount_paid:eq("+i+")").addClass("test"); console.log(i);
                }
              else {
                  $(".col_insurance_amount_paid:eq("+i+")").css("background-color","#f7e4e4"); console.log(i);
                   };
                 };
          if($(".col_client_charge:eq("+i+")")[0].innerHTML.trim().length>1) {
            if($(".col_client_paid:eq("+i+")")[0].innerHTML.trim().length>1){
              $(".col_client_paid:eq("+i+")").css("background-color","#cbd3f5");
            }
            else{
              $(".col_client_paid:eq("+i+")").css("background-color","#f5f4d7");

            }
          }
             };
            });
    $("#twelvepac").click(function () {
      tllen=$(".left.col_insurance_paid_status").length;
        for (i=1;i<tllen;i++) {
          if($(".left.col_insurance_paid_status:eq("+i+")").children().length>0) {
              if($(".col_insurance_amount_paid:eq("+i+")")[0].innerHTML.trim().length>1) {
                  $(".col_insurance_amount_paid:eq("+i+")").parent().css("display","none");};
                }
                else {
                  $(".col_insurance_amount_paid:eq("+i+")").parent().css("display","none");
                };

        };
      });

    }); //twopac function close
