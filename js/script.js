'use strict';
let sel = (selector) => document.querySelector(selector);
const first = sel('#first');
first.setAttribute('maxlength', '16');
sel('.first-name').classList.add('tool');
let nameRegExp = /^[a-zA-Z0-9_]{4,16}$/;
const password = sel('#password');
password.setAttribute('maxlength', '15');
sel('.password').classList.add('tool');
let passRegExp = /^[a-zA-Z0-9_\-\.]{4,16}$/;
const email = sel('#email');
email.setAttribute('maxlength', '55');
sel('.email').classList.add('tool');
let mailRegExp = /^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/;
const submit = sel('#submit');
submit.setAttribute('disabled', 'true');
submit.style.cursor = 'default';
let curUser = {
    login: '',
    password: '',
    email: ''
};
let masUsers = [];
let e_mode = false;
let userId = -1;
let validOk = (className) => sel(className).classList.contains('toolok');
let checkBut = () => {
    if (validOk('.first-name') && validOk('.email') && validOk('.password')) {
        submit.style.backgroundColor = 'rgb(77, 162, 252)';
        submit.style.cursor = 'pointer';
        submit.removeAttribute('disabled');
    }
    else {
        submit.style.backgroundColor = 'rgb(125, 187, 253)';
        submit.setAttribute('disabled', 'true');
        submit.style.cursor = 'default';
    }
};
let resForm = () => {
    document.forms['sign-form'].reset();
    sel('.first-name').classList.add('tool');
    sel('.first-name').classList.remove('toolok');
    sel('.first-name').classList.remove('toolx');
    first.previousSibling.previousSibling.style.top = '10px';
    first.previousSibling.previousSibling.style.zIndex = '0';
    sel('.email').classList.add('tool');
    sel('.email').classList.remove('toolok');
    sel('.email').classList.remove('toolx');
    email.previousSibling.previousSibling.style.top = '10px';
    email.previousSibling.previousSibling.style.zIndex = '0';
    sel('.password').classList.add('tool');
    sel('.password').classList.remove('toolok');
    sel('.password').classList.remove('toolx');
    password.previousSibling.previousSibling.style.top = '10px';
    password.previousSibling.previousSibling.style.zIndex = '0';
    submit.setAttribute('disabled', 'true');
    submit.style.cursor = 'default';
    submit.innerText = 'Add user';
    e_mode = false;
};
let addUser = () => {
    let pres = false;
    curUser.login = first.value;
    curUser.password = password.value;
    curUser.email = email.value;
    for (let val of masUsers)
        if (val.login == curUser.login)
            pres = true;
    if (pres)
        alert('Такий користувач вже існує');
    else {
        let tmpUser = Object.assign({}, curUser);
        if (e_mode)
            masUsers[userId] = tmpUser;
        else
            masUsers.push(tmpUser);
        render();
        resForm();
    }
};
function deleteUser(e) {
    masUsers.splice(parseInt(e.target.getAttribute('id')), 1);
    resForm();
    render();
}
function editUser(e) {
    userId = parseInt(e.target.getAttribute('id'));
    first.value = masUsers[userId].login;
    password.value = masUsers[userId].password;
    email.value = masUsers[userId].email;
    first.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    email.dispatchEvent(new Event('input'));
    submit.innerText = 'Save user';
    e_mode = true;
}
let render = () => {
    let s1 = `<table class="user-list-table">
    <th>#&nbsp</th><th>Login</th><th>Password</th><th>Email</th><th>Edit</th><th>Delete</th>`;
    let s2 = '';
    for (let i = 0; i < masUsers.length; i++) {
        s2 += `
    <tr>
        <td>${i + 1}</td><td>${masUsers[i].login}</td><td>${masUsers[i].password}</td><td>${masUsers[i].email}</td>
        <td><input class="edit" type="button" value="Edit" id="${i}e" onclick="editUser(event)"></td><td>
        <input class="delete" type="button" value="Delete" id="${i}d" onclick="deleteUser(event)"></td>
    </tr>`;
    }
    sel('.user-list').innerHTML = s1 + s2 + '</table>';
};
first.addEventListener('focus', () => {
    first.style.outlineColor = 'rgb(159,198,242)';
    if (validOk('.first-name'))
        sel('.first-name').classList.remove('mestool');
    else {
        sel('.first-name').classList.add('tool');
        sel('.first-name').classList.add('mestool');
    }
});
first.addEventListener('blur', () => {
    sel('.first-name').classList.remove('mestool');
});
first.addEventListener('input', () => {
    first.previousSibling.previousSibling.style.top = '0';
    first.previousSibling.previousSibling.style.zIndex = '2';
    sel('.first-name').classList.add('tool');
    if (first.value.length <= 0) {
        first.previousSibling.previousSibling.style.top = '10px';
        first.previousSibling.previousSibling.style.zIndex = '0';
    }
    if (nameRegExp.test(first.value)) {
        first.style.outlineColor = 'green';
        sel('.first-name').classList.remove('toolx');
        sel('.first-name').classList.add('toolok');
        sel('.first-name').classList.remove('mestool');
        checkBut();
    }
    else {
        first.style.outlineColor = 'red';
        sel('.first-name').classList.add('toolx');
        sel('.first-name').classList.remove('toolok');
        sel('.first-name').classList.add('mestool');
        checkBut();
    }
});
password.addEventListener('focus', () => {
    password.style.outlineColor = 'rgb(159,198,242)';
    if (validOk('.password'))
        sel('.password').classList.remove('mestool');
    else {
        sel('.password').classList.add('tool');
        sel('.password').classList.add('mestool');
    }
});
password.addEventListener('blur', () => {
    sel('.password').classList.remove('mestool');
});
password.addEventListener('input', () => {
    password.previousSibling.previousSibling.style.top = '0';
    password.previousSibling.previousSibling.style.zIndex = '2';
    sel('.password').classList.add('tool');
    if (password.value.length <= 0) {
        password.previousSibling.previousSibling.style.top = '10px';
        password.previousSibling.previousSibling.style.zIndex = '0';
    }
    if (passRegExp.test(password.value)) {
        password.style.outlineColor = 'green';
        sel('.password').classList.remove('toolx');
        sel('.password').classList.add('toolok');
        sel('.password').classList.remove('mestool');
        checkBut();
    }
    else {
        password.style.outlineColor = 'red';
        sel('.password').classList.add('toolx');
        sel('.password').classList.remove('toolok');
        sel('.password').classList.add('mestool');
        checkBut();
    }
});
email.addEventListener('focus', () => {
    email.style.outlineColor = 'rgb(159,198,242)';
    if (validOk('.email'))
        sel('.email').classList.remove('mestool');
    else {
        sel('.email').classList.add('tool');
        sel('.email').classList.add('mestool');
    }
});
email.addEventListener('blur', () => {
    sel('.email').classList.remove('mestool');
});
email.addEventListener('input', () => {
    email.previousSibling.previousSibling.style.top = '0';
    email.previousSibling.previousSibling.style.zIndex = '2';
    sel('.email').classList.add('tool');
    if (email.value.length <= 0) {
        email.previousSibling.previousSibling.style.top = '10px';
        email.previousSibling.previousSibling.style.zIndex = '0';
    }
    if (mailRegExp.test(email.value)) {
        email.style.outlineColor = 'green';
        sel('.email').classList.remove('toolx');
        sel('.email').classList.add('toolok');
        sel('.email').classList.remove('mestool');
        checkBut();
    }
    else {
        email.style.outlineColor = 'red';
        sel('.email').classList.add('toolx');
        sel('.email').classList.remove('toolok');
        sel('.email').classList.add('mestool');
        checkBut();
    }
});
submit.addEventListener('click', () => {
    if (validOk('.first-name') && validOk('.email') && validOk('.password'))
        addUser();
});
