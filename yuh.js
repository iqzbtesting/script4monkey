const buttonStyle = {
  position: 'fixed',
  top: '10px',
  borderRadius: '10px',
  left: '10px',
  width: '200px',
  height: '30px',
  fontSize: '16px',
  color: 'var(--accentcolor)',
  backgroundColor: 'var(--backgroundcolor)',
  border: '1px solid #000',
  cursor: 'pointer',
  zIndex: '999999'
};

const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: '#333',
  color: '#fff',
  border: '1px solid #999'
};

const button = document.createElement('button');
button.id = 'toggle-btn';
button.innerHTML = 'OwO - OFF (Ctrl+Click)';
Object.assign(button.style, buttonStyle);

const uiContainer = document.createElement('div');
uiContainer.id = 'ui-container';
uiContainer.style.position = 'fixed';
uiContainer.style.top = '50px';
uiContainer.style.left = '-200px';
uiContainer.style.width = '200px';
uiContainer.style.height = '250px';
uiContainer.style.backgroundColor = 'var(--backgroundcolor)';
uiContainer.style.color = '#fff';
uiContainer.style.borderRadius = '20px';
uiContainer.style.border = '1px solid #000';
uiContainer.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
uiContainer.style.transition = 'left 0.3s ease-out';
uiContainer.style.zIndex = '999999';

const title = document.createElement('h2');
title.innerHTML = '-- SETTINGS --';
title.style.fontSize = '24px';
title.style.marginTop = '10px';
title.style.color = '#fff';
title.style.marginLeft = '22.5px';

uiContainer.appendChild(title);

const settings = [
  { name: 'Exotic', value: 0, id: 'Exot' },
  { name: 'Divines', value: 0, id: 'Divn' },
  { name: 'Stacked', value: 0, id: 'SPre' },
  { name: 'Prefix', value: 0, id: 'Pref' },
  { name: 'Unboxed', value: 2, id: 'Unbx' }
];

function createSettingElement(setting) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.justifyContent = 'space-around';
  container.style.alignItems = 'center';
  container.style.margin = '10px';

  const label = document.createElement('span');
  label.innerHTML = setting.name;
  label.style.marginRight = '20px';
  label.style.width = '80px';
  label.style.color = 'var(--accentcolor)';

  const upBtn = document.createElement('button');
  upBtn.innerHTML = '+';
  const downBtn = document.createElement('button');
  downBtn.innerHTML = '-';
  const value = document.createElement('span');
  value.innerHTML = setting.value;
  value.id = setting.id;
  value.style.color = '#fff';
  value.style.padding = '0 3px';

  [upBtn, downBtn].forEach(btn => {
    btn.style.width = '25px';
    btn.style.height = '25px';
    btn.style.borderRadius = '50%';
    btn.style.backgroundColor = 'rgb(44, 44, 44)';
    btn.style.color = '#fff';
    btn.style.border = '1px solid #000';
    btn.style.cursor = 'pointer';
    btn.style.outline = 'none';
  });

  upBtn.addEventListener('click', () => {
    if (setting.value < 30) {
      setting.value++;
      value.innerHTML = setting.value;
    }
  });

  downBtn.addEventListener('click', () => {
    if (setting.value > 0) {
      setting.value--;
      value.innerHTML = setting.value;
    }
  });

  container.appendChild(label);
  container.appendChild(downBtn);
  container.appendChild(value);
  container.appendChild(upBtn);
  return container;
}

const settingsContainer = document.createElement('div');
settingsContainer.style.margin = '10px';

settings.forEach(setting => {
  const settingElement = createSettingElement(setting);
  settingsContainer.appendChild(settingElement);
});

uiContainer.appendChild(settingsContainer);
document.body.appendChild(button);
document.body.appendChild(uiContainer);

let toggled = false;
let autoD;
let began = false;
let delay = 4000;
let brokelol = false;

