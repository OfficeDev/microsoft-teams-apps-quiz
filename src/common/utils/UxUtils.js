// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "./Constants";

export class UxUtils {
    /**
     * @method for break line
     */
    static breakline() {
        return `<hr class="small">`;
    }

    /**
     * @method for clear fix div
     */
    static clearFix() {
        return `<div class="clearfix"></div>`;
    }

    /**
     * @Method for creation view Quiz Landing Section
     */
    static getQuizLanding() {
        return `<div class="section-1">
            <div class="container">
                <div id="root">
                    <div class="form-group mb--16">
                        <input type="Text" placeholder="" class="in-t input-title form-control" id="quiz-title" maxlength="${Constants.getInputMaxLength()}"/>
                    </div>
                    <div class="form-group mb--16">
                        <textarea class="form-control in-t font-12" id="quiz-description" maxlength="${Constants.getTextareaMaxLength()}"></textarea>
                    </div>
                    <div class="form-group mb0">
                        <label class="cover-image-label semi-bold mb--8 font-12 cover-image-key app-black-color float-left"></label>
                        <label class="quiz-clear semi-bold mb--8 cursor-pointer pull-right theme-color font-12 clear-key-href clear-key" style="display:none" tabindex="0" role="button"></label>
                        ${this.clearFix()}
                        <div class="relative">
                            <!-- hide this div after img added -->
                            <div class="photo-box card-bg card-border max-min-220 upvj cursor-pointer photo-box-href"  tabindex="0" role="button">
                                <span class="tap-upload-label upload-cover-image-key"></span>
                            </div>
                            <!-- show this div after img added -->
                            <div class="quiz-updated-img max-min-220 card-bg card-border cursor-pointer updated-img bdr-none bg-none fixed-ar fixed-ar-16-9 relative" style="display:none">
                                <div class="loader-cover d-table">
                                    <div class="d-table-cell">
                                        <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span></div>
                                    </div>
                                </div>
                                <img src="" id="quiz-img-preview" class="quiz-updated-img card-bg card-border cursor-pointer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer section-1-footer">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-9 d-table">
                            <div class="d-table-cell">
                                <a  tabindex="0" role="button" class="theme-color cursor-pointer show-setting" id="hide1">
                                    <span>
                                        ${Constants.getSettingCogIcon()}
                                        <span id="due"> </span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="col-3 pl--8 text-right">
                            <button type="button" class="btn btn-primary btn-sm pull-right" id="next" tabindex="0" role="button"> <span class="next-key"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method for creation view Question Landing Section
     */
    static getQuestionContainerLanding() {
        return `<div class="section-2 d-none">
                    <div class="card-box quiz-card-section container quiz-preview-sec">
                        <div class="row">
                            <div class="col-12">
                                <div class="quiz-updated-img max-min-220 card-bg bdr-none bg-none card-border cover-img cursor-pointer mb--16 updated-img relative" style="display:none">
                                    <div class="loader-cover d-table">
                                        <div class="d-table-cell">
                                            <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span></div>
                                        </div>
                                    </div>
                                    <img src="" id="quiz-title-image" style="display:none" class="quiz-updated-img card-bg card-border">
                                    <input type="file" name="quiz_image" class="d-none" id="cover-image" accept="image/*" />
                                </div>
                            </div>
                            <div class="col-12">
                                <h4 id="quiz-title-content" class="mb--8"></h4>
                                <p class="text-justify font-12" id="quiz-description-content"></p>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="">
                            <button type="button" class="btn btn-primary btn-sm" id="add-questions">
                            ${Constants.getPlusIcon()} <span class="add-question-key"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="footer section-2-footer d-none">
                    <div class="footer-padd bt">
                        <div class="container ">
                            <div class="row">
                                <div class="col-9 d-table">
                                    <a class="d-table-cell">
                                        <span tabindex="0" class="cursor-pointer"  id="back-section2" role="button">
                                            ${Constants.getBackCaratIcon()} <span class="back-key"></span>
                                        </span>
                                    </a>
                                </div>
                                <div class="col-3 text-right">
                                    <button type="button" class="btn btn-primary btn-sm pull-right" id="submit" tabindex="0" role="button"> <span class="next-key"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    /**
     * @Method for creation view Question Section
     * @param questionKey string for question locale
     */
    static getQuestionArea(questionKey) {
        return `<div style="display: none;" id="question-section">
            <div class="container question-container" id="question1">
                <div class="card-box card-border card-bg">
                    <div class="form-group-question">
                        <div>
                            <span class="question-number font-12 bold input-group-text mb--8 input-tpt pl-0 strong cursor-pointer">${questionKey} # 1</span>
                            <span class="input-group-text remove-question remove-option-q input-tpt cursor-pointer" aria-hidden="true" >
                                ${Constants.getDeleteIcon()}
                            </span>
                        </div>
                        <div class="question-preview min-max-132 updated-img" style="display:none">
                            <img src="" class="question-preview-image" style="display:none" />
                        </div>
                        <div class="input-group mb--16 input-group-tpt-q">
                            <div class="input-group-append cursor-pointer">
                                ${Constants.getImageIcon()}
                                <input type="file" name="question_image" class="d-none" accept="image/*" id="question-image-1"/>
                            </div>
                            <input type="text" class="form-control in-t pl--32" placeholder="" aria-label="" aria-describedby="basic-addon2" id="question-title" maxlength="${Constants.getTextareaMaxLength()}">
                        </div>
                    </div>
                    <div class="d-flex-ques">
                        <div class="form-group-opt mb--8" id="options">
                            <div class="choice-outer">
                                <div class="option-div">
                                    <div class="row">
                                        <div class="col-12 radio-outer">
                                            <div class="option-preview min-max-132 updated-img" style="display:none">
                                                <img src="" class="option-preview-image" style="display:none" />
                                            </div>
                                            <div class="input-group input-group-tpt mb--8 ">
                                                <div class="input-group-append left cursor-pointer">
                                                    ${Constants.getImageIcon()}
                                                    <input type="file" name="option_image" class="d-none" accept="image/*" id="option-image-1"/>
                                                </div>
                                                <input type="text" class="form-control in-t opt-cls pl--32" placeholder="" aria-label="Option 1" aria-describedby="basic-addon2" id="option1" maxlength="${Constants.getInputMaxLength()}">
                                                <div class="input-group-append  input-tpt trash-ic cursor-pointer remove-option-href" tabindex="0" role="checkbox">
                                                    <span class="remove-option">
                                                        ${Constants.getDeleteIcon()}
                                                    </span>
                                                </div>
                                                <div class="input-group-append check-opt check-me-title"  title="" tabindex="0" role="checkbox">
                                                    <span class="input-group-text input-tpt cursor-pointer">
                                                        ${Constants.getTickIcon()}
                                                    </span>
                                                </div>
                                                <div class="text-right text-success">
                                                    <p class="checked-status"> </p>
                                                    <input type="checkbox" class="form-check-input d-none" id="check1" value="yes">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="option-div">
                                    <div class="row">
                                        <div class="col-12 radio-outer">
                                            <div class="option-preview min-max-132 updated-img" style="display:none">
                                                <img src="" class="option-preview-image" style="display:none" />
                                            </div>
                                            <div class="input-group input-group-tpt mb--8">
                                                <div class="input-group-append left cursor-pointer">
                                                    ${Constants.getImageIcon()}
                                                    <input type="file" name="option_image" class="d-none" accept="image/*" id="option-image-2"/>
                                                </div>
                                                <input type="text" class="form-control in-t opt-cls pl--32" placeholder="" aria-label="Option 2" aria-describedby="basic-addon2" id="option2" maxlength="${Constants.getInputMaxLength()}">
                                                <div class="input-group-append input-tpt trash-ic cursor-pointer" tabindex="0" role="button">
                                                    <span class="remove-option">
                                                        ${Constants.getDeleteIcon()}
                                                    </span>
                                                </div>
                                                <div class="input-group-append check-opt check-me-title" title=""  tabindex="0" role="checkbox">
                                                    <span class="input-group-text input-tpt cursor-pointer">
                                                        ${Constants.getTickIcon()}
                                                    </span>
                                                </div>
                                                <div class="text-right text-success">
                                                    <p class="checked-status"> </p>
                                                    <input type="checkbox" class="form-check-input d-none" value="yes" id="check2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <button type="button" class="teams-link add-options" tabindex="0" role="button">
                                        ${Constants.getPlusIcon()}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ${this.clearFix()}
        </div>`;
    }

    /**
     * @Method for creation view Option Section
     */
    static getOptionSection() {
        return `<div style="display: none;" id="option-section">
            <div class="option-div">
                <div class="row">
                    <div class="col-12 radio-outer">
                        <div class="option-preview min-max-132 updated-img" style="display:none">
                            <img src="" class="option-preview-image" style="display:none" />
                        </div>
                        <div class="input-group input-group-tpt mb--8">
                            <div class="input-group-append left cursor-pointer">
                                ${Constants.getImageIcon()}
                                <input type="file" name="option_image" class="d-none" accept="image/*" id="option-image-1"/>
                            </div>
                            <input type="text" class="form-control in-t opt-cls pl--32" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" id="option-1" maxlength="${Constants.getInputMaxLength()}">
                            <div class="input-group-append input-tpt trash-ic cursor-pointer remove-option-href" tabindex="0" role="button">
                                <span class="remove-option">
                                    ${Constants.getDeleteIcon()}
                                </span>
                            </div>
                            <div class="input-group-append check-opt check-me-title" title=""  tabindex="0" role="checkbox">
                                <span class="input-group-text input-tpt cursor-pointer">
                                    ${Constants.getTickIcon()}
                                </span>
                            </div>
                            <div class="text-right text-success">
                                <p class="checked-status"> </p>
                                <input type="checkbox" class="form-check-input" value="yes" id="check2" style="display:none">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method for creation view setting back button
     */
    static getSettingBackButton() {
        return `<div style="display:none" id="setting">
            <div class="container setting-section">
                <div class="row">
                    <div class="col-sm-12">
                        <label class="mb--8"><strong class="due-by-key bold"></strong></label>
                    </div>
                    ${this.clearFix()}
                    <div class="col-6 pr--4">
                        <div class="input-group date form_date" data-date="1979-09-16T05:25:07Z" data-date-format="M dd, yyyy" data-link-field="dtp_input1">
                            <input class="form-control in-t" size="16" name="expiry_date" type="text" value="" readonly>
                        </div>
                    </div>
                    <div class="col-6 pl--4">
                        <div class="input-group date form_time" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                            <input class="form-control in-t" name="expiry_time" size="16" type="text" value="" readonly>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                    </div>
                    ${this.clearFix()}
                    <div class="d-none">
                        <div class="col-12">
                            <label><strong class="result-visible-key"></strong></label>
                        </div>
                        ${this.clearFix()}
                        <div class="col-12">
                            <div class="custom-radio-outer">
                                <label class="custom-radio">
                                    <input type="radio" name="visible_to" class="visible-to" value="Everyone" >
                                    <span class="radio-block"></span> <span class="everyone-key"></span>
                                </label>
                            </div>
                            <div class="custom-radio-outer">
                                <label class="custom-radio">
                                    <input type="radio" name="visible_to" class="visible-to" value="Only me" checked><span
                                        class="radio-block"></span> <span class="onlyme-key"></span>
                                </label>
                            </div>
                        </div>
                        ${this.clearFix()}
                    </div>
                    <div class="col-12 mt--24">
                        <div class="input-group form-check custom-check-outer">
                            <label class="custom-check form-check-label">
                                <input type="checkbox" name="show_correctAnswer" id="show-correct-answer" value="Yes"/>
                                <span class="checkmark"></span>
                                <p class="show-correct-key"></p>
                                <span class="answer-cannot-change-key sub-text mt--4 d-block"></span>
                            </label>
                        </div>
                    </div>
                    ${this.clearFix()}
                </div>
                <div class="footer">
                    <div class="footer-padd bt">
                        <div class="container ">
                            <div class="row">
                                <div class="col-9">
                                    <div class="d-table">
                                        <a>
                                            <span tabindex="0" role="button" class="cursor-pointer" id="back">
                                                ${Constants.getBackCaratIcon()} <span class="back-key"></span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method for creation view loader
     */
    static getLoader() {
        return `<div class="loader-overlay" style="display:none">
                <div class="loader-outer">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @Method for response view landing page
     */
    static getResponseLandingSection() {
        return `<div class="text-counter-ques">
            <div class="">
                <div class="hover-btn ">
                    <span class="float-right result"></span>
                </div>
                ${this.clearFix()}
            </div>
            <p class="mb--16 text-description semi-bold font-12"></p>
        </div>`;
    }

    /**
     * @Method for footer section of response view
     */
    static getFooterResponseSection() {
            return `<div class="footer section-1-footer">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-4"> </div>
                        <div class="col-4 text-center"> </div>
                        <div class="col-4 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right" id="start"> </button></div>
                    </div>
                </div>
            </div>
        </div>`;
        }
        /**
         * @Method for question section of response view
         */
    static getResponseQuestionSection() {
        return `<div class="card-box-question">
            <div class="d-table mb--4 pre-none">
                <label class="font-12">
                    <strong class="question-number-title bold">1. ksklaskdl</strong>
                </label>
                <label class="float-right result-status" id="status-1">
                </label>
            </div>
            <div>
                <div class="quiz-updated-img bg-none bdr-none cover-img min-max-132 mb--8 relative" style="display: none">
                    <div class="loader-cover d-table">
                        <div class="d-table-cell">
                            <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span></div>
                        </div>
                    </div>
                    <img src="" class="image-responsive question-template-image" style="display: none" />
                </div>
                <div class="semi-bold font-16 mb--16 question-title"><p class="">How many days in a week?</p></div>
            </div>
            <div class="option-sec"></div>
        </div>`;
    }

    /**
     * @Method for get footer pagination section
     */
    static getPaginationFooterSection() {
        return `<div class="footer section-1-footer">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-4">
                            <button type="button" class="tpt-btn disabled" id="previous"  data-prev-id="0"  tabindex="0" role="button">
                                ${Constants.getBackCaratIcon()} <span class="prev-key"></span>
                            </button>
                        </div>
                        <div class="col-4 text-center" id="xofy"> 1 of 4</div>
                        <div class="col-4 text-right">
                            <button type="button" class="tpt-btn pull-right" id="check" data-next-id="1" tabindex="0" role="button"> <span class="check-key"></span>
                                ${Constants.getNextCaratIcon()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method for Summary Section Landing in Response View
     */
    static getSummarySection() {
        return `<div class="summary-section"></div>`;
    }

    /**
     * @Method for Summary Footer section in Response View
     */
    static getSummaryFooterSection() {
        return `<div class="footer section-1-footer">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-4"> </div>
                        <div class="col-4 text-center"> </div>
                        <div class="col-4 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right submit-key" id="submit"> </button></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method for close footer button for already responded in Response View
     */
    static getCloseFooterSection() {
        return `<div class="footer section-1-footer">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-4"> </div>
                        <div class="col-4 text-center"> </div>
                        <div class="col-4 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right close-key" id="close-event" tabindex="0" role="button"> </button></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method for radiobox if answer is correct and user answered it
     * @param id string identifier
     * @param text string contains checkbox text
     */
    static getRadioInnerResponderQuestionSuccess(id, text) {
        return `<div class="card-box card-bg card-border alert-success mb--8">
            <div class="radio-section custom-radio-outer" id="${id} " columnid="3 ">
                <label class="custom-radio d-block font-14">
                    <span class="radio-block selected "></span>
                    <div class="pr--32 check-in-div font-12">${text}  &nbsp;
                        <i class="success-with-img">
                            ${Constants.getTickIcon()}
                        </i>
                    </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for radiobox if answer is incorrect and user answered it
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getRadioInnerResponderQuestionCorrect(id, text) {
        return `<div class="card-box card-bg card-border alert-danger mb--8">
                <div class="radio-section custom-radio-outer" id="${id}">
                    <label class="custom-radio d-block selected font-14">
                        <span class="radio-block selected"></span>
                        <div class="pr--32 check-in-div font-12">
                        ${text}
                        </div>
                    </label>
                </div>
            </div>`;
    }

    /**
     * @Method for radio if user answered is incorrect
     * @param id string identifier
     * @param text string contains checkbox text
     */
    static getRadioInnerResponderQuestionCorrect2(id, text) {
        return `<div class="card-box card-bg card-border mb--8">
            <div class="radio-section custom-radio-outer" id="${id}">
                <label class="custom-radio d-block selected font-14">
                    <span class="radio-block"></span>
                    <div class="pr--32 check-in-div font-12">${text} &nbsp;
                        <i class="success-with-img">
                            ${Constants.getTickIcon()}
                        </i>
                    </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for radio if answer is incorrect and not responded by user
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getRadioInnerResponderQuestionNormal(id, text) {
        return `<div class="card-box card-bg card-border mb--8">
            <div class=" radio-section custom-radio-outer " id="${id}" columnid="3 ">
                <label class="custom-radio d-block font-14">
                    <span class="radio-block"></span><div class="pr--32 check-in-div font-12">${text}</div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for checkbox if answer is correct and responded by user
     * @param id string identifier
     * @param text string contains checkbox text
     */
    static getCheckboxForInnerResponderQuestionSuccess(id, text) {
        return `<div class="card-box card-bg card-border alert-success mb--8">
            <div class="radio-section custom-check-outer" id="${id} " columnid="3 ">
                <label class="custom-check d-block font-14">
                    <span class="checkmark selected "></span>
                    <div class="pr--32 check-in-div font-12">${text}&nbsp;
                        <i class="success-with-img">
                            ${Constants.getTickIcon()}
                        </i>
                    </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for checkbox if answer is incorrect and responded by user
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getCheckboxForInnerResponderQuestionCorrect(id, text) {
        return `<div class="card-box card-bg card-border alert-danger mb--8">
            <div class="radio-section custom-check-outer" id="${id}">
                <label class="custom-check d-block selected font-14">
                    <span class="checkmark selected"></span>
                    <div class="pr--32 check-in-div font-12">
                    ${text}
                    </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for checkbox if answer is incorrect and no responded by user
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getCheckboxForInnerResponderQuestionNormal(id, text) {
        return `<div class="card-box card-bg card-border mb--8 ">
            <div class=" radio-section custom-check-outer " id="${id}" columnid="3 ">
                <label class="custom-check d-block font-14">
                    <span class="checkmark"></span><div class="pr--32 check-in-div font-12">${text}</div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for checkbox if answer is incorrect and no responded by user
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getCheckboxForInnerResponderQuestionCorrect2(id, text) {
        return `<div class="card-box card-bg card-border mb--8">
            <div class="radio-section custom-check-outer" id="${id}">
                <label class="custom-check d-block selected font-14">
                    <span class="checkmark"></span>
                    <div class="pr--32 check-in-div font-12">${text} &nbsp;
                        <i class="success-with-img">
                            ${Constants.getTickIcon()}
                        </i>
                        </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method to get non responder initials with name
     * @param initials string
     * @param name string
     */
    static getInitialNonResponders(initials, name) {
        return `<tr>
            <td>
                <div class="d-flex">
                    <div class="avtar">
                        ${initials}
                    </div>
                    <div class="avtar-txt">${name}</div>
                </div>
            </td>
        </tr>`;
    }

    /**
     * @Method to get responder initials with name
     * @param initials string
     * @param name string
     * @param result string localization string
     */
    static getInitialsResponders(myUserId, initials, result) {
        return `<div class="d-flex cursor-pointer getresult" data-attr="home" id="${myUserId}">
                    <div class="avtar">
                        ${initials}
                    </div>
                    <div class="avtar-txt">${result}</div>
                </div>
                ${this.breakline()}`;
    }

    /**
     * @Method to get aggregrate cotainer data with detail
     * @param myUserId string of userd id
     * @param resultLocale string localization string
     */
    static getaggregrateTextContainer(myUserId, resultLocale) {
        return `${this.clearFix()}
        ${this.breakline()}
        <div class="d-flex cursor-pointer" data-attr="home" id="${myUserId}">
            <p class="semi-bold font-14">${resultLocale}</p>
        </div>
        ${this.breakline()}`;
    }

    /**
     * @Method to get nonresponder section page footer area in summary view
     */
    static getFooterResNonResDetailView() {
        return `<div class="footer">
            <div class="footer-padd bt">
                <div class="container">
                    <div class="row">
                        <div class="col-9">
                            <a>
                                <span tabindex="0" role="button" id="hide2" class="cursor-pointer back">
                                    ${Constants.getBackCaratIcon()} <span class="back-key"></span>
                                </span>
                            </a>
                        </div>
                        <div class="col-3"><button class="btn btn-tpt">&nbsp;</button></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get user result section page footer area in summary view
     * @param userId string identifier for user id
     * @param backKey string localization for back string
     */
    static getFooterUserResultPage(userId, backKey) {
        return `<div class="footer">
            <div class="footer-padd bt">
                <div class="container">
                    <div class="row">
                        <div class="col-9 d-table">
                            <a>
                                <span tabindex="0" role="button" class="cursor-pointer back1" userid-data="${userId}" id="hide2">
                                    <svg role="presentation" focusable="false" viewBox="8 8 16 16" class="back-btn">
                                        <path class="ui-icon__outline gr" d="M16.38 20.85l7-7a.485.485 0 0 0 0-.7.485.485 0 0 0-.7 0l-6.65 6.64-6.65-6.64a.485.485 0 0 0-.7 0 .485.485 0 0 0 0 .7l7 7c.1.1.21.15.35.15.14 0 .25-.05.35-.15z">
                                        </path>
                                        <path class="ui-icon__filled" d="M16.74 21.21l7-7c.19-.19.29-.43.29-.71 0-.14-.03-.26-.08-.38-.06-.12-.13-.23-.22-.32s-.2-.17-.32-.22a.995.995 0 0 0-.38-.08c-.13 0-.26.02-.39.07a.85.85 0 0 0-.32.21l-6.29 6.3-6.29-6.3a.988.988 0 0 0-.32-.21 1.036 1.036 0 0 0-.77.01c-.12.06-.23.13-.32.22s-.17.2-.22.32c-.05.12-.08.24-.08.38 0 .28.1.52.29.71l7 7c.19.19.43.29.71.29.28 0 .52-.1.71-.29z">
                                        </path>
                                    </svg> <span class="back-key">${backKey}</span>
                                </span>
                            </a>
                        </div>
                        <div class="col-3">&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get close button footer area in summary view
     * @param closeKey string containe close button localization string
     */
    static getFooterCloseArea(closeKey) {
        return `<div class="footer">
            <div class="footer-padd bt">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-right">
                            <button type="button" class="btn btn-primary btn-sm pull-right close-key" id="closeKey"> ${closeKey}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get download button footer area in summary view
     * @param downloadKey string Localization for download string
     * @param downloadImageKey string Localization for download image string
     * @param downloadCSVKey string Localization for downloa csv string
     */
    static getFooterDownloadButton(downloadKey, downloadImageKey, downloadCSVKey) {
        return `<div class="footer">
            <div class="footer-padd bt">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-right">
                            <div class="dropdown btn-group">
                                <button type="button" class="btn btn-primary  dd-btn" id="downloadImage"  data-toggle="dropdown" data-bind="enable: !noResults()">
                                    <span class="span1 add-content-label" id="download-key">${downloadKey}</span>
                                </button>
                                <button type="button" class="btn btn-primary   dropdown-toggle dd-btn" data-toggle="dropdown" aria-expanded="false">
                                        <span class="span2">
                                        <svg role="presentation" fill="#fff" width="16" height="16" focusable="false" viewBox="8 5 16 16" ><path class="ui-icon__outline cw" d="M16.38 20.85l7-7a.485.485 0 0 0 0-.7.485.485 0 0 0-.7 0l-6.65 6.64-6.65-6.64a.485.485 0 0 0-.7 0 .485.485 0 0 0 0 .7l7 7c.1.1.21.15.35.15.14 0 .25-.05.35-.15z"></path><path class="ui-icon__filled" d="M16.74 21.21l7-7c.19-.19.29-.43.29-.71 0-.14-.03-.26-.08-.38-.06-.12-.13-.23-.22-.32s-.2-.17-.32-.22a.995.995 0 0 0-.38-.08c-.13 0-.26.02-.39.07a.85.85 0 0 0-.32.21l-6.29 6.3-6.29-6.3a.988.988 0 0 0-.32-.21 1.036 1.036 0 0 0-.77.01c-.12.06-.23.13-.32.22s-.17.2-.22.32c-.05.12-.08.24-.08.38 0 .28.1.52.29.71l7 7c.19.19.43.29.71.29.28 0 .52-.1.71-.29z"></path></svg>
                                    </span>
                                </button>
                                <ul class="dropdown-menu" style="top:22px">
                                    <li class="cursur-pointer" id="downloadImage">
                                    <a id="add-text" tabindex="0" role="button">
                                        <span class="text-label" id="download-image-key">${downloadImageKey}</span></a>
                                    </li>
                                    <li class="cursur-pointer" id="downloadCSV">
                                        <a id="add-photo" tabindex="0" role="button">
                                            <span class="photo-label" id="download-csv-key">${downloadCSVKey}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get back button at footer area in summary view
     * @param backKey string Localization for back string
     */
    static getFooterBackDetailView(backKey) {
        return `<div class="footer">
            <div class="footer-padd bt">
                <div class="container">
                    <div class="row">
                        <div class="col-9 d-table">
                            <a>
                                <span tabindex="0" role="button" class="cursor-pointer back" id="hide2">
                                    <svg role="presentation" focusable="false" viewBox="8 8 16 16" class="back-btn">
                                        <path class="ui-icon__outline gr" d="M16.38 20.85l7-7a.485.485 0 0 0 0-.7.485.485 0 0 0-.7 0l-6.65 6.64-6.65-6.64a.485.485 0 0 0-.7 0 .485.485 0 0 0 0 .7l7 7c.1.1.21.15.35.15.14 0 .25-.05.35-.15z">
                                        </path>
                                        <path class="ui-icon__filled" d="M16.74 21.21l7-7c.19-.19.29-.43.29-.71 0-.14-.03-.26-.08-.38-.06-.12-.13-.23-.22-.32s-.2-.17-.32-.22a.995.995 0 0 0-.38-.08c-.13 0-.26.02-.39.07a.85.85 0 0 0-.32.21l-6.29 6.3-6.29-6.3a.988.988 0 0 0-.32-.21 1.036 1.036 0 0 0-.77.01c-.12.06-.23.13-.32.22s-.17.2-.22.32c-.05.12-.08.24-.08.38 0 .28.1.52.29.71l7 7c.19.19.43.29.71.29.28 0 .52-.1.71-.29z">
                                        </path>
                                    </svg> <span class="back-key">${backKey}</span>
                                </span>
                            </a>
                        </div>
                        <div class="col-3">&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get change date section in summary view
     * @param changeDueDateKey string Localization for change due date string
     * @param cancelKey string Localization for cancel string
     * @param changeKey string Localization for change string
     */
    static getChangeDateSection(changeDueDateKey, cancelKey, changeKey) {
        return `<div class="change-date">
            <div class="card-box card-bg card-border">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="mb--8"><strong class="due-by-key bold change-due-date-key">${changeDueDateKey}</strong></h4>
                    </div>
                    ${this.clearFix()}
                    <div class="col-6 pr--4">
                        <div class="input-group date form_date" data-date="1979-09-16T05:25:07Z" data-date-format="M dd, yyyy" data-link-field="dtp_input1">
                            <input class="form-control in-t" size="16" name="expiry_date" type="text" value="" readonly>
                        </div>
                    </div>
                    <div class="col-6 pl--4">
                        <div class="input-group date form_time" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                            <input class="form-control in-t" name="expiry_time" size="16" type="text" value="" readonly>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex-alert mt--16 mb--8">
                            <div class="pl--8 text-right">
                                <button type="button" class="btn btn-primary-outline btn-sm cancel-question-delete mr--8 cancel-key">${cancelKey}</button><button type="button" class="btn btn-primary btn-sm disabled change-key" id="change-quiz-date">${changeKey}</button>
                            </div>
                        </div>
                    </div>
                    ${this.clearFix()}
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get close quiz section in summary view
     * @param closeQuizKey string Localization for close quiz string
     * @param closeQuizConfirmKey string Localization for close quiz confirmation string
     * @param cancelKey string Localization for cancel string
     * @param confirmKey string Localization for confirm string
     */
    static getCloseQuizSection(closeQuizKey, closeQuizConfirmKey, cancelKey, confirmKey) {
        return `<div class="close-quiz">
            <div class="card-box card-bg card-border">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="mb--8"><strong class="due-by-key bold close-quiz-key">${closeQuizKey}</strong></h4>
                    </div>
                    ${this.clearFix()}
                    <div class="col-12">
                        <label class="confirm-box text-danger close-quiz-confirm-key">${closeQuizConfirmKey}</label>
                        <div class="d-flex-alert mt--16 mb--8">
                            <div class=" pl--8 text-right">
                                <button type="button" class="btn btn-primary-outline btn-sm cancel-question-delete mr--8 cancel-key">${cancelKey}</button><button type="button" class="btn btn-primary btn-sm confirm-key" id="change-quiz-question">${confirmKey}</button>
                            </div>
                        </div>
                    </div>
                    ${this.clearFix()}
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method contains delete quiz section
     * @param deleteQuizKey string Localization for delete quiz string
     * @param deleteQuizConfirmKey string Localization for delete quiz confirmation string
     * @param cancelKey string Localization for cancel string
     * @param confirmKey string Localization for confirm string
     */
    static deleteQuizSection(deleteQuizKey, deleteQuizConfirmKey, cancelKey, confirmKey) {
        return `<div class="delete-quiz">
            <div class="card-box card-bg card-border">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="mb--8"><strong class="due-by-key bold delete-quiz-key">${deleteQuizKey}</strong></h4>
                    </div>
                    ${this.clearFix()}
                    <div class="col-12">
                        <label class="confirm-box text-danger delete-quiz-confirm-key">${deleteQuizConfirmKey} </label>
                        <div class="d-flex-alert mt--16 mb--8">
                            <div class="pl--8 text-right">
                                <button type="button" class="btn btn-primary-outline btn-sm cancel-question-delete mr--8 cancel-key">${cancelKey}</button><button type="button" class="btn btn-primary btn-sm confirm-key" id="delete-quiz">${confirmKey}</button>
                            </div>
                        </div>
                    </div>
                    ${this.clearFix()}
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method contains delete quiz section
     * @param sureDeleteThisKey string Localization for delete quiz string
     * @param cancelKey string Localization for cancel string
     * @param okKey string Localization for confirm string
     */
    static deleteOption(sureDeleteThisKey, cancelKey, okKey) {
        return `<div class="confirm-box">
                <div class="clearfix"></div>
                <div class="d-flex-alert  mb--8">
                    <div class="pr--8">
                        <label class="confirm-box text-danger"> ${sureDeleteThisKey} </label>
                    </div>
                    <div class="pl--8 text-right">
                        <button type="button" class="btn btn-primary-outline btn-sm cancel-question-delete mr--8">${cancelKey}</button>
                        <button type="button" class="btn btn-primary btn-sm" id="delete-question">${okKey}</button>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @Method getQuizAtleastOneError contains atleast one question required error
     * @param resultLocale string Localization for quiz string
     */
    static getQuizAtleastOneError(resultLocale) {
        return `<label class="text-danger d-block question-required-err"><font class="mb--4 d-block">${resultLocale}</font></label>`;
    }

    /**
     * @Method contains score container section
     * @param resultLocale string Localization for score string
     * @param scorePercentage Float value contain score with two decimal
     */
    static getScoreContainer(resultLocale, scorePercentage) {
        return `<div class="d-flex"><p class="semi-bold pr--8">${resultLocale} ${scorePercentage}%</p></div>`;
    }

    /**
     * @Method contains score container section fro responder view
     * @param resultLocale string Localization for score string
     * @param scorePercentage Float value contain score with two decimal
     */
    static getScoreResponderContainer(resultLocale, scorePercentage) {
        return `<div class="d-flex"><p class="semi-bold font-14">${resultLocale} ${scorePercentage}%</p></div>`;
    }

    /**
     * @Method contains quiz image template
     * @param imageUrl string contains image url
     */
    static quizTemplateImageWithLoader(imageUrl) {
        return `<div class="quiz-updated-img relative cover-img min-max-132 mb--8">
            <div class="loader-cover d-table">
                <div class="d-table-cell">
                    <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span></div>
                </div>
            </div>
            <img src="${imageUrl} " class="question-image img-responsive"  crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains question image template
     * @param imageUrl string contains image url
     */
    static questionTemplateImage(imageUrl) {
        return `<div class="quiz-updated-img relative cover-img min-max-132 mb--8">
            <img src="${imageUrl}" class="image-responsive question-template-image"  crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains aggregrate score area
     * @param aggregrateQuestionScore Float contains score with two decimal
     * @param correctKey string contains localization of correct string
     */
    static getAggregrateScoreContainer(aggregrateQuestionScore, correctKey) {
        return `<span class="semi-bold">${aggregrateQuestionScore}% ${correctKey}</span>`;
    }

    /**
     * @Method contains question number area in detail view
     * @param questionKey string localization of question string
     * @param count Integer contains question numner
     */
    static getQuestionNumberContainerResponder(questionKey, count) {
        return `<strong class="question-title semi-bold"><span  class="question-number">${questionKey} # ${count}</span></strong></label> </strong>`;
    }

    /**
     * @Method contains question number area
     * @param questionKey string localization of question string
     * @param count Integer contains question numner
     */
    static getQuestionNumberContainer(questionKey, count) {
        return `<label class="font-12">
                    <strong class="question-title semi-bold">
                        <span  class="question-number font-12 bold">${questionKey} # ${count}</span>
                    </strong>
                </label>`;
    }

    /**
     * @Method contains question title area
     * @param displayName string question title
     */
    static getQuestionTitleContainer(displayName) {
        return `<div class="semi-bold font-16 mb--16 ">${displayName}</div>`;
    }

    /**
     * @Method contains question Image with loader
     * @param imageUrl string contains image url
     */
    static getQuestionImageWithLoader(imageUrl) {
        return `<div class="option-image-section relative cover-img min-max-132 mb--4">
            <div class="loader-cover d-table">
                <div class="d-table-cell">
                    <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span></div>
                </div>
            </div>
            <img src="${imageUrl} " class="question-image img-responsive"  crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains option Image with loader
     * @param imageUrl string contains image url
     */
    static getOptionImageWithLoader(imageUrl) {
        return `<div class="option-image-section relative cover-img min-max-132 mb--4">
            <div class="loader-cover d-table">
                <div class="d-table-cell">
                    <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span></div>
                </div>
            </div>
            <img src="${imageUrl}" class="opt-image img-responsive" crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains option Image with loader
     * @param imageUrl string contains image url
     */
    static getOptionImage(imageUrl) {
        return `<div class="option-image-section relative cover-img min-max-132 mb--4">
            <img src="${imageUrl}" class="opt-image img-responsive" crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains radio
     * @param optId string contains option id
     * @param ind string contains index number
     * @param text string contains text for radiobox
     */
    static getRadioboxSimple(optId, ind, text) {
        return `<div class="radio-section custom-radio-outer " id="${optId}" columnid="${ind}">
                    <label class="custom-radio d-block font-12 cursor-pointer ">
                        <span class="radio-block"></span>
                        <div class="pr--32 check-in-div font-12">${text}</div>
                    </label>
                </div>`;
    }

    /**
     * @Method contains radio with correct response
     * @param optId string contains option id
     * @param ind string contains index number
     * @param text string contains text for radiobox
     */
    static getCorrectRadiobox(optId, ind, text) {
        return `<div class="radio-section custom-radio-outer " id="${optId}" columnid="${ind}">
                    <label class="custom-radio d-block font-12 cursor-pointer ">
                        <span class="radio-block"></span>
                        <div class="pr--32 check-in-div font-12">${text} &nbsp;
                            <i class="success">
                                ${Constants.getTickIcon()}
                            </i>
                        </div>
                    </label>
                </div>`;
    }

    /**
     * @Method contains checbox area
     * @param optId string contains option id
     * @param ind string contains index number
     * @param text string contains text for radiobox
     */
    static getCheckboxSimple(optId, ind, text) {
        return `<div class="radio-section custom-check-outer " id="${optId}" columnid="${ind}">
                    <label class="custom-check d-block font-12 cursor-pointer ">
                        <span class="checkmark"></span>
                        <div class="pr--32 check-in-div font-12">${text}</div>
                    </label>
                </div>`;
    }

    /**
     * @Method contains checkbox with correct response
     * @param optId string contains option id
     * @param ind string contains index number
     * @param text string contains text for radiobox
     */
    static getCorrectCheckbox(optId, ind, text) {
        return `<div class="radio-section custom-check-outer " id="${optId}" columnid="${ind}">
            <label class="custom-check d-block font-12 cursor-pointer ">
                <span class="checkmark"></span>
                <div class="pr--32 check-in-div font-12">${text} &nbsp;
                    <i class="success">
                        ${Constants.getSuccessTickIcon()}
                    </i>
                </div>
            </label>
        </div>`;
    }

    /**
     * @Method contains responders response date with score
     * @param responderId string contains responder id identifier
     * @param initials string contains initals of responders
     * @param name string contains name of responders
     * @param date string contains date of response
     * @param scoreKey string contains localization of score
     * @param score Float two decimal score
     */
    static getResponderScoreWithDate(responderId, initials, name, date, scoreKey, score) {
        return `<tr id="${responderId}" class="getresult cursor-pointer" tabindex="0" rol="button">
            <td>
                <div class="d-flex ">
                    <div class="avtar">
                        ${initials}
                    </div>
                    <div class="avtar-txt">${name}</div>
                </div>
            </td>
            <td  class="text-right date-text">
                ${date}
                ${Constants.getCaratRight()}
                <p class="semi-bold pr--8">${scoreKey} ${score}%</p>
            </td>
        </tr>`;
    }

    /**
     * @Method contains quiz banner image with loader
     * @param url string contains image url
     */
    static getQuizBannerImageWithLoader(url) {
        return `<div class="quiz-updated-img relative max-min-220 card-bg card-border cover-img upvj cursur-pointer mb--16 bg-none bdr-none">
            <div class="loader-cover d-table">
                <div class="d-table-cell">
                    <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span></div>
                </div>
            </div>
            <img src="${url}" class="image-responsive quiz-template-image" crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains creator view quiz date section marked under ...
     * @param changeDueByKey string contains Localization of change quiz date
     * @param closeQuizKey string contains Localization of close quiz
     * @param deleteQuizKey string contains Localization of delete quiz
     */
    static creatorQuizDateManageSection(changeDueByKey, closeQuizKey, deleteQuizKey) {
        return `<label class="float-right font-12 bold" id="status-1"><span class="semi-bold">
                <div class="threedots dropdown">
                    <button type="button" class="btn btn-tpt btn-plain dropdown-toggle" data-toggle="dropdown" tabindex="0" role="button">
                        <svg role="presentation" focusable="false" viewBox="8 8 16 16" class=""><g class="ui-icon__filled"><circle cx="22" cy="16" r="2"></circle><circle cx="16" cy="16" r="2"></circle><circle cx="10" cy="16" r="2"></circle></g><g class="ui-icon__outline cw"><circle cx="22" cy="16" r="1.5"></circle><circle cx="16" cy="16" r="1.5"></circle><circle cx="10" cy="16" r="1.5"></circle></g></svg>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item change-due-by-event" tabindex="0" role="button">
                            ${Constants.getChangeDueDateIcon()}
                            <span class="change-due-by-key">${changeDueByKey}</span>
                        </a>
                        <a class="dropdown-item close-quiz-event" tabindex="0" role="button">
                            ${Constants.getCloseQuizDateIcon()}
                            <span class="close-quiz-key">${closeQuizKey}</span>
                        </a>
                        <a class="dropdown-item delete-quiz-event" tabindex="0" role="button">
                            ${Constants.getDeleteQuizIcon()}
                            <span class="delete-quiz-key">${deleteQuizKey}</span>
                        </a>
                    </div>
                </div>
            </span></label>`;
    }

    /**
     * @Method contains responders quiz date
     * @param expiryTime string contains quiz expiry time
     * @param currentTimestamp string contains current date timestamp
     * @param dueByKey string contains Localization of due by string
     * @param expiredOnKey string contains Localization of expired on string
     * @param dueby string contains due by date
     */
    static getResponderQuizDate(expiryTime, currentTimestamp, dueByKey, expiredOnKey, dueby) {
        return `<p class="date-text mb--16 font-12">${expiryTime > currentTimestamp ? dueByKey + " " : expiredOnKey + " "} ${dueby}</p>`;
    }

    /**
     * @Method contains quiz Tile section in responder view
     * @param title string contains quiz title
     */
    static getQuizTitleResponders(title) {
        return `<h4 class="mb--8">${title}</h4>`;
    }

    /**
     * @Method contains quiz Tile section
     * @param title string contains quiz title
     */
    static getQuizTitle(title) {
        return `<label class="font-12"><h4>${title}</h4></label>`;
    }

    /**
     * @Method contains quiz description section
     * @param description string contains quiz description
     */
    static getQuizDescription(description) {
        return `<p class="mb--8 text-justify text-break font-12">${description}</p>`;
    }

    /**
     * @Method contains initals section area
     * @param nonresponderId string contains nonresponders identifiers
     * @param initials string non repsonders initials
     * @param resultLocale string contains localization result string
     */
    static getInitials(nonresponderId, initials, resultLocale) {
        return `<div class="d-flex cursor-pointer" id="${nonresponderId}">
            <div class="avtar">
                ${initials}
            </div>
            <div class="avtar-txt">${resultLocale}</div>
        </div>`;
    }

    /**
     * @Method contains total people responded area in summary view
     * @param xofy string total number of responders out of total members in the group
     */
    static getTotalPeopleRespondedString(xofy) {
        return `<p class="date-color cursor-pointer mb--24">
            <span id="show-responders" class="under-line" tabindex="0" role="button">${xofy}</span>
        </p>`;
    }

    /**
     * @Method contains total people responded area in summary view
     * @param xofy string total number of responders out of total members in the group
     */
    static getTotalPeopleRespondedStringOnResNonRes(xofy) {
        return `<div class="row">
            <div class="col-12">
                <p class="font-12 semi-bold mb--4">${xofy}</p>
            </div>
        </div>`;
    }

    /**
     * @Method contains Participation progress bar
     * @param resultLocale String contains Localization of participation string
     * @param participationPercentage Float contains participation percentage
     */
    static getParticipationProgress(resultLocale, participationPercentage) {
        return `<label class="mb--8">
            <strong classs="semi-bold">
                ${resultLocale}
            </strong>
        </label>
        <div class="progress mb--8">
            <div class="progress-bar bg-primary" role="progressbar" style="width: ${participationPercentage}%" aria-valuenow="${participationPercentage}" aria-valuemin="0" aria-valuemax="100">
            </div>
        </div>`;
    }

    /**
     * @Method contains quiz template image
     * @param downloadUrl String contains image url
     * @param attachments Object contains attachment data
     */
    static loadQuizTemplateImage(downloadUrl, attachments) {
        $("#quiz-img-preview, #quiz-title-image").attr("src", downloadUrl);
        $(".photo-box").hide();
        $(".quiz-updated-img").show();
        $(".quiz-updated-img").show();
        $("#quiz-title-image").show();
        $(".quiz-updated-img").show();
        $(".quiz-clear").show();
        $("#cover-image").after(this.createQuizTextarea(attachments));
    }

    /**
     * @Method contains question image section
     * @param questionSelector String selector
     * @param questionImage String selector
     * @param url String contains image url
     * @param attachmentData Object contains attachment data
     */
    static loadQuestionImage(questionSelector, questionImage, url, attachmentData) {
        $(questionSelector).find(".question-preview").show();
        $(questionSelector).find(".question-preview-image").show();
        $(questionSelector).find(".question-preview-image").attr("src", url);
        $(questionImage).after(this.createQuestionTextarea(attachmentData));
    }

    /**
     * @Method contains option image section
     * @param questionSelector String selector
     * @param optionCounter String contians option number as identifiers
     * @param url String contains image url
     * @param attachmentData Object contains attachment data
     */
    static loadOptionImage(questionSelector, optionCounter, url, attachmentData) {
        $(questionSelector).find("#option" + optionCounter).parents("div.col-12").find(".option-preview").show();
        $(questionSelector).find("#option" + optionCounter).parents("div.col-12").find(".option-preview-image").show();
        $(questionSelector).find("#option" + optionCounter).parents("div.col-12").find(".option-preview-image").attr("src", url);
        $(questionSelector).find("input[type='file']#option-image-" + optionCounter).after(`<textarea id="option-attachment-set" class="d-none">${JSON.stringify(attachmentData)}</textarea>`);
    }

    /**
     * Method to get remove Image loader from image section
     * @param selector object html on which remove image
     */
    static removeImageLoader(selector) {
        let tid = setInterval(() => {
            if ($(selector).hasClass("heightfit") || $(selector).hasClass("widthfit") || $(selector).hasClass("smallfit")) {
                $(selector).parent("div").find(".loader-cover").addClass("d-none");
                clearInterval(tid);
            }
        }, Constants.setIntervalTimeHundred());
    }

    /**
     * Method to get remove Image loader from image section
     * @param selector object html on which remove image
     */
    static removeImageLoaderCreationView(selector) {
        let tid = setInterval(() => {
            if ($(selector).hasClass("heightfit") || $(selector).hasClass("widthfit") || $(selector).hasClass("smallfit")) {
                $(".loader-cover").addClass("d-none");
                clearInterval(tid);
            }
        }, Constants.setIntervalTimeHundred());
    }

    /**
     * @Method contains spinner on button showed when upload image
     */
    static getButtonSpinner() {
        return `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
    }

    /**
     * @Method contains quiz textarea for image details
     * @param attachmentData Object contains attachment data
     */
    static createQuizTextarea(attachmentData) {
        return `<textarea id="quiz-attachment-set" class="d-none">${JSON.stringify(attachmentData)}</textarea>`;
    }

    /**
     * @Method contains question textarea for image details
     * @param attachmentData Object contains attachment data
     */
    static createQuestionTextarea(attachmentData) {
        return `<textarea id="question-attachment-set" class="d-none">${JSON.stringify(attachmentData)}</textarea>`;
    }

    /**
     * @Method contains option textarea for image details
     * @param attachmentData Object contains attachment data
     */
    static createOptionTextarea(attachmentData) {
        return `<textarea id="option-attachment-set" class="d-none" >${JSON.stringify(attachmentData)}</textarea>`;
    }

    /**
     * @Method contains Invalid image file upload error
     * @param invalidFileFormatKey String contains localization of invalid file format error string
     */
    static getInvalidFileError(invalidFileFormatKey) {
        return `<label class="label-alert pull-right d-block invalid-image-format">
            <font class="invalid-file-key">${invalidFileFormatKey}</font>
        </label>`;
    }

    /**
     * @Method contains Invalid image file upload error for question
     * @param invalidFileFormatKey String contains localization of invalid file format error string
     */
    static getQuestionInvalidFileError(invalidFileFormatKey) {
        return `<label class="label-alert d-block mb--4 invalid-file-question"><font class="invalid-file-key">${invalidFileFormatKey}</font></label>`;
    }

    /**
     * @Method contains Invalid image file upload error for options
     * @param invalidFileFormatKey String contains localization of invalid file format error string
     */
    static getOptionInvalidFileError(invalidFileFormatKey) {
        return `<label class="label-alert d-block mb--4 invalid-file-option"><font class="invalid-file-key">${invalidFileFormatKey}</font></label>`;
    }

    /**
     * @Method contains select correct option error
     * @param selectCorrectChoiceKey String contains localization of select correct option error string
     */
    static getSelectCorrectOptionError(selectCorrectChoiceKey) {
        return `${this.clearFix()}
        <label class="label-alert d-block option-required-err text-left pull-left mt--8 mb--16"><font>${selectCorrectChoiceKey}</font></label>
        ${this.clearFix()}`;
    }

    /**
     * @Method contains question required error
     * @param resultLocale String contains localization of question required error string
     */
    static getQuestionRequiredError(resultLocale) {
        return `<label class="label-alert d-block mb--4"><font class="question-blank-key">${resultLocale}</font></label>`;
    }

    /**
     * @Method getInvalidDateError contains string for invalid date
     * @param resultLocale String contains localization for invalid date
     */
    static getInvalidDateError(resultLocale) {
        return `<div class="col-12 mt--32 invalid-date-err"><p class="text-danger">${resultLocale}</p></div>`;
    }

    /**
     * @Method contains required error
     * @param resultLocale String contains localization of required error string
     */
    static getRequiredError(requiredKey) {
        return `<label class="label-alert d-block mb--4"><font class="required-key">${requiredKey}</font></label>`;
    }

    /**
     * @Method contains max 10 options error
     * @param resultLocale String contains localization of 10 option max error string
     */
    static getMaxTenOptionError(requiredKey) {
        return `<div class="max-option-err-box text-danger font-12"> ${requiredKey} </div>`;
    }

    /**
     * @Method contains option required error
     * @param resultLocale String contains localization of required error string
     */
    static getSelectChoiceOptionError(choiceAnyChoiceKey) {
        return `<p class="mt--32 text-danger choice-required-err"><font>${choiceAnyChoiceKey}</font></p>`;
    }

    /**
     * @Method contains correct answer area
     * @param correctKey String contains localization of correct string
     */
    static getCorrectArea(correctKey) {
        return `<span class="text-success semi-bold">${correctKey}</span>`;
    }

    /**
     * @Method contains incorrect answer area
     * @param incorrectKey String contains localization of incorrect string
     */
    static getIncorrectArea(incorrectKey) {
        return `<span class="text-danger semi-bold">${incorrectKey}</span>`;
    }

    /**
     * @Method contains correct tick area
     */
    static getSuccessTick() {
        return `<i class="success-with-img">
            ${Constants.getSuccessTickIcon()}
        </i>`;
    }

    /**
     * @Method contains template image of quiz in response view
     */
    static getQuizTemplateImageResponseView() {
        return `<div class="col-12 quiz-img-sec">
            <div class="quiz-updated-img bg-none bdr-none max-min-220 card-bg card-border cover-img upvj cursur-pointer mb--16 relative" style="display: none">
                <div class="loader-cover d-table">
                    <div class="d-table-cell">
                        <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span></div>
                    </div>
                </div>
                <img src="" class="image-responsive quiz-template-image" style="display:none" />
            </div>
        </div>`;
    }

    /**
     * @Method contains quiz title area in response view
     * @param displayName string contains quiz title display name
     */
    static getQuizTitleResponseView(displayName) {
        return `<h4 class="mb--8"> ${displayName} </h4>`;
    }

    /**
     * @Method contains quiz description area in response view
     * @param desc string quiz description
     */
    static getQuizDescriptioneResponseView(desc) {
        return `<p class="mb--16 text-justify text-break font-12">${desc}</p>`;
    }

    /**
     * @Method contains quiz section for already attempted quiz in response view
     * @param alreadyAttemptedKey string contains localization for already attempted quiz
     */
    static getAlreadyAttempt(alreadyAttemptedKey) {
        return `<p class="already-attempt already-attempt semi-bold mb--16 font-12">${alreadyAttemptedKey}</p>`;
    }

    /**
     * @Method contains quiz question number in response view
     * @param questionKey string contains localization for question string
     * @param count Integer contains count for question number
     */
    static getQuestionNumberResponseView(questionKey, count) {
        return `<label class="font-12">
                <span class="question-number">${questionKey} # ${count}</span>
            </label>`;
    }

    /**
     * @Method contains radiobox area in response view
     * @param id string contains id identifier
     * @param name string contains name string
     * @param text string contains radio text
     */
    static getRadioResponseView(id, name, text) {
        return `<div class="radio-section custom-radio-outer" id="${id}" columnId="${name}">
            <label class="custom-radio d-block font-12 cursor-pointer selector-inp">
                <input type="radio" name="${name}" id="${id}">
                <span class="radio-block"></span>
                <div class="pr--32 check-in-div">${text}</div>
            </label>
        </div>`;
    }

    /**
     * @Method contains checkbox area in response view
     * @param id string contains id identifier
     * @param name string contains name string
     * @param text string contains radio text
     */
    static getCheckResponseView(id, name, text) {
        return `<div class="radio-section custom-check-outer selector-inp" id="${id}" columnId="${name}" >
            <label class="custom-check font-12 form-check-label d-block">
                <input type="checkbox" class="radio-block" name="${name}" id="${id}">
                <span class="checkmark"></span>
                <div class="pr--32 check-in-div">${text}
                </div>
            </label>
        </div>`;
    }

    /**
     * @Method contains score area in response view
     * @param resultLocale string contains localization for result string
     * @param scoreIs Float in two decimal place
     */
    static getScoreResponseView(resultLocale, scoreIs) {
        return `<label>
            <strong class="semi-bold">${resultLocale} </strong>${scoreIs}%
        </label>
        <hr>`;
    }

    /**
     * @Method to set html block inside the html selector
     * @param selector object html
     * @param content string for content
     */
    static setHtml(selector, content) {
        $(selector).html(content);
    }

    /**
     * @Method to set text inside the html selector
     * @param selector object html
     * @param content string for content
     */
    static setText(selector, content) {
        $(selector).text(content);
    }

    /**
     * @Method to set html block after the html selector
     * @param selector object html
     * @param content string for content
     */
    static setAfter(selector, content) {
        $(selector).after(content);
    }

    /**
     * @Method to set html block before the html selector
     * @param selector object html
     * @param content string for content
     */
    static setBefore(selector, content) {
        $(selector).before(content);
    }

    /**
     * @Method to set html block append the html selector
     * @param selector object html
     * @param content string for content
     */
    static setAppend(selector, content) {
        $(selector).append(content);
    }

    /**
     * @Method to set html block prepend the html selector
     * @param selector object html
     * @param content string for content
     */
    static setPrepend(selector, content) {
        $(selector).prepend(content);
    }
}