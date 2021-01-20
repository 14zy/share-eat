const db = new GoogleSpreadsheetsDb(
    'AIzaSyBdjsu_0mERhpzaz79MxeFzhcyqsiniImc',
    '1aYiKsFBPBYhj_uIE8OQZJe8N-7GF-llPyQDvXaneoOY'
);


db.getAll('eat-list!A1:L100', (err, rows) => {
    showToday(rows);
})

showToday = function (items) {
    items.forEach(element => {   
        window.itemsToday = items;
        html = `<p>👩‍💻 <b>`+element.userName+`</b> <i class="text-muted">предлагает</i></p>
        <div class="row" onclick='openItemToday(`+ element.id +`)'>
            <div class="col-4">   
                <img class="rounded mt-2" src="`+element.images[0]+`">
            </div>
            <div class="col-8">
            `+element.dish+`
                <br>
                <small>`+element.slots+` порции </small>
                
                <small>к `+element.cooking_time+`</small>
                <br>    
                <span class="badge badge-secondary">`+element.address+`</span>
                
            </div>
        </div>
        <hr>`;
        $("#lastdishes").append(html);
    });
}

clickToday = function() {

    $("#profile").css("display", "none");

    $("#itemInfo").css("display", "none");
    $("#desc").css("display", "block");

    $("#futuredishes").css("display", "none");
    $("#lastdishes").css("display", "block");

    $("#tomorrowIcon").html("⚪️");
    $("#todayIcon").html("⚫️");    
    $("#profileIcon").html("⚪️");   
}

clickTomorrow = function() {

    $("#profile").css("display", "none");
    
    $("#itemInfo").css("display", "none");
    $("#desc").css("display", "block");

    $("#tomorrowIcon").html("⚫️");
    $("#todayIcon").html("⚪️");
    $("#profileIcon").html("⚪️");   

    $("#lastdishes").css("display", "none");
    $("#futuredishes").css("display", "block");
    
    if (!window.tomorrowLoaded) {
        db.getAll('eat-orders!A1:N100', (err, rows) => {
            showTomorrow(rows);
            window.tomorrowLoaded = true;
        })    
    }
}

clickProfile = function() {

    $("#itemInfo").css("display", "none");
    $("#desc").css("display", "none");

    $("#futuredishes").css("display", "none");
    $("#lastdishes").css("display", "none");

    $("#profile").css("display", "block");

    $("#todayIcon").html("⚪️");    
    $("#tomorrowIcon").html("⚪️");
    $("#profileIcon").html("⚫️");   
}

showTomorrow = function (items) {
    window.itemsTomorrow = items;
    
    items.forEach(element => {
    
        html =  `<p>👩‍💻 <b>`+element.userName+`</b> <i class="text-muted">приготовит для вас</i>
        <div class="row" onclick='openItemTomorrow(`+ element.id +`)'>
            <div class="col-4">   
                <img class="rounded mt-2" src="`+element.images[0]+`">
            </div>
            <div class="col-8">
            `+element.dish+`
                <br>
                <small>`+element.slots+` порции </small>
                
                <small>к `+element.cooking_time+`</small>
                <br>
                <span class="badge badge-secondary">`+element.address+`</span>
                <small>К оплате: `+element.price+`р</small>
                
            </div>
        </div>
        <hr>`;
        $("#futuredishes").append(html);
    });

}

openItems = function() {

    $("#lastdishes").css("display", "none");
    $("#futuredishes").css("display", "none");
    $("#itemInfo").css("display", "block");
    $("#desc").css("display", "none");
    //Todo hide logo
}

openItemToday = function(itemId) {

    openItems();


    element = window.itemsToday[itemId-1];


    $("#itemInfo").html(`

    ` + element.dish + `
        <br>

        <img class="rounded mt-2 element" src="`+element.images[0]+`"><br>
        ` + element.description + `
        <br><br>
        Кол-во: ` + element.slots + `<br>
        Район: ` + element.address + `<br>
        
        
        <br>
        Дата: ` + element.cooking_date + `<br>
        Время: ` + element.cooking_time + `<br>
        Цена: ` + element.price + `р.<br>

        <br><a onclick="alert('Отправьте ` + element.price*0.1 + `р на ` + element.phone + ` сбер');" class="btn btn-success" >Залог ` + element.price*0.1 + `р.</a>

        <br><br>

    `);

}

openItemTomorrow = function(itemId) {

    openItems();
    element = window.itemsTomorrow[itemId-1];
    


    $("#itemInfo").html(`
    ` + element.dish + `
        <br>

        <img class="rounded mt-2 element" src="`+element.images[0]+`"><br>
        ` + element.description + `
        <br><br>
        Кол-во: ` + element.slots + `<br>
        Район: ` + element.address + `<br>
        
        
        <br>
        Дата: ` + element.cooking_date + `<br>
        Время: ` + element.cooking_time + `<br>
        Цена: ` + element.price + `р.<br>
        <br><br>

    `);

}