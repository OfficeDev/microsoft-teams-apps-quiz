// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "../common/utils/JqueryGlobal";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-datepicker";
import "bootstrap-datetime-picker";
import "../common/utils/BootstrapLocaleFile";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "bootstrap-datetime-picker/css/bootstrap-datetimepicker.min.css";
import { ActionHelper, Localizer } from "../common/ActionSdkHelper";
import * as html2canvas from "html2canvas";
import { UxUtils } from "./../common/utils/UxUtils";
import { Utils } from "./../common/utils/Utils";
import { KeyboardAccess } from "./../common/utils/KeyboardUtils";
import "../../assets/css/style-custom";
import "../../assets/css/style-default";

let actionContext = null;
let actionInstance = null;
let actionSummary = null;
let actionDataRows = null;
let actionDataRowsLength = 0;
let responderDate = [];
let actionNonResponders = [];
let myUserId = "";
let score = 0;
let total = 0;
let answerIs = "";
let request = ActionHelper.getContextRequest();
let dataResponse = "";
let actionId = "";
let theme = "";
let isCreator = false;
let context = "";
let memberCount = 0;

let dueByKey = "";
let expiredOnKey = "";
let correctKey = "";
let incorrectKey = "";
let backKey = "";
let questionKey = "";
let scoreKey = "";
let closeKey = "";
let changeDueByKey = "";
let closeQuizKey = "";
let deleteQuizKey = "";
let downloadImageKey = "";
let downloadCSVKey = "";
let downloadKey = "";
let closeQuizConfirmKey = "";
let deleteQuizConfirmKey = "";
let cancelKey = "";
let confirmKey = "";
let changeKey = "";
let changeDueDateKey = "";

/* ********************************* Events ******************************************** */

/**
 * @event Keydown Event for render the landing page
 */
KeyboardAccess.keydownClick(document, ".back");

/**
 * @event Click Event for render the landing page
 */
$(document).on({
    click: function() {
        createBody();
    }
}, ".back");

/**
 * @event Click Event for back to responder and non responder page
 */
$(document).on("click", "#closeKey", function() {
    let closeViewRequest = ActionHelper.closeView();

    ActionHelper
        .executeApi(closeViewRequest)
        .then(function(batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
        })
        .catch(function(error) {
            console.error("Error3: " + JSON.stringify(error));
        });
});

/**
 * @event Keydown Event for back to responder and non responder page
 */
KeyboardAccess.keydownClick(document, ".back1");

/**
 * @event Click Event for back to responder and non responder page
 */
$(document).on({
    click: function() {
        create_responder_nonresponders();
    }
}, ".back1");

/**
 * @event Click and Keydown Event for responder page
 */
$(document).on({
    click: function() {
        create_responder_nonresponders();
    },
    keydown: function(e) {
        let key = e.which;
        if (key === 13 || key === 32) {
            e.preventDefault();
            $(this).click();
            return false;
        }
    }
}, "#show-responders");

/**
 * @event Keydown event fetching result of responders
 */
KeyboardAccess.keydownClick(document, ".getresult");

/**
 * @event Click event fetching result of responders
 */
$(document).on({
    click: function() {
        let userId = $(this).attr("id");
        UxUtils.setHtml("#root", "");
        head();
        createQuestionView(userId);
        if ($(this).attr("data-attr") !== undefined) {
            footerResponderNonResponderTabs();
        } else {
            footer(userId);
        }
    }
}, ".getresult");

/**
 * @event Keydown event on responder tab
 */
KeyboardAccess.keydownClick(document, ".responder-key");

/**
 * @event Keydown event on non-responders tab
 */
KeyboardAccess.keydownClick(document, ".non-responder-key");

/**
 * @event Keydown event for download CSV
 */
KeyboardAccess.keydownClick(document, "#downloadCSV");

/**
 * @event Click event for download CSV
 */
$(document).on({
    click: function() {
        ActionHelper.downloadCSV(actionId, "quiz");
    }
}, "#downloadCSV");

/**
 * @event Keydown event for download image in png
 */
KeyboardAccess.keydownClick(document, "#downloadImage");

/**
 * @event Click event for download image in png
 */
$(document).on({
    click: function() {
        let bodyContainerDiv = document.getElementsByClassName("container")[0];
        let backgroundColorOfResultsImage = theme;
        $(".footer").hide();
        html2canvas(bodyContainerDiv, {
            width: bodyContainerDiv.scrollWidth,
            height: bodyContainerDiv.scrollHeight,
            backgroundColor: backgroundColorOfResultsImage,
            useCORS: true
        }).then(function(canvas) {
            let fileName = "quiz";
            let base64Image = canvas.toDataURL("image/png");
            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(canvas.msToBlob(), fileName);
            } else {
                let data = base64Image;
                if (data && fileName) {
                    let a = document.createElement("a");
                    a.href = data;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            }
            $(".footer").show();
        });
    }
}, "#downloadImage");

/**
 * @event Keydown event to show change due by date
 */
KeyboardAccess.keydownClick(document, ".change-due-by-event");

/**
 * @event Click event to show change due by date
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        $(".change-date").remove();
        $(".close-quiz").remove();
        $(".delete-quiz").remove();

        changeDateSection();
        let currentTime = new Date(actionInstance.expiryTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }).toLowerCase();
        let setDate = new Date(actionInstance.expiryTime);
        $(".form_date").attr({ "data-date": setDate });
        let langObj = Utils.getLocaleForCalendar(context.locale);
        let lang = langObj.lang;
        $(".form_time").datetimepicker({
            format: "HH:ii",
            pickDate: "false",
            autoclose: 1,
            startView: 1,
            maxView: 1,
            useCurrent: false,
            minView: 0,
            forceParse: 0,
            todayHighlight: 1,
            todayBtn: 1,
            language: lang,
            meridiem: ""
        });

        $(".form_time input").val(currentTime);

        let dateInput = $("input[name='expiry_date']");
        let container = "";
        if($(".bootstrap-iso form").length > 0) {
            container = $(".bootstrap-iso form").parent();
        } else {
            container = "body";
        }
        let options = {
            "container": container,
            todayHighlight: true,
            autoclose: true,
            orientation: "top",
            language: lang
        };
        dateInput.datepicker(options);
        dateInput.datepicker("setDate", setDate);
        dateInput.datepicker().on("show", function () {
            let $calendarSelector = $(".datepicker.datepicker-dropdown.dropdown-menu");
            $calendarSelector.find(".prev").empty();
            $calendarSelector.find(".next").empty();
        });
        return false;
    }
}, ".change-due-by-event");

/**
 * @event Keydown event to show close quiz
 */
KeyboardAccess.keydownClick(document, ".close-quiz-event");

