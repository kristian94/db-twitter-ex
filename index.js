/**
 * Created by Kristian Nielsen on 12-02-2018.
 */
const tweetRepo = require('./tweet/repo');

const printIntro = () => {
    console.log('Twitter Database Exercise');
    console.log('Actions: (enter the number next to the desired action');
    console.log('1: Print user count');
    console.log('2: Print ten most mentioning users');
    console.log('3: Print five most mentioned users');
    console.log('4: Print ten most active users');
    console.log('5: Print the five most grumpy users >:(');
    console.log('6: Exit');
};

const printNextAction = () => {
    console.log('Choose another action (type \"actions\" to print actions again)"')
};

const printUserCount = () => {
    console.log('Getting user count...');
    tweetRepo.getUserCount().then(count => {
        console.log(count);
        printNextAction();
    });

};
const printTenMostMentioing = () => {
    console.log('Getting ten most mentioning users...');
    tweetRepo.getTenMostMentioning().then(users => {
        console.log(users);
        printNextAction();
    });
};
const printFiveMostMentioned = () => {
    console.log('Getting five most mentioned users...');
    tweetRepo.getFiveMostMentioned().then(users => {
        console.log(users);
        printNextAction();
    });
};
const printTenMostActive = () => {
    console.log('Getting ten most active users...');
    tweetRepo.getTenMostActive().then(users => {
        console.log(users);
        printNextAction();
    });
};
const printFiveMostGrumpy = () => {
    console.log('Getting 5 most grumpy users...');
    tweetRepo.getFiveMostGrumpy().then(users => {
        console.log(users);
        printNextAction();
    });
};

const actions = {
    1: printUserCount,
    2: printTenMostMentioing,
    3: printFiveMostMentioned,
    4: printTenMostActive,
    5: printFiveMostGrumpy
};

var stdin = process.openStdin();

printIntro();

stdin.addListener("data", function(d) {
    const input = d.toString().trim();
    const inputNumber = Number(input);

    if(input === 'actions'){
        printIntro();
    }else if(isNaN(inputNumber) || inputNumber < 1 || inputNumber > 6){
        console.log('Please enter a valid integer number between 1 and 6 inclusive')
    }else if(inputNumber === 6){
        process.exit(0);
    }else{
        actions[inputNumber]();
    }
});