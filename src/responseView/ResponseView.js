// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import "../common/utils/JqueryGlobal";
import "bootstrap/dist/js/bootstrap";
import { ActionHelper, Localizer } from "../common/ActionSdkHelper";
import { Constants } from "../common/utils/Constants";
import { UxUtils } from "./../common/utils/UxUtils";
import { Utils } from "./../common/utils/Utils";
import { KeyboardAccess } from "./../common/utils/KeyboardUtils";
import "../../assets/css/style-custom";
import "../../assets/css/style-default";

// Fetching HTML Elements in Variables by ID.
let request;
let $root = "";
let row = {};
let actionInstance = null;
let isShowAnswerEveryQuestion = "";
let maxQuestionCount = 0;
let currentPage = 0;
let summaryAnswerResp = [];
let actionDataRows = null;
let actionDataRowsLength = 0;
let memberIds = [];
let myUserId = [];
let contextActionId;
let addDataRowRequest = "";
let questionKey = "";
let questionsKey = "";
let startKey = "";
let noteKey = "";
let choiceAnyChoiceKey = "";
let correctKey = "";
let incorrectKey = "";
let submitKey = "";
let doneKey = "";
let nextKey = "";
let backKey = "";
let checkKey = "";
let prevKey = "";
let quizExpiredKey = "";
let alreadyAttemptedKey = "";
let closeKey = "";

/* ********************************* Events ******************************************** */

/**
 * @event Click event to handles the radio is selcct as correct answer
 */
$(document).on("click", "div.radio-section", function() {
    radiobuttonclick();
});

/**
 * @event Click event to handles next questions
 */
