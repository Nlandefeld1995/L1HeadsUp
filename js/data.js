var ready = 0;
var takentoday = 0;
var takenweek = 0;
var velocity = 0;
var followuptoday = 0;
var followupweek = 0;
var casestoday = 0;
var casesweek = 0;
var monday = 0;
var tuesday = 0;
var wednesday = 0;
var thursday = 0;
var friday = 0;
var notcompliant = 0;
var todaycompliant = 0;
var goodcompliant = 0;
var opencases = 0;
var casetarget = 0;
var compliancetarget = 0;
var overaltarget = 0;
var overalweektarget = 0;
var todaytarget = 0;
var weektarget = 0;
var overalgoaltarget = 0;
var csattarget = 0;
var needsfollowupcount = 0;

function pulldata() {
    ready = 0;
    updatecheck();
    casestakenToday();
    casestakenWeek();
    velocityfun();
    followupToday();
    csat_dates();
    followupWeek();
    casesToday();
    casesWeek();
    casesdaily();
    rank();
    notcompliantfun();
    todaycompliantfun();
    goodcompliantfun();
    followupon();
    opencasesfun();
    pullnext();
    targets();
    targets2();
    csatfun();
    csatallfun();
    csatdsatfun();
    csatperfectfun();
    dsat_chart_fun();
}

function updatecheck() {
    if (ready >= 22) {
        buildcharts();
    } else {
        setTimeout(function() {
            updatecheck();
        }, 2000);
    }
}

function casestakenToday() {
    domo.get(`/data/v1/taken?filter=Today='y'`, { format: 'array-of-objects' }).then(function(data) {
        takentoday = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].total > 0) {
                takentoday = takentoday + data[i].total;
            }
        }
        ready = ready + 1;
    });
}

function casestakenWeek() {
    domo.get(`/data/v1/taken`, { format: 'array-of-objects' }).then(function(data) {
        takenweek = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].total > 0) {
                takenweek = takenweek + data[i].total;
            }
        }
        ready = ready + 1;
    });
}

function velocityfun() {
    domo.get(`/data/v1/velocity`, { format: 'array-of-objects' }).then(function(data) {
        velocity = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].total > 0) {
                velocity = (data[i].total * 100);
            }
        }
        ready = ready + 1;
    });
}

function followupToday() {
    domo.get(`/data/v1/followedupon`, { format: 'array-of-objects' }).then(function(data) {
        followuptoday = 0;
        for (i = 0; i < data.length; i++) {
            followuptoday = followuptoday + data[i].today;
        }
        ready = ready + 1;
    });
}

function followupWeek() {
    domo.get(`/data/v1/followedupon`, { format: 'array-of-objects' }).then(function(data) {
        followupweek = 0;
        for (i = 0; i < data.length; i++) {
            followupweek = followupweek + data[i].total;
        }
        ready = ready + 1;
    });
}

function rank() {
    domo.get(`/data/v1/c_rank`, { format: 'array-of-objects' }).then(function(data) {
        var rank = 0;
        if (data[0].rank > 0) {
            rank = data[0].rank;
            document.getElementById('rankvalue').innerText = rank;
        }
        ready = ready + 1;
    });
}

function casesToday() {
    domo.get(`/data/v1/closures`, { format: 'array-of-objects' }).then(function(data) {
        casestoday = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].today > 0) {
                casestoday = casestoday + data[i].today;
            }
        }
        ready = ready + 1;
    });
}

function casesWeek() {
    domo.get(`/data/v1/closures`, { format: 'array-of-objects' }).then(function(data) {
        casesweek = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].total > 0) {
                casesweek = casesweek + data[i].total;
            }
        }
        ready = ready + 1;
    });
}

