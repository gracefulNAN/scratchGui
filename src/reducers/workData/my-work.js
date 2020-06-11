import workState from './data.js'

const MY_WORKSTATE = "myWorkState";
const MY_INITIALLOGUE = "initialLogue";

const initialState = {
  [MY_WORKSTATE]: null,
  [MY_INITIALLOGUE]: [
    {
      "first_title":"已发布",
      "id": "0001",
      "logue":[
        {
          "two_title": "2020.6.11",
          "id":"0001",
          "par-id": "00010001",
        },
        {
          "two_title": "day01",
          "id":"0002",
          "par-id": "00010002",
        },
        {
          "two_title": "day03",
          "id":"0003",
          "par-id": "00010003",
        },
        {
          "two_title": "day04",
          "id":"0004",
          "par-id": "00010004",
        },
        {
          "two_title": "day05",
          "id":"0005",
          "par-id": "00010005",
        },
        {
          "two_title": "day07",
          "id":"0007",
          "par-id": "00010007",
        },
        {
          "two_title": "day08",
          "id":"0008",
          "par-id": "00010008",
        },
        {
          "two_title": "day09",
          "id":"0009",
          "par-id": "00010009",
        },
        {
          "two_title": "day010",
          "id":"00010",
          "par-id": "000100010",
        },
        {
          "two_title": "day011",
          "id":"00011",
          "par-id": "000100011",
        },
        {
          "two_title": "day012",
          "id":"00012",
          "par-id": "000100012",
        },
        {
          "two_title": "day014",
          "id":"00014",
          "par-id": "000100014",
        },
        {
          "two_title": "day015",
          "id":"00015",
          "par-id": "000100015",
        },
        {
          "two_title": "day016",
          "id":"00016",
          "par-id": "000100016",
        },
        {
          "two_title": "day017",
          "id":"00017",
          "par-id": "000100017",
        },
      ],
    }, 
    {
      "first_title":"已保存",
      "id": "0002",
      "logue":[
        {
          "two_title": "全部",
          "id":"0001",
          "par-id": "00020001",
        },
        {
          "two_title": "one01",
          "id":"0002",
          "par-id": "00020002",
        },
      ],
    }, 
  ],
};

// reducer
const reducer = function ( state, action ) {
  if ( typeof state === "undefined" ) state = initialState;
  switch (action.type) {
    case MY_WORKSTATE:
      return Object.assign({}, state, {
          [MY_WORKSTATE]: action.value
      });
    case MY_INITIALLOGUE:
      return Object.assign({}, state, {
          [MY_INITIALLOGUE]: action.value
      });
    default:
      return state;
  }
};

// action myWorkstate
const requestWorkAct = function () {
  return {
      type: MY_WORKSTATE,
      value: workState,
  };
};

const setWorkLogueAct = function (status) {
  return {
      type: MY_INITIALLOGUE,
      value: status,
  };
};



export {
  reducer as default,
  initialState as workInitialState,
  requestWorkAct,
  setWorkLogueAct,

};
