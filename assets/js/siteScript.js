//==================================================================================-
//    목적	: 숫자만 입력
//    사용방법 : onkeypress="return isNumberKey(event)"
//==================================================================================
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

//==================================================================================
//    목적	: trim 함수임 
//==================================================================================
function trim(str) {
    if (str) {
        return str.replace(/(^[\s　]+)|([\s　]+$)/g, "");
    } else {
        return str;
    }
}

function trimAll(str) {
    return str.replace(/(\s*)/g, "");
}

function AES_Encode(plain_text) {
    var key = "abcdefghijklmnopqrstuvwxyz123456";
    GibberishAES.size(256);
    return GibberishAES.aesEncrypt(plain_text, key);
}

//==================================================================================
//    목적	: Trim 및 공백을 모두 포함한  Null Check
//==================================================================================
function chkNull(obj, str) {
    //trim check 및 특수 공백 모두 Null처리
    if (trim(obj.val()) == "") {
        alert(str + " 입력하세요.");
        obj.focus();
        return true;
    }
    return false;
}

function chkNullSelect(obj, str) {
    //trim check 및 특수 공백 모두 Null처리
    if (trim(obj.val()) == "") {
        alert(str + " 선택하세요.");
        obj.focus();
        return true;
    }
    return false;
}

function chkNullScroll(obj, str) {
    //trim check 및 특수 공백 모두 Null처리
    if (trim(obj.val()) == "") {
        alert(str + " 입력하세요.");
        window.scrollTo(0, 0);
        obj.focus();
        return true;
    }
    return false;
}

//==================================================================================
//    목적	: Trim 및 공백을 모두 포함한  Null Check
//==================================================================================
function chkNullSize(obj, str, cnt) {
    //trim check 및 특수 공백 모두 Null처리
    if (trim(obj.val()).length < cnt) {
        alert(str + " " + cnt + "자리 이상 입력하세요.");
        obj.focus();
        return true;
    }
    return false;
}

//==================================================================================
//    목적	: Trim 및 공백을 모두 포함한  Null 값 체크
//==================================================================================
function chkNullVal(val, msg) {
    //trim check 및 특수 공백 모두 Null처리
    if (trim(val) == "") {
        alert(msg);
        return true;
    }
    return false;
}

//==================================================================================
//    목적	:  이메일 형식 Check
//==================================================================================
function emailCheck(email) {
    var chkExp = /^\s*[\w\-\.]+\@[\w\-]+(\.[\w\-]+)+\s*$/g;
    return chkExp.test(email);
}

function moveTop(){
    $('html, body').animate({
        scrollTop: 0
    }, 500);
    return false;
}

//==================================================================================
// 목  적 : 팝업
//==================================================================================
function WinPopup (URL, Width, Height, ScrollBar, Resizable, PopName) {
    src = URL;
    if (ScrollBar == '') ScrollBar = "no";
    if (Resizable == '') Resizable = "no";

    var curX = window.screenLeft;
    var curY = window.screenTop;

    var curWidth = document.body.clientWidth;
    var curHeight = document.body.clientHeight;

    var nLeft = curX + (curWidth / 2) - (Width / 2);
    var nTop  = curY + (curHeight / 2) - (Height / 2);

    etc = 'left='+nLeft+'px,top='+nTop+'px,toolbar=no,location=no,status=no,scrollbars=' + ScrollBar + ',width=' + Width + ',height=' + Height + ',resizable=' + Resizable
    window.open(src, PopName, etc);
}

/**
 * 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다.
 * @param str       : 체크할 문자열
 */
function isEmpty(str){
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false ;
}
    
/**
 * 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
 * @param str           : 체크할 문자열
 * @param defaultStr    : 문자열이 비어있을경우 리턴할 기본 문자열
 */
function nvl(str, defaultStr){
    if(typeof str == "undefined" || str == null || str == "")
        str = defaultStr ;
    return str ;
}


