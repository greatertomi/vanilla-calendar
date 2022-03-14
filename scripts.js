var year = new Date().getFullYear();
var day = new Date().getDay();
var month = new Date().getMonth();
var date = new Date().getDate();

var months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

var checkLeapYear = (setYear) => {
  if (setYear % 400 == 0) {
    return true;
  } else if (setYear % 100 == 0) {
    return false;
  } else if (setYear % 4 == 0) {
    return true;
  } else {
    return false;
  }
};

var monthdays = (year) => {
  return {
    Jan: 31,
    Feb: checkLeapYear(year) ? 29 : 28,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 31,
    Sept: 30,
    Oct: 31,
    Nov: 30,
    Dec: 31
  };
};

const setTopDate = (setMonth, setYear) => {
  document.querySelector('[data-selected="full-date"]').innerHTML =
    months[setMonth] + ' ' + setYear;
};

setTopDate(month, year);

var monthdate;

const setFirstDay = (setYear, setMonth) => {
  var monthdate = new Date(setYear, setMonth, 1).getDay();
  setFirstColspan(monthdate);
};

const setFirstColspan = (monthdate) => {
  var ele = document.getElementsByTagName('table')[0].rows[2];
  ele.innerHTML = '';
  if (monthdate > 0) {
    var data = document.createElement('td');
    ele.appendChild(data);
    ele.cells[0].setAttribute('colspan', '' + monthdate);
    ele.cells[0].classList.add('emptyDay');
  }
  setCalendarData(monthdate);
  setLastColspan();
};

const setLastColspan = () => {
  var ele_len = document.getElementsByTagName('table')[0].rows;
  var ele = document.getElementsByTagName('table')[0].rows[ele_len.length - 1];
  if (7 - ele.cells.length > 0) {
    var data = document.createElement('td');
    ele.appendChild(data);
    ele.cells[ele.cells.length - 1].setAttribute(
      'colspan',
      '' + (7 - ele.cells.length + 1)
    );
    ele.cells[ele.cells.length - 1].classList.add('emptyDay');
  }
};

var row;

const setCalendarData = (monthdate) => {
  var count = 1;
  for (var i = monthdate; i <= 6; i++) {
    var data = document.createElement('td');
    var text = document.createTextNode(count);
    const day = new Date(year, month, count).getDay();
    if (day === 0 || day === 6) {
      data.classList.add('redTd');
    }
    data.appendChild(text);
    count++;
    document.getElementsByTagName('table')[0].rows[2].appendChild(data);
  }
  var tempMonthDays = monthdays(year)[months[month]];
  for (var i = count; i <= tempMonthDays; i += 7) {
    row = document.createElement('tr');
    for (var j = 0; j < 7 && count <= tempMonthDays; j++) {
      var data = document.createElement('td');
      var text = document.createTextNode(count);
      const day = new Date(year, month, count).getDay();
      if (day === 0 || day === 6) {
        data.classList.add('redTd');
      }
      data.appendChild(text);
      count++;
      row.append(data);
    }
    document.getElementsByTagName('table')[0].appendChild(row);
  }
};

setFirstDay(year, month);

const changeMonth = (operation) => {
  var ele = document.getElementsByTagName('table')[0];
  var len = Object.keys(ele.rows).length;
  len--;
  while (len > 2) {
    ele.removeChild(document.getElementsByTagName('table')[0].rows[len]);
    len--;
  }
  if (operation == 'next') {
    if (month + 1 > 11) {
      year = year + 1;
      month = 0;
    } else {
      month = month + 1;
    }
  }
  if (operation == 'prev') {
    if (month - 1 < 0) {
      year = year - 1;
      month = 11;
    } else {
      month = month - 1;
    }
  }

  setTopDate(month, year);
  setFirstDay(year, month);
  count = 1;
  row = 'undefined';
};
