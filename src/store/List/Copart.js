const copartList = [
	{ name: "INDIANAPOLIS - IN", value: null },
	{ name: "OCALA - FL", value: null },
	{ name: "HONOLULU - HI", value: null },
	{ name: "GLASSBORO EAST - NJ", value: null },
	{ name: "SUN VALLEY - CA", value: null },
	{ name: "JACKSONVILLE EAST - FL", value: null },
	{ name: "DES MOINES - IA", value: null },
	{ name: "TRENTON - NJ", value: null },
	{ name: "CANDIA - NH", value: null },
	{ name: "TALLAHASSEE - FL", value: null },
	{ name: "FLINT - MI", value: null },
	{ name: "ROCHESTER - NY", value: null },
	{ name: "FORT WAYNE - IN", value: null },
	{ name: "BIRMINGHAM - AL", value: null },
	{ name: "DAVENPORT - IA", value: null },
	{ name: "MADISON - WI", value: null },
	{ name: "NORTH CHARLESTON", value: null },
	{ name: "LUMBERTON -NC", value: null },
	{ name: "PHOENIX - AZ", value: null },
	{ name: "KANSAS CITY - KS", value: null },
	{ name: "ATLANTA SOUTH - GA", value: null },
	{ name: "ORLANDO - FL", value: null },
	{ name: "WEBSTER - NH", value: null },
	{ name: "FT.PIERCE - FL", value: null },
	{ name: "CLEVELAND WEST - OH", value: null },
	{ name: "ATLANTA EAST - GA", value: null },
	{ name: "MINNEAPOLIS - MN", value: null },
	{ name: "AMARILLO - TX", value: null },
	{ name: "BAKERSFIELD - CA", value: null },
	{ name: "JACKSONVILLE NORTH -FL", value: null },
	{ name: "SAVANNAH - GA", value: null },
	{ name: "KNOXVILLE - TN", value: null },
	{ name: "DANVILLE - VA", value: null },
	{ name: "SPOKANE - WA", value: null },
	{ name: "LEXINGTON WEST - KY", value: null },
	{ name: "MACON - GA", value: null },
	{ name: "PORTLAND SOUTH - OR", value: null },
	{ name: "EUGENE - OR", value: null },
	{ name: "MINNEAPOLIS NORTH - MN", value: null },
	{ name: "CARTERSVILLE - GA", value: null },
	{ name: "NEWBURGH - NY", value: null },
	{ name: "ANCHORAGE - AK", value: null },
	{ name: "RENO - NV", value: null },
	{ name: "CHARLESTON - SC", value: null },
	{ name: "DENVER CENTRAL - CO", value: null },
	{ name: "DENVER - CO", value: null },
	{ name: "ST. LOUIS - MO", value: null },
	{ name: "NASHVILLE - TN", value: null },
	{ name: "OKLAHOMA CITY - OK", value: null },
	{ name: "COLUMBIA - MO", value: null },
	{ name: "LITTLE ROCK - AR", value: null },
	{ name: "SYRACUSE - NY", value: null },
	{ name: "BATON ROUGE - LA", value: null },
	{ name: "HARRISBURG - PA", value: null },
	{ name: "PEORIA - IL", value: null },
	{ name: "SOUTH BOSTON - MA", value: null },
	{ name: "CULPEPER - VA", value: null },
	{ name: "ANDREWS-TX", value: null },
	{ name: "MARTINEZ - CA", value: null },
	{ name: "FREMONT - CA", value: null },
	{ name: "COLUMBUS - OH", value: null },
	{ name: "PITTSBURGH EAST - PA", value: null },
	{ name: "SALT LAKE CITY - UT", value: null },
	{ name: "IONIA - MI", value: null },
	{ name: "BOISE - ID", value: null },
	{ name: "HARTFORD SPRINGFIELD-CT", value: null },
	{ name: "EXETER - RI", value: null },
	{ name: "PITTSBURGH WEST - PA", value: null },
	{ name: "MONTGOMERY - AL", value: null },
	{ name: "BUFFALO - NY", value: null },
	{ name: "SHREVEPORT - LA", value: null },
	{ name: "ALBUQUERQUE - NM", value: null },
	{ name: "PUNTA GORDA - FL", value: null },
	{ name: "ORLANDO SOUTH - FL", value: null },
	{ name: "MIAMI CENTRAL - FL", value: null },
	{ name: "CONCORD - NC", value: null },
	{ name: "BILLINGS - MT", value: null },
	{ name: "WACO - TX", value: null },
	{ name: "SCRANTON - PA", value: null },
	{ name: "BALTIMORE - MD", value: null },
	{ name: "TAMPA SOUTH - FL", value: null },
	{ name: "CRASHEDTOYS EAST BETHEL - MN", value: null },
	{ name: "SACRAMENTO - CA", value: null },
	{ name: "PHILADELPHIA EAST - SUBLOT - PA", value: null },
	{ name: "VAN NUYS - CA", value: null },
	{ name: "CHAMBERSBURG - PA", value: null },
	{ name: "NORTH SEATTLE - WA", value: null },
	{ name: "WEST WARREN - MA", value: null },
	{ name: "MCALLEN - TX", value: null },
	{ name: "ABILENE - TX", value: null },
	{ name: "DETROIT - MI", value: null },
	{ name: "SOMERVILLE - NJ", value: null },
	{ name: "CRASHEDTOYS SACRAMENTO - CA", value: null },
	{ name: "SOUTHERN ILLINOIS - IL", value: null },
	{ name: "SAN JOSE - CA", value: null },
	{ name: "CHICAGO NORTH - IL", value: null },
	{ name: "WEST PALM BEACH - FL", value: null },
	{ name: "SAN ANTONIO - TX", value: null },
	{ name: "CLEVELAND EAST - OH", value: null },
	{ name: "ATLANTA NORTH - GA", value: null },
	{ name: "LOS ANGELES - CA", value: null },
	{ name: "RALEIGH - NC", value: null },
	{ name: "SO SACRAMENTO - CA", value: null },
	{ name: "AUSTIN - TX", value: null },
	{ name: "GRAHAM - WA", value: null },
	{ name: "LUFKIN - TX", value: null },
	{ name: "LINCOLN - NE", value: null },
	{ name: "DENVER SOUTH - CO", value: null },
	{ name: "PASCO - WA", value: null },
	{ name: "LEXINGTON EAST - KY", value: null },
	{ name: "SAN BERNARDINO- CA", value: null },
	{ name: "FRESNO - CA", value: null },
	{ name: "CRASHEDTOYS MINNEAPOLIS-MN", value: null },
	{ name: "PITTSBURG SOUTH - PA", value: null },
	{ name: "CRASHEDTOYS DALLAS- TX", value: null },
	{ name: "WALTON - KY", value: null },
	{ name: "FT.WORTH - TX", value: null },
	{ name: "PHILADELPHIA - PA", value: null },
	{ name: "HAYWARD - CA", value: null },
	{ name: "PORTLAND NORTH - OR", value: null },
	{ name: "CASPER - WY", value: null },
	{ name: "YORK HAVEN - PA", value: null },
	{ name: "REDDING - CA", value: null },
	{ name: "ALTOONA - PA", value: null },
	{ name: "WHEELING - IL", value: null },
	{ name: "DALLAS - TX", value: null },
	{ name: "RICHMOND - VA", value: null },
	{ name: "ATLANTA WEST - GA", value: null },
	{ name: "SPARTANBURG - SC", value: null },
	{ name: "FAYETTEVILLE - AR", value: null },
	{ name: "ALBANY - NY", value: null },
	{ name: "FREDERICKSBURG - VA", value: null },
	{ name: "SIKESTON - MO", value: null },
	{ name: "ANTELOPE - CA", value: null },
	{ name: "DOTHAN - AL", value: null },
	{ name: "ST. CLOUD - MN", value: null },
	{ name: "VALLEJO - CA", value: null },
	{ name: "MIAMI SOUTH - FL", value: null },
	{ name: "DALLAS SOUTH - TX", value: null },
	{ name: "SAN DIEGO - CA", value: null },
	{ name: "GREER - SC", value: null },
	{ name: "MEMPHIS - TN", value: null },
	{ name: "JACKSONVILLE WEST - FL", value: null },
	{ name: "HAMMOND - IN", value: null },
	{ name: "TIFTON - GA", value: null },
	{ name: "MOBILE - AL", value: null },
	{ name: "TUCSON - AZ", value: null },
	{ name: "CRASHEDTOYS ELDRIDGE - IA", value: null },
	{ name: "LONG ISLAND - NY", value: null },
	{ name: "NORTH BOSTON - MA", value: null },
	{ name: "MILWAUKEE - WI", value: null },
	{ name: "LOUISVILLE - KY", value: null },
	{ name: "RICHMOND EAST-VA", value: null },
	{ name: "MOCKSVILLE - NC", value: null },
	{ name: "KINCHELOE - MI", value: null },
	{ name: "EL PASO - TX", value: null },
	{ name: "SPRINGFIELD - MO", value: null },
	{ name: "PHILADELPHIA EAST", value: null },
	{ name: "LONGVIEW - TX", value: null },
	{ name: "LYMAN - ME", value: null },
	{ name: "TORONTO CANADA", value: null },
	{ name: "ORLANDO NORTH - FL", value: null },
	{ name: "City", value: null },
	{ name: "CORPUS CHRISTI - TX", value: null },
	{ name: "CRASHEDTOYS ATLANTA", value: null },
	{ name: "MEBANE - NC", value: null },
	{ name: "COLORADO SPRINGS - CO", value: null },
	{ name: "MIAMI NORTH - FL", value: null },
	{ name: "LANSING - MI", value: null },
	{ name: "RANCHO CUCAMONGA - CA", value: null },
	{ name: "HAMPTON - VA", value: null },
	{ name: "APPLETON - WI", value: null },
	{ name: "HARTFORD - CT", value: null },
	{ name: "LONG BEACH - CA", value: null },
	{ name: "DETROIT MI", value: null },
	{ name: "WICHITA - KS", value: null },
	{ name: "COLUMBIA - SC", value: null },
	{ name: "OGDEN- UT", value: null },
	{ name: "CHARLESTON - WV", value: null },
	{ name: "HELENA - MT", value: null },
	{ name: "CHICAGO SOUTH - IL", value: null },
	{ name: "TULSA - OK", value: null },
	{ name: "DAYTON - OH", value: null },
	{ name: "NEW ORLEANS - LA", value: null },
	{ name: "CHINA GROVE - NC", value: null },
	{ name: "HOUSTON - TX", value: null },
	{ name: "JACKSON - MS", value: null },
	{ name: "PITTSBURGH NORTH - PA", value: null },
	{ name: "WASHINGTON DC - MD", value: null },
	{ name: "SEAFORD - DE", value: null },
	{ name: "TANNER - AL", value: null },
	{ name: "LAS VEGAS - NV", value: null },
]

export default copartList;
