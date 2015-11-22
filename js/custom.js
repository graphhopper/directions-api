// header
$('.navbar-brand').remove();
$('<a class="navbar-brand" href="https://graphhopper.com/"><img alt="GraphHopper" width="36px" src="./img/gh-logo.png"/></a>').appendTo($('.navbar-header'));
$('<li><a href="https://graphhopper.com/dashboard/">Dashboard</a></li>').appendTo($('ul.nav.navbar-nav'));

// footer
// $('footer.col-md-12').empty();
$('footer.col-md-12').prepend($('<center><ul>'
                              +'<li><a href="https://graphhopper.com/#contact">Imprint</a></li>'
                              +'<li class="muted">·</li>'
                              +'<li><a href="https://graphhopper.com/terms.html">Terms</a></li>'                              
                              +'</center></ul>'
                            ));

var _paq = _paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
    var u = "https://graphhopper.com/piwik/";
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    _paq.push(['setSiteId', 1]);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.defer = true;
    g.async = true;
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
})();