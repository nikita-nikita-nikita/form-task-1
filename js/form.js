const form = document.querySelector('.form');

const validation = [
    {
        name:'email',
        reg: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        validate(value){
            if(!this.reg.test(String(value))) throw new Error(this.message);
        },
        // in this form it's not used, but can be situations, where we need dynamic error messages
        message: 'Enter valid email address',
        selectorName: '#email-input'
    },
    {
        name: 'password',
        reg: [/[A-Za-z]/, /[0-9]/],
        validate(value){
            this.reg.forEach((reg, index) => {
                if(!reg.test(String(value))) {
                    console.log(index, value)
                    throw new Error(this.message);
                }
            });
            if(String(value).length<8) throw new Error(this.message);
            return value;
        },
        message: 'Enter valid password',
        selectorName: '#password-input'
    },
    // validation for name is something specific
    {
        name: ['month', 'day', 'year'],
        validate({year, month, day}) {
            year = (+year);
            month = +month;
            day = + day;
            console.log({year, month, day})
            if(
                (day<1 || day>31)||
                (month<1 || month>12)||
                (year<1900 || year>2020)||
                (month === 2 && ((isLeap(year) && day > 29) || (!isLeap(year) && day > 28)))||
                (day===31 && (month===4 || month===6 || month===9 || month===11))
            ) throw new Error(this.message);
        },
        message: 'Enter valid date',
        selectorName: '#date-inputs'
    }
];

function isLeap(year){
    return(year%100 && !(year%4) || !(year%100) && !(year%400));
}

const errors = [];

form.addEventListener('submit', event =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    validation.forEach( elem => {
        try {
            if (typeof elem.name === 'string') elem.validate(formData.get(elem.name));
            if (typeof elem.name === 'object') {
                let validateObject = {};
                elem.name.forEach( name => {
                    validateObject = {...validateObject, [name]:formData.get(name)};
                });
                elem.validate(validateObject);
            }
        }catch (error) {
            errors.push({
                message: error.message,
                selectorName: elem.selectorName
            });
            console.log(error)
        }
    });
    errors.forEach( error => {
        const problemSection = document.querySelector(error.selectorName);
        problemSection.parentElement.classList.add('error');
    })
})
