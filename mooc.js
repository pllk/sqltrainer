var client_id = "50c4648f34bb075578c383ec62d6908fa49b6986d992c34a2a029be777e0337e";
var client_secret = "d15d4d4ba2b80a91aaff7a5c94d30fe65c87b058991a327a5de4dfe71f7c5576";
var mooc_status = 0;
var mooc_token;

function mooc_login(username,password,callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            mooc_status = this.status == 200 ? 1 : 2;
            if (mooc_status == 1) {
                mooc_token = JSON.parse(this.responseText)["access_token"];
                sessionStorage.setItem("mooc_token",mooc_token);
            }
            callback();
        }
    }
    xhttp.open("POST","https://tmc.mooc.fi/oauth/token",true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("client_id="+client_id+"&"+
               "client_secret="+client_secret+"&"+
               "username="+encodeURIComponent(username)+"&"+
               "password="+encodeURIComponent(password)+"&"+
               "grant_type=password"); 
}

function mooc_logout(callback) {
    mooc_status = 0;
    mooc_token = "";
    sessionStorage.clear();
    callback();
}

function mooc_query(query,callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    }
    xhttp.open("GET",query,true);
    xhttp.setRequestHeader("Authorization","Bearer "+mooc_token);
    xhttp.send();
}

if (sessionStorage.getItem("mooc_token")) {
    mooc_status = 1;
    mooc_token = sessionStorage.getItem("mooc_token");
}