/**
 * @event Click event to show close quiz
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        $(".change-date").remove();
        $(".close-quiz").remove();
        $(".delete-quiz").remove();
        closeQuizSection();
        return false;
    }
}, ".close-quiz-event");

/**
 * @event Keydown event to show delete quiz
 */
KeyboardAccess.keydownClick(document, ".delete-quiz-event");

/**
 * @event Click event to show delete quiz
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        $(".change-date").remove();
        $(".close-quiz").remove();
        $(".delete-quiz").remove();
        deleteQuizSection();
        return false;
    }
}, ".delete-quiz-event");

/**
 * @event Click event to close change, close and delete quiz confirm section
 */
$(document).on("click", ".cancel-question-delete", function() {
    $(".change-date").remove();
    $(".close-quiz").remove();
    $(".delete-quiz").remove();
});

/**
 * @event Click event for close dropdown lists
 */
$(document).on("click", ".threedots .dropdown-menu a", function() {
    $(".threedots .dropdown-menu").toggleClass("show");
});

/**
 * @event Click event for delete quiz
 */
$(document).on("click", "#delete-quiz", function() {
    ActionHelper.deleteActionInstance(actionId);
});

/**
 * @event Click event for change quiz expiry date
 */
$(document).on("click", "#change-quiz-question", function() {
    ActionHelper.closeActionInstance(actionId, actionInstance.version);
});

/**
 * @event Change event for expiry date and time
 */
$(document).on("change", "input[name='expiry_time'], input[name='expiry_date']", function() {
    $("#change-quiz-date").removeClass("disabled");
});

$(document).on("click", "#change-quiz-date", function() {
    let getExpiryDate = $("input[name='expiry_date']").datepicker("getDate");
    let getExpiryDateData = getExpiryDate.toString().split(" ");
    getExpiryDateData[4] = $("input[name='expiry_time']").val() + ":00";
    let end = new Date(getExpiryDateData.join(" "));
    actionInstance.expiryTime = new Date(end).getTime();
    actionInstance.customProperties[1].value = end;
    ActionHelper.updateActionInstance(actionInstance);
});

/* ********************************* Methods ******************************************** */

/**
 * @description Initiate Method
 */
$(function () {
    OnPageLoad();
});

/**
 * @description Calling method  for theme selection based on teams theme
 * @param request context request
 */
loadDetailView(request);

/**
 * @description getStringKeys method for fetching localization strings
 */
async function getStringKeys() {
    Localizer.getString("dueBy").then(function(result) {
        dueByKey = result;
    });

    Localizer.getString("question").then(function(result) {
        questionKey = result;
    });

    Localizer.getString("score", ":").then(function(result) {
        scoreKey = result;
    });

    Localizer.getString("expired_on").then(function(result) {
        expiredOnKey = result;
    });

    Localizer.getString("correct").then(function(result) {
        correctKey = result;
    });
    Localizer.getString("incorrect").then(function(result) {
        incorrectKey = result;
    });

    Localizer.getString("responders").then(function(result) {
        $(".responder-key").text(result);
    });

    Localizer.getString("non_responders").then(function(result) {
        $(".non-responder-key").text(result);
    });
    Localizer.getString("back").then(function(result) {
        backKey = result;
        $(".back-key").text(backKey);
    });

    Localizer.getString("close").then(function(result) {
        closeKey = result;
        $(".close-key").text(closeKey);
    });

    Localizer.getString("changeDueBy").then(function(result) {
        changeDueByKey = result;
        $(".change-due-by-key").text(changeDueByKey);
    });

    Localizer.getString("closeQuiz").then(function(result) {
        closeQuizKey = result;
        $(".close-quiz-key").text(closeQuizKey);
    });

    Localizer.getString("deleteQuiz").then(function(result) {
        deleteQuizKey = result;
        $(".delete-quiz-key").text(deleteQuizKey);
    });

    Localizer.getString("download").then(function(result) {
        downloadKey = result;
        UxUtils.setHtml("#download-key", downloadKey);
    });

    Localizer.getString("downloadImage").then(function(result) {
        downloadImageKey = result;
        UxUtils.setHtml("#download-image-key", downloadImageKey);
    });

    Localizer.getString("downloadCSV").then(function(result) {
        downloadCSVKey = result;
        UxUtils.setHtml("#download-csv-key", downloadCSVKey);
    });

    Localizer.getString("closeQuizConfirm").then(function(result) {
        closeQuizConfirmKey = result;
        UxUtils.setHtml(".close-quiz-confirm-key", closeQuizConfirmKey);
    });

    Localizer.getString("deleteQuizConfirm").then(function(result) {
        deleteQuizConfirmKey = result;
        UxUtils.setHtml(".close-quiz-confirm-key", deleteQuizConfirmKey);
    });

    Localizer.getString("cancel").then(function(result) {
        cancelKey = result;
        UxUtils.setHtml(".cancel-key", cancelKey);
    });

    Localizer.getString("confirm").then(function(result) {
        confirmKey = result;
        UxUtils.setHtml(".confirm-key", confirmKey);
    });

    Localizer.getString("change").then(function(result) {
        changeKey = result;
        UxUtils.setHtml(".change-key", changeKey);
    });

    Localizer.getString("changeDueDate").then(function(result) {
        changeDueDateKey = result;
        UxUtils.setHtml(".change-due-date-key", changeDueDateKey);
    });

}

/**
 * @description Method to select theme based on the teams theme
 * @param request context request
 */

async function loadDetailView(request) {
    dataResponse = await ActionHelper.executeApi(request);
    context = dataResponse.context;
    $("form.section-1").show();
    theme = context.theme;
    $("link#theme").attr("href", "css/style-" + theme + ".css");
    getStringKeys();
    ActionHelper.hideLoader();
}

/**
 * @description Method loads the landing page
 */
function OnPageLoad() {
    ActionHelper
        .executeApi(request)
        .then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            actionContext = response.context;
            actionId = response.context.actionId;
            getDataRows(response.context.actionId);
        })
        .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

/**
 * @description Method to get data rows
 * @param request context action id
 */
function getDataRows(actionId) {
    let getActionRequest = ActionHelper.getActionRequest(actionId);
    let getSummaryRequest = ActionHelper.getDataRowSummary(
        actionId,
        true
    );
    let getDataRowsRequest = ActionHelper.requestDataRows(actionId);
    let batchRequest = ActionHelper.batchRequest([
            getActionRequest,
            getSummaryRequest,
            getDataRowsRequest
        ]
    );

    ActionHelper.executeBatchApi(batchRequest)
        .then(function(batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
            actionInstance = batchResponse.responses[0].action;
            actionSummary = batchResponse.responses[1].summary;
            actionDataRows = batchResponse.responses[2].dataRows;
            if (actionDataRows == null) {
                actionDataRowsLength = 0;
            } else {
                actionDataRowsLength = actionDataRows.length;
            }
            createBody();
        })
        .catch(function(error) {
            console.error("Console log: Error: " + JSON.stringify(error));
        });
}

