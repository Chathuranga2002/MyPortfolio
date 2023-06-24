getCusName();
getItemName()
let selectedName ;
let selectedItem ;
let fullTotal=0.00;
let subTotal=0.00;
let balance=0.00;
let cash=0;
orderSetDB = [];
let orderCount=1;

updateFulTotal();

function updateFulTotal() {

    $("#total").text(fullTotal);

}


newOid();
function newOid(){
    $('#txtOrderID').val('O00-00' + orderCount);
}


// load all items to table

function loadAllOderDetails() {
    $("#orderTblBody").empty();

    for (let oDetails of orderDetails) {
        let orderRow = `<tr>
                        <td>${oDetails.iCode}</td>
                        <td>${oDetails.itemName}</td>
                        <td>${oDetails.price}</td>
                        <td>${oDetails.Qty}</td>
                        <td>${oDetails.total}</td>
                   </tr>`;
        $('#orderTblBody').append(orderRow);
        bool = false;
    }

}





function bindOrderEvents() {
    $("#cusNameBox").on("click", function() {
        selectedName = $(this).val();
        console.log("Selected item: " + selectedName);
        getCustomerDetails();
        // Perform further actions with the selected item
    });
    $("#itemNameBox").on("click", function() {
        selectedItem = $(this).val();
        console.log("Selected item: " + selectedItem);
        getItemDetails();
        // Perform further actions with the selected item
    });

}

function getCusName() {
    for (let i = 0; i < customerDB.length; i++) {
        let name=customerDB[i].id;

        // <option value="1">A</option>
        let row = `<option>${name}</option>`;

        $("#cusNameBox").append(row);
        bindOrderEvents();
    }

}
function getItemName() {
    for (let i = 0; i < itemDB.length; i++) {
        let name=itemDB[i].code;

        // <option value="1">A</option>
        let row = `<option>${name}</option>`;

        $("#itemNameBox").append(row);
        bindOrderEvents();
    }
}

function getCustomerDetails() {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id==selectedName){
            let id = customerDB[i].id;
            let name = customerDB[i].name;
            let address = customerDB[i].address;
            let salary = customerDB[i].salary;

            $("#orderCustomerID").val(id);
            $("#orderCustomerName").val(name);
            $("#orderCustomerAddress").val(address);
            $("#orderCustomerSalary").val(salary);

        }


    }
}
function getItemDetails() {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code==selectedItem){
                let code = itemDB[i].code;
                let description = itemDB[i].description;
                let qty = itemDB[i].qtyOnHand;
                let unitPrice = itemDB[i].unitPrice;

            $("#txtItemCode").val(code);
            $("#txtItemDescription").val(description);
            $("#txtItemPrice").val(unitPrice);
            $("#txtQTYOnHand").val(qty);

        }


    }
}


$("#btnAddToTable").on("click", function() {
    console.log("btnPress");
    let cheker=true;
    let itemCode =   $("#txtItemCode").val();
    let description = $("#txtItemDescription").val();
    let qty =  $("#txtQty").val();
    let unitPrice = $("#txtItemPrice").val();
    let total = qty*unitPrice;
    fullTotal=fullTotal+total;

    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].iCode==itemCode){
           let  a=  Number(orderDB[i].Qty);
           let  b=  Number(orderDB[i].total);
            orderDB[i].Qty=a+Number(qty);
            orderDB[i].total=b+Number(total);
            cheker=false;
        }


    }

    if (cheker){
     let newOrder= Object.assign({}, orderDetails);
     newOrder.iCode=itemCode;
     newOrder.itemName=description;
     newOrder.price=unitPrice;
     newOrder.Qty=qty;
     newOrder.total=total;
     orderDB.push(newOrder);
    }
    console.log(orderDB);
    updateFulTotal();
    getAllOrderDetails();
});

function getAllOrderDetails() {
    //clear all tbody data before add
    $("#orderTable").empty();

    //get all items
    for (let i = 0; i < orderDB.length; i++) {

        let code = orderDB[i].iCode;
        let description = orderDB[i].itemName;
        let qty = orderDB[i].Qty;
        let unitPrice = orderDB[i].price;
        let total = orderDB[i].total;

        let row = `<tr>
                     <td>${code}</td>
                     <td>${description}</td>
                     <td>${unitPrice}</td>
                     <td>${qty}</td>
                     <td>${total}</td>
                    </tr>`;

        // //and then append the row to tableBody
        $("#orderTable").append(row);

    }
}
$("#txtDiscount").on("keyup",function () {
    calBalance();
});
$("#txtCash").on("keyup",function () {
   cash= $("#txtCash").val();
    console.log(cash)
});

function calBalance() {
    let discount=0;
    discount = $("#txtDiscount").val();
    let tot= (discount * fullTotal) / 100;
    subTotal=fullTotal-tot;
    subTotal=subTotal.toFixed(2);
    $("#subtotal").text(subTotal);
    balance=cash-subTotal;
    $("#txtBalance").val(balance);


}


$("#btnSubmitOrder").on("click", function() {
    let oId =  $("#txtOrderID").val();
    let cusId=$("#orderCustomerID").val();
    let  date =$("#txtDate").val();
    let  discount=$("#txtDiscount").val();

    let placeOrder= Object.assign({}, order);
    placeOrder.oId=oId;
    placeOrder.cusId=cusId;
    placeOrder.date=date;
    placeOrder.orderDetails=orderDB;
    placeOrder.total=fullTotal;
    placeOrder.subTotal=subTotal;
    placeOrder.discount=discount;
    orderSetDB.push(placeOrder);
    console.log(orderSetDB);
    orderDB=[];
    orderCount=orderCount+1;
    newOid();
    getAllOrderDetails();
    orderCountDasch();

});
function orderCountDasch() {
    $("#countOrder").text(orderSetDB.length);
}
