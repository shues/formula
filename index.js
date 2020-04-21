'use strict'

const e = React.createElement;

// авторизация пользователя
class InputButtons extends React.Component {
  constructor(props){
    super(props);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(){
    this.props.changeUser();
  }

  render() {
    return (
      e('div', {
          className: 'inputButton'
        },
        e('button', {onClick: this.changeUser}, 'Вход'),
        e('button', {}, 'Регистрация')
      )
    );
  }
}

class Autorization extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login: '',
      password: '',
    }
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeLogin(e){
    this.setState({login: e.target.value});
  }

  changePassword(e){
    this.setState({password: e.target.value});
  }

  changeUser(){
    this.props.changeUser(this.state.login);
  }

  render() {
    return (
      e('div', {
          className: 'autorization'
        },
        e('h4', null, 'Введите имя пользователя и пароль!'),
        e('input', {
          type: 'text',
          placeholder: 'login',
          value: this.state.login,
          onChange: this.changeLogin,
        }),
        e('input', {
          type: 'password',
          placeholder: 'password',
          value: this.state.password,
          onChange: this.changePassword,
        }),
        e(InputButtons, {changeUser: this.changeUser})
      )
    );
  }
}

// личный кабинет пользователя

class DoOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: '',
    };
    this.doOperation = this.doOperation.bind(this);
    this.setSum = this.setSum.bind(this);
  }

  doOperation() {
    //    console.log(this);
    const sum = this.state.sum;
    const type = this.props.type;
    this.props.addOperation(sum, type);
    this.setState({
      sum: ''
    });
  }

  setSum(e) {
    console.log(e.target.value);
    this.setState({
      sum: e.target.value
    });
  }

  render() {
    return (
      e('div', null,
        e('input', {
          type: 'number',
          value: this.state.sum,
          onChange: this.setSum,
        }),
        e('button', {
          onClick: this.doOperation
        }, this.props.caption)
      )
    );
  }
}

class AddAmount extends React.Component {
  render() {
    return (
      e('div', null,
        e('h3', null, 'Внести средства на счет'),
        e(DoOperation, {
          caption: 'Внести',
          addOperation: this.props.addOperation,
          type: 1,
        }))
    );
  }
}

class OutAmount extends React.Component {
  render() {
    return (
      e('div', null,
        e('h3', null, 'Вывести средства со счета'),
        e(DoOperation, {
          caption: 'Вывести',
          addOperation: this.props.addOperation,
          type: 0,
        })
      )
    );
  }
}

class LkControlPanel extends React.Component {
  render() {
    return (
      e('div', {
          className: 'lkControlPanel'
        },
        e(AddAmount, {
          addOperation: this.props.addOperation
        }),
        e(OutAmount, {
          addOperation: this.props.addOperation
        }))
    )
  }
}

class LkBallans extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      e('h3', {
        className: 'lkBallans'
      }, 'Балланс пользователя: ' + this.props.ballans.toLocaleString('ru-RU', {
        minimumFractionDigits: 2
      }))
    );
  }
}

class LkOperationsReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this);
    const operMass = this.props.data.map(
      function (el, i) {
        return (
          e('div', {
              className: 'reportString',
              key: i,
            },
            e('div', {
              className: 'reportStringDate'
            }, el.date),
            e('div', {
              className: 'reportStringReason'
            }, el.reason),
            e('div', {
                className: 'reportStringSum'
              },
              ((el.type) ? '+ ' : '- ') + el.sum.toLocaleString('ru-RU', {
                minimumFractionDigits: 2
              })))
        );
      }
    );

    return (
      e('div', {
          className: 'reportTable'
        },
        e('div', {
          className: 'reportTableHeader'
        }, 'Операции пользователя'),
        operMass)
    );
  }
}

class LkHeader extends React.Component {
  constructor(props) {
    super(props);
    this.exit = this.exit.bind(this);
  }

  exit(){
    this.props.changeUser('');
  }

  render() {
    return (
      e('div', {
          className: 'lkHeader'
        },
        e('span', null, this.props.name),
        e('button', {onClick: this.exit}, 'Выход')
      )
    );
  }
}

class LkContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      e('div', {
          className: 'lkContent'
        },
        e(LkOperationsReport, {
          data: this.props.operations,
          //          addOperation: this.props.addOperation,
        }),
        e(LkControlPanel, {
          addOperation: this.props.addOperation
        })
      )
    );
  }
}

class Lk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ballans: 100,
      operations: [
        {
          date: '25.12.2019 13:09:15',
          type: 1,
          reason: 'Пополнение',
          sum: 20
        },
        {
          date: '25.12.2019 13:09:15',
          type: 0,
          reason: 'Вывод средств',
          sum: 10
        },
        {
          date: '25.12.2019 13:09:15',
          type: 1,
          reason: 'Начисление',
          sum: 50
        },
        {
          date: '25.12.2019 13:09:15',
          type: 1,
          reason: 'Начисление',
          sum: 40
        }
      ],
    };
    this.addOperation = this.addOperation.bind(this);
    this.addZero = this.addZero.bind(this);
  }

  addZero(par) {
    if (parseInt(par) < 10) {
      return '0' + par;
    }
    return par;
  }

  addOperation(sum, type) {
    const now = new Date();
    let nowStr = this.addZero(now.getDate()) + '.';
    nowStr += this.addZero(now.getMonth() + 1) + '.';
    nowStr += now.getFullYear() + ' ';
    nowStr += this.addZero(now.getHours()) + ':';
    nowStr += this.addZero(now.getMinutes()) + ':';
    nowStr += this.addZero(now.getSeconds());

    const newOper = {
      date: nowStr,
      type: type,
      reason: type ? 'Пополнение' : 'Вывод средств',
      sum: parseInt(sum),
    };
    let newOperations = this.state.operations.slice();
    newOperations.push(newOper);
    console.log(newOperations);
    this.setState({
      operations: newOperations,
    });
  }



  render() {
    const ballans = this.state.operations.reduce(function (prev, el) {
      return (el.type === 1) ? (prev + el.sum) : (prev - el.sum);
    }, 0);
    return (
      e('div', {
          className: 'lk'
        },
        e(LkHeader, {
          name: this.props.user,
          changeUser: this.props.changeUser,
        }),
        e(LkBallans, {
          ballans: ballans
        }),
        e(LkContent, {
          operations: this.state.operations,
          addOperation: this.addOperation,
        })
      )
    );
  }
}
// админка

class AdminkaOperationsReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //    console.log(this);
    const operMass = this.props.data.map(
      function (el, i) {
        return (
          e('div', {
              className: 'reportString',
              key: i,
            },
            e('div', {
              className: 'reportStringDate'
            }, el.date),
            e('div', {
              className: 'reportStringReason'
            }, el.reason),
            e('div', {
                className: 'reportStringSum'
              },
              ((el.type) ? '+ ' : '- ') + el.sum.toLocaleString('ru-RU', {
                minimumFractionDigits: 2
              })))
        );
      }
    );

    return (
      e('div', {
          className: 'adminkaReportTable'
        },
        e('div', {
          className: 'reportTableHeader'
        }, 'Операции пользователя ' + this.props.userName),
        operMass)
    );
  }
}

class UserInList extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  setCurrentUser() {
    this.props.setCurrentUser(this.props.user.name);
  }

  render() {
    return (
      e('div', {
          className: "userInList",
          onClick: this.setCurrentUser,
        },
        e('div', {
          className: "userInListName"
        }, this.props.user.name),
        e('div', {
          className: "userInListBallans"
        }, this.props.user.ballans.toLocaleString('ru-RU', {
          minimumFractionDigits: 2
        }))
      )
    );
  }
}

class userList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const th = this;
    const userList = this.props.users.map(function (el, i) {
      return e(UserInList, {
        setCurrentUser: th.props.setCurrentUser,
        key: i,
        user: el
      });
    });
    return (
      e('div', {
          className: "userList"
        },
        e('h4', null, "Список пользователей"),
        e('div', null, userList)
      )
    );
  }
}

class AdminkaContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          name: 'user_1',
          ballans: 100,
        },
        {
          id: 2,
          name: 'user_2',
          ballans: 200,
        },
        {
          id: 3,
          name: 'user_3',
          ballans: 100,
        },
        {
          id: 4,
          name: 'user_4',
          ballans: 500,
        }
      ],
      userOperations: {
        user_1: [
          {
            date: '25.12.2019 13:09:15',
            type: 1,
            reason: 'Пополнение',
            sum: 70
          },
          {
            date: '25.12.2019 13:09:15',
            type: 0,
            reason: 'Вывод средств',
            sum: 10
          },
          {
            date: '25.12.2019 13:09:15',
            type: 1,
            reason: 'Пополнение',
            sum: 50
          },
          {
            date: '25.12.2019 13:09:15',
            type: 1,
            reason: 'Начисление',
            sum: 40
          }
        ],
        user_2: [
          {
            date: '25.12.2019 13:09:15',
            type: 1,
            reason: 'Пополнение',
            sum: 20
          },
          {
            date: '25.12.2019 13:09:15',
            type: 0,
            reason: 'Вывод средств',
            sum: 10
          },
          {
            date: '25.12.2019 13:09:15',
            type: 1,
            reason: 'Начисление',
            sum: 50
          },
          {
            date: '25.12.2019 13:09:15',
            type: 1,
            reason: 'Начисление',
            sum: 40
          }
        ],
        user_3: [],
        user_4: [],
      },
      currentUser: 'user_1',
    }
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  setCurrentUser(user) {
    this.setState({
      currentUser: user
    });
  }

  render() {
    return (
      e('div', {
          className: 'lkContent'
        },
        e(userList, {
          users: this.state.users,
          setCurrentUser: this.setCurrentUser,
        }),
        e(AdminkaOperationsReport, {
          data: this.state.userOperations[this.state.currentUser],
          userName: this.state.currentUser,
        }),
        e('button', {
          className: "startCalculateButton"
        }, 'Произвести начисление')
      )
    );
  }
}

class Adminka extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      e('div', {},
        e(LkHeader, {
          name: 'admin',
          changeUser: this.props.changeUser,
        }),
        e('h3', {
          className: 'adminCaption'
        }, 'Панель администратора'),
        e(AdminkaContent)
      )
    );
  }
}
// Приложение
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    }
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(user) {
    this.setState({
      user: user
    });
  }

  render() {
    if (this.state.user === '') {
      return e('div', {
        className: "app"
      }, e(Autorization, {changeUser: this.changeUser}));
    };
    if (this.state.user === 'admin') {
      return e('div', {
        className: "app"
      }, e(Adminka, {changeUser: this.changeUser}));
    };

    return e('div', {
      className: "app"
    }, e(Lk, {user: this.state.user, changeUser: this.changeUser}));
  }
}

ReactDOM.render(
  e(App),
  document.querySelector('#app')
);
