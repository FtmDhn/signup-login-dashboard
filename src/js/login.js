const rem = document.getElementById('rem')
const inp = document.querySelectorAll('.box>input')
const btn = document.querySelector('.box>button')
const span = document.querySelectorAll('.box>span')
const sec = document.querySelector('main>section')
const userseBox = document.querySelector('.userseBox')
const _svg = document.querySelector('.mySvg')
const popUp = document.querySelector('.popUp')
const popUpInp = document.querySelectorAll('.popUp>input')
const skey = Symbol('sk')
const sObj = {}
sObj[skey] = '6ac7791e75a4ce3fe721cfd6'
const Api = 'https://' + sObj[skey] + '.mockapi.io/login-app'


/////////check cookie
let cookieUser = Cookies.get('userName')
let cookiePass = Cookies.get('pass')
if (cookiePass != undefined && cookieUser != undefined) {
    inp[0].value = cookieUser
    inp[1].value = cookiePass
}


btn.addEventListener('click', () => {
    const mail = inp[0].value
    const pass = inp[1].value

    span.forEach(val => val.innerText = '')
    inp.forEach(val => val.classList.remove('error'))

    const dataBase = {
        email: mail,
        password: pass
    }

    ////remember me///////
    if (rem.checked) {
        Cookies.set('userName', dataBase.email, { expires: 30 })
        Cookies.set('pass', dataBase.password, { expires: 30 })
    }



    const url = new URL(Api);
    url.searchParams.append('email', dataBase.email);

    fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }

    }).then(users => {
        const user = users.find(val => val.password == pass)

        if (!user) {
            alert('Email or password is incorrect!')
            return
        }

        if (user.role) {
            showUser('admin')
        } else {
            showUser(user.id)
        }
    }).catch(error => {
        console.error('Login error:', error);
        alert('email or password is not correct')

    })

})


function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
}

async function showUser(id) {
    const isAdmin = id == 'admin';
    window.isAdmin = isAdmin
    const temp = isAdmin ? Api : Api + '/' + id;
    const mainImg = document.querySelector('main > img');

    try {
        const res = await fetch(temp);
        if (!res.ok) throw new Error('Could not load user data.');

        const data = await res.json();
        const users = Array.isArray(data) ? data : [data];

        if (!users[0]) {
            userseBox.replaceChildren(el('p', 'dashboard-error', 'No user information was found.'));
            sec.style.display = 'none';
            userseBox.style.display = 'flex';
            return;
        }

        const header = el('div', 'dash-header');
        const info = el('div', 'dash-info');
        info.append(
            el('p', 'dashboard-eyebrow', isAdmin ? 'CONTROL CENTER' : 'YOUR SPACE'),
            el('h2', 'dashboard-title', isAdmin ? 'Admin Dashboard' : 'Welcome Back!'),
            el('p', 'dashboard-subtitle', isAdmin
                ? users.length + ' account(s) found'
                : 'Your account details are ready.')
        );

        const badge = el('div', 'role-badge');
        badge.append(el('span', 'role-dot'), el('span', '', isAdmin ? 'Administrator' : 'User'));
        header.append(el('div', 'dash-avatar'), info, badge);

        const content = [header, el('div', 'dashboard-divider')];

        if (isAdmin) {
            const adminCount = users.filter(u => u.role).length;
            const stats = el('div', 'dash-stats');
            [
                [users.length, 'Total accounts'],
                [adminCount, 'Admins'],
                [users.length - adminCount, 'Users']
            ].forEach(([num, label]) => {
                const card = el('div', 'stat-card');
                card.append(el('div', 'stat-number', num), el('div', 'stat-label', label));
                stats.append(card);
            });

            const list = el('div', 'user-list');
            users.forEach((user, i) => {
                const row = el('div', 'user-row');
                row.style.setProperty('--delay', Math.min(i * 60, 500) + 'ms');

                const main = el('div', 'row-main');

                main.append(
                    el('p', 'row-email', user.email || 'Not provided'),
                    el('p', 'row-id', 'ID: ' + user.id)
                );

                const isAdminUser = Boolean(user.role);

                const actions = el('div', 'user-actions');
                const editBtn = el('button', 'action-btn edit-btn', 'Edit');
                editBtn.type = 'button';
                ////////edite
                editBtn.addEventListener('click', () => {
                    openPopUp(user.id)
                })

                const deleteBtn = el('button', 'action-btn delete-btn', 'Delete');
                deleteBtn.type = 'button';
                ///////////delete
                deleteBtn.addEventListener('click', () => {
                    mydel(user.id)

                })

                actions.append(editBtn, deleteBtn);

                row.append(
                    el('div', 'row-avatar', (user.email || '?').charAt(0)),
                    main,
                    el(
                        'span',
                        'chip ' + (isAdminUser ? 'admin' : 'user'),
                        isAdminUser ? 'Admin' : 'User'
                    ),
                    actions
                );

                list.append(row);
            });

            content.push(stats, list);
        } else {
            const hidden = ['password', 'token', 'secret'];
            const fields = Object.keys(users[0]).filter(k => !hidden.includes(k.toLowerCase()));

            const grid = el('div', 'user-grid');
            fields.forEach((key, i) => {
                const card = el('article', 'user-card');
                card.style.setProperty('--delay', Math.min(i * 60, 500) + 'ms');

                let labelText = key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ');
                labelText = labelText.charAt(0).toUpperCase() + labelText.slice(1);

                const raw = users[0][key];
                let shown = 'Not provided';
                if (raw != null && raw != undefined && raw !== '') {
                    shown = typeof raw == 'object' ? JSON.stringify(raw) : String(raw);
                }

                const value = el('p', 'user-card-value', shown);
                if (shown == 'Not provided') value.classList.add('empty-value');

                card.append(el('p', 'user-card-label', labelText), value);
                grid.append(card);
            });

            const actions = el('div', 'user-actions');
            const editBtn = el('button', 'action-btn edit-btn', 'Edit');
            editBtn.type = 'button';
            const deleteBtn = el('button', 'action-btn delete-btn', 'Delete');
            deleteBtn.type = 'button';
            editBtn.addEventListener('click', () => {
                openPopUp(users[0].id)
            });

            deleteBtn.addEventListener('click', () => {
                mydel(users[0].id);
            });

            actions.append(editBtn, deleteBtn);
            content.push(grid, actions);
        }

        const footer = el('div', 'dashboard-footer');
        const logoutBtn = el('button', 'logout-btn', '← Back to Login');
        logoutBtn.type = 'button';
        logoutBtn.addEventListener('click', () => {
            userseBox.style.display = 'none';
            sec.style.display = '';
            if (mainImg) mainImg.style.display = '';
            inp.forEach(i => { i.value = ''; i.classList.remove('error'); });
            span.forEach(m => { m.textContent = ''; });
        });
        footer.append(el('p', 'dashboard-note', 'Thanks for being here.'), logoutBtn);
        content.push(footer);

        const body = el('div', 'dash-body');
        body.append(...content);

        userseBox.replaceChildren(el('div', 'dash-cover'), body);

        sec.style.display = 'none';
        if (mainImg) mainImg.style.display = 'none';
        userseBox.style.display = 'flex';

    } catch (error) {
        console.log(error);
        alert('Could not load the account information. Please try again.');
    }
}


