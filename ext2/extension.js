
$("table").css("font-size","13px");

chrome.tabs.query({url: "https://accounting.waveapps.com/*"}, function(tabs) {w=tabs[0];
    chrome.tabs.sendMessage(w.id, {greeting: "waves"}, function(response) {
        wapp=response;
        $("#wavebutt").click(function () {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {j=tabs[0];
                chrome.tabs.sendMessage(j.id, {greeting: "wavtrig"}, function(response) {
                    wavrep=response;
                    return wavrep;
                });})})
   })});

chrome.tabs.query({url: "https://secure.simplepractice.com/*"}, function(tabs) {a=tabs[0];
    chrome.tabs.sendMessage(a.id, {greeting: "litmus"}, function(response) {
        loc=response;

        if (loc=="https://secure.simplepractice.com/calendar/appointments") {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                a = tabs[0];
                chrome.tabs.sendMessage(a.id, {greeting: "hello"}, function (response) {
                    dat = response;
                    console.log(response);
                    $("#tabwk1").text(dat.a);
                    $("#tabwk2").text(dat.b);
                    $("#tabwk3").text(dat.c);
                    $("#tabwk4").text(dat.d);
                    $("#tabwk5").text(dat.e);
                    $("#tabwk6").text(dat.f);
                    $("#tabd1").text(dat.g);
                    $("#tabd2").text(dat.h);
                    $("#tabd3").text(dat.i);
                    $("#tabd4").text(dat.j);
                    $("#tabd5").text(dat.k);
                    $("#tabd6").text(dat.l);

                });
            });

            $("#colbutt").click(function () {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    a = tabs[0];
                    chrome.tabs.sendMessage(a.id, {greeting: "color"}, function () {
                    });
                })
            });
        }


        if (loc.includes("https://secure.simplepractice.com/insights")) {
            if (loc.includes("https://secure.simplepractice.com/insights/client_sessions"))
            {
                $("#sums").css("display","none");
                paid= $(".paid").length;
                    nocharge=0;
                    totnoch=0;
                    paid2=0;
                    totinspaid2=0;
                    totclpaid2=0;
                    for (j=0;j<paid;j++)
                    {
                        if(document.getElementsByClassName("paid")[j].innerHTML=="PAID")
                        {  paid2=paid2+1;
                            totpaid2=totpaid2 + document.getElementsByClassName("col_insurance_paid")[j].innerHTML;

                        }
                        else if (document.getElementsByClassName("paid")[0].innerHTML=="NO CHARGE") {

                        }

                    }
                unpaid=0;
                uninvoiced=0;

            }
            $("#colbutt").click(function () {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    a = tabs[0];
                    chrome.tabs.sendMessage(a.id, {greeting: "color"}, function () {
                    });
                })
            });
               $("#title").html("Full Circle Simple Practice Extension - Reports");
               $("#tab1").css("display","none");
        $("#repbutt").click(function () {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {a=tabs[0];
                chrome.tabs.sendMessage(a.id, {greeting: "report"}, function(response) {
                    repdat=response;
                    return repdat;

                });})});}

    })});

$("#taxid").click(function (){
    nam = $("#selpro").val();
    nam1 = $("#selpro option:selected").text();
    if (nam1=="SLY")
    {
        fn = "Sharon";
        ln = "Young";
        np = 1851424824;
        tc = "101YM0800X"
    }
    if (nam1=="Snyder")
    {
        fn = "Matthew";
        ln = "Snyder";
        np = 1336453869;
        tc = "101YM0800X"
    }
    if (nam1=="Katie")
    {
        fn = "Kathryn";
        ln = "Gantt";
        np = npi;
        tc= tc;
    }
    chrome.tabs.query({url: "https://secure.simplepractice.com/clients/*"}, function(tabs) {a=tabs[0];
        chrome.tabs.sendMessage(a.id, {greeting: "taxid", data:nam, fn: fn, ln:ln, np:np, tc:tc}, function(response) {})});





});