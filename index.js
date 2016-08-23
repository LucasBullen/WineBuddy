'use strict';

var AlexaSkill = require('./AlexaSkill');
var pairing = {
    "wine": {
        "bold red":[
            "malbec",
            "syrah",
            "shiraz",
            "mourvedre",
            "pinotage",
            "petite sirah"
        ],
        "medium red":[
            "merlot",
            "sangiovese"
        ],
        "light red":[
            "pinot noir",
            "grenache"
        ],
        "rose":[
            "provencal rose",
            "white zinfandel"
        ],
        "rich white":[
            "chardonnay",
            "semillon"
        ],
        "light white":[
            "sauvignon blanc",
            "albarino"
        ],
        "sparkling":[
            "champagne",
            "prosecco"
        ],
        "sweet white":[
            "moscate",
            "riesling"
        ],
        "dessert":[
            "port",
            "sherry"
        ]
    },
    "food": {
        "red meat":{
            "best":["bold red"],
            "also":["medium red"],
            "examples":["beef","lamb","venison"]
        },
        "cured meat":{
            "best":["light red"],
            "also":["sweet white"],
            "examples":["salami","proscuitto","bresaola","bacon"]
        },
        "pork":{
            "best":["medium red"],
            "also":["bold red, rose, sparkling"],
            "examples":["roast","tenderloin","pork chop"]
        },
        "poultry":{
            "best":["rich white","light red"],
            "also":["medium red", "rose", "light white","sparkling"],
            "examples":["chicken","duck","turkey"]
        },
        "mollusk":{
            "best":["sparkling"],
            "also":["light white"],
            "examples":["oyster","mussel","clam"]
        },
        "fish":{
            "best":["light white"],
            "also":["sparkling", "rich white"],
            "examples":["tuna","sushi","cod", "trout", "bass"]
        },
        "lobster":{
            "best":["rich white"],
            "also":["sweet white", "light white", "rose"],
            "examples":["shellfish","prawn","crab","langoustine"]
        },
        "soft cheese":{
            "best":["rich white", "light red"],
            "also":["anything but a bold red"],
            "examples":["cream","brie","mascarpone","creme fraiche"]
        },
        "pungent cheese":{
            "best":["dessert","medium red"],
            "also":["bold red", "rose", "light white", "sparkling", "sweet white"],
            "examples":["bleu","gorgonzole","stilton", "roquefort"]
        },
        "hard cheese":{
            "best":["bold red"],
            "also":["medium", "rose", "rich white","sparkling"],
            "examples":["cheddar","cheese","pecorine","manchego","asiago","parmesan"]
        },
        "alliums":{
            "best":["medium red"],
            "also":["anything but a dessert wine"],
            "examples":["onion","shallot","garlic","scallion"]
        },
        "green vegetables":{
            "best":["light white"],
            "also":["sparkling"],
            "examples":["green bean","kale","lettuce","vegetables"]
        },
        "root vegetables":{
            "best":["rose"],
            "also":["rich white", "sweet white"],
            "examples":["squash","turnip","butternut","pumpkin","delicata","carrot"]
        },
        "nightshades":{
            "best":["medium red"],
            "also":["bold red", "rose", "sweet white"],
            "examples":["tomato","eggplant","bell pepper"]
        },
        "funghi":{
            "best":["rich white","light red","medium red"],
            "also":["bold red"],
            "examples":["crimini","maitake","chanterelle"]
        },
        "nut":{
            "best":["sweet white"],
            "also":["sparkling", "light white", "rich white", 'rose','light red'],
            "examples":["seed","peanut","almond","pecan","sesame"]
        },
        "pea":{
            "best":["light white"],
            "also":["sparkling", "rose", "medium"],
            "examples":["bean","lentil","navy","pinto","chickpea"]
        },
        "herb":{
            "best":["light white"],
            "also":["rich white", "rich white", "rose",'light red','medium red'],
            "examples":["thyme","oregano","basil","tarragon"]
        },
        "hot and spicy":{
            "best":["sweet white"],
            "also":["sparkling", "light white"],
            "examples":["hot sauce","habanero","sichuan"]
        },
        "white starche":{
            "best":["A"],
            "also":["A", "A", "A"],
            "examples":["flour","white rice","rice","pasta","bread","tortillas"]
        },
        "whole wheat grains":{
            "best":["rich white"],
            "also":["anything"],
            "examples":["quinoa","farro","brown rice"]
        },
        "sweet starchy vegetables":{
            "best":["sweet white"],
            "also":["rose"],
            "examples":["sweet potato","yucca","taro"]
        },
        "potato":{
            "best":["light white"],
            "also":["anything not dessert"],
            "examples":["potato"]
        },
        "fruit":{
            "best":["sweet white"],
            "also":["sparkling", "dessert"],
            "examples":["berries","strawberry","strawberries","orange","apple","peach"]
        },
        "vanilla":{
            "best":["dessert"],
            "also":["sweet white"],
            "examples":["caramel","ice cream"]
        },
        "chocolate":{
            "best":["dessert"],
            "also":[],
            "examples":["coffee"]
        }
    }
};

var APP_ID = undefined; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var WineMate = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
WineMate.prototype = Object.create(AlexaSkill.prototype);
WineMate.prototype.constructor = WineMate;

