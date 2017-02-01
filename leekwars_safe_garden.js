// ==UserScript==
// @name         [Leek Wars] Safe Garden
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Allow you to launch friendly fights from the garden 
// @author       Alpacah
// @match        *://*.leekwars.com/*
// @projectPage   https://github.com/Alpacah/Safe-Garden/
// @downloadURL   https://github.com/Alpacah/Safe-Garden/new/master/leekwars_safe_garden.user.js
// @updateURL     https://github.com/Alpacah/Safe-Garden/new/master/leekwars_safe_garden.user.js
// @grant        none
// ==/UserScript==

(function(){
    'use strict';

    function launch(id){
        document.getElementsByClassName("versus")[0].innerHTML = "Attente du resultat du combat...";
        $.ajax({
            type: "POST",
            url: "https://leekwars.com/api/garden/start-solo-challenge",
            data: "leek_id=" + localStorage["garden/leek"] + "&target_id=" + id + "&token=%24",
            success: function(data){ 
                window.open("https://leekwars.com/report/" + JSON.parse(data).fight);
            }
        });
    }

    $('body').on('mouseover', '#garden-solo .opponents .leek', function(e){
        //data = "<a href=\"https://leekwars.com/garden/challenge/" + $(this).attr('leek') + "\" target=\"_blank\">" + $(this).attr('leek') + "</a>";
        data = "<button>" + $(this).attr('leek') + "</button>";
        document.getElementsByClassName("versus")[0].innerHTML = data.replace(/<div class="image">[.*]<\/div>/g, "");
        var id = $(this).attr('leek');
        document.getElementsByClassName("versus")[0].onclick = function(){
            launch(id);
        };
    });

})();