/**
 * @description Method for creating the response view structure and initialize value
 */
async function createBody() {
    await getUserprofile();
    let getSubscriptionCount = "";
    UxUtils.setHtml("#root", "");

    /*  Head Section  */
    if (myUserId == dataResponse.context.userId && myUserId == actionInstance.creatorId) {
        isCreator = true;
        headCreator();

        if (actionInstance.status == "Closed") {
            $(".close-quiz-event").remove();
            $(".change-due-by-event").remove();
        }
        if (actionInstance.status == "Expired") {
            $(".change-due-by-event").remove();
        }
    } else {
        head();
    }

    /*  Person Responded X of Y Responses  */
    getSubscriptionCount = ActionHelper.getSubscriptionMemberCount(
        actionContext.subscription
    );
    let response = await ActionHelper.executeApi(getSubscriptionCount);
    if (isCreator == true) {
        let $pcard = $(`<div class="progress-section"></div>`);
        memberCount = response.memberCount;
        let participationPercentage = 0;

        participationPercentage = Math.round(
            (actionSummary.rowCreatorCount / memberCount) * 100
        );
        Localizer.getString("participation", participationPercentage).then(function(result) {
            UxUtils.setAppend($pcard, UxUtils.getParticipationProgress(result, participationPercentage));
        });
        Localizer.getString("xofy_people_responded", actionSummary.rowCount, memberCount).then(function(result) {
            let xofy = result;
            UxUtils.setAppend($pcard, UxUtils.getTotalPeopleRespondedString(xofy));
            UxUtils.setAppend($pcard, UxUtils.clearFix());
        });
        UxUtils.setAppend("#root", $pcard);
    }

    let responderDateLength = Object.keys(responderDate).length;
    if (responderDateLength > 0) {
        if (myUserId == dataResponse.context.userId && myUserId == actionInstance.creatorId) {
            createCreatorQuestionView();
        } else if (myUserId == dataResponse.context.userId && myUserId != actionInstance.creatorId) {
            let isResponded = false;
            responderDate.forEach(function(responder) {
                if (responder.value2 == myUserId) {
                    createQuestionView(myUserId);
                    isResponded = true;
                }
            });

            if (isResponded == false) {
                actionNonResponders.forEach(function(nonresponders) {
                    if (nonresponders.value2 == myUserId) {
                        let name = nonresponders.label;
                        let matches = name.match(/\b(\w)/g); // [D,P,R]
                        let initials = matches.join("").substring(0, 2); // DPR
                        Localizer.getString("you_yet_respond").then(function(result) {
                            UxUtils.setAppend("div#root div:first", UxUtils.getInitials(nonresponders.value2, initials, result));
                            UxUtils.setAppend("div#root div:first", UxUtils.breakline());
                            UxUtils.setAfter("div#" + nonresponders.value2, UxUtils.breakline());
                        });
                    }
                });
            }
        } else {
            responderDate.forEach(function(responder) {
                if (responder.value2 == myUserId) {
                    createResponderQuestionView(myUserId, responder);
                }
            });
        }

    } else {
        actionNonResponders.forEach(function(nonresponders) {
            if (nonresponders.value2 == myUserId) {
                if (myUserId == dataResponse.context.userId && myUserId == actionInstance.creatorId) {
                    createCreatorQuestionView();
                } else {
                    let name = nonresponders.label;
                    let matches = name.match(/\b(\w)/g); // [D,P,R]
                    let initials = matches.join("").substring(0, 2); // DPR
                    Localizer.getString("you_yet_respond").then(function(result) {
                        UxUtils.setAppend("div#root div:first", UxUtils.getInitials(nonresponders.value2, initials, result));
                        UxUtils.setAppend("div#root div:first", UxUtils.breakline());
                        UxUtils.setAfter("div#" + nonresponders.value2, UxUtils.breakline());
                    });
                }
            }
        });
    }

    if (isCreator == true) {
        if (context.hostClientType == "web" || context.hostClientType == "desktop") {
            footerDownload();
        }
    } else {
        footerClose();
    }
    return true;
}

/**
 * @description Method for creating head section for title, progress bar, dueby
 */
function head() {
    let title = actionInstance.displayName;
    let description = actionInstance.customProperties[0].value;
    let options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    let expiryTime = new Date(actionInstance.expiryTime);
    let dueby = expiryTime.toLocaleDateString(context.locale, options);
    let $card = $(`<div class=""></div>`);
    let $titleSec = $(UxUtils.getQuizTitleResponders(title));
    let $descriptionSec = $(UxUtils.getQuizDescription(description));
    let currentTimestamp = new Date().getTime();
    let $dateSec = $(UxUtils.getResponderQuizDate(actionInstance.expiryTime, currentTimestamp, dueByKey, expiredOnKey, dueby));
    UxUtils.setAppend($card, $titleSec);
    UxUtils.setAppend($card, $descriptionSec);
    UxUtils.setAppend($card, $dateSec);
    UxUtils.setAppend("#root", $card);
    if (actionInstance.dataTables[0].attachments.length > 0 ) {
        let req = ActionHelper.getAttachmentInfo(actionId, actionInstance.dataTables[0].attachments[0].id);
        ActionHelper.executeApi(req).then(function(response) {
            UxUtils.setPrepend($card, UxUtils.getQuizBannerImageWithLoader(response.attachmentInfo.downloadUrl));
            Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, ".quiz-template-image");
        })
        .catch(function(error) {
            console.error("AttachmentAction - Error7: " + JSON.stringify(error));
        });
    }
}

/**
 * @description Method for creating head section for title, progress bar, dueby
 */
function headCreator() {
    let title = actionInstance.displayName;
    let description = actionInstance.customProperties[0].value;
    let options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    let expiryTime = new Date(actionInstance.expiryTime);
    let dueby = expiryTime.toLocaleDateString(context.locale, options);

    let $card = $(`<div class=""></div>`);
    let $titleDiv = $(`<div class="d-table mb--4"></div>`);
    let $titleSec = $(UxUtils.getQuizTitle(title));
    let $creatorButtons = $(UxUtils.creatorQuizDateManageSection(changeDueByKey, closeQuizKey, deleteQuizKey));
    let $descriptionSec = $(UxUtils.getQuizDescription(description));
    let currentTimestamp = new Date().getTime();
    let $dateSec = "";
    if (actionInstance.expiryTime > currentTimestamp) {
        $dateSec = $(`<p class="mb--16 date-text font-12">${dueByKey + " " } ${dueby}</p>`);
    } else {
        $dateSec = $(`<p class="mb--16 date-text font-12">${expiredOnKey + " "} ${dueby}</p>`);
    }
    UxUtils.setAppend($titleDiv, $titleSec);
    UxUtils.setAppend($titleDiv, $creatorButtons);
    UxUtils.setAppend($card, $titleDiv);
    UxUtils.setAppend($card, $descriptionSec);
    UxUtils.setAppend($card, $dateSec);
    UxUtils.setAppend("#root", $card);
    if (actionInstance.dataTables[0].attachments.length > 0) {
        let req = ActionHelper.getAttachmentInfo(actionId, actionInstance.dataTables[0].attachments[0].id);
        ActionHelper.executeApi(req).then(function(response) {
            UxUtils.setPrepend($card, UxUtils.getQuizBannerImageWithLoader(response.attachmentInfo.downloadUrl));
            Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, ".quiz-template-image");
        })
        .catch(function(error) {
            console.error("AttachmentAction - Error7: " + JSON.stringify(error));
        });
    }
}

