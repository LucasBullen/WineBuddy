/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

module.exports = {
    "wine": {
        "bold red":{
            "Malbec",
            "Syrah",
            "Shiraz",
            "Mourvedre",
            "Pinotage",
            "Petite Sirah"
        },
        "medium red":{
            "Merlot",
            "Sangiovese"
        },
        "lightRed":{
            "speech":"light red",
            "examples":{
                "Pinot Noir",
                "Grenache",
            }
        },
        "rose":{
            "speech":"rose",
            "examples":{
                "Provencal Rose",
                "White Zinfandel",
            }
        },
        "richWhite":{
            "speech":"rich white",
            "examples":{
                "Chardonnay",
                "Semillon",
            }
        },
        "lightWhite":{
            "speech":"light white",
            "examples":{
                "Sauvignon Blanc",
                "Albarino",
            }
        },
        "sparkling":{
            "speech":"sparkling",
            "examples":{
                "Champagne",
                "Prosecco",
            }
        },
        "sweetWhite":{
            "speech":"sweet white",
            "examples":{
                "Moscate",
                "Riesling",
            }
        },
        "dessert":{
            "speech":"dessert",
            "examples":{
                "Port",
                "Sherry",
            }
        },
    },
    "food": {
        "red meat":{
            "best":{"bold red"},
            "also":{"medium red"},
            "examples":{"beef","lamb","venison"}
        },
        "cured meat":{
            "best":{"light red",},
            "also":{"sweet white"},
            "examples":{"salami","proscuitto","bresaola","bacon"}
        },
    }
};
/*
wine Wcategory
food Fcategory
examples food
wine food weight

*/