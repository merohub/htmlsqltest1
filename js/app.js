var selectedAbsinthe = new Object();


function calculate() {
    var temper = $("#absinthe-dilute-measure").val() * (($("#absinthe-dilute-begin").val() / $("#absinthe-dilute-final").val())-1);
    $("#absinthe-dilute-calculation").html("Temper this absinthe with " + temper.toPrecision(3) + " ounces of water.");
}

function clearCalculation() {
    $("#absinthe-dilute-name").html("Absinthe");
    $("#absinthe-dilute-calculation").html("");
}
    
function escapeFilter(s) {
    var t = s.replace("\"", "&#39;");
    return t.replace("\'", "&#39;");
}

function onBodyLoad() {
   document.addEventListener("deviceready", onDeviceReady, false);
}
 
function onDeviceReady() {
    checkDB();
    //dropTables();
}
    
$(document).bind("mobileinit", function () {
    //$.mobile.pageContainer = $('#container');
    $.mobile.defaultPageTransition = "fade";
    
    $.support.cors = true;
    $.mobile.touchOverflowEnabled = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.loadingMessage = "Loading...";
    $.mobile.pageLoadErrorMessage = "Error Loading Data";
    $.mobile.page.prototype.options.backBtnTheme = "a";
    $.mobile.page.prototype.options.backBtnText = "Back";
    $.mobile.loadingMessageTextVisible = true;
    $.mobile.pushStateEnabled = false;

    $.extend($.mobile, {
        defaultPageTransition: "fade"
    });
});

function absintheClicked(t){
    selectedAbsinthe.id = $(t).attr("data-id");
    selectedAbsinthe.name = $(t).attr("data-name");
    selectedAbsinthe.abv = $(t).attr("data-abv");
    selectedAbsinthe.notes = $(t).attr("data-notes");
    
    $("#absinthe-id-update").attr("value", $(t).attr("data-id"));
    $("#absinthe-name-update").attr("value", $(t).attr("data-name"));
    $("#absinthe-abv-update").attr("value", $(t).attr("data-abv"));
    $("#absinthe-notes-update").html($(t).attr("data-notes"));
    
    $("#absinthe-dilute-name").html($(t).attr("data-name"));
    $("#absinthe-dilute-begin").attr("value", $(t).attr("data-abv"));
}

function closeDeletionPopup() {
    $("#RemoveAbsinthe").popup("close");
}



