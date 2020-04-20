'use strict'

const e = React.createElement;

// авторизация пользователя
class InputButtons extends React.Component {
  render() {
    return (
      e('div', {
          className: 'inputButton'
        },
        e('button', {}, 'Вход'),
        e('button', {}, 'Регистрация')
      )
    );
  }
}

class Autorization extends React.Component {
  render() {
    return (
      e('div', {
          className: 'autorization'
        },
        e('h4', null, 'Введите имя пользователя и пароль!'),
        e('input', {
          type: 'text',
          placeholder: 'login'
        }),
        e('input', {
          type: 'password',
          placeholder: 'password'
        }),
        e(InputButtons)
      )
    );
  }
}

// личный кабинет пользователя

class DoOperation extends React.Component {
  render() {
    return (
      e('div', null,
        e('input', {
          type: 'number'
        }),
        e('button', null, this.props.caption)
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
          caption: 'Внести'
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
          caption: 'Вывести'
        }))
    );
  }
}

class LkControlPanel extends React.Component {
  render() {
    return (
      e('div', {
          className: 'lkControlPanel'
        },
        e(AddAmount),
        e(OutAmount))
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
  }

  render() {
    return (
      e('div', {
          className: 'lkHeader'
        },
        e('span', null, this.props.name),
        e('button', null, 'Выход')
      )
    );
  }
}

class LkContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [{
        date: '25.12.2019 13:09:15',
        type: 1,
        reason: 'Пополнение',
        sum: 20
      }, {
        date: '25.12.2019 13:09:15',
        type: 0,
        reason: 'Вывод средств',
        sum: 10
      }, {
        date: '25.12.2019 13:09:15',
        type: 1,
        reason: 'Начисление',
        sum: 50
      }, {
        date: '25.12.2019 13:09:15',
        type: 1,
        reason: 'Начисление',
        sum: 40
      }]
    }
  }

  addOperation(sum, type){
    const now = new Date();
    const nowStr = now.getDate() + '.' + (now.getMonth()+1) + '.' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes()
    const newOper = {
      date:
      sum: sum,
      type: type,
    };
    const operations = this.state.operations.push();
    this.setState({operations: operations});
  }

  render() {
    return (
      e('div', {
          className: 'lkContent'
        },
        e(LkOperationsReport, {
          data: this.state.operations
        }),
        e(LkControlPanel))
    );
  }
}

class Lk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ballans: 100,
      userName: 'test_user',
    }
  }

  render() {
    return (
      e('div', {
          className: 'lk'
        },
        e(LkHeader, {
          name: this.state.userName
        }),
        e(LkBallans, {
          ballans: this.state.ballans
        }),
        e(LkContent)
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
          name: 'admin'
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
  render() {
    //    return e('div', {className:"app"}, e(Autorization));
    return e('div', {
      className: "app"
    }, e(Lk));
  }
}

ReactDOM.render(
  e(App),
  document.querySelector('#app')
);
