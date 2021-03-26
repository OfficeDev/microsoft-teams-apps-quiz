// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { UxUtils } from "./UxUtils";
import { Constants } from "./Constants";

export class Utils {
    /**
     * @description Method to generate GUID
     */
    static generateGUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    /**
     * @description Method to get image dimensions and image div dimensions
     * @param imageURL contains image url
     * @param selector contains image where url placed
     */
    static getClassFromDimension(imgURL, selector) {
        let tmpImg = new Image();
        tmpImg.src = imgURL;
        let imgWidth = 0;
        let imgHeight = 0;
        $(tmpImg).on("load", function () {
            imgWidth = tmpImg.width;
            imgHeight = tmpImg.height;

            let divWidth = Math.round($(selector).width());
            let divHeight = Math.round($(selector).height());
            let getClass = "";
            if (imgHeight > divHeight) {
                /* height is greater than width */
                getClass = ("heightfit");
            } else if (imgWidth > divWidth) {
                /* width is greater than height */
                getClass = ("widthfit");
            } else {
                /* small image */
                getClass = ("smallfit");
            }
            $(selector).addClass(getClass);
            let tid = setInterval(() => {
                if ($(selector).hasClass(getClass) == true) {
                    setTimeout(() => {
                        UxUtils.removeImageLoader($(selector));
                        clearInterval(tid);
                    }, Constants.setIntervalTimeFiveHundred());
                }
            }, Constants.setIntervalTimeHundred());
        });
    }

    /**
     * @description Method for calculating date diff from current date in weeks, days, hours, minutes
     * @param start - Date type
     * @param end - Date type
     * @param weekKey - Week Locale
     * @param hoursKey - hours Locale
     * @param hourKey - hour Locale
     * @param minutesKey - minutes Locale
     * @param minuteKey - minute Locale
     * @param daysKey - days Locale
     * @param dayKey - day Locale
     */
    static calcDateDiff(start, end, weekKey, hoursKey, hourKey, minutesKey, minuteKey, daysKey) {
        let days = (end - start) / (1000 * 60 * 60 * 24);
        let hourText = hourKey;
        let minuteText = minuteKey;
        if (days > 6) {
            let weeks = Math.ceil(days) / 7;
            return Math.floor(weeks) + " " + weekKey;
        } else {
            if (days < 1) {
                let t1 = start.getTime();
                let t2 = end.getTime();

                let minsDiff = Math.floor((t2 - t1) / 1000 / 60);
                let hourDiff = Math.floor(minsDiff / 60);
                minsDiff = minsDiff % 60;

                if (hourDiff > 1) {
                    hourText = hoursKey;
                } else {
                    hourText = hourKey;
                }
                if (hourDiff > 1) {
                    minuteText = minutesKey;
                } else {
                    minuteText = minuteKey;
                }
                if (hourDiff > 0 && minsDiff > 0) {
                    return hourDiff + " " + hourText + ", " + minsDiff + " " + minuteText;
                } else if (hourDiff > 0 && minsDiff <= 0) {
                    return hourDiff + " " + hourText;
                } else if (hourDiff <= 0 && minsDiff > 0) {
                    return minsDiff + " " + minuteText;
                }
            } else {
                return Math.ceil(days) + " " + daysKey;
            }
        }
    }

    /**
     * Method to get base64 data of file
     * @param input object html file type input element
     * @param elem object html elem where preview need to show
     */
    static readURL(input, elem) {
        let fileTypes = ["jpg", "jpeg", "png", "gif", "webp", "jfif"];
        let isSuccess = false;
        $(elem).removeClass("heightfit");
        $(elem).removeClass("widthfit");
        $(elem).removeClass("smallfit");
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            let extension = input.files[0].name.split(".").pop().toLowerCase();
            isSuccess = fileTypes.indexOf(extension) > -1;
            if (isSuccess) {
                reader.onload = function (e) {
                    let image = new Image();
                    image.src = e.target.result;

                    image.onload = function () {
                        let imgWidth = this.width;
                        let imgHeight = this.height;
                        let divWidth = $(elem).width();
                        let divHeight = $(elem).height();
                        $(elem).attr("src", this.src);
                        if (imgHeight > divHeight) {
                            /* height is greater than width */
                            $(elem).addClass("heightfit");
                        } else if (imgWidth > divWidth) {
                            /* width is greater than height */
                            $(elem).addClass("widthfit");
                        } else {
                            /* small image */
                            $(elem).addClass("smallfit");
                        }
                    };
                };
            } else {
                return false;
            }
            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
        return true;
    }