function getParam(key) {
    var _parammap = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        console.log(arguments);

        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        _parammap[decode(arguments[1])] = decode(arguments[2]);
    });

    return _parammap[key];
}


/*--------------------------------------------------------------------------
    목적	: 문자발송 자리수 체크 및 입력제한
    사용방법 : setContentsLength(inputid, printid)
    inputid : 텍스트 입력폼 아이디
    printid : 입력숫자 표시될 아이디
--------------------------------------------------------------------------*/
function setContentsLength(contentsNm, countId) {
    var contentsText = $('textarea[name=' + contentsNm + ']').val();
    var textLength = stringToByte(contentsText);
    var msg1 = cutStr(contentsText, 2000);
    if (textLength > 90) {
        $('#smsType').val("L");
        $('.smsLimit').text('2000');
        $('.lms').show();
        $('#' + countId).css('color', '#ff0000');
        if (textLength > 2000) {
            $('textarea[name=' + contentsNm + ']').val('');
            $('textarea[name=' + contentsNm + ']').val(msg1);
            textLength = stringToByte(msg1);
        }
    } else {
        $('#smsType').val("S");
        $('.smsLimit').text('90');
        $('.lms').hide();
        $('#' + countId).css('color', '');
    }

    $('#' + countId).text(textLength);
}

function stringToByte(str) {
    var length = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length >= 4)
            length += 2;
        else if (escape(str.charAt(i)) != "%0D")
            length++;
    }
    return length;
}

function cutStr(str, limit) {
    var tmpStr = str;
    var byte_count = 0;
    var len = str.length;
    for (i = 0; i < len; i++) {
        byte_count += chr_byte(str.charAt(i));

        if (byte_count == limit - 1) {
            tmpStr = str.substring(0, i + 2);
            break;
        } else if (byte_count == limit) {
            tmpStr = str.substring(0, i + 1);
            break;
        }
    }

    return tmpStr;
}

function chr_byte(chr) {
    if (escape(chr).length > 4) {
        return 2;
    } else {
        return 1;
    }
}

//==================================================================================
//    목적	: Ajax공통
//    사용방법 : AjaxCommon(urlVal, dataVal, retUrl, message)
//    urlVal : 호출할 URL
//    dataVal : 전달할 데이터
//    retUrl : 완료후 이동할 URL(없을경우 공백)
//    message : 경고창 message
//==================================================================================
function AjaxCommon(urlVal, dataVal, retUrl, message) {
    $.ajax({
        type: "POST",
        url: urlVal,
        data: dataVal,
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.RESULTCD == '0') {
                if(message != ""){
                    alert(message);
                }

                if (retUrl != "") {
                    if(retUrl == "reload") {
                        location.reload();
                    } else {
                        location.href = retUrl;
                    }
                }
                return false;
            } else {
                alert(data.RESULTMSG);
                return false;
            }
        },
        error: function (request, status, error) {
            alert('작업중 에러가 발생하였습니다.\n(code:' + request.status + ') 잠시후 다시 시도해 주세요.');
            return false;
        }
    });
}

