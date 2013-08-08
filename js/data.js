html5sql.openDatabase("com.fracturedvisionmedia.absinthes", "Absinthe Database", 3*1024*1024);

function checkDB(){
	html5sql.process(
		 [
			"CREATE TABLE if not exists brands (id INTEGER PRIMARY KEY, name TEXT, abv INTEGER, notes TEXT);",
			"SELECT * FROM brands;"
		 ],
		 function(transaction, results, rowsArray){
			 if(rowsArray.length > 1){
				 console.log("data!");
				 readDB();
			 }else{
			 	console.log("no data!");
				 populateDB();
			 }
		 }, catchError);
}

function populateDB(){
	html5sql.process(
		 [
			"INSERT INTO brands (name, abv, notes) VALUES ('Marteau Absinthe de la Belle Epoque', 68, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Ridge Distillery Extrait D&#39;Absinthe Verte', 68, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Ridge Distillery Extrait D&#39;Absinthe Blanche', 58, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Leopold Brothers Absinthe Verte', 66, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Obsello II Absinthe Verte', 55, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Vieux Carre Absinthe Superieure', 60, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('La Clandestine Absinthe Superieure', 53, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Duplais Swiss Absinthe Verte', 68, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Vieux Pontarlier Absinthe Francais Superieure', 65, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Lucid Absinthe Superieure', 62, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Pacifique Absinthe Verte Superieur', 62, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Meadow of Love Absinthe', 68, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('St. George Absinthe Verte', 60, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Walton Waters Absinthe', 68, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Nouvelle Orleans Absinthe', 68, '');"
		 ],
		 function(){
			 readDB();
		 }, catchError);
}
	
function readDB(){
	 html5sql.process(
		 [
			"SELECT * FROM brands ORDER BY LOWER(name);",
		 ],
		 function(transaction, results, rowsArray){
			 console.log("success!");
			 $('#AbsintheBrands').empty();
             clearCalculation();
			 var html ='';
			 for(var i=0; i<rowsArray.length; i++){
				var id = rowsArray[i].id;
				var name = rowsArray[i].name;
				var abv = rowsArray[i].abv;
                 var notes = rowsArray[i].notes;
				html += '<li><a href="#dilute" data-id="' + id + '" onclick="absintheClicked(this);" data-name="' + name + '" data-abv="' + abv + '" data-notes="' + notes + '">' + name + '</a><a href="#ConfigAbsinthe" data-rel="popup" data-position-to="window" data-transition="pop" data-id="' + id + '" onclick="absintheClicked(this);" data-name="' + name + '" data-abv="' + abv + '" data-notes="' + notes + '"></a></li>';
			 }
			 $('#AbsintheBrands').append($(html));
             $('#AbsintheBrands').listview('refresh');
		 }, catchError);
}
			 
function dropTables(){
	 html5sql.process(
		 [
			"DROP TABLE brands;",
		 ],
		 function(){
			 console.log("Dropped!");
		 }, catchError);
}



function addAbsinthe(){
    if($("#absinthe-name-add").val().length >= 4 && $("#absinthe-abv-add").val().length >= 2){
         html5sql.process(
             [
                "INSERT INTO brands (name, abv, notes) VALUES ('" + escapeFilter( $("#absinthe-name-add").val() ) + "', '" + escapeFilter( $("#absinthe-abv-add").val() ) + "', '" + escapeFilter( $("#absinthe-notes-add").val() ) + "');"
             ],
             function(){
             	//console.log("no data!");
                $("#AddAbsinthe").dialog("close");
               // $("#absinthe-name-add").val("");
               // $("#absinthe-abv-add").val("");
               // $("#absinthe-notes-add").val("");
                 
                readDB();
             }, catchError);
    }
}
			 
function updateAbsinthe(){
    if($("#absinthe-name-update").val().length >= 4 && $("#absinthe-abv-update").val().length >= 2){
         html5sql.process(
             [
                "UPDATE brands SET name='" + escapeFilter( $("#absinthe-name-update").val() ) + "', abv='" + escapeFilter( $("#absinthe-abv-update").val() ) + "', notes='" + escapeFilter( $("#absinthe-notes-update").val() ) + "' WHERE id='" + selectedAbsinthe.id + "';"
             ],
             function(){
                 $("#UpdateAbsinthe").dialog("close");
                 
                 readDB();
             }, catchError);
    }
}

function removeAbsinthe(){
	 html5sql.process(
		 [
			"DELETE FROM brands WHERE id='" + selectedAbsinthe.id + "';",
		 ],
		 function(){
             $("#RemoveAbsinthe").popup("close");
             readDB();
		 }, catchError);
}
			 

			 
			 
function catchError(error, statement){
	console.error("Error: " + error.message + " when processing " + statement);
}