$(document).on("click", "#next", function() {
    let answerKeys = JSON.parse(actionInstance.customProperties[5].value);
    let correctAnsArr = [];
    let selectedAnswer = [];
    let correctAnswer = false;
    let attrName = "";
    let pagenumber = $(this).attr("data-next-id");
    currentPage = pagenumber;

    getStringKeys();

    if (parseInt(currentPage) > 0) {
        if ($("#previous").attr("data-prev-id") >= 0) {
            $("#previous").removeClass("disabled");
        }
        if($(this).text() == nextKey) {
            $("#previous").attr("data-prev-id", parseInt(currentPage) - 1);
        }
    }

    /* Check if radio or checkbox is checked */
    let isChecked = false;
    $("div.card-box-question:visible").find("input[type='checkbox']:checked").each(function(ind, ele) {
        if ($(ele).is(":checked")) {
            selectedAnswer.push($.trim($(ele).attr("id")));
            attrName = $(ele).attr("name");
            isChecked = true;
        }
    });

    $("div.card-box-question:visible").find("input[type='radio']:checked").each(function(ind, ele) {
        if ($(ele).is(":checked")) {
            selectedAnswer.push($.trim($(ele).attr("id")));
            attrName = $(ele).attr("name");
            isChecked = true;
        }
    });

    if (isChecked == true) {
        isChecked = false;
        let ansRes = [];
        $.each(selectedAnswer, function(i, selectedSubarray) {
            if ($.inArray(selectedSubarray, answerKeys[(attrName - 1)]) !== -1) {
                ansRes.push("true");
            } else {
                ansRes.push("false");
            }
        });

        if ((answerKeys[(attrName - 1)].length == ansRes.length) && ($.inArray("false", ansRes) == -1)) {
            correctAnswer = true;
        } else {
            correctAnswer = false;
        }

        summaryAnswerResp.push(correctAnswer);

        $.each(answerKeys[(attrName - 1)], function(ii, subarr) {
            correctAnsArr.push($.trim($("#" + subarr).text()));
        });

        nextButtonName();
        if (isShowAnswerEveryQuestion == "Yes") {
            if ($(this).find("span").attr("class") == "check-key") {
                checkAnswer(correctAnswer, answerKeys, attrName);
            } else {
                if ($.trim($(".result-status:visible").text()).length == 0) {
                    checkAnswer(correctAnswer, answerKeys, attrName);
                } else {
                    $root.find(".card-box-question").hide();
                    if ((parseInt(currentPage) == $root.find("div.card-box-question").length) && (parseInt(currentPage)) < maxQuestionCount) {
                        createQuestionView();
                    } else if (parseInt(currentPage) == maxQuestionCount) {
                        /*  Submit your question  */
                        addDataRowRequest = ActionHelper.addDataRow(
                            getDataRow(contextActionId)
                        );
                        ActionHelper
                            .executeApi(addDataRowRequest)
                            .then(function(batchResponse) {
                                console.info("BatchResponse: " + JSON.stringify(batchResponse));
                                summarySection();
                            })
                            .catch(function(error) {
                                console.log("Error1: " + JSON.stringify(error));
                            });

                    } else {
                        $("#previous").attr("data-prev-id", (parseInt(currentPage) - 1));
                        Localizer.getString("xofy", parseInt(currentPage) + 1, maxQuestionCount).then(function(result) {
                            $("#xofy").text(result);
                            nextButtonName();
                        });
                        $("#check").attr("data-next-id", (parseInt(currentPage) + 1));
                        $("#next").attr("data-next-id", (parseInt(currentPage) + 1));
                        $root.find("div.card-box-question:nth-child(" + (parseInt(currentPage) + 1) + ")").show();

                        if ($("div.card-box-question:nth-child(" + (parseInt(currentPage) + 1) + ")").find(".card-box.disabled:first").length == 0) {
                            if ($("div.card-box-question:nth-child(" + (parseInt(currentPage) + 1) + ")").find("input[name='" + (parseInt(currentPage) + 1) + "']").is(":checked") == false) {
                                $(".section-1-footer").find(".next-key").addClass("check-key");
                                $(".section-1-footer").find(".next-key").removeClass("next-key");
                                $(".footer.section-1-footer").hide();
                                if (isShowAnswerEveryQuestion != "Yes") {
                                    let timeids = setInterval(function() {
                                        if($(".section-1-footer").find(".check-key").length > 0) {
                                            $(".section-1-footer").find(".check-key").text(nextKey);
                                            $(".footer.section-1-footer").show();
                                            clearInterval(timeids);
                                        }
                                    }, Constants.setIntervalTimeOne());
                                } else {
                                    $(".section-1-footer").find(".check-key").text(checkKey);
                                    $(".footer.section-1-footer").show();
                                }
                            }
                        }
                        if ($("#previous").attr("data-prev-id") >= 0) {
                            $("#previous").removeClass("disabled");
                        }
                    }
                }
            }

            if (currentPage >= maxQuestionCount) {
                $("#next").removeClass("disabled");
            }

        } else {
            $root.find(".card-box-question").hide();

            if ((parseInt(currentPage) == $root.find("div.card-box-question").length) && (parseInt(currentPage)) < maxQuestionCount) {
                createQuestionView();
            } else if (parseInt(currentPage) == maxQuestionCount) {
                /*  Submit your question  */
                addDataRowRequest = ActionHelper.addDataRow(getDataRow(contextActionId));
                ActionHelper
                    .executeApi(addDataRowRequest)
                    .then(function(batchResponse) {
                        console.info("BatchResponse: " + JSON.stringify(batchResponse));
                        summarySection();
                    })
                    .catch(function(error) {
                        console.log("Error2: " + JSON.stringify(error));
                    });
            } else {
                $root.find(".card-box-question:nth-child(" + (parseInt(currentPage) + 1) + ")").show();
                $("#previous").attr("data-prev-id", (parseInt(currentPage) - 1));
                Localizer.getString("xofy", parseInt(currentPage) + 1, maxQuestionCount).then(function(result) {
                    $("#xofy").text(result);
                    nextButtonName();
                });
                $("#check").attr("data-next-id", (parseInt(currentPage) + 1));
                $("#next").attr("data-next-id", (parseInt(currentPage) + 1));
                if ($("#previous").attr("data-prev-id") >= 0) {
                    $("#previous").removeClass("disabled");
                }
                if ($("div.card-box-question:nth-child(" + (parseInt(currentPage) + 1) + ")").find(".card-box.disabled:first").length == 0) {
                    if ($("div.card-box-question:nth-child(" + (parseInt(currentPage) + 1) + ")").find("input[name='" + (parseInt(currentPage) + 1) + "']").is(":checked") == false) {
                        $(".section-1-footer").find(".next-key").addClass("check-key");
                        $(".section-1-footer").find(".next-key").removeClass("next-key");
                        $(".footer.section-1-footer").hide();
                        if (isShowAnswerEveryQuestion != "Yes") {
                            let checked = false;
                            if($root.find("div.card-box-question:nth-child(" + (parseInt(currentPage) + 1) + ")").find("input[type='radio']:checked").length > 0) {
                                checked = true;
                            }
                            if($root.find("div.card-box-question:nth-child(" + (parseInt(currentPage) + 1) + ")").find("input[type='checkbox']:checked").length > 0) {
                                checked = true;
                            }
                            if(checked == false) {
                                $("#next").attr("id", "check");
                            }
                            let timeid = setInterval(function() {
                                if($(".section-1-footer").find(".check-key").length > 0) {
                                    $(".section-1-footer").find(".check-key").text(nextKey);
                                    $(".footer.section-1-footer").show();
                                    clearInterval(timeid);
                                }
                            }, Constants.setIntervalTimeOne());
                        } else {
                            $(".section-1-footer").find(".check-key").text(checkKey);
                            $(".footer.section-1-footer").show();
                        }
                    }
                }

            }

            if (currentPage >= maxQuestionCount) {
                $("#next").removeClass("disabled");
            }
        }

    } else {
        $(".choice-required-err").remove();
        UxUtils.setAppend(".card-box-question:visible", UxUtils.getSelectChoiceOptionError(choiceAnyChoiceKey));
    }
});

/**
 * @event Change event for radio or check box for question
 */
