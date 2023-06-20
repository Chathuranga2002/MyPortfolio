//logics for SPA
initiateUI();
lordCount();

function initiateUI() {
    clearAll();
    $("#dashboardContent").css("display", "block");
    setTheLastView();

}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "dashboardContent":
            localStorage.setItem("view", "HOME");
            break;
        case "customerContent":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemContent":
            localStorage.setItem("view", "ITEM");
            break;
        case "orderContent":
            localStorage.setItem("view", "ORDER");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "HOME":
            setView($("#dashboardContent"));
            break;
        case "ITEM":
            setView($("#itemContent"));
            break;
        case "CUSTOMER":
            setView($("#customerContent"));
            break;
        case "ORDER":
            setView($("#orderContent"));
            break;
        default:
            setView($("#dashboardContent"));
    }
}

function clearAll() {
    $("#dashboardContent,#customerContent,#itemContent,#orderContent").css('display', 'none');
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

//bind events
$("#lnkHome").click(function () {
    setView($("#dashboardContent"));
});

$("#lnkCustomer").click(function () {
    setView($("#customerContent"));
});

$("#lnkItem").click(function () {
    setView($("#itemContent"));
});

$("#lnkOrders").click(function () {
    setView($("#orderContent"));
});

//end of logics for SPA
//get Customer Count
function lordCount(){
    let cusCount =customerDB.length;
    $("#countCus").text(cusCount);
    $("#countItem").text(itemDB.length);
    $("#countOrder").text(orderDB.length);
}
