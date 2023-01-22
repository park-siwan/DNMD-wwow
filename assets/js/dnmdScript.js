(function ($) {
    "use strict";

    // ==========================================================
    // Detect mobile device and add class "is-mobile" to </body>
    // ==========================================================
    // Detect mobile device (Do not remove!!!)
    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
            navigator.userAgent
        )
            ? true
            : false;

    // Add class "is-mobile" to </body>
    if (isMobile) {
        $("body").addClass("is-mobile");
    }

    /* 로그인 레이어->링크로 변경됨
    if ($(".btnLogin").length) {
        $(".btnLogin").on("click", function () {
            login();
        });
    }
    */

    
    /* GNB 활성화 하기 */
    if ($('.gnb-user').length) {
        const $gnb = document.querySelector('.gnb-user');
        const $banner = document.querySelector('[class*="-banner"] .top-subtitle') || false;

        let _point;
        let _margin = 56 * 2;

        if ($banner) {
            const _coords = $banner.getBoundingClientRect();
            const _relativeTop = _coords.top;
            const _scrollAmountY = window.scrollY;
            _point = _relativeTop + _scrollAmountY - _margin;
        } else {
            _point = 0;
        }

        if (window.scrollY > _point) {
            $gnb.classList.add('is-active');
        }

        window.addEventListener('scroll', function () {
            if (window.scrollY > _point) {
                $gnb.classList.add('is-active');
            } else {
                $gnb.classList.remove('is-active');
            }
        });
    }


    /* Dropdown Menu 열기 */
    if ($('.auth-after').length) {
        // 마이 메뉴 열기
        $('.my-menu').on('mouseover', function() {
            $('.my-menu .dropdown-nav').addClass('is-open');
        });

        // 마이 메뉴 닫기
        $('.my-menu').on('mouseout', function() {
            $('.my-menu .dropdown-nav').removeClass('is-open');
        });

        // 스튜디오 메뉴 열기
        $('.studio-menu').on('mouseover', function() {
            $('.studio-menu .dropdown-nav').addClass('is-open');
        });

        // 스튜디오 메뉴 닫기
        $('.studio-menu').on('mouseout', function() {
            $('.studio-menu .dropdown-nav').removeClass('is-open');
        });
    }

})(window.jQuery);

function setFlag() {
    _flag = window.innerWidth > 768 ? true : false;
    return _flag;
}

function contentsListSearch() {
    //현재 폴더위치 경로 추가(정우창-220902)
    const path = window.location.pathname;
    const pathArr = path.split("/");
    let folder = (pathArr.length > 1) ? pathArr[1] : "";

    if (folder == "search") {
        if (!isEmpty(pathArr[2])) {
            folder += "/" + pathArr[2];
        }
    }

    let _retStr = "";

    const _query = getParam("query");
    if (trim(_query) !== "") {
        _retStr += "&query=" + _query;
    }

    if ($('.tab-list').data('val') !== "") {
        if (!isEmpty($('.tab-list').data('val'))) {
            _retStr += "&cate=" + $('.tab-list').data('val');
        }
    }

    if ($('.sort-btns').data('val') !== "" || $('.sort-btns').data('val') == "best") {
        _retStr += "&sort=" + $('.sort-btns').data('val');
    }

    if (trim(_retStr) !== "") {
        _retStr = _retStr.substr(1, (_retStr.length) - 1);
    }

    if (trim(_retStr) !== "") {
        _retStr = "?" + _retStr;
    }

    return (folder == "") ? "/" + _retStr : "/" + folder + "/" + _retStr;
}

function bootboxAlert(title, msg, obj, remove = false) {
    const box = bootbox.alert({
        size: "small",
        title: title,
        message: msg,
        centerVertical: true,
        animate: false,
    });

    box.on("shown.bs.modal", function (e) {
        e.preventDefault();
    });

    if (obj !== "") {
        box.on("hidden.bs.modal", function (e) {
            e.preventDefault();
            if (remove) $(obj).val("");
            $(obj).focus();
        });
    }
}

function login() {
    showModal("login", ".modal.regist");
}

function showModal(url, _obj) {
    const _url = "/" + url;

    if ($(_obj).length) $(_obj).remove();
    $(".modal-backdrop").remove();

    $.get(_url, function (html) {
        jQuery(html).appendTo("body").modal("show");
    });
}

function social_login(sns, referer = "") {
    if (sns === "sorry") {
        alert(
            "죄송합니다.\n현재 브라우저에선 google 로그인이 지원되지 않습니다.\n다른 수단 또는 외부 브라우저를 이용해주시기 바랍니다."
        );
    } else {
        let _url = "/snsLogin?sns=" + encodeURIComponent(sns);

        if (referer !== "") {
            _url += "&referer=" + referer;
        }

        if ($("body").hasClass("is-mobile")) {
            _url += "&mode=mobile";
            location.href = _url;
        } else {
            _url += "&mode=pc";
            WinPopup(_url, 718, 600, "", "", "snsPopup");
        }
    }
}

/**
 * @brief   activity저장하기
 * @details 활동내용을 기록합니다.
 * @param   mode   활동구분(visit, library, follow)
 */
function setActivity(_mode, _code) {
    const _url = '/Apis/Member/saveActivity';
    const _data = {
        mode: _mode,
        code: _code
    }

    axios.post(_url, _data).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });
}

/**
 * @brief   toast 생성하기
 * @details 페이지에 toast를 생성합니다.
 * @param   obj   toast 컨트롤러
 * @param   msg   toast 메세지
 * @param   pos   토스트 생성위치(top, bottom)
 */
let msgTimer = 0;
function showToast(obj, msg, pos = "center") {
    clearToast();

    const toast = $(obj);
    if (pos == "top") {
        toast.css("top", "33px");
        toast.css("bottom", "");
    } else if (pos == "bottom") {
        toast.css("top", "");
        toast.css("bottom", "-13px");
    } else if (pos == "center") {
        toast.css("left", "50%");
        toast.css("transform", "translateX(-50%)");
    } else {
        toast.css("top", "50%");
        toast.css("bottom", "");
    }

    toast.children().html(msg);
    setTimeout(function () {
        toast.fadeIn(500, function () {
            msgTimer = setTimeout(function () {
                toast.fadeOut(500);
            }, 1000);
        });
    }, 200);
}

function clearToast() {
    if (msgTimer != 0) {
        clearTimeout(msgTimer);
        msgTimer = 0;
    }
}

//live페이지에서 푸터 fixed하기
const liveFooter = document.querySelector('.global-footer')

if (window.location.pathname === '/live') {
    liveFooter.style.position = 'fixed';
    liveFooter.style.bottom = '0';
    liveFooter.style.left = '0';
    liveFooter.style.width = '100%';
}