/////////////delete
function mydel(id) {
    if (confirm('are you sure you want to remove it?')) {

        fetch(Api + '/' + id, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Could not delete user')
        }).then(task => {
            alert('user deleted !')
            if (isAdmin) {
                showUser('admin')
            } else {
                location.assign('index.html')
            }

        }).catch(error => {
            console.log(error);

        })
    }
}

///////edite
let idUpdate
///////open popUp
function openPopUp(id) {
    idUpdate = id
    popUp.style.display = 'flex'
    fetch(Api + '/' + id)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Could not edite user')
        })
        .then(data => {

            console.log(data);
            popUpInp[0].value = data.fullName
            popUpInp[1].value = data.password


        }).catch(error => {
            console.log(error);

        })
}

function myedite() {

    const newUserInfo = {
        fullName: popUpInp[0].value,
        password: popUpInp[1].value
    }

    fetch(Api + '/' + idUpdate, {
        method: 'PUT', // or PATCH
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newUserInfo)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Could not edite user')
    }).then(task => {

        console.log(task);
        alert('your information has been updated !')
        popUp.style.display = 'none'
        if (isAdmin) {
            showUser('admin')
        }
        else showUser(idUpdate)

    }).catch(error => {
        console.log(error);

    })
}


function removeEyeDog() {
    dogImg.src = 'src/img/dog3.png';
    showEyes(true);
    moveDogEyes(0);
}

let flag = false
_svg.addEventListener('click', () => {
    inp[1].type = 'text'
    removeEyeDog()
    flag = true
    _svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path></svg>`
    const newSvg = _svg.querySelector('svg');

    newSvg.addEventListener('click', (e) => {
        e.stopPropagation();
        addEyeDog();
    });
})


function addEyeDog() {
    console.log('salam');
    inp[1].type = 'password'
    dogImg.src = 'src/img/dog2.png';
    _svg.innerHTML = `<svg id="mySvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>`
    showEyes(false);
    flag = false
}
window.addEyeDog = addEyeDog;

const dogWrap = document.querySelector('.dog-wrap');
const dogImg = dogWrap.querySelector('.dog-img');

const emailInput = document.querySelector('.box input[type="email"]');
const passInp = document.querySelector('.box input[type="password"]');

const dogEyes = dogWrap.querySelectorAll('.dog-eye');

function moveDogEyes(x, y = 0) {
    dogEyes.forEach(eye => {
        eye.style.transform = `translate(${x}px, ${y}px)`;
    });
}

function showEyes(show) {
    dogEyes.forEach(eye => {
        eye.style.display = show ? 'block' : 'none';
    });
}
emailInput.addEventListener('focus', () => {
    dogImg.src = 'src/img/dog3.png';
    showEyes(true);
    moveDogEyes(-2, 2);
});

emailInput.addEventListener('input', () => {
    const progress = Math.min(emailInput.value.length / 15, 1);
    const x = -2 + progress * 5;
    moveDogEyes(x, 2);
});

emailInput.addEventListener('blur', () => {
    dogImg.src = 'src/img/dog3.png';
    showEyes(true);
    moveDogEyes(0);
});

passInp.addEventListener('focus', () => {
    if (flag) {
        removeEyeDog()
    }
    else {
        dogImg.src = 'src/img/dog2.png';
        showEyes(false);
    }
});


function copyDemo(id) {
    const text = document.getElementById(id).textContent;

    navigator.clipboard.writeText(text)
        .then(() => {
            const button = document.querySelector(
                `[onclick="copyDemo('${id}')"]`
            );

            const oldText = button.textContent;
            button.textContent = 'Copied!';

            setTimeout(() => {
                button.textContent = oldText;
            }, 1200);
        })
        .catch(() => {
            alert('Could not copy. Please copy the text manually.');
        });
}
