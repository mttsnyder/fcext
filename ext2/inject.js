/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */

//set listerner for button click for magic button, run function..
$("#magic").on('click',function(){
  //log to console that button was clicked and function run
  console.log("Magic Button clicked and function triggered to get data and pass into DOM.");
  //get data from ember data object and log steps to console
  if($(".page-header h2").html().includes("Appointment Status"))
  { console.log("Appointment Status Page");
  pop=window.Ember.Namespace.NAMESPACES['2'].__container__.lookup('service:store').defaultAdapter.store;
  console.log("pop: "+pop);
  soda=Object.keys(pop)[0];
  console.log("soda: "+soda);
  coke=pop[soda].application.__container__.factoryManagerCache;
  fizz=Object.keys(coke).length;
  console.log("fizz: "+fizz);
  //store data in acer variable
  acer=coke['view:-outlet'].container.cache["controller:reports/appointments"].filteredRecords;
  //get length of object/array containing rows of data
  trust=acer.length;
  //remove the hidden divs if it exists
  $("#hiddiv").remove();
  $("#hiddiv2").remove();
  $("#hiddiv3").remove();
  //create hidden div and hid table and append to body
  $("body").append("<div id=hiddiv style=display:none><table id=hidtable><tbody></tbody></table></div>");
//create second hidden div to hold ajax claim info
  $("body").append("<div id=hiddiv2 style=display:none></div>");
  $("body").append("<div id=hiddiv3 style=display:none></div>");
  // loop through rows of data and add data to table
  		for (i=0;i<trust;i++)
		{ 
			// set each row to puck variable
			puck= acer[i];
			//append row div and data from puck to hidtable
			duck = puck['cptCodes'][0];
			truck= puck['ratesForAppointment'][0];
			luck = puck['unitsForAppointment'][0];
			$("#hidtable").append("<tr><td>"+puck['startTime']+"</td><td>"+puck['clientName']+"</td><td>"+puck['clinicianName']+"</td><td>"+duck+"</td><td>"+truck+"</td><td>"+luck+"</td><td>"+puck['fee']+"</td><td>"+puck['clientPaidStatus']+"</td><td>"+puck['clientCharge']+"</td><td>"+puck['uninvoicedFee']+"</td><td>"+puck['clientPaid']+"</td><td>"+puck['balance']+"</td><td>"+puck['insurancePaidStatus']+"</td><td>"+puck['insuranceCharge']+"</td><td>"+puck['insuranceAmountPaid']+"</td><td>"+puck['insuranceBalance']+"</td></tr>");
			//end for loop
		};	
		//end ajax load success function
		//});
		
		//alert that data is ready for export
		alert("data ready for export");
  //end appointment status page section
  }
		//end magic button click function
		 else if($(".page-header h2").html().includes("Electronic Payment Reports"))
		 {console.log("Electronic Payment Reports Page");
	pop=window.Ember.Namespace.NAMESPACES['2'].__container__.lookup('service:store').defaultAdapter.store;
		console.log("pop: "+pop);
	soda=Object.keys(pop)[0];
	console.log("soda: "+soda);
	coke=pop[soda].application.__container__.factoryManagerCache;
	fizz=Object.keys(coke).length;
	console.log("fizz: "+fizz);
	//store data in acer variable
	acer=coke['view:-outlet'].container.cache["controller:reports/insurance-payment-reports"].filteredRecords
	//get length of object/array containing rows of data
	trust=acer.length;
  
  //remove the hidden divs if it exists
  $("#hiddiv").remove();
  $("#hiddiv2").remove();
  $("#hiddiv3").remove();
  //create hidden div and hid table and append to body
  $("body").append("<div id=hiddiv style=display:none><table id=hidtable><tbody></tbody></table></div>");
//create second hidden div to hold ajax claim info
  $("body").append("<div id=hiddiv2 style=display:none></div>");
  $("body").append("<div id=hiddiv3 style=display:none></div>");
  //$("body").append("<script id='scrt1'></script>");
  //$.ajax({url: "https://secure.simplepractice.com/clients/e4dd12afc347cf67/insurance_claims/62341989", success: function(result){
	//console.log("ajax complete, data gathered");
	//$("#hiddiv3").append(result);
	//ggg=gon.claim_params.claim.service_lines[0];
	//console.log(ggg);
  //}});
  //load claim through ajax
  //$("#hiddiv3").load("https://secure.simplepractice.com/clients/05ffec6b6dcd9393/insurance_claims/60139301", function(){
  //console.log("hiddiv3 loaded");
  //  tempscr=$("#hiddiv3 script:eq(5)").html();
  //$("#scrt1").append(tempscr);
  // loop through rows of data and add data to table
  		for (i=0;i<trust;i++)
		{ 
			// set each row to puck variable
			puck= acer[i];
			//append row div and data from puck to hidtable
			$("#hidtable").append("<tr><td>"+puck['createdAt']+"</td><td>"+puck['clientName']+"</td><td>"+puck['payerName']+"</td><td>"+puck['totalAmountPaid']+"</td><td>"+puck['reportReferenceId']+"</td><td>"+puck['controlNumber']+"</td><td>"+puck['paymentReferenceId']+"</td><td class='inclhashid'>"+puck['insuranceClaimClientHashedId']+"</td><td class='eliinclid'>"+puck['eligibleInsuranceClaimId']+"</td><td id='date1'></td><td id='date2'></td><td id='date3'></td><td id='date4'></td><td id='date5'></td><td id='date6'></td><td id='total'></td></tr>");
			//$("#hiddiv2").load("https://secure.simplepractice.com/clients/"+puck['insuranceClaimClientHashedId']+"/insurance_claims/"+puck['eligibleInsuranceClaimId'],function(){
		    //$("#hiddiv2").load("https://secure.simplepractice.com/clients/05ffec6b6dcd9393/insurance_claims/60139301",function(){
			//ant=gon.claim_params.claim.service_lines;
		    //bug=ant.length;
		    //for (j=0;j<bug;j++){
		    //fly=gon.claim_params.claim.service_lines[j].service_date_from;
			//if (fly.length>0){
			//$("#date"+j).html(fly);
			//}
			//else {}
			//}
			//end load function 
			//});
			//end for loop
		};	
		//end ajax load success function
		//});
		
		//alert that data is ready for export

	  alert("data ready for export");
  
  
  
  
   }
  else{}
  });