const opts = {
  boxA: 'document.querySelector("#chancesoverlay > div.centerme.boxmodbuyercontainer > div.purchaseboxmodscontent > div:nth-child(5) > div.pbmmibar > div:nth-child(4)")',
  prefixC: 'document.querySelector("#chancesoverlay > div.centerme.boxmodbuyercontainer > div.purchaseboxmodscontent > div:nth-child(4) > div.pbmmibar > div:nth-child(4)")',
  SprefixC: 'document.querySelector("#chancesoverlay > div.centerme.boxmodbuyercontainer > div.purchaseboxmodscontent > div:nth-child(3) > div.pbmmibar > div:nth-child(4)")',
  divineC: 'document.querySelector("#chancesoverlay > div.centerme.boxmodbuyercontainer > div.purchaseboxmodscontent > div:nth-child(2) > div.pbmmibar > div:nth-child(4)")',
  exoticC: 'document.querySelector("#chancesoverlay > div.centerme.boxmodbuyercontainer > div.purchaseboxmodscontent > div:nth-child(1) > div.pbmmibar > div:nth-child(4)")'
};

function clickElement(args) {
  args.forEach((arg) => {
    const { target, times } = arg;
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        try {
          eval(opts[target]).click();
        } catch (e) {
          console.warn("Click failed: " + e);
        }
      }, 50);
    }
  });
}

function anything() {
  let EXV = parseInt(document.getElementById('Exot').innerText);
  let DVV = parseInt(document.getElementById('Divn').innerText);
  let SPV = parseInt(document.getElementById('SPre').innerText);
  let PFV = parseInt(document.getElementById('Pref').innerText);
  let UBV = parseInt(document.getElementById('Unbx').innerText);

  let args = [
    { target: 'boxA', times: UBV },
    { target: 'prefixC', times: PFV },
    { target: 'SprefixC', times: SPV },
    { target: 'prefixC', times: PFV },
    { target: 'exoticC', times: EXV },
    { target: 'divineC', times: DVV }
  ];

  if (UBV + PFV + SPV + EXV + DVV === 0) return;

  const buyBtn = document.getElementsByClassName('purchasemodbutton graybutton')[0];
  if (!buyBtn) return;
  buyBtn.click();

  clickElement(args);

  setTimeout(() => {
    const confirmBtn = document.getElementsByClassName('purchaseboxmodsconfirm orangebutton')[0];
    if (confirmBtn) {
      confirmBtn.click();
    } else {
      document.querySelector("#chancesoverlay > div.centerme.boxmodbuyercontainer > div.purchaseboxmodstitle").innerHTML = `Not enough credits to buy.`;
      if (brokelol) return;
      document.querySelector("#chancesoverlay > div.centerme.boxmodbuyercontainer > div.purchaseboxmodscontent").remove();
      brokelol = true;
    }
  }, 250);
}

button.addEventListener('click', (e) => {
  if (e.ctrlKey) {
    if (!began) {
      const btn = document.getElementsByClassName('fuchsiabutton')[0];
      if (btn && (btn.innerText === "AFK This Box" || btn.innerText === "Save AFK Options")) {
        btn.click();
        began = true;
      } else {
        document.getElementById('toggle-btn').innerText = 'OwO - OFF (Ctrl+Click)';
        toggled = false;
        return;
      }
    }

    if (toggled) {
      clearInterval(autoD);
      toggled = false;
      document.getElementById('toggle-btn').innerText = 'OwO - OFF (Ctrl+Click)';
      began = false;
    } else {
      autoD = setInterval(anything, delay);
      toggled = true;
      document.getElementById('toggle-btn').innerText = 'OwO - ON (Ctrl+Click)';
    }
  } else {
    uiContainer.style.left = uiContainer.style.left === '-200px' ? '10px' : '-200px';
  }
});

button.addEventListener("mouseenter", () => Object.assign(button.style, buttonHoverStyle));
button.addEventListener("mouseleave", () => Object.assign(button.style, buttonStyle));
