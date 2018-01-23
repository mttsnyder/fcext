$("#waveb1").click(function() {
    chrome.tabs.query({url: "https://accounting.waveapps.com/*"}, function (tabs) {
        rocketdog = tabs[0].id;
        chrome.tabs.sendMessage(rocketdog, {greeting: "wave2"}, function (response){
            waveresp2 = response;
            $("#date").append("Start of Date Range: "+waveresp2["start"]+"</br>");
            $("#date").append("End of Date Range: "+waveresp2["end"]);
            $("#tablethingy").append(waveresp2["wavetab"]);

            lendat=$(".financial-transaction-date input").length;
            for (i=0;i<lendat; i++)
            {  pladate=waveresp2["datarr"][i];
                 $("td.financial-transaction-date")[i].innerHTML=pladate;
            }
            $("a").css("display","none");
            $("input[type='checkbox']").css("display","none");
            leng=$(".financial-transaction-category.financial-transaction-readonly").length;
            Slyinc = 0;
            MTSinc=0;
            MTSBusExp=0;
            expenses = 0;
            for (i=0;i<leng;i++)
            {
               place= $(".financial-transaction-category.financial-transaction-readonly")[i].innerHTML;
               who = $(".financial-transaction-payment-account.financial-transaction-readonly")[i].innerHTML;
               pearl = $(".financial-transaction");
                if (place.includes("Income")){
                    if (who.includes("SLY")) {
                        Slyinc = Slyinc + parseFloat($(".js-amount-readonly.amount-readonly.pull-right")[i].innerHTML);
                    }
                    else if (who.includes("Owner Investment / Drawings - MTS")) {
                        MTSinc = MTSinc + parseFloat($(".js-amount-readonly.amount-readonly.pull-right")[i].innerHTML);
                    }
                    else {

                    }
                }
                else {

                    if (who.includes("MTS Business Expenses"))
                    {
                        MTSBusExp = MTSBusExp + parseFloat($(".js-amount-readonly.amount-readonly.pull-right")[i].innerHTML);
                    }
                    else if (who.includes("FC Business Expenses"))
                    {
                    expenses = expenses + parseFloat($(".js-amount-readonly.amount-readonly.pull-right")[i].innerHTML);
                }}
            }
            $("#sums").append("Sly Paid: "+Slyinc+"</br>MTS Paid: "+MTSinc+"</br>MTS Bus Expenses: "+MTSBusExp+ "</br>FC Expenses: "+expenses);
        })
});});


