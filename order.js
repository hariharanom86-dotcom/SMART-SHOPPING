// Home / Accessories page la irundhu vandha product ah edu
var item = JSON.parse(localStorage.getItem("orderItem"))

if(item)
{
    document.getElementById("summary").innerHTML = "<p><b>" + item.name + "</b><br>Size: M | Qty: 1<br>₹" + item.price + "</p>"
    document.getElementById("subtotal").innerText = "₹" + item.price
    document.getElementById("total").innerText = "₹" + item.price
}
else
{
    document.getElementById("summary").innerHTML = "<p><b>Tailored Linen Shirt</b><br>Size: M | Qty: 1<br>₹2,499</p>"
    document.getElementById("subtotal").innerText = "₹2,499"
    document.getElementById("total").innerText = "₹2,499"
}

function confirmOrder()
{


    var name = document.getElementById("fullName").value
    var payment = document.getElementById("payment").value
    var mobile=document.getElementById("mobile").value
    var email=document.getElementById("email").value
    var address=document.getElementById("address").value

    if(name.trim()===""||mobile.trim()===""||email.trim()==="" || address.trim()===""){
        alert("Please fill all delivery details!");
    return;
    } 

    if(mobile.length !== 10 || !/^\d{10}$/.test(mobile)){
    alert("Please enter valid 10-digit Mobile Number!");
    return;
}

    if(!email.includes("@")){
        alert("Please enter vaild Email!");
        return;
    }
    var orderId = "#SS-2026-" + Math.floor(1000 + Math.random() * 9000)


    // 2. Sunday la present pannina, adhula irundhu 5 days aprom random date
    // Sunday = Inniku irundhu varra Sunday
    var today = new Date()
    var sunday = new Date(today)
    sunday.setDate(today.getDate() + (7 - today.getDay()))

    // 5 days aprom + random 0,1,2 days
    var randomExtra = Math.floor(Math.random() * 3)
    var delivery = new Date(sunday)
    delivery.setDate(sunday.getDate() + 5 + randomExtra)

    var deliveryDate = delivery.toDateString()


    // 3. Popup la kaata
    document.getElementById("popupText").innerHTML = "Thank you " + name + "!<br><br>Order ID: <b>" + orderId + "</b><br>Payment: " + payment + "<br>Your order will be delivered on: <b>" + deliveryDate + "</b>"

    document.getElementById("popup").style.display = "block"
}

function closePopup()
{
    document.getElementById("popup").style.display = "none"
}



var item = JSON.parse(localStorage.getItem("orderItem"));

if (item) {
    document.getElementById("summary").innerHTML =
        "<p><b>" + item.name + "</b><br>Size: M | Qty: 1<br>₹" + item.price + "</p>";

    document.getElementById("subtotal").innerText = "₹" + item.price;
    document.getElementById("total").innerText = "₹" + item.price;
}
else {
    document.getElementById("summary").innerHTML =
        "<p><b>Tailored Linen Shirt</b><br>Size: M | Qty: 1<br>₹2,499</p>";

    document.getElementById("subtotal").innerText = "₹2,499";
    document.getElementById("total").innerText = "₹2,499";
}

function confirmOrder() {

    var name = document.getElementById("fullName").value;
    var payment = document.getElementById("payment").value;
    var mobile = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;

    if (name.trim() === "" || mobile.trim() === "" ||
        email.trim() === "" || address.trim() === "") {

        alert("Please fill all delivery details!");
        return;
    }

    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
        alert("Please enter valid 10-digit Mobile Number!");
        return;
    }

    if (!email.includes("@")) {
        alert("Please enter valid Email!");
        return;
    }

    var orderId = "#SS-2026-" +
        Math.floor(1000 + Math.random() * 9000);

    var today = new Date();
    var sunday = new Date(today);

    sunday.setDate(today.getDate() + (7 - today.getDay()));

    var randomExtra = Math.floor(Math.random() * 3);

    var delivery = new Date(sunday);
    delivery.setDate(sunday.getDate() + 5 + randomExtra);

    var deliveryDate = delivery.toDateString();

    document.getElementById("popupText").innerHTML =
        "Thank you " + name +
        "!<br><br>Order ID: <b>" + orderId +
        "</b><br>Payment: " + payment +
        "<br>Your order will be delivered on: <b>" +
        deliveryDate + "</b>";

    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
