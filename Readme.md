Save <a href='javascript:javascript:(function () {
    ai_coach_script = document.createElement("script");
    ai_coach_script.setAttribute("src","https://github.com/Frazer/AICoworker/coach.js");
    if(ai_coach_script.addEventListener) {
        ai_coach_script.addEventListener("load", function() { alert("loaded"); }, false);
    }else if(ai_coach_script.readyState) {
        ai_coach_script.onreadystatechange = function() { alert("ready"); };
    }else {
        ai_coach_script.onload = function() { alert("onloaded"); };
    }
    document.body.appendChild(ai_coach_script);})();'>this bookmarklet</a>