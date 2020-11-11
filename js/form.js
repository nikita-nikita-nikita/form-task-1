const form = document.querySelector('.form');

const validation = [
    {
        name:'email',
        reg: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        validate(value){
            console.log(value);
            if(!this.reg.test(String(value))) throw new Error(this.message);
        },
        message: 'Enter valid email address',
        selectorName: '#email-input'
    }
    // todo add this for every field
];

const errors = [];

form.addEventListener('submit', event =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    validation.forEach( elem => {
        try {
            elem.validate(formData.get(elem.name))
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