//==================================================================================
// 목  적 : 태그 제거
//==================================================================================
function f_SkipTags_html(input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

//==================================================================================
//   체크박스 체크된 값 가져오기
//==================================================================================
function f_Get_checkbox_Values(input){
    var chked_val = '';
    $('input:checkbox[name="' + input + '"]:checked').each(function (pi, po) {
        chked_val += ',' + po.value;
    });

    if (chked_val != '') chked_val = chked_val.substring(1);

    return chked_val;
}

//==================================================================================
//   checkbox 자동체크
//==================================================================================
function checkboxChecked(input, val){
    if(trim(val) !== "") {
        var cTargetArr = val.split(",");
        for (var idx in cTargetArr) {
            $('input:checkbox[name^='+input+'][value="' + cTargetArr[idx] + '"]').prop('checked', true);
        }
    }
}

//==================================================================================
//   radio 선택된 값받기
//==================================================================================
function f_Get_radio_Value(input){
    var chked_val = "";
    var $obj = document.getElementsByName(input);
    var i = 0;
    for(i = 0; i < $obj.length; ++i) {
        if($obj[i].checked == true) {
            chked_val = $obj[i].value;
            break;
        }
    }
    return chked_val;
}

//==================================================================================
//   radio 자동체크
//==================================================================================
function radioChecked(input, val){
    $("input:radio[name='"+input+"']").removeAttr('checked'); 
    $("input:radio[name='"+input+"']:radio[value='" + val + "']").prop('checked', true);
}

//==================================================================================
//   날짜 유효성 체크
//==================================================================================
function checkValidDate(value) {
    try {
        const _date = value;
        if(_date == '') {
            return false;
        }

        const _rxDatePattern = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
        const _dtArray = _date.match(_rxDatePattern) ;

        if(_dtArray == null) {
            return false;
        }

        const _dtYear = parseInt(_dtArray[1], 10);
        const _dtMonth = parseInt(_dtArray[2] ,10);
        const _dtDay = parseInt(_dtArray[3], 10);

        if(_dtMonth < 1 || _dtMonth > 12) {
            return false;
        } else if(_dtDay < 1 || _dtDay > 31) {
            return false;
        } else if((_dtMonth == 4 || _dtMonth == 6 || _dtMonth == 9 || _dtMonth == 11) && _dtDay == 31) {
            return false;
        } else if(_dtMonth == 2) {
            const _isleap = (_dtYear % 4 == 0 && (_dtYear % 100 != 0 || _dtYear % 400 == 0));
            if (_dtDay > 29 || (_dtDay == 29 && !_isleap)){
                return false;
            }
        }

        return true;
    } catch (err) {
	    return false;
    }
}

//==================================================================================
//   시간 유효성 체크
//==================================================================================
function checkValidTime(value) {
    try {
        const _time = value;
        if(_time == '') {
            return false;
        }

        const _rxDatePattern = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
        const _dtArray = _time.match(_rxDatePattern) ;

        if(_dtArray == null) {
            return false;
        }

        const _dtHour = parseInt(_dtArray[1], 10);
        const _dtMinute = parseInt(_dtArray[2] ,10);

        if(_dtHour < 0 || _dtHour > 24) {
            return false;
        } else if(_dtMinute < 0 || _dtMinute > 59) {
            return false;
        }

        return true;
    } catch (err) {
	    return false;
    }
}

//==================================================================================
//   숫자 한글변환
//==================================================================================
function displayKoreaMoney(inputAmt, outAmtTag){
    // 1 ~ 9 한글 표시
    var arrNumberWord = new Array("","일","이","삼","사","오","육","칠","팔","구");
    // 10, 100, 100 자리수 한글 표시
    var arrDigitWord = new  Array("","십","백","천");
    // 만단위 한글 표시
    var arrManWord = new  Array("","만 ","억 ", "조 ");

    var num_value = removeChar(inputAmt.toString(), ",");
    var num_length = num_value.length;

    if(isNaN(num_value) == true) return;

    var kor_value = "";
    var ten_thousand_count = 0;

    for(i = 0; i < num_length; i++){
        var strTextWord = arrNumberWord[num_value.charAt(i)];
        if(strTextWord != ""){
            ten_thousand_count++;
            strTextWord += arrDigitWord[(num_length-(i+1)) % 4];
        }

        if(ten_thousand_count != 0 && (num_length-(i+1)) % 4 == 0){
            ten_thousand_count = 0;
            strTextWord = strTextWord + arrManWord[(num_length - (i+1))/4];
        }

        kor_value += strTextWord;
    }

    if(num_value != 0){
        kor_value  = '('+kor_value+'원)';
    }

    $('#'+outAmtTag).text(kor_value);
}

function removeChar(orgChar, rmChar) {
    return replace(orgChar, rmChar, "");
}

function replace(orgStr, oldStr, newStr) {
    var res = ""
    if (!orgStr || orgStr == null || orgStr.length == 0)
        return orgStr
    while (true) {
        var pos = orgStr.indexOf(oldStr)
        if (pos >= 0) {
            res += orgStr.substring(0, pos) + newStr
            orgStr = orgStr.substring(pos + oldStr.length);
        }
        else {
            res += orgStr;
            break;
        }
    }
    return res;
}

/*--------------------------------------------------------------------------
    목적	: 모바일여부체크
    사용방법 : fnMobileCheck() true : 모바일
--------------------------------------------------------------------------*/
function fnMobileCheck () {
    var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
    for (var word in mobileKeyWords) {
        if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
            return true;
        }
    }
}

