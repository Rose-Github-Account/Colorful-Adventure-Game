#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// -----------------games variable--------------------------------
let enemies = ["Skeleton", "Zombie", "Warrior", "Assasin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;
// ------------------Player varirable------------------------------
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotion = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;
// ----------------------------------While Loop---------------------
let gameRunning = true;
console.log(chalk.blue.bold("Welcome to DeadZone!"));
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(chalk.red.underline(`# ${enemy} has appeared #\n`));
    while (enemyHealth > 0) {
        console.log(chalk.green.italic(`Your Health: ${heroHealth}`));
        console.log(chalk.yellow.italic(`${enemy} Health: ${enemyHealth}`));
        let option = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: chalk.blueBright.bold("what would you like to do?"),
            choices: ["1.Attack", "2.Take Health potion", "3.Run"]
        });
        if (option.ans === "1.Attack") {
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(chalk.red.bold(`you strike the ${enemy} for ${damageToEnemy}`));
            console.log(chalk.red.underline(`${enemy} strike you for ${damageToHero} damage`));
        }
        if (heroHealth < 1) {
            console.log(chalk.yellowBright("You have taken too much damage,you are too weak to continue."));
            break;
        }
        else if (option.ans === "2.Take Health potion") {
            if (numHealthPotion > 0) {
                heroHealth += healthPotionHealAmount;
                numHealthPotion--;
                console.log(chalk.redBright.bold(`You use health potion for ${healthPotionHealAmount}`));
                console.log(chalk.bgRedBright.bold(`You now have ${heroHealth} health`));
                console.log(chalk.greenBright.bold(`you now have ${numHealthPotion} left`));
            }
            else {
                console.log(chalk.green(`You no health potion left, defeat enemy for a chance to get health potion`));
            }
        }
        else if (option.ans === "3.Run") {
            console.log(chalk.bgGreenBright(`you run away from ${enemy}`));
            continue Game;
        }
    }
    if (heroHealth < 1) {
        console.log(chalk.bgRed.bold("You are out from batte.You are too weak"));
        break;
    }
    console.log(chalk.red(`${enemy} was defeated`));
    console.log(chalk.red.bold(`You have ${heroHealth} health`));
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < healthPotionDropChance) {
        numHealthPotion++;
        console.log(chalk.bgCyan(`enemy give you health potion`));
        console.log(chalk.cyan.bold(`Your health is ${heroHealth}`));
        console.log(chalk.bgCyanBright.bold(`Your health potion is ${numHealthPotion}`));
    }
    let userOption = await inquirer.prompt([
        {
            name: "ans",
            type: "list",
            choices: ["1.Continue", "2.Exit"]
        }
    ]);
    if (userOption.ans === "1.Continue") {
        console.log(chalk.green.bold("You are continue on your adventure"));
    }
    else {
        console.log(chalk.red.bold("You successfully exit from DeadZone!"));
        break;
    }
    console.log(chalk.bgCyanBright.underline("Thank you for playing\n"));
}