/**
 * @description Method for fetch responder user details
 */
async function getUserprofile() {
    let memberIds = [];
    responderDate = [];
    actionNonResponders = [];
    if (actionDataRowsLength > 0) {
        for (let i = 0; i < actionDataRowsLength; i++) {
            memberIds.push(actionDataRows[i].creatorId);
            let requestResponders = ActionHelper.getSusbscriptionMembers(
                actionContext.subscription, [actionDataRows[i].creatorId]
            ); // ids of responders

            let responseResponders = await ActionHelper.executeApi(requestResponders);
            let perUserProfile = responseResponders.members;
            responderDate.push({
                label: perUserProfile[0].displayName,
                value: new Date(actionDataRows[i].updateTime).toDateString(),
                value2: perUserProfile[0].id,
            });
        }
    }

    myUserId = actionContext.userId;
    let requestNonResponders = ActionHelper.getSubscriptionNonParticipants(
        actionContext.actionId,
        actionContext.subscription.id
    );
    let responseNonResponders = await ActionHelper.executeApi(requestNonResponders);
    let tempresponse = responseNonResponders.nonParticipants;
    if (tempresponse != null) {
        for (let i = 0; i < tempresponse.length; i++) {
            actionNonResponders.push({
                label: tempresponse[i].displayName,
                value2: tempresponse[i].id,
            });
        }
    }
}

/**
 * @description Method for fetch list of responders
 */
function getResponders() {
    UxUtils.setHtml("table#responder-table tbody", "");

    for (let itr = 0; itr < responderDate.length; itr++) {
        let name = "";
        name = responderDate[itr].label;
        let options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
        let respondDate = new Date(responderDate[itr].value);
        let date = respondDate.toLocaleDateString(context.locale, options);
        let matches = responderDate[itr].label.match(/\b(\w)/g); // [D,P,R]
        let initials = matches.join("").substring(0, 2); // DPR
        let score = scoreCalculate(responderDate[itr].value2);
        UxUtils.setAppend($(".tabs-content:first").find("table#responder-table tbody"), UxUtils.getResponderScoreWithDate(responderDate[itr].value2, initials, name, date, scoreKey, score));
    }
}

/**
 * @description scoreCalculate method Calculate the score
 * @param userId String Identifier
 */
function scoreCalculate(userId) {
    let total = 0;
    let score = 0;
    actionInstance.dataTables.forEach((dataTable) => {
        total = Object.keys(dataTable.dataColumns).length;

        /* Correct Answer */
        let correctResponse = JSON.parse(
            actionInstance.customProperties[5].value
        );

        for (let i = 0; i < actionDataRowsLength; i++) {
            if (actionDataRows[i].creatorId == userId) {
                for (let c = 0; c < correctResponse.length; c++) {
                    let correctAnsString = "";
                    let userAnsString = "";
                    if ($.isArray(correctResponse[c])) {
                        if (correctResponse[c].length > 1) {
                            correctAnsString = correctResponse[c].join(",");
                        } else {
                            correctAnsString = correctResponse[c][0];
                        }
                    } else {
                        correctAnsString = correctResponse[c];
                    }

                    if (Utils.isJson(actionDataRows[i].columnValues[c + 1])) {
                        let responderAnsArr = JSON.parse(actionDataRows[i].columnValues[c + 1]);
                        if (responderAnsArr.length > 1) {
                            userAnsString = responderAnsArr.join(",");
                        } else {
                            userAnsString = responderAnsArr[0];
                        }
                    } else {
                        userAnsString = actionDataRows[i].columnValues[c + 1];
                    }

                    if (correctAnsString == userAnsString) {
                        score++;
                    }

                }
            }
        }
    });
    let scoreIs = (score / total) * 100;
    if (scoreIs % 1 != 0) {
        scoreIs = scoreIs.toFixed(2);
    }
    return scoreIs;
}

/**
 * @description Method for fetch list of non-responders in the channel
 */
function getNonresponders() {
    UxUtils.setHtml("table#non-responder-table tbody", "");
    for (let itr = 0; itr < actionNonResponders.length; itr++) {
        let name = "";
        name = actionNonResponders[itr].label;
        let matches = actionNonResponders[itr].label.match(/\b(\w)/g); // [D,P,R]
        let initials = matches.join("").substring(0, 2); // DPR
        UxUtils.setAppend($(".tabs-content:first").find("table#non-responder-table tbody"), UxUtils.getInitialNonResponders(initials, name));
    }
}

/**
 * @description Method to creat4e responder correct and incorrect quiz responses
 * @param userId contains user id for identifications
 * @param responder contains responders
 */
