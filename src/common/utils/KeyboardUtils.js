// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* Keyboard Accessibility */
import { Constants } from "./Constants";

export class KeyboardAccess {
    /**
     * @Method for keydown event and handles click event based on space and enter
     * @param document object html page object
     * @param event object html selector to perform event
     */
    static keydownClick(document, event) {
        $(document).on({
            keydown: function (e) {
                let key = e.which;
                // Replace this with constant Proper Naming Convension
                if (key === Constants.getEnterKeyEvent() || key === Constants.getSpaceKeyEvent()) {
                    e.preventDefault();
                    $(this).click();
                    return false;
                }
            }
        }, event);
    }

    /**
     * @Method for keydown event and handles click event based on space and enter
     * @param document object html page object
     * @param event object html selector to perform event
     */
    static removeOptionKeydown(document, event) {
        $(document).on({
            keydown: function (e) {
                let key = e.which;
                // Replace this with constant Proper Naming Convension
                if (key === Constants.getEnterKeyEvent() || key === Constants.getSpaceKeyEvent()) {
                    e.preventDefault();
                    $(this).find(".remove-option").click();
                    return false;
                }
            }
        }, event);
    }

    /**
     * @Method for keydown event and handles click event based on space and enter
     * @param document object html page object
     * @param event object html selector to perform event
     */
    static photoBoxKeydown(document, event) {
        $(document).on({
            keydown: function (e) {
                let key = e.which;
                if (key == Constants.getSpaceKeyEvent() || key == Constants.getEnterKeyEvent()) {
                    e.preventDefault();
                    if ($(this).parents("div.section-1").length > 0) {
                        $(event).parents("form.sec1").find(".section-2").find("div.card-box:first").find("input[type='file']").click();
                    } else {
                        $(event).parents("form.sec1").find(".section-2").find("div.card-box:last").find("input[type='file']").click();
                    }
                    return false;
                }
            }
        }, event);
    }

    /**
     * @Method for keydown event and handles click event based on space and enter
     * @param document object html page object
     * @param event object html selector to perform event
     */
    static clearKeydown(document, event) {
        $(document).on({
            keydown: function (e) {
                let key = e.which;
                if (key == Constants.getSpaceKeyEvent() || key == Constants.getEnterKeyEvent()) {
                    e.preventDefault();
                    $(".quiz-clear").get(0).click();
                    return false;
                }
            }
        }, event);
    }

    /**
     * @Method for keydown event and handles click event based on space and enter
     * @param document object html page object
     * @param event object html selector to perform event
     */
    static clearQuizKeydown(document, event) {
        $(document).on({
            keydown: function (e) {
                let key = e.which;
                // Replace this with constant Proper Naming Convension
                if (key === Constants.getEnterKeyEvent() || key === Constants.getSpaceKeyEvent()) {
                    e.preventDefault();
                    $(".quiz-clear").click();
                    return false;
                }
            }
        }, event);
    }

    /**
     * @Method for keydown event and handles click event based on space and enter
     * @param document object html page object
     * @param event object html selector to perform event
     */
    static selectCheckOrRadioKeydown(document, event) {
        $(document).on({
            keydown: function (e) {
                let key = e.which;
                if (key === 13 || key === 32) {
                    e.preventDefault();
                    if ($(this).hasClass("disabled")) {
                        return false;
                    }
                }
            }
        }, event);
    }
}