    /*
     * @desc Method to return the input is json object
     * @param str object contains json values
     */
    static isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    static getLocaleForCalendar(language) {
        let lang = "gb";
        switch (language.toLowerCase()) {
            case "en-in":
                lang = "en-GB";
                break;
            case "en-gb":
                lang = "en-GB";
                break;
            case "hi-in":
                lang = "hi";
                break;
            case "ar-sa":
                lang = "ar";
                break;
            case "az-latin-az":
                lang = "az";
                break;
            case "bg-bg":
                lang = "bg";
                break;
            case "bn-in":
                lang = "bn";
                break;
            case "ca-es":
                lang = "ca";
                break;
            case "cs-cz":
                lang = "cs";
                break;
            case "cy-gb":
                lang = "cy";
                break;
            case "da-dk":
                lang = "da";
                break;
            case "de-de":
                lang = "de";
                break;
            case "el-gr":
                lang = "el";
                break;
            case "es-es":
                lang = "es";
                break;
            case "es-mx":
                lang = "es-mx";
                break;
            case "et-ee":
                lang = "et";
                break;
            case "eu-es":
                lang = "eu";
                break;
            case "fi-fi":
                lang = "fi";
                break;
            case "fil-ph":
                lang = "fil-ph";
                break;
            case "fr-ca":
                lang = "fr-ca";
                break;
            case "fr-fr":
                lang = "fr-fr";
                break;
            case "gl-es":
                lang = "gl";
                break;
            case "gu-in":
                lang = "gu";
                break;
            case "he-il":
                lang = "he";
                break;
            case "hr-hr":
                lang = "hr";
                break;
            case "hu-hu":
                lang = "hu";
                break;
            case "id-id":
                lang = "id";
                break;
            case "is-is":
                lang = "is";
                break;
            case "it-it":
                lang = "it";
                break;
            case "ja-jp":
                lang = "ja";
                break;
            case "ka-ge":
                lang = "ka";
                break;
            case "kk-kz":
                lang = "kk";
                break;
            case "kn-in":
                lang = "kn";
                break;
            case "ko-kr":
                lang = "ko";
                break;
            case "lt-lt":
                lang = "lt";
                break;
            case "lv-lv":
                lang = "lv";
                break;
            case "mk-mk":
                lang = "mk";
                break;
            case "ml-in":
                lang = "ml";
                break;
            case "mr-in":
                lang = "mr";
                break;
            case "nb-no":
                lang = "no";
                break;
            case "nn-no":
                lang = "nn-no";
                break;
            case "nl-nl":
                lang = "nl";
                break;
            case "pl-pl":
                lang = "pl";
                break;
            case "pt-br":
                lang = "pt-BR";
                break;
            case "pt-pt":
                lang = "pt-pt";
                break;
            case "ro-ro":
                lang = "ro";
                break;
            case "ru-ru":
                lang = "ru";
                break;
            case "sk-sk":
                lang = "sk";
                break;
            case "sl-si":
                lang = "sl";
                break;
            case "sq-al":
                lang = "sq";
                break;
            case "sr-latn-rs":
                lang = "sr";
                break;
            case "sv-se":
                lang = "sv";
                break;
            case "ta-in":
                lang = "ta";
                break;
            case "te-in":
                lang = "te";
                break;
                case "th-th":
                lang = "th";
                break;
            case "tr-tr":
                lang = "tr";
                break;
            case "uk-ua":
                lang = "uk";
                break;
            case "vi-vn":
                lang = "vi";
                break;
            case "zh-cn":
                lang = "zh-CN";
                break;
            case "zh-tw":
                lang = "zh-TW";
                break;
            default:
                lang = "en-GB";
                break;
        }
        return {
                url: `js/locales/bootstrap-datepicker.${lang}.min.js`,
                lang: lang
            };
    }

}