function createResponderQuestionView(userId, responder = "") {
    total = 0;
    score = 0;
    UxUtils.setHtml("div#root > div.question-content", "");
    if (responder != "") {
        let name = responder.label;
        let matches = name.match(/\b(\w)/g); // [D,P,R]
        let initials = matches.join("").substring(0, 2); // DPR

        Localizer.getString("you_responded").then(function(result) {
            UxUtils.setAfter("div.progress-section", UxUtils.getInitialsResponders(myUserId, initials, result));
            UxUtils.setAfter("div.progress-section", UxUtils.breakline());
            UxUtils.setAfter("div#" + myUserId, UxUtils.breakline());
        });
    }

    actionInstance.dataTables.forEach((dataTable) => {
        total = Object.keys(dataTable.dataColumns).length;
        dataTable.dataColumns.forEach((question, ind) => {
            answerIs = "";
            let $cardDiv = $(`<div class="card-box card-bg card-border alert-success mb--8"></div>`);
            let $questionContentDiv = $(`<div class="question-content disabled2"></div>`);
            let $rowdDiv = $(`<div class="mt--16"></div>`);
            let $dflexDiv = $(`<div class="d-table mb--4"></div>`);
            UxUtils.setAppend($questionContentDiv, $rowdDiv);
            UxUtils.setAppend($questionContentDiv, $dflexDiv);
            let count = ind + 1;
            let $questionHeading = $(`<label class="font-12"></label>`);
            UxUtils.setAppend($questionHeading, UxUtils.getQuestionNumberContainerResponder(questionKey, count));
            UxUtils.setAppend($questionHeading, `<label class="float-right" id="status-1 "></label>`);
            UxUtils.setAppend($dflexDiv, $questionHeading);
            UxUtils.setAppend($dflexDiv, UxUtils.getQuestionTitleContainer(question.displayName));
            let optAnsArr = [];
            let isRadio = true;
            if (JSON.parse(actionInstance.customProperties[5].value)[ind].length > 1) {
                isRadio = false;
            }
            question.options.forEach((option, optind) => {
                /* User Responded */
                let userResponse = [];
                let userResponseAnswer = "";
                for (let i = 0; i < actionDataRowsLength; i++) {
                    if (actionDataRows[i].creatorId == userId) {
                        userResponse = actionDataRows[i].columnValues;
                        let userResponseLength = Object.keys(userResponse).length;

                        for (let j = 1; j <= userResponseLength; j++) {
                            if (Utils.isJson(userResponse[j])) {
                                let userResponseAns = JSON.parse(userResponse[j]);
                                let userResponseAnsLen = userResponseAns.length;
                                if (userResponseAnsLen > 1) {
                                    for (let k = 0; k < userResponseAnsLen; k++) {
                                        if (userResponseAns[k] == option.name) {
                                            userResponseAnswer = userResponseAns[k];
                                        } else {
                                            continue;
                                        }
                                    }
                                } else {
                                    if (userResponseAns[0] == option.name) {
                                        userResponseAnswer = userResponseAns[0];
                                    }
                                }
                            } else {
                                if (userResponse[j] == option.name) {
                                    userResponseAnswer = userResponse[j];
                                }
                            }
                        }
                    }
                }

                /* Correct Answer */
                let correctResponse = JSON.parse(
                    actionInstance.customProperties[5].value
                );
                let correctResponseLength = Object.keys(correctResponse).length;
                let correctAnswer = "";
                for (let j = 0; j < correctResponseLength; j++) {
                    let correctResponseAns = correctResponse[j];
                    let correctResponseAnsLen = correctResponseAns.length;
                    for (let k = 0; k < correctResponseAnsLen; k++) {
                        if (correctResponseAns[k] == option.name) {
                            correctAnswer = correctResponseAns[k];
                        }
                    }
                }

                let optName = option.displayName;
                let optAttachmentId = option.attachments != "" ? option.attachments[0].id : "";

                if (isRadio) {
                    let $radioOption = getRadioOptions(
                        optName,
                        question.name,
                        option.name,
                        userResponseAnswer,
                        correctAnswer,
                        optAttachmentId
                    );
                    UxUtils.setAppend($cardDiv, $radioOption);
                } else {
                    let $checkOption = getCheckOptions(
                        optName,
                        question.name,
                        option.name,
                        userResponseAnswer,
                        correctAnswer,
                        optAttachmentId
                    );
                    UxUtils.setAppend($cardDiv, $checkOption);
                }

                if (answerIs.toLowerCase() == "correct") {
                    optAnsArr[optind] = answerIs;
                } else {
                    optAnsArr[optind] = "incorrect";
                }
            });
            if (answerIs.toLowerCase() == "correct") {
                UxUtils.setHtml($cardDiv.find("#status-" + question.name), `<span class="text-success"> ${correctKey}</span >`);
            } else {
                UxUtils.setHtml($cardDiv.find("#status-" + question.name), `<span class="text-danger"> ${incorrectKey}</span >`);
            }
            if (optAnsArr.includes("incorrect") == false) {
                score++;
            }
            UxUtils.setAppend("#root", $cardDiv);
        });
    });
    UxUtils.setAppend("#root", `<div class="ht-100"></div>`);
    let scorePercentage = (score / total) * 100;
    if (scorePercentage % 1 != 0) {
        scorePercentage = scorePercentage.toFixed(2);
    }

    Localizer.getString("score", ":").then(function(result) {
        UxUtils.setAfter("#root > hr.small:last", UxUtils.getScoreResponderContainer(result, scorePercentage));
    });
}

/**
 * @description Method to create responder correct and incorrect quiz responses
 */
