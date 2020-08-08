
sweettea=Ember.Namespace.NAMESPACES['2'].__container__.factoryManagerCache['route:reports/insurance-claims'].container.cache['controller:reports/insurance-unpaid-sessions'].columns;
soda=Object.keys(pop)[0];
coke=pop[soda].application.__container__.factoryManagerCache;

pepsi=coke['controller:reports/appointments'].container.cache['controller:reports/appointments'].filteredRecords;

Bubbles=pepsi.length;

arnold={"<tbody></tbody>"};

RootBeer={body:""};

$("table").append(arnold);
//loop through records
for (i=0;i<Bubbles; i++)
{
mntdew=pepsi[i];




}





//create header
DrP = {head:"<thead><tr><th colspan='7'>Appointment</th><th colspan='5'>Client Responsibility</th><th colspan='4'>Insurance Responsibility</th></tr></br><tr><th> Date of Service </th><th>Client</th><th>Clinician</th><th>Billing Code</th><th>Rate per Unit</th><th>Units</th><th style='border-right: 1px solid #111366;'>Total Fee</th><th>Status</th><th>Charge</th><th>Uninvoiced</th><th>Paid</th><th style='border-right: 1px solid #111366;'>Unpaid</th><th>Status</th><th>Charge</th><th>Unpaid</th></tr></thead>"};

$("table").append(DrP.head);
