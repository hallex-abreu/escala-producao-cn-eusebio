import volunteers from './voluntters';
import dayjs from 'dayjs';

const randomVolunteers = volunteers.map((value) => ({value, sort: Math.random()}))
.sort((a, b) => a.sort - b.sort)
.map(({value}, index) => {
    return {
        id: index + 1,
        peoples: value.peoples,
        quantity: 0,
        isCoordinator: value.isCoordinator,
        days: value.days
    }
});

let monthDays = [];
let isCultWoman = false;
let cultHolySupper = 0;

const date = new Date();
const allDaysMoth = daysInMonth(date.getMonth() + 1, date.getFullYear());

for(var i=1; i <= allDaysMoth; i++){//looping through days in month
    var newDate = new Date(date.getFullYear(),date.getMonth(), i);
    if(newDate.getDay() == 6 && isCultWoman === false){//if Saturday
        monthDays.push({
            day: 6,
            date: `*Sábado - ${dayjs(newDate).format('DD/MM')}*`
        });
        isCultWoman = true;
    }
    if(newDate.getDay() == 0){//if Sunday
        monthDays.push({
            day: 0,
            date: `*Domingo - ${dayjs(newDate).format('DD/MM')}*`
        });
    }
    if(newDate.getDay() == 4){//if Thursday
        monthDays.push({
            day: 4,
            date: `*Quinta - ${dayjs(newDate).format('DD/MM')}*`
        });
    }
}

let schedule = `*Escala do mês de ${date.toLocaleString('pt-BR', { month: 'long' })}*\n*(Não esqueçam de confirmar)*\n`;

