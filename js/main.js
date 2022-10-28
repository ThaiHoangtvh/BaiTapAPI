const getQuery = (name) => document.querySelector(name);

const checkVal = () => {
    const del = document.querySelectorAll('.error-alert');
    if (del.length > 0) {
        del.forEach(element => {
            element.remove();
        });
    }

    const getElement = (name) => document.getElementById(name);

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

function start() {
    getForm(renderFrom);

}
start();

function getForm(callback) {
    fetch(postApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function() {
            alert('Có lỗi trong quá trình kết nối !')
        })
}

function createInformation(data, callback) {
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)

    }
    fetch(postApi, options)
        .then(function(response) {
            response.json()
        })
        .then(callback);
}

function renderFrom(informations) {
    var show = document.querySelector('#show');
    var htmls = informations.map(function(information) {
        return `<tr><td>${information.firstname}</td><td>${information.lastname}</td><td>${information.patientage}</td><td>${information.nickname}</td><td>${information.email}</td><td>${information.gender}</td><td>${information.phone}</td><td>${information.spoucename}</td><td>${information.whome}</td><td>${information.marital}</td><td>${information.occupation}</td><td>${information.retired}</td><td>${information.date}</td></tr>`
    })
    show.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var first_name = document.querySelector('input[name="first-name"]').value;
    var last_name = document.querySelector('input[name="last-name"]').value;
    var patientage_age = document.querySelector('input[name="patient-age"]').value;
    var nicknames = document.querySelector('input[name="nickname"]').value;
    var emails = document.querySelector('input[name="email"]').value;
    var patientgenders = document.querySelector('#patientgender').value;
    var phones = document.querySelector('#phoneno').value;
    var spoucenames = document.querySelector('#spoucename').value;
    var whomeid = document.querySelector('#whomeid').value;
    var occupationid = document.querySelector('#occupationid').value;
    var date_time = document.querySelector('#date-time').value;
    var ticked = "";
    var gr1_t1 = document.getElementById('married');
    var gr1_t2 = document.getElementById('unmarried');
    var gr1_t3 = document.getElementById('other');
    var otherstatus = document.getElementById('otherstatus')
    var ticked2 = "";
    var item_tick1 = document.getElementById('retiredyes');
    var item_tick2 = document.getElementById('retiredno');
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
    var formData = {
        firstname: first_name,
        lastname: last_name,
        patientage: patientage_age,
        nickname: nicknames,
        email: emails,
        gender: patientgenders,
        phone: phones,
        spoucename: spoucenames,
        whome: whomeid,
        marital: ticked,
        occupation: occupationid,
        retired: ticked2,
        date: date_time
    }
    createInformation(formData, function() {
        getForm(renderFrom);
    })
}