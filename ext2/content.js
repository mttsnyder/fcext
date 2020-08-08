// content.js
//create runtime listerner for messages from extension
        chrome.runtime.onMessage.addListener(
          //when request comes in from extension, pass these to function and run function
            function(request, sender, sendResponse) {
                //if greeing part of request is litmus, then....
                if (request.greeting == "litmus")
                  {
                    //if magic button exists, log on console that it exists and exit
                    if($("#magic").length>0)
                    {console.log('magic button exists')}
                    //if magic button does not exist, log on console, then create it and exit
                    else 
					{console.log('magic button doesnot exist, creating it');
                    $(".page-header").append("<button id='magic' class='magic' style='margin-right:300px'>button</button>");}
                    //create function to inject script, pass parameters of path of script and tag to append to
                    function injectScript(file_path, tag) {
                        //get element defined by tag passed in, set to node variable
                        var node = document.getElementsByTagName(tag)[0];
                        //create element of script type and assign to script variable
                        var script = document.createElement('script');
                        //set type prop of script element
                        script.setAttribute('type', 'text/javascript');
                        //set src prop of script element
                        script.setAttribute('src', file_path);
						script.setAttribute('id', 'injectscr');
                        //add script element to tag passed in
                        node.appendChild(script);
                        //log onto console that script has been injected
                        console.log("script injected");
                        }
                    //run inject script function inject.js into body
					if ($("#injectscr").length>0)
						{console.log("script exists");}
					else
					    {injectScript(chrome.extension.getURL('inject.js'), 'body');
						console.log("script doesnt exist, now injected");
						}
						//log to console that litmus message was sent
                     console.log(" greet this:litmus");
                        //get window location, assign to resp1 variable
                     resp1=window.location.href;
                     //log onto console
                     console.log("loc"+ resp1);
                     //send location as response to extension
                     sendResponse(resp1);
                  };
                   //end request greeting = litmus functions
                   //if greeing is 'report', then...
                if (request.greeting == "report")
                  //log onto console that report message was received
                  {console.log("report message received");
                  //get window location and set to resp1 variable
                   resp1=window.location.href;
                  //send this data as response to extension
                   sendResponse(resp1);
                  //get page report.html in extension package of files and assign to variable rr
                   rr = chrome.extension.getURL('report.html');
                  //open new window as this report. html page
                   window.open(rr);
                  };
                  //end request greeing = report functions
                  //if request greeting = report2, then...
                if (request.greeting == "report2")
                  {
                  //log onto console that resport2 message was received
                  console.log("report 2 message received");
                  //get window adress and assign to resp1
                  resp1=window.location.href;
                  //send response to extension
                  sendResponse(resp1);
                  //get report2 html page and assign to rr
                  rr = chrome.extension.getURL('report2.html');
                  //open new windwo as report 2 html
                  window.open(rr);
                  };
                   //end request greeting report 2
                   //if request greeting is newrep
                if (request.greeting == "newrep")
                   //log onto console newrep message received
                  {console.log("newrep message received");
                   //get html of hidden table and assign to repdat
                   repdat=$("#hidtable").html();
                   //get date range and assign to datran variable
                   datran = $("input[name='daterangepicker']").val();
                   //get clinician name and assign to nam variable
                   nam=$("select[name='clinicianId'] option:selected").text();
                   //get location and assign to loc variable
                   loc = location.href;
                   //create object named package that contains all data
                   package = {body: repdat, date: datran, name: nam, loc:loc};
                   //log onto console the new object
                   //console.log(package);
                   //send data to extension
                   sendResponse(package);};
                   //end if request greeing newrep2
                   //if request greeing is newrep2, then...
                if (request.greeting == "newrep2")
                  //log to cnsole that newrep2 received
				  {console.log("newrep2 message received");
                  //get html of hidden table and assign to repdat variable
                  repdat=$("#hidtable").html();
                  //Need: get data from dates from claims and from ipc report and import here and build table
                  //get date range and assign to datran
                  datran = $("input[name='daterangepicker']").val();
				  //get clinician name and assign to nam variable
                  nam=$("select[name='clinicianId'] option:selected").text();
				  //get  location and assign to loc variable
                  loc = location.href;
                  //create package object of data
                  package = {body: repdat, date: datran, name: nam, loc:loc};
                  //send data object to extension
                  sendResponse(package);};
				  //if greeing is 'chdate', then...
				if (request.greeting == "chdate")
				  {
				  //setthis variable as class   
                   setthis = $(".last-edited-note");
				  //loop through 2
					  for (i=0; i<2; i++)
					  {
					  //request confirmation from user
						  if(confirm("Use date of session?"))
						  {
						  //setthis to value
						  setthis[i].innerText= "Created by Matthew Snyder, PsyD, LPCS on "+ $(".date")[0].innerText;
						  }
						  
						  else {
						  setthis[i].innerText= "Created by Matthew Snyder, PsyD, LPCS on "+ request.chdate;
						  }
					  //end for loop
					  }
				    //end request greeting function
                    };
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
                            //end if/else function
						    }
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
                    };
				if (request.greeting == "hello")
				   {
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
                    sendResponse(dat);
                    console.log(dat);}
            //end add listener function
			});