function createCreatorQuestionView() {
    total = 0;
    score = 0;
    UxUtils.setHtml("div#root > div.question-content", "");

    Localizer.getString("aggregrateResult").then(function(result) {
        UxUtils.setAfter("div.progress-section", UxUtils.getaggregrateTextContainer(myUserId, result));
    });

    actionInstance.dataTables.forEach((dataTable) => {
        let scoreArray = {};
        let correctResponse = JSON.parse(
            actionInstance.customProperties[5].value
        );

        dataTable.dataColumns.forEach((question, ind) => {
            answerIs = "";
            let $quesContDiv = $(`<div class="question-content disabled2" id="content-${question.name}"></div>`);
            let $mtDiv = $(`<div class="mt--16"></div>`);
            let $dflexDiv = $(`<div class="d-table mb--4"></div>`);
            UxUtils.setAppend($quesContDiv, $mtDiv);
            UxUtils.setAppend("#root", $quesContDiv);
            let count = ind + 1;
            let attachmentId = question.attachments != "" ? question.attachments[0].id : "";

            UxUtils.setAppend($dflexDiv, UxUtils.getQuestionNumberContainer(questionKey, count));
            UxUtils.setAppend($dflexDiv, `<label class="float-right font-12 bold" id="status-${question.name}"> </label>`);
            UxUtils.setAppend($mtDiv, $dflexDiv);
            let $blankQDiv = $(`<div class=""></div>`);
            UxUtils.setAppend($mtDiv, $blankQDiv);
            UxUtils.setAppend($blankQDiv, UxUtils.getQuestionTitleContainer(question.displayName));
            let questionAttachmentId = question.attachments.length > 0 ? question.attachments[0].id : "";
            if (questionAttachmentId.length > 0) {
                let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
                ActionHelper.executeApi(req).then(function(response) {
                        console.info("Attachment - Response: " + JSON.stringify(response));
                        UxUtils.setPrepend($blankQDiv, UxUtils.quizTemplateImageWithLoader(response.attachmentInfo.downloadUrl));
                        Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#content-${question.name} img.question-image`);
                    })
                    .catch(function(error) {
                        console.error("AttachmentAction - Error: " + JSON.stringify(error));
                    });
            }

            if (attachmentId.length > 0) {
                let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
                ActionHelper.executeApi(req).then(function(response) {
                        console.info("Attachment - Response: " + JSON.stringify(response));
                        UxUtils.setAfter($mtDiv.find("d-table"), UxUtils.questionTemplateImage(response.attachmentInfo.downloadUrl));
                        Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#content-${question.name} img.question-template-image`);
                    })
                    .catch(function(error) {
                        console.error("AttachmentAction - Error: " + JSON.stringify(error));
                    });
            }
            scoreArray[question.name] = 0;

            /* check for correct answer for each users */
            for (let i = 0; i < actionDataRowsLength; i++) {

                for (let c = 0; c < correctResponse.length; c++) {
                    let correctAnsString = "";
                    let userAnsString = "";
                    if ($.isArray(correctResponse[c])) {
                        if (correctResponse[c].length > 1) {
                            correctAnsString = correctResponse[c].join(",");
                        } else {
                            correctAnsString = correctResponse[c][0];
                        }
                    } else {
                        correctAnsString = correctResponse[c];
                    }

                    if (Utils.isJson(actionDataRows[i].columnValues[count])) {
                        let responderAnsArr = JSON.parse(actionDataRows[i].columnValues[count]);
                        if (responderAnsArr.length > 1) {
                            userAnsString = responderAnsArr.join(",");
                        } else {
                            userAnsString = responderAnsArr[0];
                        }
                    } else {
                        userAnsString = actionDataRows[i].columnValues[count];
                    }

                    if (correctAnsString == userAnsString) {
                        scoreArray[question.name] = scoreArray[question.name] + 1;
                    }

                }
            }

            let isRadio = true;
            if (JSON.parse(actionInstance.customProperties[5].value)[ind].length > 1) {
                isRadio = false;
            }

            question.options.forEach((option) => {
                /* User Responded */
                let $cardDiv = $(`<div class="card-box card-bg card-border mb--8 "></div>`);
                let userResponse = [];
                let userResponseAnswer = "";
                for (let i = 0; i < actionDataRowsLength; i++) {
                    userResponse = actionDataRows[i].columnValues;
                    let userResponseLength = Object.keys(userResponse).length;
                    let userResArr = [];
                    for (let j = 1; j <= userResponseLength; j++) {
                        if (Utils.isJson(userResponse[j])) {
                            let userResponseAns = JSON.parse(userResponse[j]);
                            let userResponseAnsLen = userResponseAns.length;
                            if (userResponseAnsLen > 1) {
                                for (let k = 0; k < userResponseAnsLen; k++) {
                                    if (userResponseAns[k] == option.name) {
                                        userResponseAnswer = userResponseAns[k];
                                        userResArr.push(userResponseAnswer);
                                    }
                                }
                            } else {
                                if (userResponseAns[0] == option.name) {
                                    userResponseAnswer = userResponseAns[0];
                                    userResArr.push(userResponseAnswer);
                                }
                            }
                        } else {
                            if (userResponse[j] == option.name) {
                                userResponseAnswer = userResponse[j];
                                userResArr.push(userResponseAnswer);
                            }
                        }
                    }
                }

                /* Correct Answer */
                let correctResponse = JSON.parse(
                    actionInstance.customProperties[5].value
                );
                let correctResponseLength = Object.keys(correctResponse).length;
                let optName = option.displayName;
                let attachmentId = option.attachments != "" ? option.attachments[0].id : "";
                let optId = option.name;
                let $radioOption = "";
                let result = "";
                for (let j = 0; j < correctResponseLength; j++) {
                    let correctResponseAns = correctResponse[j];
                    if (correctResponseAns.includes(option.name)) {
                        result = "correct";
                    }
                }
                if (isRadio) {
                    $radioOption = getRadioOptionsCreator(
                        optName,
                        optId,
                        ind,
                        result,
                        attachmentId
                    );
                    UxUtils.setAppend($cardDiv, $radioOption);
                } else {
                    let $checkOption = getCheckOptionsCreator(
                        optName,
                        optId,
                        ind,
                        result,
                        attachmentId
                    );
                    UxUtils.setAppend($cardDiv, $checkOption);
                }
                UxUtils.setAppend($quesContDiv, $cardDiv);
            });

            if (actionDataRowsLength == 0) {
                UxUtils.setHtml($dflexDiv.find("#status-" + question.name), UxUtils.getAggregrateScoreContainer("0", correctKey));
            } else {
                let aggregrateQuestionScore = ((scoreArray[question.name] * 100) / actionDataRowsLength);
                if (aggregrateQuestionScore % 1 != 0) {
                    aggregrateQuestionScore = aggregrateQuestionScore.toFixed(2);
                }
                UxUtils.setHtml($dflexDiv.find("#status-" + question.name), UxUtils.getAggregrateScoreContainer(aggregrateQuestionScore, correctKey));
            }
        });
    });
}

/**
 * @description Method for Question view based on user id
 * @param user id String contains userId
 */