function casesdaily() {
    domo.get(`/data/v1/closures`, { format: 'array-of-objects' }).then(function(data) {
        monday = 0;
        tuesday = 0;
        wednesday = 0;
        thursday = 0;
        friday = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].monday > 0) {
                monday = monday + data[i].monday;
            }
            if (data[i].tuesday > 0) {
                tuesday = tuesday + data[i].tuesday;
            }
            if (data[i].wednesday > 0) {
                wednesday = wednesday + data[i].wednesday;
            }
            if (data[i].thursday > 0) {
                thursday = thursday + data[i].thursday;
            }
            if (data[i].friday > 0) {
                friday = friday + data[i].friday;
            }
        }
        var gaugeChart = AmCharts.makeChart("chartdiv", {

            "type": "gauge",
            "theme": "dark",
            "axes": [{
                "axisAlpha": 0,
                "tickAlpha": 0,
                "labelsEnabled": false,
                "startValue": 0,
                "endValue": 50,
                "startAngle": 0,
                "endAngle": 270,
                "bands": [{
                    "color": "#eee",
                    "startValue": 0,
                    "endValue": 50,
                    "radius": "100%",
                    "innerRadius": "85%"
                }, {
                    "color": "#ff4dd2",
                    "startValue": 0,
                    "endValue": monday,
                    "radius": "100%",
                    "innerRadius": "85%",
                    "balloonText": monday
                }, {
                    "color": "#eee",
                    "startValue": 0,
                    "endValue": 50,
                    "radius": "80%",
                    "innerRadius": "65%"
                }, {
                    "color": "#ff80ff",
                    "startValue": 0,
                    "endValue": tuesday,
                    "radius": "80%",
                    "innerRadius": "65%",
                    "balloonText": tuesday
                }, {
                    "color": "#eee",
                    "startValue": 0,
                    "endValue": 50,
                    "radius": "60%",
                    "innerRadius": "45%"
                }, {
                    "color": "#b3ecff",
                    "startValue": 0,
                    "endValue": wednesday,
                    "radius": "60%",
                    "innerRadius": "45%",
                    "balloonText": wednesday
                }, {
                    "color": "#eee",
                    "startValue": 0,
                    "endValue": 50,
                    "radius": "40%",
                    "innerRadius": "25%"
                }, {
                    "color": "#99ffcc",
                    "startValue": 0,
                    "endValue": thursday,
                    "radius": "40%",
                    "innerRadius": "25%",
                    "balloonText": thursday
                }, {
                    "color": "#eee",
                    "startValue": 0,
                    "endValue": 50,
                    "radius": "20%",
                    "innerRadius": "5%"
                }, {
                    "color": "#ffff80",
                    "startValue": 0,
                    "endValue": friday,
                    "radius": "20%",
                    "innerRadius": "5%",
                    "balloonText": friday
                }]
            }],
            "allLabels": [{
                "text": "Monday",
                "x": "49%",
                "y": "5%",
                "size": 15,
                "bold": true,
                "color": "#84b761",
                "align": "right"
            }, {
                "text": "Tuesday",
                "x": "49%",
                "y": "15%",
                "size": 15,
                "bold": true,
                "color": "#fdd400",
                "align": "right"
            }, {
                "text": "Wednesday",
                "x": "49%",
                "y": "24%",
                "size": 15,
                "bold": true,
                "color": "#cc4748",
                "align": "right"
            }, {
                "text": "Thursday",
                "x": "49%",
                "y": "33%",
                "size": 15,
                "bold": true,
                "color": "#67b7dc",
                "align": "right"
            }, {
                "text": "Friday",
                "x": "49%",
                "y": "42%",
                "size": 15,
                "bold": true,
                "color": "#cc00cc",
                "align": "right"
            }],
            "export": {
                "enabled": true
            }
        });
        ready = ready + 1;
    });
}

function notcompliantfun() {
    domo.get(`/data/v1/compliance?filter=case_contact_compliance='Non-compliant'`, { format: 'array-of-objects' }).then(function(data) {
        var html = '';
        notcompliant = 0;
        var j = 1;
        var count = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].case > 0) {
                count = count + 1;
                html += `<div class="tabledivs tablediv${j}" onclick="navigate('${data[i].id}');"><a>Priority: ${count}  ||    </a><a>${data[i].case}</a></div>`
                if (j == 5) {
                    j = 1;
                } else {
                    j++
                }
                notcompliant = notcompliant + 1;
            }
        }
        document.getElementById('noncomplianttbody').innerHTML = html;
        document.getElementById('notcompliantval').innerText = notcompliant;
        ready = ready + 1;
    });
}

function todaycompliantfun() {
    domo.get(`/data/v1/compliance?filter=case_contact_compliance='Contact Today'`, { format: 'array-of-objects' }).then(function(data) {
        var html = '';
        todaycompliant = 0;
        var j = 1;
        var count = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].case > 0) {
                count = count + 1;
                html += `<div class="tabledivs tablediv${j}" onclick="navigate('${data[i].id}');"><a>Priority: ${count}  ||    </a><a>${data[i].case}</a></div>`
                if (j == 5) {
                    j = 1;
                } else {
                    j++
                }
                todaycompliant = todaycompliant + 1;
            }
        }
        document.getElementById('contacttodayval').innerText = todaycompliant;
        document.getElementById('todaycomplianttbody').innerHTML = html;
        ready = ready + 1;
    });
}