WineMate.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the Wine Mate. I can assist you with choosing the perfect wine pairing. "+
    "You could ask me what wine pairs well with a certain food, or what food pairs with a certain wine.";
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

WineMate.prototype.intentHandlers = {
    "foodToWineIntent": function (intent, session, response) {
        var foodSlot = intent.slots.food,
            foodName;
        if (foodSlot && foodSlot.value){
            foodName = foodSlot.value.toLowerCase();
        }
        var wineList = wineListByFood(foodName);
        var speechText = "";
        if (wineList == null) {
            speechText = "I don't know too many specific foods, what type of food is "+foodName+"?";
        }else{
            var best = false;
            if (wineList['best'].length > 1) {
                best = true;
                speechText = "I would highly suggest ";
                for (var i = 0; i < wineList['best'].length - 1; i++) {
                    speechText += wineList['best'][i] + ", ";
                };
                speechText +=" or a " + wineList['best'][wineList['best'].length - 1];
            }else if(wineList['best'].length == 1){
                best = true;
                speechText = "I would highly suggest ";
                speechText += wineList['best'][0];
            }else{
                speechText = "I would suggest ";
            }
            //also list
            if (wineList['also'].length > 1) {
                speechText += ". ";
                for (var i = 0; i < wineList['also'].length - 1; i++) {
                    speechText += wineList['also'][i] + ", ";
                };
                speechText +=" or " + wineList['also'][wineList['also'].length - 1];
                speechText += " would ";
                if (best) {
                    speechText += "also ";
                }
                speechText += "be nice.";
            }else if(wineList['also'].length == 1){
                speechText += ". ";
                speechText += wineList['also'][0];
                speechText += " would ";
                if (best) {
                    speechText += "also ";
                }
                speechText += "be nice.";
            }
        }

        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    },
    "wineToFoodIntent": function (intent, session, response) {
        var wineSlot = intent.slots.wine,
            wineName;
        if (wineSlot && wineSlot.value){
            wineName = wineSlot.value.toLowerCase();
        }
        var fooodList = foodListByWine(wineName);
        var speechText = "";
        if (fooodList == null) {
            speechText = "I don't know too many specific wines, what type of wine is "+wineName+"?";
        }else{
            var best = false;
            if (fooodList['best'].length > 1) {
                best = true;
                speechText = "I would highly suggest a ";
                for (var i = 0; i < fooodList['best'].length - 1; i++) {
                    speechText += fooodList['best'][i] + ", ";
                };
                speechText +=" or a " + fooodList['best'][fooodList['best'].length - 1];
            }else if(fooodList['best'].length == 1){
                best = true;
                speechText = "I would highly suggest a ";
                speechText += fooodList['best'][0];
            }else{
                speechText = "I would suggest a ";
            }
            //also list
            if (fooodList['also'].length > 1) {
                speechText += ". A ";
                for (var i = 0; i < fooodList['also'].length - 1; i++) {
                    speechText += fooodList['also'][i] + ", ";
                };
                speechText +=" or a " + fooodList['also'][fooodList['also'].length - 1];
                speechText += " would ";
                if (best) {
                    speechText += "also ";
                }
                speechText += "be nice.";
            }else if(fooodList['also'].length == 1){
                speechText += ". A ";
                speechText += fooodList['also'][0];
                speechText += " would ";
                if (best) {
                    speechText += "also ";
                }
                speechText += "be nice.";
            }
        }

        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask what foods match with a certain type wine, what wines match with a certain food, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, what wine goes with cured meat, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

function wineListByFood(food){
    var foodDict = pairing['food'];
    for(var key in foodDict){
        var obj = foodDict[key];
        if (key==food) {
            return obj;
        }
        for (var i = 0; i < obj['examples'].length; i++) {
            if (obj['examples'][i]==food) {
                return obj;
            }
        };
    }
    if (food.slice(-1)=='s') {
        food = food.slice(0, -1);
        return wineListByFood(food);
    }else{
        return null;
    }
}
function foodListByWine(wine){
    var rightWine = false;
    var wineDict = pairing['wine'];
    var key;
    for(key in wineDict){
        var obj = wineDict[key];
        if (key==wine) {
            //found the wine
            rightWine=true;
            break;
        }
        for (var i = 0; i < obj.length; i++) {
            if (obj[i]==wine) {
                //found the wine
                rightWine=true;
                break;
            }
        }
        if (rightWine==true) {
            break;
        }
    }
    if (rightWine==true) {
        var foodDict = pairing['food'];
        var foods = {
            "best":[],
            "also":[]
        };
        for(var foodKey in foodDict){
            var obj = foodDict[foodKey];
            var best=false;
            for (var i = 0; i < obj['best'].length; i++) {
                if (key==obj['best'][i]) {
                    foods["best"].push(foodKey);
                    best=true;
                    break;
                }
            }
            if (best) continue;
            for (var i = 0; i < obj['also'].length; i++) {
                if (key==obj['also'][i]) {
                    foods["also"].push(foodKey);
                    break;
                }
            }
        }
        return foods;
    }else{
        //wine not found
        if (wine.slice(-1)=='s') {
            wine = wine.slice(0, -1);
            return foodListByWine(wine);
        }else{
            return null;
        }
    }
}

exports.handler = function (event, context) {
    var wineMate = new WineMate();
    wineMate.execute(event, context);
};
//if all empty / if plurl / big categories
