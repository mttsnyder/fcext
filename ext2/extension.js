//style table for popup
$("table").css("font-size","13px");
//send query to chrome tab with url indicated, on getting tab, run function...pass it tabs, set a to first tab
chrome.tabs.query({url: "https://secure.simplepractice.com/*"}, function(tabs) {a=tabs[0];
         //send message to first tab of litmus, on success run function and pass it response from tab
    chrome.tabs.sendMessage(a.id, {greeting: "litmus"}, function(response) {
         //set response to loc variable
        loc=response;
         //log this variable to console of extension
        console.log(loc);
         //filter for locations/web pages
         //first option if loc includes this url, then...
        if (loc.includes("https://secure.simplepractice.com/calendar")) {
          //send query to chrome tabs to get active and current window, on success pas tabs to function and run this function..
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
              //set a to first tab
                a = tabs[0];
                //send message to this tab to get calendar data from content script, with greeing 'hello', pass response to function
                chrome.tabs.sendMessage(a.id, {greeting: "hello"}, function (response) {
                  //set response to dat
                    dat = response;
                    //log response to console
                    console.log(response);
                    //set text in popup table to relevant week data from content script response
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
//end send message function
                });
                //end query
            });

            //push button, changes font and colors
            $("#colbutt").click(function () {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    a = tabs[0];
                    chrome.tabs.sendMessage(a.id, {greeting: "color"}, function () {
                    });
                })
            });
            /*    if (loc.includes("https://secure.simplepractice.com/insights")) {
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


                    $("#colbutt").click(function () {
                        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                            a = tabs[0];
                            chrome.tabs.sendMessage(a.id, {greeting: "color"}, function () {
                            });
                        })
                    });

            }}*/
//end calendar page functions
        };
        //when report button on extension is clicked, then run this function...
        $("#repbutt").click(function () {
          //send query to active and current window, pass tabs to function and run...
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  //set a to first tab
                  a=tabs[0];
                  //send message to this tab with greeing as report, then on success pass response to function and run
                    chrome.tabs.sendMessage(a.id, {greeting: "report"}, function(response) {
                        //log to console that greeing was sent and message received
                          console.log("report greeting sent, response received");
                          //set response to repdat variable
                        repdat=response;
                      //return this value to whatever
                        return repdat;
                        //end message function
                    });
                    //end query function
                });
                //end click button function
            });
            //click report button 2, run function...
        $("#repbutt2").click(function () {
                //send query to active and current window, pass tabs to function and run
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                      //set a to first tab
                      a=tabs[0];
                      //send message to this tab of report2, on response, pass this response to function and run...
                        chrome.tabs.sendMessage(a.id, {greeting: "report2"}, function(response) {
                          //log successful send and recieve
                              console.log("report2 message sent and response received");
                              //set response equal to repdat
                            repdat=response;
                            //return repdat varlue to wherever
                            return repdat;
                        //end send message function
                        });
                    //end query function
                    });
                //end repbutt2 function
                });
            //set title of popout
        $("#title").html("Full Circle Simple Practice Extension - Reports");
        //end send message function
        });
      //end query to chrome function
      });
//change claim submission info on claims
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
    if (nam1=="Stas")
    {
        fn = "Anastasios";
        ln = "Pantelopulos";
        np = 1952844011;
        tc= "101YM0800X";
    }
    if (nam1=="Baylor")
    {
        fn = "Baylor";
        ln = "Brown";
        np = 1881093151;
        tc= "101YM0800X";
    }
    chrome.tabs.query({url: "https://secure.simplepractice.com/clients/*"}, function(tabs) {a=tabs[0];
        chrome.tabs.sendMessage(a.id, {greeting: "taxid", data:nam, fn: fn, ln:ln, np:np, tc:tc}, function(response) {})});

});
//change date on p notes
$("#chdate").click(function (){
  prchdate = prompt("What date would you like to change to?")
  chrome.tabs.query({url: "https://secure.simplepractice.com/appointments/*"}, function(tabs) {a=tabs[0];
      chrome.tabs.sendMessage(a.id, {greeting: "chdate", chdate: prchdate}, function(response) {
      })});
  });