function goodcompliantfun() {
    domo.get(`/data/v1/compliance?filter=case_contact_compliance='Compliant'`, { format: 'array-of-objects' }).then(function(data) {
        var html = '';
        goodcompliant = 0;
        var j = 1;
        var count = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].case > 0) {
                count = count + 1;
                html += `<div class="tabledivs tablediv${j}" onclick="navigate('${data[i].id}');"><a>Priority: ${count}  ||    </a><a>${data[i].case}</a></div>`
                if (j == 5) {
                    j = 1;
                } else {
                    j++
                }
                goodcompliant = goodcompliant + 1;
            }
        }
        document.getElementById('complianttbody').innerHTML = html;
        document.getElementById('compliantval').innerText = goodcompliant;
        ready = ready + 1;
    });
}

function followupon() {
    domo.get(`/data/v1/followup?filter=Needsfollowup = 'y'`, { format: 'array-of-objects' }).then(function(data) {
        var html = '';
        var j = 1;
        var count = 0;
        needsfollowupcount = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].case > 0) {
                count = count + 1;
                needsfollowupcount = needsfollowupcount + 1;
                html += `<div class="tabledivs tablediv${j}" onclick="navigate('${data[i].id}');"><a>Priority: ${count}  ||    </a><a>${data[i].case}</a></div>`
                if (j == 5) {
                    j = 1;
                } else {
                    j++
                }
            }
        }
        document.getElementById('followuponcirclespan').innerText = needsfollowupcount;
        document.getElementById('followuponbody').innerHTML = html;
        ready = ready + 1;
    });
}

function opencasesfun() {
    domo.get(`/data/v1/open_cases`, { format: 'array-of-objects' }).then(function(data) {
        opencases = 0;
        var html = '';
        var j = 1;
        var count = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].case > 0) {
                count = count + 1;
                opencases = opencases + 1;
                html += `<div class="tabledivs tablediv${j}" onclick="navigate('${data[i].id}');"><a>Priority: ${count}  ||    </a><a>${data[i].case}</a></div>`
                if (j == 5) {
                    j = 1;
                } else {
                    j++
                }
            }
        }
        document.getElementById('opencasesbody').innerHTML = html;
        document.getElementById('opencasescirclespan').innerText = opencases;
        ready = ready + 1;
    });
}

function pullnext() {
    domo.get(`/data/v1/pull_next`, { format: 'array-of-objects' }).then(function(data) {
        var html = '';
        var j = 1;
        var count = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].case > 0) {
                count = count + 1;
                html += `<div class="tabledivs tablediv${j}" onclick="navigate('${data[i].id}');"><a>Priority: ${count}  ||    </a><a>${data[i].case}</a></div>`
                if (j == 5) {
                    j = 1;
                } else {
                    j++
                }
            }
        }
        document.getElementById('pullnextbody').innerHTML = html;
        ready = ready + 1;
    });
}

function targets() {
    domo.get(`/data/v1/targets`, { format: 'array-of-objects' }).then(function(data) {
        casetarget = 0;
        compliancetarget = 0;
        overaltarget = 0;
        csattarget = 0;
        if (data[0].case > 0) {
            casetarget = data[0].case;
        }
        if (data[0].compliance > 0) {
            compliancetarget = data[0].compliance;
        }
        if (data[0].target > 0) {
            overaltarget = data[0].target;
        }
        if (data[0].csat > 0) {
            csattarget = data[0].csat;
        }
        ready = ready + 1;
    });
}

function targets2() {
    domo.get(`/data/v1/targets2`, { format: 'array-of-objects' }).then(function(data) {
        overalweektarget = 0;
        todaytarget = 0;
        weektarget = 0;
        overalgoaltarget = 0;
        if (data[0].overalweek > 0) {
            overalweektarget = data[0].overalweek;
        }
        if (data[0].today > 0) {
            todaytarget = data[0].today;
        }
        if (data[0].week > 0) {
            weektarget = data[0].week;
        }
        if (data[0].overalgoal > 0) {
            overalgoaltarget = data[0].overalgoal;
        }
        ready = ready + 1;
    });
}

function csatfun() {
    domo.get(`/data/v1/csat`, { format: 'array-of-objects' }).then(function(data) {
        document.getElementById('perfectcsat').innerText = data[0].perfect;
        document.getElementById('totalcsat').innerText = data[0].total;
        document.getElementById('dcsat').innerText = data[0].dsat;
        document.getElementById('scorecsat').innerText = Math.round(data[0].score * 100) / 100;
        ready = ready + 1;
    });
}
var csatperfectarray = [];

function csatperfectfun() {
    domo.get(`/data/v1/csatmeta?filter='PerfectFlag'='1'`, { format: 'array-of-objects' }).then(function(data) {
        csatperfectarray = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].case > 0) {
                var e = {
                    "case": data[i].case,
                    "id": data[i].id,
                    "easier": data[i].easier,
                    "satisfy": data[i].satisfy,
                    "recommendations": data[i].recommendations,
                    "easy": data[i].easy,
                    "satisfaction": data[i].satisfaction,
                    "expectations": data[i].expectations
                }
                csatperfectarray.push(e)
            }
        }
        var html = csatparse(csatperfectarray);
        document.getElementById('perfectcsatdiv').innerHTML = html;
        ready = ready + 1;
    });
}

