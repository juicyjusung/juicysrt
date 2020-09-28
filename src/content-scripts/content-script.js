import '../assets/css/style.css';

if (document.querySelector('#result-form > fieldset > div.tbl_wrap.th_thead > table')) {
  render();
} else {
  initSessionStorage();
}

function render() {
  const els = document.querySelectorAll(
    '#result-form > fieldset > div.tbl_wrap.th_thead > table > tbody > tr > td:nth-child(6),td:nth-child(7)'
  );

  els.forEach((el, i) => {
    const juicyDiv = document.createElement('div');
    juicyDiv.innerHTML = `
  <label class="container">매크로선택
    <input type="checkbox" class='check' id="chk${i}">
    <span class="checkmark"></span>
  </label>
  `;
    el.appendChild(juicyDiv);
  });

  /*
   *   컨트롤러
   * */
  const controller = document.createElement('div');
  controller.className = 'controller';
  controller.clickTest = () => {
    alert('click test');
  };
  const controllerHeader = document.createElement('h1');
  controllerHeader.textContent = 'JuicySRT';
  controllerHeader.className = 'controller__header';
  controller.appendChild(controllerHeader);

  const controllerBtns = document.createElement('div');

  /*
   *   매크로 실행버튼
   * */
  const controllerBtnExecute = document.createElement('button');
  controllerBtnExecute.className = 'controller__btn';
  controllerBtnExecute.textContent = '실행';
  controllerBtnExecute.addEventListener('click', () => {
    startMacro();
  });
  controllerBtns.appendChild(controllerBtnExecute);

  /*
   *   매크로 중지버튼
   * */
  const controllerBtnStop = document.createElement('button');
  controllerBtnStop.className = 'controller__btn';
  controllerBtnStop.textContent = '중지';
  controllerBtnStop.addEventListener('click', () => {
    stopMacro();
  });
  controllerBtns.appendChild(controllerBtnStop);
  controller.appendChild(controllerBtns);

  document.querySelector('body').appendChild(controller);
  document
    .querySelector('#result-form > fieldset > div:nth-child(9) > input')
    .addEventListener('click', () => {
      initSessionStorage();
    });
}

const isRunning = JSON.parse(sessionStorage.getItem('isRunning')) || false;
const checkedIds = JSON.parse(sessionStorage.getItem('checkedIds')) || [];
if (isRunning) {
  if (checkedIds.length) {
    const targets = checkedIds.map(id => {
      const target = document.querySelector(`#${id}`);
      target.checked = true;
      return target;
    });
    targets.forEach(target => {
      const reservationBtn =
        target.parentElement.parentElement.parentElement.firstElementChild;
      if (reservationBtn.firstElementChild.textContent === '예약하기') {
        reservationBtn.click();
      }
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
  } else {
    alert('감시할 티켓을 선택해주세요.');
  }
} else {
  //not running
}

function initSessionStorage() {
  sessionStorage.removeItem('isRunning');
  sessionStorage.removeItem('checkedIds');
}

function startMacro() {
  const checkList = [...document.querySelectorAll('.check')];
  const checkedIds = checkList.filter(c => c.checked).map(c => c.id);
  if (checkedIds.length) {
    sessionStorage.setItem('isRunning', JSON.stringify(true));
    sessionStorage.setItem('checkedIds', JSON.stringify(checkedIds));
    location.reload();
  } else {
    alert('감시할 티켓을 선택해주세요.');
  }
}

function stopMacro() {
  initSessionStorage();
}

window.onhashchange = function () {
  console.log('감지');
};
