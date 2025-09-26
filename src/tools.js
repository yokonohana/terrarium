function getRandom(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

function getPoliticalView() {
  const result = getRandom(1, 6);
  switch (result) {
    case 1:
      return 'Монархизм';
    case 2:
      return 'Демократия';
    case 3:
      return 'Коммунизм';
    case 4:
      return 'Анархизм';
    case 5:
      return 'Национализм';
    default:
      return 'Центризм';
  }
};

function getReligionView() {
  const result = getRandom(1, 10);
  switch (result) {
    case 8:
      return 'Христианство или иная существующая религия';
    case 9:
      return 'Лесому';
    case 10:
      return 'Чертовство';
    default:
      return 'Древовство';
  }
};

function getCountry() {
  function getDefault() {
    switch (getRandom(1, 6)) {
      case 1:
        return 'Княжество Вальба';
      case 2:
        return 'Княжество Вальба';
      case 3:
        return 'Республика Уфа';
      case 4:
        return 'Республика Уфа';
      default:
        return 'Конфедерация Свободных Городов';
    }
  };
  
  const result = getRandom(1, 10);
  switch (result) {
    case 1:
      return 'Новая Российская Империя';
    case 2:
      return 'Новая Российская Империя';
    case 3:
      return 'Союз Коммунистических Группировок';
    case 4:
      return 'Союз Коммунистических Группировок';
    case 5:
      return 'Нация Чистых';
    case 6:
      return 'Нация Чистых';
    case 7:
      return 'Французская Колония';
    case 8:
      return 'Византия';
    case 9:
      return 'Независимые Земли';
    default:
      return getDefault();
  }
};

function getAge() {
  return getRandom(15, 59);
};

function getSex() {
  const result = getRandom(1, 2);
  switch (result) {
    case 1:
      return 'Женщина';
    default:
      return 'Мужчина';
  }
};

function getImpactForce(str) {
  if (str <= 2) return '1d3 - 2';
  if (str === 3 || str === 4) return '1d3 - 1';
  if (str >= 5 && str <= 7) return '1d3';
  if (str === 8 || str === 9) return '1d3 + 1';
  if (str === 10) return '1d3 + 2';
  if (str >= 11) return '1d3 + 3';
};

function getQuantityAttacks(act) {
  if (act <= 2) return '1';
  if (act === 3 || act === 4) return '2';
  if (act >= 5 && act <= 7) return '3';
  if (act === 8 || act === 9) return '4';
  if (act === 10) return '5';
  if (act >= 11) return '6';
}

export { getRandom, getPoliticalView, getReligionView, getCountry, getSex, getAge, getImpactForce, getQuantityAttacks };
