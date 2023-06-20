getCusName();
getItemName()
var selectedName ;
var selectedItem ;
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
        let name=customerDB[i].name;

        // <option value="1">A</option>
        let row = `<option>${name}</option>`;

        $("#cusNameBox").append(row);
        bindOrderEvents();
    }

}
function getItemName() {
    for (let i = 0; i < itemDB.length; i++) {
        let name=itemDB[i].description;

        // <option value="1">A</option>
        let row = `<option>${name}</option>`;

        $("#itemNameBox").append(row);
        bindOrderEvents();
    }
}

function getCustomerDetails() {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].name==selectedName){
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
        if (itemDB[i].description==selectedItem){
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


