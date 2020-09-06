


						function roww(i) {
								
								res=tab.row(i).data();
						
							return res;	
							}
							
							
						function cash(string) {
								if (string[0]=="$"){
								return parseFloat(string.slice(1));
								}
								else {return 0;}
								
							}
							
						function sumcol(addcolumn,refcolumn,matchcon) {
							if(addcolumn && refcolumn && matchcon)
								{var io=roww(addcolumn).length;
									tott=0;
								for (h=0;h<io;h++)
									{
									  if(roww(h)[refcolumn]==matchcon){
										  tm=matchcon;
										  tt=roww(h)[refcolumn];
										var g= cash(roww(h)[addcolumn]);
										tott=tott+g;
										console.log("all 3:" +h+ tott);
											}
									}
								return tott;}
								
							else if(addcolumn && refcolumn && !matchcon)
							{var io=tab.rows().data().length;
								tott=0;
								for (h=0;h<io;h++)
									{
									var g= cash(roww(h)[addcolumn]);
									tott=tott+g;
									console.log("just two:"+tott);
									}
								
							return tott;}
							else(addcolumn && !refcolumn && !matchcon)
							{var io=tab.rows().data().length;
								tott=0;
								for (h=0;h<io;h++)
									{
									var g= cash(roww(h)[addcolumn]);
									tott=tott+g;
									console.log("one:"+tott);
									}
								
							return tott;}
							
							}
								
								
							
						
						function inspaid() {
							
							
							
						}