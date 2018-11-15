const errors = {
    'User not found': 'Пользователь не найден',
    'Wrong password for user': 'Не верно указана почта и/или пароль',
    'Email is already taken': 'Пользователь с такой почтой уже существует',
    'Username is already taken': 'Пользователь с таким логином уже существует',
    
    'username': 'Невалидный логин (кол-во символов должно быть: 4-25)',
    'passwords': 'Пароли должны совпадать',
    'email': 'Невалидная почта',

    'undefined': 'Неизвестная ошибка',
};

class Errors {
    constructor(errors) {
        this.errors = errors;
    }

    getErrorString(error) {
        let errorString = this.errors[error];
        if (!errorString) {
            errorString = this.errors['undefined'];
        }
        return errorString;
    }
}

export default new Errors(errors);