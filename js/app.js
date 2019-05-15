var clicked = '';
var clickedprev = '';
var path = ['main'];
var pathL;
$('#backbutton').click(function() {
    pathL = path.length - 1;
    if (path[pathL] == 'main') {
        $(`#${clicked}`).hide();
        $('#backbutton').hide();
        $(`#main`).show();
    } else {
        $(`#${path[pathL]}`).hide();
        path.splice(pathL, 1);
        pathL = path.length - 1
        $(`#${path[pathL]}`).show();
        if (path[pathL] == 'main') {
            $('#backbutton').hide();
        }
    }
});

$('#healthcontainer').click(function() {
    $('#main').hide();
    clicked = 'health';
    path.push('health');
    $('#backbutton').show();
    $('#health').show();
});
$('#goalscontainer').click(function() {
    $('#main').hide();
    path.push('goals');
    clicked = 'goals';
    $('#backbutton').show();
    $('#goals').show();
});
$('#whatsnextcontainer').click(function() {
    $('#main').hide();
    path.push('next');
    clicked = 'next';
    $('#backbutton').show();
    $('#next').show();

});

$('#dailygoals').click(function() {
    $('#goals').hide();
    path.push('sevensday');
    clicked = 'sevensday';
    $('#backbutton').show();
    $('#sevensday').show();
});
$('#weeklygoals').click(function() {
    $('#goals').hide();
    path.push('sevensweek');
    clicked = 'sevensweek';
    $('#backbutton').show();
    $('#sevensweek').show();
});

$('#caseclosures').click(function() {
    $('#health').hide();
    path.push('caseclosuresdiv');
    clicked = 'caseclosuresdiv';
    $('#backbutton').show();
    $('#caseclosuresdiv').show();
});

$('#weekteamcase').click(function() {
    $('#caseclosuresdiv').hide();
    path.push('teamcases');
    clicked = 'teamcases';
    $('#backbutton').show();
    $('#teamcases').show();
});
$('#complianceoverview').click(function() {
    $('#health').hide();
    path.push('casecompliance');
    clicked = 'casecompliance';
    $('#backbutton').show();
    $('#casecompliance').show();
});

$('#notcompliantbutton').click(function() {
    $('#casecompliance').hide()
    path.push('non_compliant_cases');
    clicked = 'non_compliant_cases';
    $('#backbutton').show();
    $('#non_compliant_cases').show();
});
$('#todaycompliantbutton').click(function() {
    $('#casecompliance').hide()
    path.push('today_compliant_cases');
    clicked = 'today_compliant_cases';
    $('#backbutton').show();
    $('#today_compliant_cases').show();
});
$('#compliantbutton').click(function() {
    $('#casecompliance').hide()
    path.push('compliant_cases');
    clicked = 'compliant_cases';
    $('#backbutton').show();
    $('#compliant_cases').show();
});
$('#helpcontainer').click(function() {
    $('#main').hide()
    path.push('helpdiv');
    clicked = 'helpdiv';
    $('#backbutton').show();
    $('#helpdiv').show();
});
$('#followupGauge').click(function() {
    $('#next').hide()
    path.push('followupondiv');
    clicked = 'followupondiv';
    $('#backbutton').show();
    $('#followupondiv').show();
});
$('#opencasesGauge').click(function() {
    $('#next').hide()
    path.push('opencasesdiv');
    clicked = 'opencasesdiv';
    $('#backbutton').show();
    $('#opencasesdiv').show();
});
$('#pullnextGauge').click(function() {
    $('#next').hide()
    path.push('pullnextdiv');
    clicked = 'pullnextdiv';
    $('#backbutton').show();
    $('#pullnextdiv').show();
});

$('#csatgauge').click(function() {
    $('#health').hide();
    path.push('csatdiv');
    clicked = 'csatdiv';
    $('#backbutton').show();
    $('#csatdiv').show();
})
$('#perfectCSATGauge').click(function() {
    $('#csatdiv').hide();
    path.push('perfectcsatdiv');
    clicked = 'perfectcsatdiv';
    $('#backbutton').show();
    $('#perfectcsatdiv').show();
})
$('#totalCSATGauge').click(function() {
    $('#csatdiv').hide();
    path.push('totalcsatdiv');
    clicked = 'totalcsatdiv';
    $('#backbutton').show();
    $('#totalcsatdiv').show();
})
$('#DSATGauge').click(function() {
    $('#csatdiv').hide();
    path.push('dcsatdiv');
    clicked = 'dcsatdiv';
    $('#backbutton').show();
    $('#dcsatdiv').css({ display: "-webkit-inline-box" });

})

$(document).ready(function() { pulldata() });
domo.onDataUpdate(function() {
    pulldata();
})


function navigate(e) {
    var url = `https://domo.my.salesforce.com/${e}`;
    domo.navigate(url, true);
}

var happyface = `<div id="happy1" class="cell happy"><div class="head"><div class="face"><div class="l-eye"></div><div class="r-eye"></div><div class="mouth"></div></div><div class="fill"></div></div></div>`;
var normalface = `<div class="cell standard" id="normal1"><div class="head"><div class="face"><div class="l-eye"></div><div class="r-eye"></div><div class="mouth"></div></div></div></div>`;
var sadface = `<div class="cell sad" style = "display: none;" id="sad1"><div class="head"><div class="face"><div class="l-eye"></div><div class="r-eye"></div><div class="mouth"></div></div></div></div>`;
var angryface = `<div class="cell angry" style = "display: none;" id="angry1"><div class="head"><div class="face"><div class="l-brow"></div><div class="l-eye"></div><div class="r-brow"></div><div class="r-eye"></div><div class="mouth"></div></div></div></div>`;