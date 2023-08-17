'use strict';

let sel = (selector) => document.querySelector(selector);

interface IcurUser  {
    login: string,
    password: string,
    email: string
}
/*-----------------------------------------------------------------------Setup-- */
const first = sel('#first');
first.setAttribute('maxlength', '16');
sel('.first-name').classList.add('tool');
let nameRegExp = /^[a-zA-Z0-9_]{4,16}$/;

const password = sel('#password');
password.setAttribute('maxlength', '15');
sel('.password').classList.add('tool');
let passRegExp = /^[a-zA-Z0-9_\-\.]{4,16}$/

const email = sel('#email');
email.setAttribute('maxlength', '55');
sel('.email').classList.add('tool');
let mailRegExp = /^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/;

const submit = sel('#submit');
submit.setAttribute('disabled', 'true');
submit.style.cursor = 'default';



let curUser:IcurUser = {
    login: '',
    password: '',
    email: ''
}
let masUsers:IcurUser[] = [];

let e_mode:boolean = false;
let userId:number = -1;
/*-----------------------------------------------------------------------Functions--- */
let validOk = (className:string) => sel(className).classList.contains('toolok');

let checkBut = ():void => {
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
}
let resForm = ():void => {
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
}
/*---------------------------------------------------------------add user */
let addUser = ():void => {
    let pres:boolean = false;
    curUser.login = first.value;
    curUser.password = password.value;
    curUser.email = email.value;
    for (let val of masUsers)
        if (val.login == curUser.login) pres = true;
    if (pres) alert('Такий користувач вже існує')
    else {
        let tmpUser:IcurUser = Object.assign({}, curUser);
        if (e_mode) masUsers[userId] = tmpUser
        else masUsers.push(tmpUser);
        render();
        resForm();
    }
}
/*---------------------------------------------------------------delete user */
function deleteUser(e):void {
    masUsers.splice(parseInt(e.target.getAttribute('id')), 1);
    resForm();
    render();
}
/*---------------------------------------------------------------edit user */
function editUser(e):void {
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
/*---------------------------------------------------------------render*/
let render = ():void => {
    let s1:string = `<table class="user-list-table">
    <th>#&nbsp</th><th>Login</th><th>Password</th><th>Email</th><th>Edit</th><th>Delete</th>`;
    let s2:string = '';
    for (let i = 0; i < masUsers.length; i++) {
        s2 += `
    <tr>
        <td>${i + 1}</td><td>${masUsers[i].login}</td><td>${masUsers[i].password}</td><td>${masUsers[i].email}</td>
        <td><input class="edit" type="button" value="Edit" id="${i}e" onclick="editUser(event)"></td><td>
        <input class="delete" type="button" value="Delete" id="${i}d" onclick="deleteUser(event)"></td>
    </tr>`
    }
    sel('.user-list').innerHTML = s1 + s2 + '</table>';
}
/*-------------------------------------------------------------------------Login */
first.addEventListener('focus', ():void => {
    first.style.outlineColor = 'rgb(159,198,242)';
    if (validOk('.first-name')) sel('.first-name').classList.remove('mestool')
    else {
        sel('.first-name').classList.add('tool');
        sel('.first-name').classList.add('mestool');
    }
});

first.addEventListener('blur', ():void => {
    sel('.first-name').classList.remove('mestool')
});

first.addEventListener('input', ():void => {
    first.previousSibling.previousSibling.style.top = '0';
    first.previousSibling.previousSibling.style.zIndex = '2';
    sel('.first-name').classList.add('tool');

    if (first.value.length <= 0) {
        first.previousSibling.previousSibling.style.top = '10px';
        first.previousSibling.previousSibling.style.zIndex = '0';
    }

    if (nameRegExp.test(first.value)) {
        first.style.outlineColor = 'green'
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

/*-------------------------------------------------------------------password */
password.addEventListener('focus', ():void => {
    password.style.outlineColor = 'rgb(159,198,242)';
    if (validOk('.password')) sel('.password').classList.remove('mestool')
    else {
        sel('.password').classList.add('tool');
        sel('.password').classList.add('mestool');
    }
});

password.addEventListener('blur', ():void => {
    sel('.password').classList.remove('mestool')
});

password.addEventListener('input', ():void => {
    password.previousSibling.previousSibling.style.top = '0';
    password.previousSibling.previousSibling.style.zIndex = '2';
    sel('.password').classList.add('tool');

    if (password.value.length <= 0) {
        password.previousSibling.previousSibling.style.top = '10px';
        password.previousSibling.previousSibling.style.zIndex = '0';
    }

    if (passRegExp.test(password.value)) {
        password.style.outlineColor = 'green'
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
/*-------------------------------------------------------------------email */
email.addEventListener('focus', ():void => {
    email.style.outlineColor = 'rgb(159,198,242)';
    if (validOk('.email')) sel('.email').classList.remove('mestool')
    else {
        sel('.email').classList.add('tool');
        sel('.email').classList.add('mestool');
    }
});

email.addEventListener('blur', ():void => {
    sel('.email').classList.remove('mestool')
});

email.addEventListener('input', ():void => {
    email.previousSibling.previousSibling.style.top = '0';
    email.previousSibling.previousSibling.style.zIndex = '2';
    sel('.email').classList.add('tool');

    if (email.value.length <= 0) {
        email.previousSibling.previousSibling.style.top = '10px';
        email.previousSibling.previousSibling.style.zIndex = '0';
    }

    if (mailRegExp.test(email.value)) {
        email.style.outlineColor = 'green'
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

/*----------------------------------------------------------------sign up---- */
submit.addEventListener('click', ():void => {
    if (validOk('.first-name') && validOk('.email') && validOk('.password')) addUser();
});


