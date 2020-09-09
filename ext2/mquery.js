


						function roww(i) {
								
								res=tab.row(i).data();
						
							return res;	
							}
							
							
						function cash(string) {
								if (string[0]=="$"){
									var tt = string.length-1;
									if(string[tt]=="R")
									{
									return 0-parseFloat(string.split(" ")[0].slice(1));
										
									}
								else{
									
								return parseFloat(string.slice(1));
								}
								}
								else {return 0;}
								
							}
							
						function countcol(countcolumn, matchcon)
							{if(matchcon) {
								
							 var io = tab.rows().data().length;
							 var cnt = 0;
							 for (h=0;h<io;h++){
								 if (roww(h)[countcolumn]==matchcon)
								 {
								  cnt=cnt+1;	  								 
								 }
								}	
							 return cnt;
							}
							else {
								 var io = tab.rows().data().length;
							 var cnt = 0;
							 for (h=0;h<io;h++){
								 
								  cnt=cnt+1;	  								 
								 
								}	
							 return cnt;
								
								
							}
							
							
							}
							
							
						function sumcol(addcolumn,refcolumn,matchcon) {
							if(addcolumn && refcolumn && matchcon)
								{var io=tab.rows().data().length;
									tott=0;
								for (h=0;h<io;h++)
									{
									  if(roww(h)[refcolumn]==matchcon){
										  tm=matchcon;
										  tt=roww(h)[refcolumn];
										var g= cash(roww(h)[addcolumn]);
										tott=tott+g;
										
											}
									}
									tott=parseFloat(tott);
								return tott;}
								
							else if(addcolumn && refcolumn && !matchcon)
							{var io=tab.rows().data().length;
								tott=0;
								for (h=0;h<io;h++)
									{
									var g= cash(roww(h)[addcolumn]);
									tott=tott+g;
									
									}
								tott=parseFloat(tott);
							return tott;}
							else(addcolumn && !refcolumn && !matchcon)
							{var io=tab.rows().data().length;
								tott=0;
								for (h=0;h<io;h++)
									{
									var g= cash(roww(h)[addcolumn]);
									tott=tott+g;
									
									}
								tott=parseFloat(tott);
							return tott;}
							
							}
								
								
							
						
						function Highlow(index) {
									var Hll= tab.rows()[0].length;
										var ngt = 0;
										var agt = 0;
										var nlt = 0;
										var alt = 0;
										var bdn = [];
							
							for (y=0;y<Hll;y++)
							{
									var ii = cash(roww(y)[index]);
								if(roww(y)[index][0]=="$")
								{ 
									if (ii<50)
									{ nlt=nlt+1;
									  alt=alt+cash(roww(y)[index]);
									}
									else if (ii>49)
									{
									 ngt=ngt+1;
									 agt=agt+cash(roww(y)[index]);
									}
									else 
									{
																	
									}	
								}	
							
							}
						
						bdn['ngt']=ngt;
						bdn['agt']=agt;
						bdn['nlt']=nlt;
						bdn['alt']=alt;
						return bdn;
						};