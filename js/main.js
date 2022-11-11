const getQuery = (name) => document.querySelector(name);
const getElement = (name) => document.getElementById(name);
const first_name = getQuery('input[name="first-name"]').value;
const last_name = getQuery('input[name="last-name"]').value;
// const patientage_age = getQuery('input[name="patient-age"]').value;
const nicknames = getQuery('input[name="nickname"]').value;
const emails = getQuery('input[name="email"]').value;
const patientgenders = getQuery('#patientgender').value;
const phones = getQuery('#phoneno').value;
const spoucenames = getQuery('#spoucename').value;
const whomeid = getQuery('#whomeid').value;
const occupationid = getQuery('#occupationid').value;
// let date_time = getQuery('#date-time').value;
// const test = getElement('date-time').value;
// console.log(test);
// 
let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
// console.log(today);
// 
let ticked = "";
let ticked2 = "";
const item_tick1 = getElement('retiredyes');
const item_tick2 = getElement('retiredno');
const age = getElement('patientage');
const list_error = document.getElementsByClassName('error-alert');
const email = getElement('emailid');
const patientgender = getElement('patientgender');
const otherstatus = getElement('otherstatus');
const phoneno = getElement('phoneno');
const group1 = getElement('group1');
const gr1_t1 = getElement('married');
const gr1_t2 = getElement('unmarried');
const gr1_t3 = getElement('other');
const re = /\S+@\S+\.\S+/;
const checkVal = () => {
    const del = document.querySelectorAll('.error-alert');
    if (del.length > 0) {
        del.forEach(element => {
            element.remove();
        });
    }
    if (gr1_t3.checked) {
        if (otherstatus.value.length == 0) {
            const ott = otherstatus.parentElement;
            // ott.querySelector('.error-alert').innerText = 'Bạn không được bỏ trống trường này';
            var add_html = "<span class='error-alert'>Bạn không được bỏ trống trường này</span>";
            otherstatus.insertAdjacentHTML('afterend', add_html);
        }
    }
    if (age.value.length == 0 || (!gr1_t1.checked && !gr1_t2.checked && !gr1_t3.checked) || phoneno.value.length == 0 || patientgender.options[patientgender.selectedIndex].value == 0 || email.value.length == 0) {

        if (!gr1_t1.checked && !gr1_t2.checked && !gr1_t3.checked) {
            // group1.querySelector('.error-alert').innerText = 'Bạn không được bỏ trống trường này';
            var add_html = "<span class='error-alert'>Bạn không được bỏ trống trường này</span>";
            group1.insertAdjacentHTML('afterend', add_html);
            gr1_t1.scrollIntoView({ top: 10, behavior: 'smooth' });
            gr1_t1.focus();
        } else {
            if (gr1_t3.checked) {
                if (otherstatus.value.length == 0) {
                    const ott = otherstatus.parentElement;
                    // ott.querySelector('.error-alert').innerText = 'Bạn không được bỏ trống trường này';
                    var add_html = "<span class='error-alert'>Bạn không được bỏ trống trường này</span>";
                    otherstatus.insertAdjacentHTML('afterend', add_html);
                }
            }

        }
        // 
        if (!phoneno.value) {
            const phone = phoneno.parentElement;
            // phone.querySelector('.error-alert').innerText = 'Bạn không được bỏ trống trường này';
            var add_html = "<span class='error-alert'>Bạn không được bỏ trống trường này</span>";
            phoneno.insertAdjacentHTML('afterend', add_html);
            phone.scrollIntoView({ top: 10, behavior: 'smooth' });
            phoneno.focus();

        }
        //
        if (patientgender.options[patientgender.selectedIndex].value == 0) {
            const op = patientgender.parentElement;
            // op.querySelector('.error-alert').innerText = 'Bạn không được bỏ trống trường này';
            var add_html = "<span class='error-alert'>Bạn không được bỏ trống trường này</span>";
            patientgender.insertAdjacentHTML('afterend', add_html);
            patientgender.focus();

        } else {
            const op = patientgender.parentElement;
            // op.querySelector('.error-alert').remove();
        }
        //
        if (email.value.length == 0) {
            const e = email.parentElement;
            // e.querySelector('.error-alert').remove();
            // e.querySelector('.error-alert').innerText = 'Bạn không được bỏ trống trường này';
            var add_html = "<span class='error-alert'>Bạn không được bỏ trống trường này</span>";
            email.insertAdjacentHTML('afterend', add_html);
            email.focus();
        } else {
            if (!email.value.match(re)) {
                const mail_error = email.parentElement;
                // mail_error.querySelector('.error-alert').innerText = 'Vui lòng nhập đúng định dạng email';
                var add_html = "<span class='error-alert'>Vui lòng nhập đúng định dạng email</span>";
                email.insertAdjacentHTML('afterend', add_html);
                email.scrollIntoView({ top: 10, behavior: 'smooth' });
                email.focus();
                // return false;
            }
        }
        // 
        if (age.value.length == 0) {
            const t = age.parentElement;
            // t.querySelector('.error-alert').innerText = 'Bạn không được bỏ trống trường này';
            var add_html = "<span class='error-alert'>Bạn không được bỏ trống trường này</span>";
            age.insertAdjacentHTML('afterend', add_html);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
            age.focus();
        } else {
            const t = age.parentElement;
            // t.querySelector('.error-alert').remove();
        }
        return false;
    } else {
        handleCreateForm();
        // console.log(getQuery('#date-time').value);
    }
}
const toggleSlide = () => {
    let radio = document.getElementsByName('group1');
    for (let index = 0; index < radio.length; index++) {
        if (radio[index].checked && radio[index].value == "other") {
            document.querySelector('.item.otherstatus').classList.add('active');
        } else {
            document.querySelector('.item.otherstatus').classList.remove('active');
        }
    }
}
var postApi = 'https://635885f7c27556d2893f19a9.mockapi.io/thaihoang/demo';
const getForm = async() => {
    const getData = await fetch(postApi)
        .then(function(response) {
            return response.json();
        })
    console.log(getData);
    var show = document.querySelector('#show');
    var htmls = getData.map(function(response) {
        return `<tr><td>${response.firstname}</td><td>${response.lastname}</td><td>${response.patientage}</td><td>${response.nickname}</td><td>${response.email}</td><td>${response.gender}</td><td>${response.phone}</td><td>${response.spoucename}</td><td>${response.whome}</td><td>${response.marital}</td><td>${response.occupation}</td><td>${response.retired}</td><td>${response.date}</td><td>${response.create_at}</td><td><button onclick = "click_delete(this.id)" id="${response.id}">Xóa</button></td></tr>`
    })
    show.innerHTML = htmls.join('');
}
getForm();
async function createInformation(data) {
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    await fetch(postApi, options)
    getForm();
}

