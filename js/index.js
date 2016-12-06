var input_field = document.getElementById('input');
var output_field = document.getElementById('output');
var button = document.getElementById('submit_button');
var amount_selector = document.getElementById('amount_selector');
//var translations_list = document.getElementById('translations');

let translate_options = ['af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs',
    'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'hi', 'hmn',
    'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk',
    'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'ps', 'fa', 'pl', 'pt', 'ro', 'ru', 'sm', 'gd', 'sr',
    'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'uz', 'vi',
    'cy', 'xh', 'yi', 'yo', 'zu'
]
let translate_options_full = ['Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian', 'Azeerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Bulgarian', 'Catalan', 'Cebuano', 'Chichewa', 'Chinese (Simplified)', 'Chinese (Traditional)', 'Corsican', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Filipino', 'Finnish', 'French', 'Frisian', 'Galician', 'Georgian', 'German', 'Greek', 'Gujarati', 'Haitian-Creole', 'Hausa', 'Hawaiian', 'Hebrew', 'Hindi', 'Hmong', 'Hungarian', 'Icelandic', 'Igbo', 'Indonesian', 'Irish', 'Italian', 'Japanese', 'Javanese', 'Kannada', 'Kazakh', 'Khmer', 'Korean', 'Kurdish', 'Kyrgyz', 'Lao', 'Latin', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Maori', 'Marathi', 'Mongolian', 'Burmese', 'Nepali', 'Norwegian', 'Pashto', 'Persian', 'Polish', 'Portuguese', 'Romanian', 'Russian', 'Samoan', 'Scots - Gaelic', 'Serbian', 'Sesotho', 'Shona', 'Sindhi', 'Sinhala', 'Slovak', 'Slovenian', 'Somali', 'Spanish', 'Sundanese', 'Swahili', 'Swedish', 'Tajik', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Uzbek', 'Vietnamese', 'Welsh', 'Xhosa', 'Yiddish', 'Yoruba', 'Zulu']


let url = "https://translation.googleapis.com/language/translate/v2?key=";
let APIKEY = "AIzaSyByxTYA4CmkD1pGXrCdohEwQJu0455WnhQ";

//$ gcloud auth activate-service-account --key-file=service-account-key-file
$(button).click(function() {
    let text = input_field.value;
    let translate_amount = amount_selector.value;
    let source = 'el';
    let target = '';
    let lang = Math.round(Math.random() * translate_options.length);

    target = translate_options[lang];
    $("#translations").empty();
    translate(process_response, target, source, text, translate_amount);
});


$(input_field).keyup(function(event) {
    if (event.keyCode === 13) {
        $(button).click();
    }
});

function process_response(text, num, source) {
    if(text.length < 1)
    {
      return;
    }
    console.log("num:");
    console.log(num);
    if (num == 1) {
        translate(process_response, 'en', source, text, num - 1);
    } else if (num == 0) {
        output_field.value = text;
    } else {
        do {
            var lang = Math.round(Math.random() * translate_options.length);
            var target = translate_options[lang];
        }
        while (target === source);
        translate(process_response, target, source, text, num - 1);
    }
    let full_pos = translate_options.indexOf(source)
    $("#translations").append('<li class = "list-group-item">' + translate_options_full[full_pos] + ': ' + text + '</li>');
}

function translate(callback, target, source, text, num) {
    if (text.length < 1)
    {
      return;
    }
    let translated_text;
    text = text.replace(/ /g, '%20') //Replaces all spaces with %20, required for the API call
    let query = url + APIKEY + "&source=" + source + "&target=" + target + "&q=" + text; //Query string containing the info for the API call
    console.log(query); //Debug log
    $.getJSON(query, function(response) {
        translated_text = response.data.translations[0].translatedText; // retrieves the info from the returned data
        callback(translated_text, num, target);
    });
}
