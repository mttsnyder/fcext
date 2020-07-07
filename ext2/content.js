// content.js
//
//
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "content script" + sender.tab.url :
            "from the extension");

            if (request.greeting == "chdate")
            {
                setthis = $(".last-edited-note");
              for (i=0; i<2; i++)
              {
                if(confirm("Use date of session?"))
                {
                  setthis[i].innerText= "Created by Matthew Snyder, PsyD, LPCS on "+ $(".date")[0].innerText;
                }
                else {
                setthis[i].innerText= "Created by Matthew Snyder, PsyD, LPCS on "+ request.chdate;
              }
            }

            }
          });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "content script" + sender.tab.url :
            "from the extension");
        repdat = $("table.report thead").html();

        if (request.greeting == "litmus")
            {console.log("litmus");
            resp1=window.location.href;
            console.log(resp1);
            sendResponse(resp1);};
        if (request.greeting == "report")
        {
            rr = chrome.extension.getURL('report.html');
            console.log(rr);
            window.open(rr);

            sendResponse(repdat);

        }
    });

$(window).load(function() {

loc =document.getElementsByTagName("title")[0].text;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "litmus")

            sendResponse(loc);
    });

        if (loc==="Calendar - SimplePractice") {

            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                    d1 = $(".fc-day-top.fc-sun")[0].dataset.date;
                    d2 = $(".fc-day-top.fc-sun")[1].dataset.date;
                    d3 = $(".fc-day-top.fc-sun")[2].dataset.date;
                    d4 = $(".fc-day-top.fc-sun")[3].dataset.date;
                    d5 = $(".fc-day-top.fc-sun")[4].dataset.date;
                    d6 = $(".fc-day-top.fc-sun")[5].dataset.date;
                    wk1 = $(".fc-week:eq(0).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end").length-$(".fc-week:eq(0).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-non-client").length - $(".fc-week:eq(0).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-cancelled").length-$(".fc-week:eq(0).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-late-cancelled").length;
                    wk2 = $(".fc-week:eq(1).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end").length-$(".fc-week:eq(1).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-non-client").length- $(".fc-week:eq(1).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-cancelled").length-$(".fc-week:eq(1).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-late-cancelled").length;

                    wk3 = $(".fc-week:eq(2).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end").length-$(".fc-week:eq(2).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-non-client").length- $(".fc-week:eq(2).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-cancelled").length-$(".fc-week:eq(2).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-late-cancelled").length;

                    wk4 = $(".fc-week:eq(3).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end").length-$(".fc-week:eq(3).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-non-client").length- $(".fc-week:eq(3).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-cancelled").length-$(".fc-week:eq(3).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-late-cancelled").length;
                    wk5 = $(".fc-week:eq(4).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end").length-$(".fc-week:eq(4).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-non-client").length- $(".fc-week:eq(4).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-cancelled").length-$(".fc-week:eq(4).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-late-cancelled").length;
                    wk6 = $(".fc-week:eq(5).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end").length-$(".fc-week:eq(5).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-non-client").length- $(".fc-week:eq(5).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-cancelled").length-$(".fc-week:eq(5).fc-widget-content div.fc-content-skeleton table tbody tr td.fc-event-container a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.fc-event-office.office-color-5.fc-event-late-cancelled").length;
                    dat = {a: wk1, b: wk2, c: wk3, d: wk4, e: wk5, f: wk6, g: d1, h: d2, i: d3, j: d4, k: d5, l: d6};
                    if (request.greeting == "hello")
                        sendResponse(dat);
                        console.log(dat);
                });

            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                    if (request.greeting == "color") {
                        $(".office-color-2.fc-event-show").css("background-color", "#697ec1");
                        $(".office-color-2.fc-event-show").css("color", "#e7e7ee");
                        $(".office-color-2.fc-event-non-client").css("background-color", "#91b0c1");
                        $(".office-color-8.fc-event-non-client").css("background-color", "#78b077");
                        $(".office-color-8.fc-event-show").css("background-color", "#557c54");
                        $(".office-color-8.fc-event-show").css("color", "#e7e7ee");
                        $(".office-color-3.fc-event-show").css("background-color", "#ee69ea");
                        $(".office-color-3.fc-event-show").css("color", "#e7e7ee");
                        $(".office-color-6.fc-event-show").css("background-color", "#fa9d4e");
                        $(".office-color-6.fc-event-show").css("color", "#e7e7ee");
                        $(".office-color-5.fc-event-show").css("background-color", "#ffdb4e");
                        $(".office-color-7.fc-event-show").css("color", "#e7e7ee");
                        $(".office-color-7.fc-event-show").css("background-color", "#d24a50");
                        $("style").append("@font-face { font-family: MetallophileSp8-Light.ttf; src: url('chrome-extension://megobhkhgbimlaahnhoblonlciocbafl/MetallophileSp8-Light.ttf'); }");
                        $("style").append("body {font-family: MetallophileSp8-Light}");
                        $("#nav a").css("font-size", "17px");
                        $(".fc-content-skeleton").css("font-size", "15px");

                        if ($("body").css("padding") == "0px") {
                        }
                        else {
                            $("body").css("padding", "0px");
                            $(".navbar-fixed-top").css("position", "relative");
                            $(".container.nav-collapse").css("top", "0px");
                            $(".container.nav-collapse").css("position", "absolute");
                            $(".navbar-inner").css("padding", "0px");
                            $(".container.nav-collapse").css("margin-left", "100px");
                            $(".navbar-inner").prepend("<div id='test'></div>");
                            $("#test").append("<img id='i' style='width:5%;height:5%' src='chrome-extension://megobhkhgbimlaahnhoblonlciocbafl/FC.jpg'>");
                        }
                    }

                });
        }

       /* if (loc.includes("https://secure.simplepractice.com/insights")){*/


            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                    if (request.greeting == "color") {

                        $("style").append("@font-face { font-family: MetallophileSp8-Light.ttf; src: url('chrome-extension://megobhkhgbimlaahnhoblonlciocbafl/MetallophileSp8-Light.ttf'); }");
                        $("style").append("body {font-family: MetallophileSp8-Light}");
                        $("#nav a").css("font-size", "17px");


                        if ($("body").css("padding") == "0px") {
                        }
                        else {
                            $("body").css("padding", "0px");
                            $(".navbar-fixed-top").css("position", "relative");
                            $(".container.nav-collapse").css("top", "0px");
                            $(".container.nav-collapse").css("position", "absolute");
                            $(".navbar-inner").css("padding", "0px");
                            $(".container.nav-collapse").css("margin-left", "100px");
                            $(".navbar-inner").prepend("<div id='test'></div>");
                            $("#test").append("<img id='i' style='width:5%;height:5%' src='chrome-extension://megobhkhgbimlaahnhoblonlciocbafl/FC.jpg'>");
                        }
                    }
                });

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                console.log("shaza");
                console.log(sender.tab ?
                    "from a mars:" + sender.tab.url :
                    "from your mont");
                repdat = $("table:eq(0)").html();
                console.log(repdat);
                redhead = $("table thead:eq(0)").html();
                datran = $("input[name='daterangepicker']").val();
                nam=$("select[name='clinicianId'] option:selected").text();
                loc = location.href;
                package = {head: redhead, body: repdat, date: datran, name: nam, loc:loc};
                console.log(package);
                if (request.greeting == "newrep")
                {
                    sendResponse(package);
                    console.log('ping recieved');
                }
            });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
          "from the extension simple practice report");
        if (request.greeting == "taxid")
        {
            nam=request.data;
            fn=request.fn;
            ln=request.ln;
            np=request.np;
            tc=request.tc;
            $(".billing_provider_name.input:eq(1)").val(ln);
            $(".billing_provider_name.input:eq(2)").val(fn);
            $("input[name*='billing_provider[tax_id]']").val(nam);
            $("input[name*='billing_provider[npi]']").val(np);
            $("input[name*='billing_provider[taxonomy_code]']").val(tc);
            for (i = 0;  i < 6 ;i++) {
                if ($("input[name*='claim[service_lines]["+i+"][rendering_provider][last_name]']").val()=="")
                    {return;}
                else
                    {
                     $("input[name*='claim[service_lines]["+i+"][rendering_provider][last_name]']").val(ln);
                     $("input[name*='claim[service_lines]["+i+"][rendering_provider][first_name]']").val(fn);
                     $("input[name*='claim[service_lines]["+i+"][rendering_provider][npi]']").val(np);
                }
            }
        }

    });
    console.log( "ready!" );
});
