$(document).ready(function (event) {
    $("#view-pop-close").click(function (event) {
        $("#view-pop").addClass("opacity-0")
        setTimeout(() => {
            $("#view-pop").removeClass("flex")
            $("#view-pop").removeClass("scale-[1.05]");
            $("#view-pop").addClass("hidden")
        }, 100);
    })

    $('button#login-user').click(function (e) {
        PopContent({
            element: `
            <h1 class="font-semibold uppercase text-[40px] font-['Heavitas'] mt-[10px] mb-[20px] text-center">
                        Login
                    </h1>
                    <div class="bg-[#1A2431] rounded-md w-full mt-[10px] shadow-[#0F131A] shadow-xl">
                        <h1
                            class="absolute mt-[-10px] ml-[15px] p-0 pr-3 pl-3 bg-[#1D4272] text-[#C2C2C2] text-[14px] rounded-full shadow-[#0F131A] shadow-lg">
                            E-mail</h1>
                        <input class="p-1 pl-3 pr-3 text-[18px] text-[#d7d7d7] bg-transparent pt-[16px] w-[100%]"
                            type="email" name="email" id="login-email">
                    </div>
                    <div class="bg-[#1A2431] rounded-md w-full mt-[15px] shadow-[#0F131A] shadow-xl">
                        <h1
                            class="absolute mt-[-10px] ml-[15px] p-0 pr-3 pl-3 bg-[#1D4272] text-[#C2C2C2] text-[14px] rounded-full shadow-[#0F131A] shadow-lg">
                            Senha</h1>
                        <input class="p-1 pl-3 pr-3 text-[18px] text-[#d7d7d7] bg-transparent pt-[16px] w-[100%]"
                            type="password" name="password" id="login-email">
                    </div>
                    <button
                        class="bg-[#2B4C77] active:bg-[#2B4C77] hover:bg-[#3c6396] w-full p-2 mt-[15px] rounded-md transition text-[20px]"
                        id="login-send">Entrar</button>
                    <div class="mb-[10px] mt-[5px] flex justify-between">
                        <button class="text-[#787878]" id="password-reset">Esqueci a minha senha</button>
                        <button class="text-[#005C9F] group flex items-center gap-[5px]" id="register-option">Me
                            registrar <i
                                class="transition fa-solid fa-arrow-right group-hover:translate-x-1"></i></button>
                    </div>
            `,
            classes: "flex flex-col justify-center p-5",
            pop_display_delete: "w-[350px] h-[150px]",
            pop_display_add: "w-[400px]"
        })
        visibilityOrHiddenPop();
    })

    $(document).click(function (event) {
        if (!$(event.target).closest('#view-pop-content').length || !$(event.target).closest('#view-pop-display').length) {
            $("#view-pop").addClass("opacity-0")
            setTimeout(() => {
                $("#view-pop").removeClass("flex")
                $("#view-pop").removeClass("scale-[1.05]");
                $("#view-pop").addClass("hidden")
            }, 100);
        }
    });

    $(document).keydown(function (evt) {
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            $("#view-pop").addClass("opacity-0")
            setTimeout(() => {
                $("#view-pop").removeClass("flex")
                $("#view-pop").removeClass("scale-[1.05]");
                $("#view-pop").addClass("hidden")
            }, 100);
        }
    });

    $("#open-bars").click(function (v) {
        $("#mobile-view").removeClass("hidden");
        setTimeout(() => {
            $("#mobile-view").addClass("flex translate-x-0")
                .css({
                    "--tw-translate-x": "0px",
                    "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));"
                });
        }, 100)
        $("body").addClass("overflow-hidden");
    })

    $("#close-bars").click(function (v) {
        $("#mobile-view").removeClass("flex translate-x-0")
            .css({
                "--tw-translate-x": "100%",
                "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));"
            });
        setTimeout(() => { $("#mobile-view").addClass("hidden"); }, 300)
        $("body").removeClass("overflow-hidden");
    })

    $("#mobile-view a").click(function (v) {
        $("#mobile-view").removeClass("flex translate-x-0")
            .css({
                "--tw-translate-x": "100%",
                "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));"
            })
        setTimeout(() => { $("#mobile-view").addClass("hidden"); }, 300)
        $("body").removeClass("overflow-hidden");
    })
})

function visibilityOrHiddenPop() {
    setTimeout(() => {
        if ($("#view-pop").hasClass("hidden")) {
            $("#view-pop").removeClass("hidden")
            $("#view-pop").addClass("flex")
            setTimeout(() => {
                $("#view-pop").removeClass("opacity-0");
                $("#view-pop").addClass("scale-[1.05]");
            }, 10);
        }

        else {
            $("#view-pop").addClass("opacity-0")
            setTimeout(() => {
                $("#view-pop").removeClass("flex")
                $("#view-pop").removeClass("scale-[1.05]");
                $("#view-pop").addClass("hidden")
            }, 100);
        }
    }, 110)
}

function PopContent({ element = "Erro, elemento não encontrado...", classes = "", pop_display_delete = null, pop_display_add = null }) {
    $("#view-pop-content").html(element).removeClass().addClass(classes);
    if (pop_display_delete !== null) $("#view-pop-display").removeClass(`${pop_display_delete}`);
    if (pop_display_add !== null) $("#view-pop-display").addClass(`${pop_display_add}`);
}