function csatparse(e) {
    var html = '';
    var w = 100 / e;
    for (i = 0; i < e.length; i++) {
        html += `<div class="container2" onclick="navigate('${e[i].id}');"><h2>${e[i].case}</h2>`;
        html += `<p>Made it easy: ${e[i].easy}</p>`;
        html += `<p>Resolved to Satisfaction: ${e[i].satisfaction}</p>`;
        html += `<p>Exceeded Expectations: ${e[i].expectations}</p>`;
        if (e[i].easier.length > 2) {
            if (e[i].satisfy.length > 2) {
                if (e[i].recommendations.length > 2) {
                    html += `<p>Ways to Make Easier: ${e[i].easier}</p><p>Ways to Satisfy: ${e[i].satisfy}</p><p>Recommendations: ${e[i].recommendations}</p>`
                } else {
                    html += `<p>Ways to Make Easier: ${e[i].easier}</p><p>Ways to Satisfy: ${e[i].satisfy}</p>`
                }
            } else {
                if (e[i].recommendations.length > 2) {
                    html += `<p>Ways to Make Easier: ${e[i].easier}</p><p>Recommendations: ${e[i].recommendations}</p>`
                } else {
                    html += `<p>Ways to Make Easier: ${e[i].easier}</p>`
                }
            }
        } else {
            if (e[i].satisfy.length > 2) {
                if (e[i].recommendations.length > 2) {
                    html += `<p>Ways to Satisfy: ${e[i].satisfy}</p><p>Recommendations: ${e[i].recommendations}</p>`
                } else {
                    html += `<p>Ways to Satisfy: ${e[i].satisfy}</p>`
                }
            } else {
                if (e[i].recommendations.length > 2) {
                    html += `<p>Recommendations: ${e[i].recommendations}</p>`
                } else {
                    html += ``
                }
            }
        }
        html += `</div>`;

    }
    return html;
}
var csatallarray = [];

function csatallfun() {
    domo.get(`/data/v1/csatmeta`, { format: 'array-of-objects' }).then(function(data) {
        csatallarray = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].case > 0) {
                var e = {
                    "case": data[i].case,
                    "id": data[i].id,
                    "easier": data[i].easier,
                    "satisfy": data[i].satisfy,
                    "recommendations": data[i].recommendations
                }
                csatallarray.push(e)
            }
        }
        var html = csatparse(csatallarray);
        document.getElementById('totaldsatdiv').innerHTML = html;
        ready = ready + 1;
    });
}
var dsatarray = [];

function csatdsatfun() {
    domo.get(`/data/v1/csatmeta?filter='Dsatflag'='1'`, { format: 'array-of-objects' }).then(function(data) {
        csatdsatfun = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].case > 0) {
                var e = {
                    "case": data[i].case,
                    "id": data[i].id,
                    "easier": data[i].easier,
                    "satisfy": data[i].satisfy,
                    "recommendations": data[i].recommendations
                }
                dsatarray.push(e)
            }
        }
        var html = csatparse(dsatarray);
        document.getElementById('totaldsatdiv').innerHTML = html;
        ready = ready + 1;
    });
}

function dsat_chart_fun() {
    var html = '';
    domo.get(`/data/v1/dsat_meta`, { format: 'array-of-objects' }).then(function(data) {
        html += `<h1>DISAT Reasons</h1><ul class="skill-list">`;
        for (i = 0; i < data.length; i++) {
            html += `<li class="skill"><h3>${data[i].total}  ${data[i].reason}</h3><progress class="skill-${i}" max="6" value="${data[i].total}"></progress></li>`
        }
        html += `</ul>`
        document.getElementById('dsat_cat_div').innerHTML = html;
        ready = ready + 1;
    });
}

function csat_dates() {
    domo.get(`/data/v1/csat_dates`, { format: 'array-of-objects' }).then(function(data) {
        for (i = 0; i < data.length; i++) {

            if (data[i].bucket == 'Perfect') {

                document.getElementById('perfect_csat_date').innerText = `Last Perfect CSAT: ${data[i].date}`;

            }
            if (data[i].bucket == 'Disat') {

                document.getElementById('disat_date').innerText = `Last DISAT: ${data[i].date}`;
            }
            if (data[i].bucket == 'Other') {

                document.getElementById('csat_date').innerText = `Last CSAT: ${data[i].date}`;
            }
        }
        ready = ready + 1;
    });
}