$(document).on("change", "input[type='radio'], input[type='checkbox']", function() {
    $(this).each(function(ind, opt) {
        if ((isShowAnswerEveryQuestion == "Yes") && ($("div.card-box:visible").find("label.custom-radio").hasClass("disabled") !== "disabled" || $("div.card-box:visible").find("label.custom-check").hasClass("disabled") !== "disabled")) {
            if ($(opt).is(":checked")) {
                console.log("test: 1");
                $(".choice-required-err").remove();
                $(".check-key").parents("button").attr("id", "next");
                return false;
            } else {
                console.log("test: 2");
                $(".choice-required-err").remove();
                $(".next-key").text(`${checkKey}`);
                $(".next-key").parents("button").attr("id", "check");
                return false;
            }
        } else {
            if ($(opt).is(":checked")) {
                $(".choice-required-err").remove();
                currentPage = "";
                if($("#next").attr("data-next-id") != undefined) {
                    currentPage = $("#next").attr("data-next-id");
                } else {
                    currentPage = $("#check").attr("data-next-id");
                }
                if (parseInt(currentPage) >= maxQuestionCount) {
                    $(".check-key").text(`${doneKey}`);
                } else {
                    $(".check-key").text(`${nextKey}`);
                }
                $(".check-key").parents("button").attr("id", "next");
                return false;
            }
        }
    });
});

/**
 * @event Click event to check option is selected and show error if not
 */
$(document).on("click", "#check", function() {
    $(".choice-required-err").remove();
    UxUtils.setAppend(".card-box-question", UxUtils.getSelectChoiceOptionError(choiceAnyChoiceKey));
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".text-danger:first").offset().top - Constants.getWidthOffsets()
    }, Constants.setIntervalTimeThousand());
});

/**
 * @event Click event to show previous questions
 */
$(document).on("click", "#previous", function() {
    if ($(this).hasClass("disabled") == false) {
        $(".check-key").addClass("next-key");
        $(".check-key").removeClass("check-key");
        $(".next-key").text(nextKey);
        $("#check").attr("id", "next");
        $(".choice-required-err").remove();

        let pagenumber = $(this).attr("data-prev-id");
        currentPage = pagenumber;
        getStringKeys();

        $root.find(".card-box-question").hide();
        $(".footer.section-1-footer").hide();
        $root.find(".card-box-question:nth-child(" + (parseInt(currentPage) + 1) + ")").show();
        $(".footer.section-1-footer").show();

        $("#previous").attr("data-prev-id", (parseInt(currentPage) - 1));
        $("#next").attr("data-next-id", (parseInt(currentPage) + 1));
        $("#check").attr("data-next-id", (parseInt(currentPage) + 1));
        Localizer.getString("xofy", parseInt(currentPage) + 1, maxQuestionCount).then(function(result) {
            $("#xofy").text(result);
            nextButtonName();
        });

        if (currentPage <= 0) {
            $("#previous").addClass("disabled");
        }
    }
});

/**
 * @event Click event for finally close the quiz
 */