$("#twopac").click(function () {
    chrome.tabs.query({url: "https://secure.simplepractice.com/*"}, function (tabs) {
        rocketman = tabs[0].id;

        chrome.tabs.sendMessage(rocketman, {greeting: "newrep"}, function (response) {
            package2 = response;
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
            if (package2["loc"] == "https://secure.simplepractice.com/insights/client_sessions") {

                //define variables
                //total billed
                totbilled=0;
                //total charged to client
                totclchrg=0;
                //count of client paid
                clpaid=0;
                //sum of amount client paid
                cltpaid=0;
                tail = 0;
                tothalfee = 0;

                clunpaid=0;
                clunbilled=0;
                paid = 0;
                unpaid =0;
                unbilled=0;

                cltunpaid=0;
                cltunbilled=0;
                tpaid = 0;
                tunpaid=0;
                tunbilled=0;
                totinsses=0;
                totinssesamnt=0;


                EstInc = 0;
                //tot variable length of number of entries
                tot = $(".col_fee").length;

                //loop through all rows

                for (k = 1; k <tot; k++) {
                    //if fee is empty, skip
                    if (isNaN(parseFloat($(".col_fee")[k].innerHTML.trim().substr(1)))){}
                    //if fee is not empty, then add to running total of amount billed
                    else {
                    totbilled=totbilled+parseFloat($(".col_fee")[k].innerHTML.trim().substr(1));
                    }
                    //if copay/client charge is empty, skip
                   if (isNaN(parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1)))) {}
                   //if client charge is not empty, then add to running tally for total billed to client
                   else{
                    totclchrg=totclchrg+parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1));
                       }

                       //if paid amount for client charge is not zero, then count it and count the amount
                    if ($(".col_client_paid_status")[k].children.length > 0) {
                        //define variable for status string for client charge
                        var clump = $(".col_client_paid_status")[k].children[0].innerHTML;
                        //test if it is various values
                        if (clump == "PAID") {
                            //count session if indicated as paid
                            clpaid = clpaid + 1;}
                            //if paid amount is null, skip
                        if(isNaN(parseFloat($(".col_client_paid")[k].innerHTML.trim().substr(1))))
                        {}
                        //if paid amount is not nul, then add to running total
                        else{
                            cltpaid=cltpaid + parseFloat($(".col_client_paid")[k].innerHTML.trim().substr(1));}

                        if (clump == "UNPAID") {
                        clunpaid = clunpaid + 1;}

                            if(isNaN(parseFloat($(".col_balance")[k].innerHTML.trim().substr(1))))
                            {}
                            //if paid amount is not nul, then add to running total
                            else{
                        cltunpaid = cltunpaid + parseFloat($(".col_balance")[k].innerHTML.trim().substr(1));
                        }
                        if (clump == "UNBILLED") {
                            clunbilled = clunbilled + 1;}

                        if(isNaN(parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1))))
                        {}
                        //if paid amount is not nul, then add to running total
                        else{
                            cltunbilled = cltunbilled + parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1));
                        }
                    }
                    else {}

                    if (isNaN(parseFloat($(".col_insurance_amount_paid")[k].innerHTML.trim().substr(1)))) {
                    }
                    else {
                        tpaid = tpaid + parseFloat($(".col_insurance_amount_paid")[k].innerHTML.trim().substr(1));
                    }
                    //repeat for insurance payments
                    if ($(".col_insurance_paid_status")[k].children.length > 0) {
                        //if paid status is not empty, then add one to the count of paid sessions and add amount billed to total billed for insurance sessions
                        totinsses = totinsses + 1;
                        totinssesamnt = totinssesamnt + parseFloat($(".col_insurance_charge")[k].innerHTML.trim().substr(1));

                        //create holding variable for insurance paid status
                        var pump = $(".col_insurance_paid_status")[k].children[0].innerHTML;

                        if (pump == "PAID") {
                            paid = paid + 1;
                        }



                        if (pump == "UNPAID") {
                            unpaid = unpaid + 1;
                        }
                        if (isNaN(parseFloat($(".col_insurance_balance")[k].innerHTML.trim().substr(1)))) {
                        }
                        else {
                            tunpaid = tunpaid + parseFloat($(".col_insurance_balance")[k].innerHTML.trim().substr(1));
                            tmpt = parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1));
                            jojo = parseFloat($(".col_insurance_paid")[k].innerHTML.trim().substr(1));
                            if (isNaN(tmpt)) {
                                suckah = 0;
                                if (isNaN(jojo)) {
                                    peeps = 0;
                                }
                                else {
                                    peeps = $(".col_insurance_paid")[k].innerHTML.trim().substr(1);
                                }
                            } else {
                                suckah = parseFloat($(".col_client_charge")[k].innerHTML.trim().substr(1));
                                if (isNaN(jojo)) {
                                    peeps = 0;
                                }
                                else {
                                    peeps = $(".col_insurance_paid")[k].innerHTML.trim().substr(1);
                                }

                            }
                            EstInc = EstInc + 94.45 - suckah - peeps;
                        }
                        if (pump == "UNBILLED") {
                            unbilled = unbilled + 1;
                        }
                        if (isNaN(parseFloat($(".col_insurance_balance")[k].innerHTML.trim().substr(1)))) {
                        }
                        else {

                            tunbilled = tunbilled + parseFloat($(".col_insurance_charge")[k].innerHTML.trim().substr(1));
                        }
                    }

                    else {
                    }
                }
                //define variables for calculations
                inpaper=parseFloat(paid/totinsses*100).toFixed(0);
                inamnpaper=parseFloat(tpaid/totinssesamnt*100).toFixed(0);
                clpaper =parseFloat(cltpaid/totclchrg*100).toFixed(0);
                totcoll=parseFloat(cltpaid)+parseFloat(tpaid);
                totcollperc=parseFloat(totcoll/totbilled*100).toFixed(0);
                EstInc=EstInc.toFixed(2);
                EstTot= parseFloat(EstInc)+parseFloat(totcoll);
                EstInP= parseFloat((EstInc/EstTot)*100).toFixed(0);
                UltPer = (EstTot/totbilled)*100;
                UltPer=UltPer.toFixed(0);
                tpaid=tpaid.toFixed(2);
                tunpaid=tunpaid.toFixed(2);
                tunbilled=tunbilled.toFixed(2);
                totcoll=totcoll.toFixed(2);
                EstTot=EstTot.toFixed(2);
                totclchrg=totclchrg.toFixed(2);
                cltpaid=cltpaid.toFixed(2);
                totinssesamnt=totinssesamnt.toFixed(2);
                totbilled=totbilled.toFixed(2);
                cltunbilled=cltunbilled.toFixed(2);
                cltunpaid=cltunpaid.toFixed(2);




                //add amounts to page
                $("#sign").append("<h2 id='sitit'>Ins</h2>");
                $("#sign").append("Total Ins Session: "+totinsses+" ($"+totinssesamnt+") </br>");
                $("#sign").append("PAID: " + paid+" ("+inpaper+"%) "+"$"+tpaid+" ("+inamnpaper+"%)</br>");
                $("#sign").append("UNPAID: " + unpaid+"  ($"+tunpaid+")</br>");
                $("#sign").append("UNBILLED: " + unbilled+"  ($"+tunbilled+")</br>");
                $("#sign").append("Tot coll: $" + totcoll+" ("+totcollperc+"%)</br>");
                $("#sign").append("Tot billed: $" + totbilled+"</br>");
                $("#sign").append("Est. Proj. Inc.: $" + EstInc + " ($"+EstTot+") "+UltPer+" %");
                $("#clsums").append("<h2 id=\"cltit\">Client</h2>");
                $("#clsums").append("Total Client Charge: " + totclchrg+"</br>");
                $("#clsums").append("PAID: " + clpaid+"  ($"+cltpaid+") "+clpaper+"%</br>");
                $("#clsums").append("UNPAID: " + clunpaid+"  ($"+cltunpaid+")</br>");
                $("#clsums").append("UNBILLED: " + clunbilled+"  ($"+cltunbilled+")</br>");

                //count sessions above 60
                for (j = 1; j < tot; j++) {

                    feather = parseFloat($(".right.col_fee")[j].innerHTML.trim().substr(1));
                    if (isNaN(feather)) {
                    }
                    else {
                        if (feather > 59) {
                            tail = tail + 1;
                        }
                        else {
                            tothalfee = tothalfee + (feather * .16);

                        }
                        totfulfee = tail * 12;
                    }
                }
                totf = tot - 1;
                unsix = totf - tail;
                tothalfee=tothalfee.toFixed();
                overallfee = parseFloat(totfulfee) + parseFloat(tothalfee);
                perins = parseFloat((totinsses/totf)*100).toFixed(0);
                ppsess = parseFloat(totf)-parseFloat(totinsses);
                ppsessper = parseFloat((ppsess/totf)*100).toFixed(0);
                projinstot=parseFloat(tpaid)+parseFloat(EstInc);
                pertotins = parseFloat((parseFloat(projinstot)/parseFloat(EstTot))*100).toFixed(0);
                $("#sums").append("<h2 id=\"sumtit\">Fees</h2>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbspTotal Sesions: " + totf + "<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspFull Fee: " + overallfee + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbspNumber of Sessions > 60: " + tail + "<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspFee: " + totfulfee + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbspSessions < 60: " + unsix + "<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspLess Fee: " + tothalfee + "<br/>");
                /*$("#sums").appendTo(".container");*/
                $("#sums").css("display", "block");
                $("#repcon").append("</br>"+"Narrative Summary:</br>"+"      There were "+totf+ " total sessions during this period. "+totinsses+ " of them were billed to insurance, which represented "+perins+"%. " +
                "There were thus "+ppsess+" sessions remaining that were private pay, or "+ppsessper+"%.  Total revenue billed during this period was "+totbilled+".  Total revenue " +
                "collected at this point is "+totcoll+", which represents "+totcollperc+" % of total billed.  Estimated remaining revenue incoming is "+EstInc+", or "+EstInP+"%.  " +
                "Percent of total projected revenue coming from insurance is estimated to be "+pertotins+"%, and from private pay is "+(100-pertotins)+"%. Total projected revenue for "+
                "this period is "+EstTot+" which represents a final collection percent of "+UltPer +"% of total billed.");
            }
            else if (package2["loc"] == "https://secure.simplepractice.com/insights/insurance_claims") {
                tot = $("#tablethingy tr").length;
                rec = 0;
                for (i = 0; i < (tot - 1); i++) {

                    $(".col_client_name a")[i].innerHTML = $(".col_client_name a")[i].innerHTML.split(" ")[0].substr(0, 1) + $(".col_client_name a")[i].innerHTML.split(" ")[1].substr(0, 1);
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
                for (i = 0; i < (tot - 1); i++) {

                    $(".col_client_name a")[i].innerHTML = $(".col_client_name a")[i].innerHTML.split(" ")[0].substr(0, 1) + $(".col_client_name a")[i].innerHTML.split(" ")[1].substr(0, 1);
                }
                $("#sums").append("Number of Claims: " + tot + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbspNot Filed: " + totnf + "<br/>");
                $("#sums").append("&nbsp&nbsp&nbsp&nbspFiled: " + totf + "<br/>");

                if (package2["loc"] == "https://secure.simplepractice.com/insights/client_sessions") {
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
                    for (i = 1; i < tot; i++) {
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


                        if ($(".col_insurance_paid:eq(" + i + ")").children(a).length > 0) {
                            tempinp = parseFloat($(".col_insurance_paid:eq(" + i + ")").children(a).html().trim().substr(1));
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
        });

    });
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
        tot=$("#tablethingy tr").length;
        pearl=$(".col_client_name a")[0].innerHTML.length;
        if(pearl>2){
        for (i = 0; i < (tot - 2); i++) {

            $(".col_client_name a")[i].innerHTML = $(".col_client_name a")[i].innerHTML.split(" ")[0].substr(0, 1) + $(".col_client_name a")[i].innerHTML.split(" ")[1].substr(0, 1);
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


});
