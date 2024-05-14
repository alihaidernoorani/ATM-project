import inquirer from 'inquirer';
let myBalance = 10000;
let myPin = 1234;
let pinAnswer = await inquirer.prompt({
    name: "pin",
    message: "Enter your pin number",
    type: "number",
    validate: input => {
        const isValid = !isNaN(Number(input));
        return isValid ? true : "Please enter numbers only";
    }
});
if (pinAnswer.pin === myPin) {
    console.log("Correct Pin!");
    do {
        let operationAnswer = await inquirer.prompt({
            name: "options",
            message: "Please select option",
            type: "list",
            choices: ["withdraw", "check balance"]
        });
        if (operationAnswer.options === "withdraw") {
            let withdrawal = await inquirer.prompt({
                name: "options",
                message: "Please select option",
                type: "list",
                choices: ["Withdrawal Amount", "Fast Cash"]
            });
            if (withdrawal.options === "Withdrawal Amount") {
                let withdrawal = await inquirer.prompt({
                    name: "amount",
                    message: "Enter your amount",
                    type: "number",
                    validate: input => {
                        const isValid = !isNaN(Number(input));
                        return isValid ? true : "Please enter a valid number";
                    }
                });
                if (withdrawal.amount <= myBalance) {
                    myBalance -= withdrawal.amount;
                    console.log(`Your balance is ${myBalance}`);
                }
                else {
                    console.log("Insufficient balance");
                }
            }
            else {
                let fastCashResponse = await inquirer.prompt({
                    name: "options",
                    message: "Please select option",
                    type: "list",
                    choices: ["1000", "2000", "5000"]
                });
                let amount = parseInt(fastCashResponse.options);
                if (amount <= myBalance) {
                    myBalance -= amount;
                }
                else {
                    console.log("Insufficient balance");
                }
            }
        }
        if (operationAnswer.options === "check balance") {
            console.log(`Your balance is ${myBalance}`);
        }
        let exitLoop = await inquirer.prompt({
            name: "exitAnswer",
            message: "Do you want to perform another task?",
            type: "list",
            choices: ["Yes", "No"]
        });
        if (exitLoop.exitAnswer === "No") {
            break;
        }
    } while (true);
}
else {
    console.log("Incorrect Pin number");
}
