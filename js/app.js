window.changes = [];

function filterChanges(searchValue) {
  var result = [];
  for(var change of changes) {
    var changeTxt = change.txt.toLowerCase();
    var changeCc = change.cc.toLowerCase();
    if(changeTxt.indexOf(searchValue) >= 0 || changeCc.indexOf(searchValue) >= 0) {
      result.push(change);
    }
  }
  renderChanges(result);
}

function renderChanges(changes) {
  var htmlString = '';

  if (!changes.length) {
    htmlString = `<tr><td colspan="4" class="text-center">No Items Found</td></tr>`;
    document.getElementById('changes').innerHTML = htmlString;
    return;
  }

  for (var change of changes) {

    htmlString += `<tr>
      <td>${change.txt}</td>
      <td>${change.cc}</td>
      <td>${change.rate}</td>
    </tr>`
  }

document.getElementById('changes').innerHTML = htmlString;

  var trs = document.getElementsByTagName('tr');
  for(var item = 0; item < trs.length; item++) {
    var tr = trs[item];
    tr.onmouseenter = function(e) {
      e.currentTarget.classList.add('bg-warning');
    }

    tr.onmouseleave = function(e) {
      e.currentTarget.classList.remove('bg-warning');
    }
  }
}


fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20221110&json').then(res => res.json()).then(function(data) {
  window.changes = data;
  renderChanges(data);
});

var search = document.getElementById('search')

search.onkeyup = function(e) {
  var searchValue = e.currentTarget.value;
  filterChanges(searchValue.trim().toLowerCase());
}