$(document).on("click", ".submit-key", function() {
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
 * @event Click event on start button and loads first question
 */
$(document).on("click", "#start", function() {
    UxUtils.setHtml($root, "");
    maxQuestionCount = actionInstance.dataTables[0].dataColumns.length;
    getStringKeys();
    createQuestionView();
});

/**
 * @event Click event on submit quiz and loads summary view
 */
$(document).on("click", ".submit-form", function() {
    summarySection();
});

/**
 * @event Click event to close quiz
 */
$(document).on("click", "#close-event", function() {
    let closeViewRequest = ActionHelper.closeView();
    ActionHelper.executeApi(closeViewRequest);
});

/**
 * @event Keydown event for disable option if answers is selected for check answer setting
 */
KeyboardAccess.selectCheckOrRadioKeydown(document, ".summary-section input[type='radio'], .summary-section input[type='checkbox']");

/**
 * @event Click event for disable option if answers is selected for check answer setting
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        if ($(this).hasClass("disabled")) {
            return false;
        }
    }
}, ".summary-section input[type='radio'], .summary-section input[type='checkbox']");

/* ********************************* Methods ******************************************** */

/**
 * @description Method getStringKeys for fetching localization strings
 */
async function getStringKeys() {
    Localizer.getString("question").then(function(result) {
        questionKey = result;
        $(".question-key").text(questionKey);
    });

    Localizer.getString("questions").then(function(result) {
        questionsKey = result;
        $(".question-key").text(questionsKey);
    });

    Localizer.getString("start").then(function(result) {
        startKey = result;
        $("#start").text(startKey);
    });

    Localizer.getString("note").then(function(result) {
        noteKey = result;
        $(".note-key").text(noteKey);
    });

    Localizer.getString("choose_any_choice").then(function(result) {
        choiceAnyChoiceKey = result;
    });

    Localizer.getString("correct").then(function(result) {
        correctKey = result;
    });

    Localizer.getString("incorrect").then(function(result) {
        incorrectKey = result;
    });

    Localizer.getString("submit").then(function(result) {
        submitKey = result;
        $(".submit-key").text(submitKey);
    });

    Localizer.getString("next").then(function(result) {
        nextKey = result;
        $(".next-key").text(nextKey);
    });

    Localizer.getString("done").then(function(result) {
        doneKey = result;
        // $(".next-key").text(doneKey);
    });

    Localizer.getString("back").then(function(result) {
        backKey = result;
        $(".back-key").text(backKey);
    });

    Localizer.getString("prev").then(function(result) {
        prevKey = result;
        $(".prev-key").text(prevKey);
    });

    Localizer.getString("check").then(function(result) {
        checkKey = result;
        $(".check-key").text(checkKey);
    });

    Localizer.getString("quiz_expired").then(function(result) {
        quizExpiredKey = result;
        $("#quiz-expired-key").text(backKey);
    });

    Localizer.getString("alreadyAttempted").then(function(result) {
        alreadyAttemptedKey = result;
        UxUtils.setHtml(".already-attempt", alreadyAttemptedKey);
    });

    Localizer.getString("close").then(function(result) {
        closeKey = result;
        $(".close-key").text(closeKey);
    });
}

/**
 * @description Method loadResponsView to select theme based on the teams theme
 * @param request context request object
 */
async function loadResponsView(request) {
    let response = await ActionHelper.executeApi(request);
    let context = response.context;
    $("form.section-1").show();
    let theme = context.theme;
    $("link#theme").attr("href", "css/style-" + theme + ".css");
    UxUtils.setAppend("div.section-1", `<div class="row"><div class="col-12"><div id="root"></div></div></div>`);
    UxUtils.setPrepend("div.section-1 div.row", UxUtils.getQuizTemplateImageResponseView());
    $root = $("#root");
    $("div.section-1").show();
    $("div.footer").show();
    OnPageLoad();
}

/* Initiate Method and call methods during page load */
$(function () {
    request = ActionHelper.getContextRequest();
    loadResponsView(request);
});

/**
 * @description Method OnPageLoad retrieves action data and responders ids and loads the landing page
 */
function OnPageLoad() {
    ActionHelper
        .executeApi(request)
        .then(function(response) {
            myUserId = response.context.userId;
            contextActionId = response.context.actionId;
            getResponderIds(contextActionId);
        })
        .catch(function(error) {
            console.error("GetContext - Error4: " + JSON.stringify(error));
        });
}

/**
 * @description Method getResponderIds get Responders id
 * @param action context id identifier
 */
async function getResponderIds(actionId) {
    ActionHelper
        .executeApi(ActionHelper.requestDataRows(actionId))
        .then(function(batchResponse) {
            actionDataRows = batchResponse.dataRows;
            if (actionDataRows == null) {
                actionDataRowsLength = 0;
            } else {
                actionDataRowsLength = actionDataRows.length;
            }
            if (actionDataRowsLength > 0) {
                for (let i = 0; i < actionDataRowsLength; i++) {
                    memberIds.push(actionDataRows[i].creatorId);
                }
            }
            getActionInstance(actionId);
        })
        .catch(function(error) {
            console.error("Console log: Error5: " + JSON.stringify(error));
        });
}

/**
 * @description Method getActionInstance creates quiz page during page load
 * @param action context id identifier
 */
function getActionInstance(actionId) {
    ActionHelper
        .executeApi(ActionHelper.getActionRequest(actionId))
        .then(function(response) {
            actionInstance = response.action;
            createBody();
        })
        .catch(function(error) {
            console.error("Error6: " + JSON.stringify(error));
        });
}

/**
 * @description Method createBody for creating the quiz page
 */
function createBody() {
    /*  Check Expiry date time  */
    let currentTime = new Date().getTime();
    let expireTime = actionInstance.expiryTime;
    isShowAnswerEveryQuestion = actionInstance.customProperties[3].value;
    getStringKeys();
    if (expireTime <= currentTime) {
        let $card = $(`<div class="card"></div>`);
        let $spDiv = $(`<div class="col-sm-12"></div>`);
        let $sDiv = $(`<div class="form-group" id="quiz-expired-key">${quizExpiredKey}</div>`);
        UxUtils.setAppend($card, $spDiv);
        UxUtils.setAppend($spDiv, $sDiv);
        UxUtils.setAppend($root, $card);
    } else {
        /* Loads all images when launching landing page */
        actionInstance.dataTables.forEach((dataTable, ind) => {
            if (dataTable.attachments.length > 0) {
                let req = ActionHelper.getAttachmentInfo(contextActionId, dataTable.attachments[0].id);
                ActionHelper.executeApi(req).then(function(response) {
                        actionInstance.dataTables[ind].attachments[0].url = response.attachmentInfo.downloadUrl;
                        if (actionInstance.dataTables[0].attachments[0].url != null) {
                            $(".quiz-template-image").attr("src", actionInstance.dataTables[0].attachments[0].url);
                            getClassFromDimension(response.attachmentInfo.downloadUrl, ".quiz-template-image");
                            $(".quiz-template-image").show();
                            $(".quiz-updated-img").show();
                            UxUtils.removeImageLoader(".quiz-template-image");
                        }
                        ActionHelper.hideLoader();

                    })
                    .catch(function(error) {
                        console.error("AttachmentAction - Errorquiz: " + JSON.stringify(error));
                    });
            }
            dataTable.dataColumns.forEach((questions, qindex) => {
                if (questions.attachments.length > 0) {
                    let req = ActionHelper.getAttachmentInfo(contextActionId, questions.attachments[0].id);
                    ActionHelper.executeApi(req).then(function(response) {
                            actionInstance.dataTables[ind].dataColumns[qindex].attachments[0].url = response.attachmentInfo.downloadUrl;
                        })
                        .catch(function(error) {
                            console.error("AttachmentAction - Errorquestion: " + JSON.stringify(error));
                        });
                }

                questions.options.forEach((option, optindex) => {
                    if (option.attachments.length > 0) {
                        let req = ActionHelper.getAttachmentInfo(contextActionId, option.attachments[0].id);
                        ActionHelper.executeApi(req).then(function(response) {
                                actionInstance.dataTables[ind].dataColumns[qindex].options[optindex].attachments[0].url = response.attachmentInfo.downloadUrl;
                            })
                            .catch(function(error) {
                                console.error("AttachmentAction - Erroroptions: " + JSON.stringify(error));
                            });
                    }
                });
            });
        });
        ActionHelper.hideLoader();

        let $card = $(`<div class=""></div>`);
        let $title = $(UxUtils.getQuizTitleResponseView(actionInstance.displayName));
        let $description = $(UxUtils.getQuizDescriptioneResponseView(actionInstance.customProperties[0].value));
        UxUtils.setAppend($card, $title);
        UxUtils.setAppend($card, $description);
        UxUtils.setAppend($root, $card);
        let counter = actionInstance.dataTables[0].dataColumns.length;
        UxUtils.setAppend($root, textSection1);

        if ($.inArray(myUserId, memberIds) > -1) {
            UxUtils.setBefore("p.text-description", UxUtils.getAlreadyAttempt(alreadyAttemptedKey));
            calculateScore();
            UxUtils.setAfter(".body-outer", closeFooter);
        } else {
            if (counter > 1) {
                Localizer.getString("questions").then(function(result) {
                    Localizer.getString("totalQuestionQuiz", counter, result).then(function(res) {
                        $("div.text-counter-ques:last").find(".text-description").text(res);
                    });
                });
            } else {
                Localizer.getString("question").then(function(result) {
                    Localizer.getString("totalQuestionQuiz", counter, result).then(function(res) {
                        $("div.text-counter-ques:last").find(".text-description").text(res);
                    });
                });
            }
            UxUtils.setAfter($root, footerSection1);
        }
        getStringKeys();
        return;
    }
}

/**
 * @description method calculateScore Calculates Responders Score
 */
function calculateScore() {
    let total = 0;
    let score = 0;
    actionInstance.dataTables.forEach((dataTable) => {
        total = Object.keys(dataTable.dataColumns).length;
        /* Correct Answer */
        let correctResponse = JSON.parse(
            actionInstance.customProperties[5].value
        );

        for (let i = 0; i < actionDataRowsLength; i++) {
            if (actionDataRows[i].creatorId == myUserId) {
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

        let scorePercentage = 0;
        if (score > 0) {
            scorePercentage = (score / total) * 100;
        }
        if (scorePercentage % 1 != 0) {
            scorePercentage = scorePercentage.toFixed(2);
        }

        Localizer.getString("score", ":").then(function(result) {
            UxUtils.setHtml($("div.text-counter-ques:last").find(".text-description"), `<p class="text-description bold">${result} ${scorePercentage}%</p>`);
        });
    });
}

/**
 * @description Method createQuestionView for creating Question pagewise
 */
function createQuestionView() {
    $(".footer.section-1-footer").remove();
    UxUtils.setAfter($root, paginationFooterSection);
    $(".footer.section-1-footer").hide();
    if (isShowAnswerEveryQuestion != "Yes") {
        let timeid = setInterval(function() {
            if($(".section-1-footer").find(".check-key").length > 0) {
                $(".section-1-footer").find(".check-key").text(nextKey);
                $(".footer.section-1-footer").show();
                clearInterval(timeid);
            }
        }, Constants.setIntervalTimeOne());
    } else {
        $(".footer.section-1-footer").show();
    }
    if (currentPage > 0) {
        if ($("#previous").attr("data-prev-id") >= 0) {
            $("#previous").removeClass("disabled");
        }
    } else {
        $("#previous").addClass("disabled");
    }

    $("#previous").attr("data-prev-id", (parseInt(currentPage) - 1));
    $("#next").attr("data-next-id", (parseInt(currentPage) + 1));
    $("#check").attr("data-next-id", (parseInt(currentPage) + 1));

    Localizer.getString("xofy", parseInt(currentPage) + 1, maxQuestionCount).then(function(result) {
        $("#xofy").text(result);
        nextButtonName();
    });

    actionInstance.dataTables.forEach((dataTable) => {
        let question = dataTable.dataColumns[currentPage];
        if ($(".quiz-img-sec").length > 0) {
            $(".quiz-img-sec").remove();
        }
        let count = parseInt(currentPage) + 1;
        UxUtils.setAppend($root, questionSection);
        UxUtils.setHtml("#root div.card-box-question:visible .question-number-title", UxUtils.getQuestionNumberResponseView(questionKey, count));

        if (question.attachments.length > 0) {
            $("#root div.card-box-question:visible .question-template-image").attr("src", question.attachments[0].url);
            $("#root div.card-box-question:visible .question-template-image").show();
            $("#root div.card-box-question:visible .quiz-updated-img").show();
            getClassFromDimension(question.attachments[0].url, "#root div.card-box-question:visible .question-template-image");
            UxUtils.removeImageLoader("#root div.card-box-question:visible .question-template-image");
        }
        UxUtils.setHtml("#root div.card-box-question:visible .question-title", `<p class="">${question.displayName}</p>`);

        //add checkbox input
        if (question.valueType == "SingleOption") {
            //add radio input
            question.options.forEach((option) => {
                let displayName = option.displayName;
                let attachmentURL = option.attachments.length > 0 ? option.attachments[0].url : "";
                let $radioOption = getRadioButton(
                    displayName,
                    question.name,
                    option.name,
                    attachmentURL
                );
                UxUtils.setAppend("div.card-box-question:visible > .option-sec", $radioOption);
                getClassFromDimension(attachmentURL, "div.radio-section#" + option.name + " .opt-image");
                UxUtils.removeImageLoader("div.radio-section#" + option.name + " .opt-image");
            });
        } else {
            question.options.forEach((option) => {
                let displayName = option.displayName;
                let attachmentURL = option.attachments.length > 0 ? option.attachments[0].url : "";
                let $radioOption = getCheckboxButton(
                    displayName,
                    question.name,
                    option.name,
                    attachmentURL
                );
                UxUtils.setAppend("div.card-box-question:visible > .option-sec", $radioOption);
                getClassFromDimension(attachmentURL, "div.radio-section#" + option.name + " .opt-image");
                UxUtils.removeImageLoader("div.radio-section#" + option.name + " .opt-image");
            });
        }
    });
}

/**
 * @description Method getRadioButton for creating Radio button for single select type question
 * @param text label for radio button
 * @param name column id fo question
 * @param id unique identifier
 * @param attachmentId Attachment id for image
 */
function getRadioButton(text, name, id, attachmentURL) {
    let $cardBox = $(`<div class="card-box card-bg card-border mb--8"></div>`);
    UxUtils.setAppend($cardBox, UxUtils.getRadioResponseView(id, name, text));
    if (attachmentURL != "") {
        UxUtils.setPrepend($cardBox.find(".custom-radio"), UxUtils.getOptionImageWithLoader(attachmentURL));
    }
    return $cardBox;
}

/**
 * @descriptions Method getCheckboxButton for creating checkbox button for multple select type question
 * @param text label for radio button
 * @param name column id fo question
 * @param id unique identifier
 * @param attachmentId Attachment id for image
 */
function getCheckboxButton(text, name, id, attachmentURL) {
    let $cardBox = $(`<div class="card-box card-bg card-border mb--8"></div>`);
    UxUtils.setAppend($cardBox, UxUtils.getCheckResponseView(id, name, text));

    if (attachmentURL != "") {
        UxUtils.setPrepend($cardBox.find(".custom-check"), UxUtils.getOptionImageWithLoader(attachmentURL));
    }
    return $cardBox;
}

/**
 * @description Method nextButtonName handles button text based on check answers setting
 */
function nextButtonName() {
    let currentPage = "";
    if($("#next").attr("data-next-id") != undefined) {
        currentPage = $("#next").attr("data-next-id");
    } else {
        currentPage = $("#check").attr("data-next-id");
    }
    console.log(`${parseInt(currentPage)} >= ${maxQuestionCount}`);
    if (parseInt(currentPage) >= maxQuestionCount) {
        let timeid = setInterval(function() {
            if($(".section-1-footer").find(".next-key").length > 0) {
                console.log("test 8");
                $(".section-1-footer").find(".next-key").text(`${doneKey}`);
                if (isShowAnswerEveryQuestion == "Yes") {
                    if ($.trim($(".result-status:visible").text()).length == 0) {
                        $(".section-1-footer").find(".next-key").text(`${checkKey}`);
                    }
                }
                clearInterval(timeid);
            }
        }, Constants.setIntervalTimeOne());
    } else {
        let timeid = setInterval(function() {
            if($(".section-1-footer").find(".next-key").length > 0) {
                console.log("test 9");
                $(".section-1-footer").find(".next-key").text(`${nextKey}`);
                if (isShowAnswerEveryQuestion == "Yes") {
                    if ($.trim($(".result-status:visible").text()).length == 0) {
                        $(".section-1-footer").find(".next-key").text(`${checkKey}`);
                    }
                }
                clearInterval(timeid);
            }
        }, Constants.setIntervalTimeOne());
    }
}

/**
 * @description Method summarySection creates Summary page after finishing quiz
 */
function summarySection() {
    getStringKeys();
    $root.find(".card-box-question").hide();
    UxUtils.setAppend("#root", summarySectionArea);
    let $mb16Div = $(`<div class="mb--16"></div>`);
    Localizer.getString("quiz_summary").then(function(result) {
        UxUtils.setPrepend($mb16Div, `<h4>${result}</h4>`);
    });
    UxUtils.setAppend(".summary-section", $mb16Div);
    let $mb16Div2 = $(`<div class="mb--16"></div>`);
    UxUtils.setAppend(".summary-section", $mb16Div2);
    UxUtils.setAfter("div.section-1", summaryFooter);
    $("div.container").find(".footer.section-1-footer").remove();

    let $cardQuestionDiv = $(`<div class="card-box-quest"></div>`);
    UxUtils.setAppend(".summary-section", $cardQuestionDiv);

    /*  Check Show Correct Answer  */
    if (Object.keys(row).length > 0) {
        let correctAnswer = $.parseJSON(actionInstance.customProperties[5].value);
        let score = 0;

        if (isShowAnswerEveryQuestion == "Yes") {
            $("#root").find("div.card-box-question").each(function(i, val) {
                let answerIs = "";
                if ($(val).find(".result-status span").hasClass("text-danger")) {
                    answerIs = incorrectKey;
                } else {
                    answerIs = correctKey;
                }
                let cardQuestion = $(val).clone().show();
                UxUtils.setAppend($cardQuestionDiv, cardQuestion);
                if (answerIs == "Correct") {
                    score++;
                }
            });
            let scoreIs = (score / correctAnswer.length) * 100;
            if (scoreIs % 1 != 0) {
                scoreIs = scoreIs.toFixed(2);
            }
            Localizer.getString("score", ":").then(function(result) {
                UxUtils.setAppend($mb16Div2, UxUtils.getScoreResponseView(result, scoreIs));
            });
        } else {
            let correctAnswer = $.parseJSON(actionInstance.customProperties[5].value);
            $("#root").find("div.card-box-question").each(function(i, val) {
                let cardQuestion = $(val).clone().show();
                UxUtils.setAppend($cardQuestionDiv, cardQuestion);
                let correctAnswerString = "";
                let userAnswerString = "";
                let userAnswerArray = row[i + 1];
                if ($(val).find(".option-sec input[type='radio']").length > 0) {
                    correctAnswerString = correctAnswer[i][0];
                    $(val).find(".option-sec input[type='radio']").each(function(optindex, opt) {
                        let optId = $(opt).attr("id");
                        if (correctAnswer[i].includes(optId)) {
                            UxUtils.setAppend($(cardQuestion).find("input[type='radio']#" + optId).parent("label.custom-radio").find(".check-in-div"), "&nbsp;" + UxUtils.getSuccessTick());
                        }
                    });
                } else {
                    correctAnswerString = correctAnswer[i].join(",");
                    $(val).find(".option-sec input[type='checkbox']").each(function(optindex, opt) {
                        let optId = $(opt).attr("id");
                        if (correctAnswer[i].includes(optId)) {
                            UxUtils.setAppend($(cardQuestion).find("input[type='checkbox']#" + optId).parent("label.custom-check").find(".check-in-div"), "&nbsp;" + UxUtils.getSuccessTick());
                        }
                    });
                }

                if (Utils.isJson(userAnswerArray)) {
                    userAnswerString = JSON.parse(userAnswerArray).join(",");
                } else {
                    userAnswerString = userAnswerArray;
                }

                if (correctAnswerString == userAnswerString) {
                    score++;
                    UxUtils.setHtml($(cardQuestion).find(".result-status"), UxUtils.getCorrectArea(correctKey));
                } else {
                    UxUtils.setHtml($(cardQuestion).find(".result-status"), UxUtils.getIncorrectArea(incorrectKey));
                }
            });
            let scoreIs = (score / correctAnswer.length) * 100;
            if (scoreIs % 1 != 0) {
                scoreIs = scoreIs.toFixed(2);
            }
            Localizer.getString("score", ":").then(function(result) {
                UxUtils.setAppend($mb16Div2, UxUtils.getScoreResponseView(result, scoreIs));
            });
        }
        $(".summary-section").find(".option-sec .card-box").removeClass("alert-success");
    }
}

/**
 * @description Method radiobuttonclick handles radio click event and returns saved object when user respond to quiz
 */
function radiobuttonclick() {
    let data = [];
    $.each($("input[type='checkbox']:checked"), function() {
        if ($(this).is(":visible")) {
            let col = $(this).parents("div.radio-section").attr("columnid");
            data.push($(this).attr("id"));

            if (!row[col]) {
                row[col] = [];
            }
            row[col] = JSON.stringify(data);
        }
    });

    $.each($("input[type='radio']:checked"), function() {
        if ($(this).is(":visible")) {
            let col = $(this).parents("div.radio-section").attr("columnid");
            if (!row[col]) {
                row[col] = [];
            }
            row[col] = $(this).attr("id");
        }
    });
}

/**
 * @description Method getDataRow for fetching the reponse data from creation view
 * @param actionId contains context action id
 */
function getDataRow(actionId) {
    let data = {
        id: Utils.generateGUID(),
        actionId: actionId,
        dataTableId: "QuizDataSet",
        columnValues: row,
    };
    return data;
}

/**
 * @description Method getClassFromDimension to get image dimensions and image div dimensions
 * @param imageURL contains image url
 * @param selector contains image where url placed
 */
function getClassFromDimension(imgURL, selector) {
    let tmpImg = new Image();
    tmpImg.src = imgURL;
    let imgWidth = 0;
    let imgHeight = 0;
    $(tmpImg).on("load", function() {
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
    });
}

/**
 * @description Method checkAnswer will show correct or incorrect answers if check answer setting is enabled
 * @param correctAnswer boolean contains if answer is correct or incorrect
 * @param answerKeys contains users responded answer id
 * @param attrName contains index for the visible question page
 */
function checkAnswer(correctAnswer, answerKeys, attrName) {
    if (correctAnswer == true) {
        UxUtils.setHtml($("div.card-box-question:visible").find(".result-status"), UxUtils.getCorrectArea(correctKey));
        $("input[type='radio']:visible, input[type='checkbox']:visible").each(function (optindex, opt) {
            if ($(opt).is(":checked")) {
                let optId = $(opt).attr("id");
                $(opt).parents(".card-box").addClass("alert-success");
                UxUtils.setAppend($(`div#${optId}`).find("div.pr--32.check-in-div"), UxUtils.getSuccessTick());
                $(`div#${optId}`).find("div.pr--32.check-in-div").addClass("mh--20");
            }
            $(opt).parents("div.card-box").addClass("disabled");
        });
    } else {
        UxUtils.setHtml($("div.card-box-question:visible").find(".result-status"), UxUtils.getIncorrectArea(incorrectKey));
        $("input[type='radio']:visible, input[type='checkbox']:visible").each(function (optindex, opt) {
            $(opt).parents("div.card-box").addClass("disabled");
            let optval = $(opt).attr("id");
            let ansKey = [];
            if (answerKeys[(attrName - 1)].indexOf(",") > -1) {
                ansKey = answerKeys[(attrName - 1)].split(",");
            } else {
                ansKey = answerKeys[(attrName - 1)];
            }
            if ($(opt).is(":checked") && ansKey.includes(optval)) {
                if ($(opt).parents("label.selector-inp").length > 0) {
                    UxUtils.setAppend($(opt).parents("label.selector-inp").find("div.check-in-div"), UxUtils.getSuccessTick());
                    $(opt).parents("label.selector-inp").find("div.check-in-div").addClass("mh--20");
                } else {
                    UxUtils.setAppend($(opt).parents("label.d-block").find("div.check-in-div"), UxUtils.getSuccessTick());
                    $(opt).parents("label.d-block").find("div.check-in-div").addClass("mh--20");
                }
            } else if ($(opt).is(":checked") && ansKey.includes(optval) == false) {
                $(opt).parents(".card-box").addClass("alert-danger");
            } else if (ansKey.includes(optval)) {
                if ($(opt).parents("label.selector-inp").length > 0) {
                    UxUtils.setAppend($(opt).parents("label.selector-inp").find("div.check-in-div"), UxUtils.getSuccessTick());
                    $(opt).parents("label.selector-inp").find("div.check-in-div").addClass("mh--20");
                } else {
                    UxUtils.setAppend($(opt).parents("label.d-block").find("div.check-in-div"), UxUtils.getSuccessTick());
                    $(opt).parents("label.d-block").find("div.check-in-div").addClass("mh--20");
                }
            }
        });
    }
    $(".check-key").addClass("next-key");
    $(".check-key").removeClass("check-key");
}

// *********************************************** HTML SECTION ***********************************************
/**
 * @description HTML section for landing page html
 */
let textSection1 = UxUtils.getResponseLandingSection();

/**
 * @description HTML Footer section for start quiz html
 */
let footerSection1 = UxUtils.getFooterResponseSection();

/**
 * @description HTML section for question area html
 */
let questionSection = UxUtils.getResponseQuestionSection();

/**
 * @description HTML section for footer quiz area with pagination html
 */
let paginationFooterSection = UxUtils.getPaginationFooterSection();

/**
 * @description HTML section for summary html
 */
let summarySectionArea = UxUtils.getSummarySection();

/**
 * @description HTML section for summary footer html
 */
let summaryFooter = UxUtils.getSummaryFooterSection();

/**
 * @description Variable contains close button at footer html
 */
let closeFooter = UxUtils.getCloseFooterSection();