const db = new GoogleSpreadsheetsDb(
    'AIzaSyBdjsu_0mERhpzaz79MxeFzhcyqsiniImc',
    '1aYiKsFBPBYhj_uIE8OQZJe8N-7GF-llPyQDvXaneoOY'
);


db.getAll('eat-today!A1:L100', (err, rows) => {
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
                <small>`+element.slots+` порции, </small>
                
                <small>приготовлено в `+element.cooking_time+`</small>
                <br>    
                <span class="badge badge-secondary">`+element.address+`</span>
                
            </div>
        </div>
        <hr>`;
        $("#lastdishes").append(html);
    });
}

clickToday = function() {

    $("#itemInfo").css("display", "none");
    $("#desc").css("display", "block");

    $("#futuredishes").css("display", "none");
    $("#lastdishes").css("display", "block");

    $("#tomorrowIcon").html("⚪️");
    $("#todayIcon").html("⚫️");    
}

clickTomorrow = function() {

    $("#itemInfo").css("display", "none");
    $("#desc").css("display", "block");

    $("#tomorrowIcon").html("⚫️");
    $("#todayIcon").html("⚪️");

    $("#lastdishes").css("display", "none");
    $("#futuredishes").css("display", "block");
    
    if (!window.tomorrowLoaded) {
        db.getAll('eat-tomorrow!A1:L100', (err, rows) => {
            showTomorrow(rows);
            window.tomorrowLoaded = true;
        })    
    }
}

showTomorrow = function (items) {
    window.itemsTomorrow = items;
    items.forEach(element => {
    
        html = `<p>👩‍💻 <b>`+element.userName+`</b> <i class="text-muted">предлагает</i></p>
        <div class="row" onclick='openItemTomorrow(`+ element.id +`)'>
            <div class="col-4">   
                <img class="rounded mt-2" src="`+element.images[0]+`">
            </div>
            <div class="col-8">
            `+element.dish+`
                <br>
                <small>`+element.slots+` порции, </small>
                
                <small>будет готово в `+element.cooking_time+`</small>
                <br>
                <span class="badge badge-secondary">`+element.address+`</span>
                
            </div>
        </div>
        <hr>`;
        $("#futuredishes").append(html);
    });

}

openItemToday = function(itemId) {
    element = window.itemsToday[itemId-1];

    $("#lastdishes").css("display", "none");
    $("#futuredishes").css("display", "none");
    $("#itemInfo").css("display", "block");
    $("#desc").css("display", "none");
    
    $("#itemInfo").html(`
    ` + element.dish + `
    <br>

    <img class="rounded mt-2 element" src="`+element.images[0]+`"><br>
    ` + element.description + `
    <br><br>
    Кол-во: ` + element.slots + `<br>
    Район: ` + element.address + `<br>
    Цена: ` + element.price + `р.<br>
    
    <br>
    Дата: ` + element.cooking_date + `<br>
    Время: ` + element.cooking_time + `<br>

    <br><a href="#" class="btn btn-success" >Купить</a>

    <br>

    `);

}

openItemTomorrow = function(itemId) {
    element = window.itemsTomorrow[itemId-1];
    

    $("#lastdishes").css("display", "none");
    $("#futuredishes").css("display", "none");
    $("#itemInfo").css("display", "block");
    $("#desc").css("display", "none");

    $("#itemInfo").html(`
    ` + element.dish + `
    <br>

    <img class="rounded mt-2 element" src="`+element.images[0]+`"><br>
    ` + element.description + `
    <br><br>
    Кол-во: ` + element.slots + `<br>
    Район: ` + element.address + `<br>
    Цена: ` + element.price + `р.<br>
    
    <br>
    Дата: ` + element.cooking_date + `<br>
    Время: ` + element.cooking_time + `<br>

    <br><a href="#" class="btn btn-success" >Купить</a>

    <br>

    `);

}