function handleCreateForm() {
    if (gr1_t3.checked) {
        if (otherstatus.value.length !== 0) {
            ticked = otherstatus.value;
        }
    }
    if (gr1_t1.checked) {
        ticked = gr1_t1.value
    }
    if (gr1_t2.checked) {
        ticked = gr1_t2.value
    }
    if (item_tick1.checked) {
        ticked2 = item_tick1.value
    }
    if (item_tick2.checked) {
        ticked2 = item_tick2.value
    }
    const formData = {
        firstname: first_name,
        lastname: last_name,
        patientage: getQuery('input[name="patient-age"]').value,
        nickname: nicknames,
        email: emails,
        gender: patientgenders,
        phone: phones,
        spoucename: spoucenames,
        whome: whomeid,
        marital: ticked,
        occupation: occupationid,
        retired: ticked2,
        date: getQuery('#date-time').value,
        create_at: today
    }
    createInformation(formData);
}
const fill = () => {
    const getFill = async() => {
        const getData = await fetch(postApi)
            .then(function(response) {
                return response.json();
            })
            // console.log(getData);
            // 
        const result = getData.filter(word => word.patientage > 22);
        var show = document.querySelector('#show');
        var htmls = result.map(function(response) {
            return `<tr><td>${response.firstname}</td><td>${response.lastname}</td><td>${response.patientage}</td><td>${response.nickname}</td><td>${response.email}</td><td>${response.gender}</td><td>${response.phone}</td><td>${response.spoucename}</td><td>${response.whome}</td><td>${response.marital}</td><td>${response.occupation}</td><td>${response.retired}</td><td>${response.date}</td><td>${response.create_at}</td><td><button onclick = "click_delete(this.id)" id="${response.id}">Xóa</button></td></tr>`
        })
        show.innerHTML = htmls.join('');
        //
    }
    getFill();
}
const click_delete = async(id) => {

    var answer = window.confirm("Delete data?");
    if (answer) {
        let url = postApi + '/' + id;
        await fetch(url, {
            method: 'DELETE',
        });
        getForm();
    }


}