for(let month of monthDays){
    if(month.day === 6 && randomVolunteers.filter(volunteer => volunteer.days.includes(4)).length > 0){
        const volunters = randomVolunteers.filter(volunteer => volunteer.days.includes(4)).sort((a, b) => a.quantity - b.quantity)[0];
        const index = randomVolunteers.findIndex(volunteer => volunteer.id === volunters.id);
        randomVolunteers[index].quantity = randomVolunteers[index].quantity + 1;
        let peoples = [];
        volunters.peoples.map(volunter => peoples.push(volunter));
        if(volunters.peoples.length === 1){
            let outher = randomVolunteers.filter(volunteer => volunteer.days.includes(4) && volunteer.id !== volunters.id).sort((a, b) => a.quantity - b.quantity)[0];
            const outherIndex = randomVolunteers.findIndex(volunteer => volunteer.id === outher.id);
            randomVolunteers[outherIndex].quantity = randomVolunteers[outherIndex].quantity + 1;
            outher.peoples.map(other => peoples.push(other));
        }
        schedule = schedule+`\n${month.date} *(17:00HRS) - Culto de Mulheres*\n${peoples.map(people => `- ${people.name}\n`).join('')}`;
    }
    if(month.day === 0){
        if(cultHolySupper === 1){
            //morning
            let voluntersMorning = randomVolunteers.filter(volunteer => volunteer.days.includes(1) && volunteer.isCoordinator === true).sort((a, b) => a.quantity - b.quantity)[0];
            const morningIndex = randomVolunteers.findIndex(volunteer => volunteer.id === voluntersMorning.id);
            randomVolunteers[morningIndex].quantity = randomVolunteers[morningIndex].quantity + 1;
            let peoplesMorning = [];
            voluntersMorning.peoples.map(volunter => peoplesMorning.push(volunter));
            if(voluntersMorning.peoples.length === 1){
                let outherVolunterMorning = randomVolunteers.filter(volunteer => volunteer.days.includes(1) && volunteer.id !== voluntersMorning.id).sort((a, b) => a.quantity - b.quantity)[0];
                const morningOutherIndex = randomVolunteers.findIndex(volunteer => volunteer.id === outherVolunterMorning.id);
                randomVolunteers[morningOutherIndex].quantity = randomVolunteers[morningOutherIndex].quantity + 1;
                outherVolunterMorning.peoples.map(other => peoplesMorning.push(other));
            }
            schedule = schedule+`\n${month.date} *(10HRS) - Culto de Santa Ceia*\n${peoplesMorning.map(people => `- ${people.name}\n`).join('')}`;

            //Evening
            let voluntersEvening = randomVolunteers.filter(volunteer => volunteer.days.includes(2) && volunteer.isCoordinator === true).sort((a, b) => a.quantity - b.quantity)[0];
            const everningIndex = randomVolunteers.findIndex(volunteer => volunteer.id === voluntersEvening.id);
            randomVolunteers[everningIndex].quantity = randomVolunteers[everningIndex].quantity + 1;
            let peoplesEverning = [];
            voluntersEvening.peoples.map(volunter => peoplesEverning.push(volunter));
            if(voluntersEvening.peoples.length === 1){
                let outherVolunterEvening = randomVolunteers.filter(volunteer => volunteer.days.includes(2) && volunteer.id !== voluntersEvening.id).sort((a, b) => a.quantity - b.quantity)[0];
                const everningOutherIndex = randomVolunteers.findIndex(volunteer => volunteer.id === outherVolunterEvening.id);
                randomVolunteers[everningOutherIndex].quantity = randomVolunteers[everningOutherIndex].quantity + 1;
                outherVolunterEvening.peoples.map(other => peoplesEverning.push(other));
            }
            schedule = schedule+`\n${month.date} *(17HRS) - Culto de Santa Ceia*\n${peoplesEverning.map(people => `- ${people.name}\n`).join('')}`;
            cultHolySupper ++;
        }
        else{
            //morning
            let voluntersMorning = randomVolunteers.filter(volunteer => volunteer.days.includes(1)).sort((a, b) => a.quantity - b.quantity)[0];
            const morningIndex = randomVolunteers.findIndex(volunteer => volunteer.id === voluntersMorning.id);
            randomVolunteers[morningIndex].quantity = randomVolunteers[morningIndex].quantity + 1;
            let peoplesMorning = [];
            voluntersMorning.peoples.map(volunter => peoplesMorning.push(volunter));
            if(voluntersMorning.peoples.length === 1){
                let outherVolunterMorning = randomVolunteers.filter(volunteer => volunteer.days.includes(2) && volunteer.id !== voluntersMorning.id).sort((a, b) => a.quantity - b.quantity)[0];
                const morningOutherIndex = randomVolunteers.findIndex(volunteer => volunteer.id === outherVolunterMorning.id);
                randomVolunteers[morningOutherIndex].quantity = randomVolunteers[morningOutherIndex].quantity + 1;
                outherVolunterMorning.peoples.map(other => peoplesMorning.push(other));
            }
            schedule = schedule+`\n${month.date} *(10HRS)*\n${peoplesMorning.map(people => `- ${people.name}\n`).join('')}`;

            //Evening
            let voluntersEvening = randomVolunteers.filter(volunteer => volunteer.days.includes(2)).sort((a, b) => a.quantity - b.quantity)[0];
            const everningIndex = randomVolunteers.findIndex(volunteer => volunteer.id === voluntersEvening.id);
            randomVolunteers[everningIndex].quantity = randomVolunteers[everningIndex].quantity + 1;
            let peoplesEverning = [];
            voluntersEvening.peoples.map(volunter => peoplesEverning.push(volunter));
            if(voluntersEvening.peoples.length === 1){
                let outherVolunterEvening = randomVolunteers.filter(volunteer => volunteer.days.includes(2) && volunteer.id !== voluntersEvening.id).sort((a, b) => a.quantity - b.quantity)[0];
                const everningOutherIndex = randomVolunteers.findIndex(volunteer => volunteer.id === outherVolunterEvening.id);
                randomVolunteers[everningOutherIndex].quantity = randomVolunteers[everningOutherIndex].quantity + 1;
                outherVolunterEvening.peoples.map(other => peoplesEverning.push(other));
            }
            schedule = schedule+`\n${month.date} *(17HRS)*\n${peoplesEverning.map(people => `- ${people.name}\n`).join('')}`;
            cultHolySupper ++;
        }
    }
    if(month.day === 4){
        const volunters = randomVolunteers.filter(volunteer => volunteer.days.includes(3)).sort((a, b) => a.quantity - b.quantity)[0];
        const index = randomVolunteers.findIndex(volunteer => volunteer.id === volunters.id);
        randomVolunteers[index].quantity = randomVolunteers[index].quantity + 1;
        let peoples = [];
        volunters.peoples.map(volunter => peoples.push(volunter));
        if(volunters.peoples.length === 1){
            let outher = randomVolunteers.filter(volunteer => volunteer.days.includes(2) && volunteer.id !== volunters.id).sort((a, b) => a.quantity - b.quantity)[0];
            const outherIndex = randomVolunteers.findIndex(volunteer => volunteer.id === outher.id);
            randomVolunteers[outherIndex].quantity = randomVolunteers[outherIndex].quantity + 1;
            outher.peoples.map(other => peoples.push(other));
        }
        schedule = schedule+`\n${month.date} *(19:30HRS)*\n${peoples.map(people => `- ${people.name}\n`).join('')}`;
    }
}

console.log(schedule)

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}