function getCookie(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value? value[2] : null;
}

//==================================================================================
//   글자수 제한 (단위: byte)
//==================================================================================
function setContentsLength(_target, _limit) {
    const contentsText = $(_target).val();
    const textLength = stringToByte(contentsText);

    if (textLength > _limit) {
        // 알림참 띄움
        alert(`채널명은 ${_limit}byte를 넘길 수 없습니다.`);

        // 글자수 줄이기
        $(_target).val(cutStr(contentsText, _limit));
    }
}


function stringToByte(str) {
    var length = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length >= 4) length += 2;
        else length++;
    }
    return length;
}

function cutStr(str, limit) {
    var tmpStr = str;
    var byte_count = 0;
    var len = str.length;
    for (var i = 0; i < len; i++) {
        byte_count += chr_byte(str.charAt(i));

        if (byte_count == limit - 1) {
            tmpStr = str.substring(0, i + 2);
            break;
        } else if (byte_count == limit) {
            tmpStr = str.substring(0, i + 1);
            break;
        }
    }

    return tmpStr;
}

function chr_byte(chr) {
    if (escape(chr).length > 4) {
        // 영어가 아닌 경우
        return 2;
    } else {
        // 영어인 경우
        return 1;
    }
}

//==================================================================================
//   슬라이더 opacity 값 조절
//==================================================================================
/**
 * @brief 슬라이더 opacity 값 조절
 * @detail 현재 보고 있는 슬라이더 를 제외한 나머지 모든 슬라이더의 opacity 값을 조절한다.(hide5 css)
 * @param {*} _slider 적용할 슬라이더
 * @param {*} _mode init
 */
    
function sliderChangeHide(_slider) {
    let _slideIndex, _slidePerView, _maxNum;

    _slideIndex = _slider.realIndex;
    _slidePerView = _slider.params.slidesPerView;
    _maxNum =
        _slideIndex == 0
            ? _slidePerView
            : (_slideIndex / _slidePerView + 1) * _slidePerView;

    for (let [key, data] of Object.entries(_slider.slides)) {
        key = Number(key);
        data.classList.remove('hide5');

        if (key < _slideIndex || key >= _maxNum) {
            data.classList.add('hide5');
        }
    }
}

//==================================================================================
//    목적	: 숫자 세자리 쉼표
//    사용방법 : numberWithCommas()
//==================================================================================
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*--------------------------------------------------------------------------
    목적	: 숫자 세자리 쉼표 제거
    사용방법 : removeCommas()
--------------------------------------------------------------------------*/
function removeCommas(str) {
    str = nvl(str, 0);
    var n = 0;
    if(parseInt(str) > 0) {
        n = parseInt(str.replace(/\,/g,""));
    } else {
        n = 0;
    }
    return n;
}

function cardReceipPrint(trno) {
    const URL = "http://pgims.ksnet.co.kr/pg_infoc/src/bill/credit_view.jsp?tr_no=" + trno;
    WinPopup (URL, 470, 720, "", false, "print");
}