function createQuestionView(userId) {
    total = 0;
    score = 0;
    UxUtils.setHtml("div#root > div.question-content", "");
    actionInstance.dataTables.forEach((dataTable) => {
        total = Object.keys(dataTable.dataColumns).length;
        dataTable.dataColumns.forEach((question, ind) => {
            answerIs = "";
            let $questionDiv = $(`<div class="question-content disabled2" id="content-${question.name}"></div>`);
            let $mtDiv = $(`<div class="mt--16"></div>`);
            let $dtableDiv = $(`<div class="d-table mb--4 "></div>`);
            let count = ind + 1;
            let questionAttachmentId = question.attachments != "" ? question.attachments[0].id : "";

            UxUtils.setAppend($questionDiv, $mtDiv);
            UxUtils.setAppend($mtDiv, $dtableDiv);
            UxUtils.setAppend($dtableDiv, UxUtils.getQuestionNumberContainer(questionKey, count));
            UxUtils.setAppend($dtableDiv, `<label class="float-right font-12 bold" id="status-${question.name}"></label>`);
            let $blankQDiv = $(`<div class=""></div>`);
            UxUtils.setAppend($mtDiv, $blankQDiv);
            UxUtils.setAppend($blankQDiv, UxUtils.getQuestionTitleContainer(question.displayName));

            if (questionAttachmentId.length > 0) {
                let req = ActionHelper.getAttachmentInfo(actionId, questionAttachmentId);
                ActionHelper.executeApi(req).then(function(response) {
                    console.info("Attachment - Response: " + JSON.stringify(response));
                    UxUtils.setPrepend($blankQDiv, UxUtils.getQuestionImageWithLoader(response.attachmentInfo.downloadUrl));
                    Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#content-${question.name} img.question-image`);
                })
                .catch(function(error) {
                    console.error("AttachmentAction - Error: " + JSON.stringify(error));
                });
            }

            let $blankDiv = $(`<div class=" "></div>`);
            UxUtils.setAppend($mtDiv, $blankDiv);
            let optAnsArr = [];
            let isRadio = true;
            if (JSON.parse(actionInstance.customProperties[5].value)[ind].length > 1) {
                isRadio = false;
            }
            question.options.forEach((option, optind) => {
                /* User Responded */
                let userResponse = [];
                let userResponseAnswer = "";
                for (let i = 0; i < actionDataRowsLength; i++) {
                    if (actionDataRows[i].creatorId == userId) {
                        userResponse = actionDataRows[i].columnValues;
                        let userResponseLength = Object.keys(userResponse).length;
                        for (let j = 1; j <= userResponseLength; j++) {
                            if (Utils.isJson(userResponse[j]) == true) {
                                let userResponseAns = JSON.parse(userResponse[j]);
                                let userResponseAnsLen = userResponseAns.length;
                                if (userResponseAnsLen > 1) {
                                    for (let k = 0; k < userResponseAnsLen; k++) {
                                        if (userResponseAns[k] == option.name) {
                                            userResponseAnswer = userResponseAns[k];
                                        } else {
                                            continue;
                                        }
                                    }
                                } else {
                                    if (userResponseAns[0] == option.name) {
                                        userResponseAnswer = userResponseAns[0];
                                    }
                                }
                            } else {
                                if (userResponse[j] == option.name) {
                                    userResponseAnswer = userResponse[j];
                                }
                            }
                        }
                    }
                }
                /* Correct Answer */
                let correctResponse = JSON.parse(
                    actionInstance.customProperties[5].value
                );
                let correctResponseLength = Object.keys(correctResponse).length;
                let correctAnswer = "";
                for (let j = 0; j < correctResponseLength; j++) {
                    let correctResponseAns = correctResponse[j];
                    let correctResponseAnsLen = correctResponseAns.length;
                    for (let k = 0; k < correctResponseAnsLen; k++) {
                        if (correctResponseAns[k] == option.name) {
                            correctAnswer = correctResponseAns[k];
                        }
                    }
                }

                let optName = option.displayName;
                let optAttachmentId = option.attachments != 0 ? option.attachments[0].id : "";

                if (isRadio) {
                    let $radioOption = getRadioOptions(
                        optName,
                        question.name,
                        option.name,
                        userResponseAnswer,
                        correctAnswer,
                        optAttachmentId
                    );
                    UxUtils.setAppend($blankDiv, $radioOption);
                } else {
                    let $checkOption = getCheckOptions(
                        optName,
                        question.name,
                        option.name,
                        userResponseAnswer,
                        correctAnswer,
                        optAttachmentId
                    );
                    UxUtils.setAppend($blankDiv, $checkOption);
                }
                if (answerIs.toLowerCase() == "correct") {
                    optAnsArr[optind] = answerIs;
                } else if (answerIs.toLowerCase() == "incorrect") {
                    optAnsArr[optind] = "incorrect";
                }
                if (answerIs.toLowerCase() == "correct") {
                    Localizer.getString(answerIs.toLowerCase()).then(function (result) {
                        UxUtils.setHtml($questionDiv.find("#status-" + question.name), `<span class="semi-bold text-success">${result}</span>`);
                    });
                } else {
                    Localizer.getString(answerIs.toLowerCase()).then(function (result) {
                        UxUtils.setHtml($questionDiv.find("#status-" + question.name), `<span class="semi-bold text-danger">${result}</span>`);
                    });
                }
            });

            if (optAnsArr.includes("incorrect") != true) {
                score++;
            }
            UxUtils.setAppend("div#root", $questionDiv);
        });

    });

    let scorePercentage = (score / total) * 100;
    if (scorePercentage % 1 != 0) {
        scorePercentage = scorePercentage.toFixed(2);
    }
    Localizer.getString("score", ":").then(function(result) {
        UxUtils.setAfter("#root div:first", UxUtils.breakline());
        UxUtils.setAfter("#root div:first", UxUtils.getScoreContainer(result, scorePercentage));
        UxUtils.setAfter("#root div:first", UxUtils.breakline());
    });
}

/**
 * @description Method for Question view based on user id
 * @param text String contains correct and incorrect message
 * @param name String contains option name
 * @param id String contains option id
 * @param userResponse String contains user response data
 * @param correctAnswer String contains correct answer
 * @param attachmentId String contains attachment id of option
 */
function getRadioOptions(text, name, id, userResponse, correctAnswer, attachmentId) {
    let $oDiv = $(`<div class=""></div>`);
    /*  If answer is correct  and answered */
    if ($.trim(userResponse) == $.trim(id) && $.trim(correctAnswer) == $.trim(id)) {
        UxUtils.setAppend($oDiv, UxUtils.getRadioInnerResponderQuestionSuccess(id, text));
        if (answerIs == "") {
            answerIs = "Correct";
        }
    } else if (($.trim(userResponse) == $.trim(id) && $.trim(correctAnswer) != $.trim(userResponse))) {
        /* If User Response is correct and answered incorrect */
        UxUtils.setAppend($oDiv, UxUtils.getRadioInnerResponderQuestionCorrect(id, text));
        answerIs = "Incorrect";
    } else if (($.trim(userResponse) != $.trim(id) && $.trim(correctAnswer) == $.trim(id))) {
        /* If User Response is incorrect and not answered */
        UxUtils.setAppend($oDiv, UxUtils.getRadioInnerResponderQuestionCorrect2(id, text));
        answerIs = "Incorrect";
    } else {
        UxUtils.setAppend($oDiv, UxUtils.getRadioInnerResponderQuestionNormal(id, text));
    }

    if (attachmentId.length > 0) {
        let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
        ActionHelper.executeApi(req).then(function(response) {
            console.info("Attachment - Response: " + JSON.stringify(response));
            UxUtils.setPrepend($oDiv.find("label.custom-radio"), UxUtils.getOptionImage(response.attachmentInfo.downloadUrl));
            Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#${id} img.opt-image`);
        })
        .catch(function(error) {
            console.error("AttachmentAction - Error: " + JSON.stringify(error));
        });
    }
    return $oDiv;
}

/**
 * @description Method for Question view Checkbox based on user id
 * @param text String contains correct and incorrect message
 * @param name String contains option name
 * @param id String contains option id
 * @param userResponse String contains user response data
 * @param correctAnswer String contains correct answer
 * @param attachmentId String contains attachment id of option
 */
function getCheckOptions(text, name, id, userResponse, correctAnswer, attachmentId) {
    let $oDiv = $(`<div class=""></div>`);
    /*  If answer is correct  and answered */
    if ($.trim(userResponse) == $.trim(id) && $.trim(correctAnswer) == $.trim(id)) {
        UxUtils.setAppend($oDiv, UxUtils.getCheckboxForInnerResponderQuestionSuccess(id, text));
        if (answerIs == "") {
            answerIs = "Correct";
        }
    } else if (($.trim(userResponse) == $.trim(id) && $.trim(correctAnswer) != $.trim(userResponse))) {
        /* If User Response is correct and answered incorrect */
        UxUtils.setAppend($oDiv, UxUtils.getCheckboxForInnerResponderQuestionCorrect(id, text));
        answerIs = "Incorrect";
    } else if (($.trim(userResponse) != $.trim(id) && $.trim(correctAnswer) == $.trim(id))) {
        /* If User Response is incorrect and not answered */
        UxUtils.setAppend($oDiv, UxUtils.getCheckboxForInnerResponderQuestionCorrect2(id, text));
        answerIs = "Incorrect";
    } else {
        UxUtils.setAppend($oDiv, UxUtils.getCheckboxForInnerResponderQuestionNormal(id, text));
    }

    if (attachmentId.length > 0) {
        let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
        ActionHelper.executeApi(req).then(function(response) {
            console.info("Attachment - Response: " + JSON.stringify(response));
            UxUtils.setPrepend($oDiv.find("label.custom-check"), UxUtils.getOptionImage(response.attachmentInfo.downloadUrl));
            Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#${id} img.opt-image`);
        })
        .catch(function(error) {
            console.error("AttachmentAction - Error: " + JSON.stringify(error));
        });
    }
    return $oDiv;
}

