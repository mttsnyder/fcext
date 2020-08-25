https://secure.simplepractice.com/frontend/pay-periods/build?filter%5BstartsAt%5D=2020-08-13&filter%5BendsAt%5D=2020-08-21&filter%5BclinicianId%5D=

https://secure.simplepractice.com/frontend/pay-periods?page%5Bsize%5D=50


$("body").append("<div><table id='ltab'></table></div>")
$.ajax({url: "https://secure.simplepractice.com/frontend/pay-periods/39863/download", 
success: function(result){pp=result;
  console.log(result);
  
  hhh=pp.split(/\r|\n/);
  gog=hhh.length;
  redder = [];
  joj=[];
  for (v=0;v<gog;v++)
  {
	  if (hhh[v].includes('"')){
		  bowl=hhh[v].split(",");
	  redder[v]=[bowl[0],bowl[3],bowl[4],bowl[5],bowl[6],bowl[7],bowl[8],bowl[9],bowl[10],bowl[11],bowl[12],bowl[13]];
		  
		  
	  }
	  else{
		bowl=hhh[v].split(",");
		redder[v]=[bowl[0],bowl[1],bowl[2],bowl[3],bowl[4],bowl[5],bowl[6],bowl[7],bowl[8],bowl[9],bowl[10],bowl[11]];
	
	  }
  }	  
  d=0;
  for(y=0;y<redder.length;y++)
  {if(redder[y][1]=="Client payment")
  {console.log("denied"+d);}
   else
   {console.log("accpted"+d);
         joj[d]=redder[y];
		 d=d+1;} 
		 }
	  person=$("#name").text().trim();
	  
	  e=1;
	  sky=[];
	  sky[0]=joj[0];
	  for(x=0;x<joj.length;x++)
	  {
		  if(joj[x][0].includes(person))
			{sky[e]=joj[x];
				e=e+1;
			}
          else
		    {}
       }
	  }});
	  
	  
	  
	  
	  //get length variable of sky array, which holds filtered records from ajax call from ipbc report
	air=sky.length;  
	//get length of rows of table and store in variable
	tbone=$("#tablethingy tbody tr").length;
	//loop through sky array (filtered values from ipbc report from ajax)
	for (u=1;u<air;u++)
	// for each row, get value of claim number and store as cloud variable from ajax to ipc report
		{
			//claim id from ajax:
			cloud = sky[u][4].slice(7);
			matches=0;
			//loop through table rows
			for (t=0;t<tbone;t++)
				 //if claim id is equal in sky array matches claim id in table, then...
					{ 
					 if($("tbody tr:eq("+t+") td.eliinclid").text()==cloud)
						   //set column value to claim id
							{
							console.log("matches");								
							$("tbody tr:eq("+t+") td#total").text(cloud);
							    //loop through date column rows in table
								for (g=9;g<12;g++)
									//if date column has value, then... 
									{ 
									console.log("g"+g);
									console.log($("tbody tr:eq("+t+") td:eq("+g+")").text());
											if($("tbody tr:eq("+t+") td:eq("+g+")").text().length>0)
												//set date value of this iteration of sky to kayoo variable
												{ console.log("text>0");
												kayoo=sky[u][6];
												goo=$("tbody tr:eq("+t+") td:eq("+g+")").text().concat(" 00:00");
												//;
												console.log("u: "+u+"t: "+t+"g: "+g+"goo: "+goo);
												ded=new Date(goo);
												dedd=ded.getDate();
												dedm=ded.getMonth()+1;
												dedy=ded.getFullYear();
																											
													if(dedm<10)
														{
														console.log("lt 9 ");
														dedm='0'+dedm;
														console.log(ded+kayoo);
														}
														
													if(dedd<10)
														{
														dedd='0'+dedd;
														}
												ded=dedm+"/"+dedd+"/"+dedy;
													if (kayoo==ded)
														{
														console.log("kayoo = ded");
														$("tbody tr:eq("+t+") td:eq("+g+")").css("background-color","green");
														$("tbody tr:eq("+t+") td:eq("+g+")").css("color","yellow");
																
														}
												}
										}
							//set matches indicator to 1, indicating that a match was found
							matches=1;
							  break
							}
					}
					//after for loop through all rows of table, it no match is found, then add row with info
			if(matches==0)
				{
				console.log("no match: "+cloud+"u:" + u);
				$("#tablethingy tbody").append("<tr><td>Missing</td><td>Missing</td><td>Missing</td><td>Missing</td><td>Missing</td><td>Missing</td><td><a href="+sky[u][5]+" target='_blank'>"+sky[u][4]+"</a></td><td>Missing</td><td>Missing</td><td>Missing</td><td style='background-color:red'>"+sky[u][4]+"</td><td>Missing</td></tr>");
				}
		}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
jk=pp.split(",")
rr=jk.length
b=0;
c=0;

//for loop through rows of array of split results items
for (aa=0;aa<rr;aa++)
		{
			
	//if index variable b is 0 (not immediately within 2 after split item with " in it)
	if (b==0) {
		
	//then if this one includes "
		if (jk[aa].includes('"'))
			{
			//iterate b variable				
			 b=b+1;
			 console.log("includes"+b);
			 //split this item at "
			 hj=jk[aa].split('"');
			 //reference one ahead
			 bb=aa+1;
			 //reference 2 ahead
			 cc=aa+2;
			 //combine this item string with next
			 gh = hj[1].concat(jk[bb]); 
			 //combine resulting string with next item
			 gf=gh.concat(jk[cc]); 
			 //add strings to table
			 console.log(hj[0]+' '+gf);
			 //add strings to array
			 uu[c]=hj[0];
			 c=c+1;
			 uu[c]=gf;
			//end if loop for condition of includes "
			}
	    //if this item does not include "
		else 
			{console.log('doesnt include'+b);
		//log, append and add to array
			 console.log(jk[aa]); 
			 
			 uu[c]=jk[aa];}
		 //index variable c
			c=c+1;
		 $("#ltab").append("<tr><td>"+hj[0]+"</td></tr>");$("#ltab").append("<tr><td>"+gf+"</td></tr>")
			 
		 }
		 //if b variable is 1 (first item after that including "), then iterate by one
else if (b==1)
	{
	console.log("b=1");
	b=b+1;
	 }
	 //if it is something else (2), reset to 0
else 
	{
	console.log("b=2");
	b=0;}
		
	//end for loop
	}