/**
 * @description Method for Question view based on user id
 * @param text String contains correct and incorrect message
 * @param name String contains option name
 * @param id String contains option id
 * @param userResponse String contains user response data
 * @param correctAnswer String contains correct answer
 * @param attachmentId String contains attachment id of option
 */
function getRadioOptionsCreator(text, optId, ind, result, attachmentId) {
    let $oDiv = $(`<div class="form-group"></div>`);
    /*  If answer is correct  and answered */
    if (result == "correct") {
        UxUtils.setAppend($oDiv, UxUtils.getCorrectRadiobox(optId, ind, text));
    } else {
        UxUtils.setAppend($oDiv, UxUtils.getRadioboxSimple(optId, ind, text));
    }
    if (attachmentId.length > 0) {
        let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
        ActionHelper.executeApi(req).then(function(response) {
            console.info("Attachment - Response: " + JSON.stringify(response));
            UxUtils.setPrepend($oDiv.find("label.custom-radio"), UxUtils.getOptionImageWithLoader(response.attachmentInfo.downloadUrl));
            Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#${optId} .opt-image`);
        })
        .catch(function(error) {
            console.error("AttachmentAction - Error: " + JSON.stringify(error));
        });
    }
    return $oDiv;
}

/**
 * @description Method for Question view based on user id
 * @param text String contains correct and incorrect message
 * @param name String contains option name
 * @param id String contains option id
 * @param userResponse String contains user response data
 * @param correctAnswer String contains correct answer
 * @param attachmentId String contains attachment id of option
 */
function getCheckOptionsCreator(text, optId, ind, result, attachmentId) {
    let $oDiv = $(`<div class="form-group"></div>`);
    /*  If answer is correct  and answered */
    if (result == "correct") {
        UxUtils.setAppend($oDiv, UxUtils.getCorrectCheckbox(optId, ind, text));
    } else {UxUtils.getRadioboxSimple(optId, ind, text);
            UxUtils.setAppend($oDiv, UxUtils.getCheckboxSimple(optId, ind, text));
    }
    if (attachmentId.length > 0) {
        let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
        ActionHelper.executeApi(req).then(function(response) {
            console.info("Attachment - Response: " + JSON.stringify(response));
            UxUtils.setPrepend($oDiv.find("label.custom-check"), UxUtils.getOptionImageWithLoader(response.attachmentInfo.downloadUrl));
            Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#${optId} .opt-image`);
        }).catch(function(error) {
            console.error("AttachmentAction - Error: " + JSON.stringify(error));
        });
    }
    return $oDiv;
}

/**
 * @description Method for creating footer based on user id
 * @param userId String contains user identifier to load footer based on that
 */
function footer(userId) {
    $("div.question-content:first").find(".footer").hide();
    UxUtils.setAfter("div.question-content", UxUtils.getFooterUserResultPage(userId, backKey));
}

/**
 * @description Method for footer for return back to landing page
 */
function footerClose() {
    UxUtils.setAppend("#root", UxUtils.getFooterCloseArea(closeKey));
}

/**
 * @description Method for footer with download button
 */
function footerDownload() {
    UxUtils.setAppend("#root", UxUtils.getFooterDownloadButton(downloadKey, downloadImageKey, downloadCSVKey));
}

/**
 * @description Method for footer for return back to landing page
 */
function footer1() {
    UxUtils.setAppend("#root", UxUtils.getFooterBackDetailView(backKey));
}

/**
 * @description Method for footer for return back for internal pages
 */
function footerResponderNonResponderTabs() {
    UxUtils.setAppend("div.question-content:visible", UxUtils.getFooterResNonResDetailView());
}

/**
 * @description Method to load non responder page
 */
function create_responder_nonresponders() {
    if (actionInstance.customProperties[2].value == "Only me") {
        if (actionContext.userId == actionInstance.creatorId) {
            UxUtils.setHtml("#root", "");
            if ($(".tabs-content:visible").length <= 0) {
                let $card1 = $(`<div class="card-box card-blank"></div>`);
                let tabs = $(".tabs-content").clone();
                UxUtils.setAppend($card1, tabs.clone());
                UxUtils.setAppend("#root", $card1);
                footer1();
            }

            /*  Add Responders  */
            getResponders();

            /*  Add Non-reponders  */
            getNonresponders();
        } else {
            return false;
        }
    } else {
        UxUtils.setHtml("#root", "");
        if ($(".tabs-content:visible").length <= 0) {
            let $card1 = $(`<div class="card-box card-blank"></div>`);
            let tabs = $(".tabs-content").clone();
            UxUtils.setAppend($card1, tabs.clone());
            UxUtils.setAppend("#root", $card1);
            footer1();
        }

        // Add Responders
        getResponders();

        // Add Non-reponders
        getNonresponders();
    }
    Localizer.getString("xofy_people_responded", actionSummary.rowCount, memberCount).then(function (result) {
        let xofy = result;
        UxUtils.setBefore(".card-box.card-blank", UxUtils.getTotalPeopleRespondedStringOnResNonRes(xofy));
        UxUtils.setBefore(".card-box.card-blank", UxUtils.clearFix());
    });
}

/**
 * @description Method contains section to date change of quiz
 */
function changeDateSection() {
    UxUtils.setPrepend($("#root .d-table:first").parents("div.container"), UxUtils.getChangeDateSection(changeDueDateKey, cancelKey, changeKey));
}

/**
 * @description Method contains section to close quiz
 */
function closeQuizSection() {
    UxUtils.setPrepend($("#root .d-table:first").parents("div.container"), UxUtils.getCloseQuizSection(closeQuizKey, closeQuizConfirmKey, cancelKey, confirmKey));
}

/**
 * @description Method contains section to delete quiz
 */
function deleteQuizSection() {
    UxUtils.setPrepend($("#root .d-table:first").parents("div.container"), UxUtils.deleteQuizSection(deleteQuizKey, deleteQuizConfirmKey, cancelKey, confirmKey));
}