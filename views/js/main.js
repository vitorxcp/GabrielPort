
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-2JYZE1GNX7');

$(document).ready(function (event) {
    $("#view-pop-close").click(function (event) {
        $("#view-pop").addClass("opacity-0")
        setTimeout(() => {
            $("#view-pop").removeClass("flex")
            $("#view-pop").removeClass("scale-[1.05]");
            $("#view-pop").addClass("hidden")
        }, 100);
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

$(document).ready(function () {
    $('body').on('click', 'button#login-user', function (event) {
        $("#view-pop").addClass("opacity-0")
        setTimeout(() => {
            $("#view-pop").removeClass("flex")
            $("#view-pop").removeClass("scale-[1.05]");
            $("#view-pop").addClass("hidden")
        }, 100);
        setTimeout(() => {
            PopContent({
                element: `
            <h1 class="font-medium uppercase text-[40px] font-['Heavitas'] mt-[10px] mb-[20px] text-center">
                        Login
                    </h1>
                    <form onsubmit="if (!window.__cfRLUnblockHandlers) return false; return false;">
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
                            type="password" name="password" id="login-password">
                    </div>
                    <button
                        class="bg-[#2B4C77] active:bg-[#2B4C77] hover:bg-[#3c6396] w-full p-2 mt-[15px] rounded-md transition text-[20px]"
                        id="login-send" type="submit">Entrar</button>
                        </form>
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
        }, 150)
    })

    $('body').on('click', 'button#register-option', function (event) {
        $("#view-pop").addClass("opacity-0")
        setTimeout(() => {
            $("#view-pop").removeClass("flex")
            $("#view-pop").removeClass("scale-[1.05]");
            $("#view-pop").addClass("hidden")
        }, 100);
        setTimeout(() => {
            PopContent({
                element: `
            <h1 class="font-medium uppercase text-[40px] font-['Heavitas'] mt-[10px] mb-[20px] text-center">
                        Registrar
                    </h1>
                    <form onsubmit="if (!window.__cfRLUnblockHandlers) return false; return false;">
					<div class="bg-[#1A2431] rounded-md w-full mt-[10px] shadow-[#0F131A] shadow-xl">
                        <h1
                            class="absolute mt-[-10px] ml-[15px] p-0 pr-3 pl-3 bg-[#1D4272] text-[#C2C2C2] text-[14px] rounded-full shadow-[#0F131A] shadow-lg">
                            Nome</h1>
                        <input class="p-1 pl-3 pr-3 text-[18px] text-[#d7d7d7] bg-transparent pt-[16px] w-[100%]"
                            type="text" name="name" id="register-name">
                    </div>
                    <div class="bg-[#1A2431] rounded-md w-full mt-[10px] shadow-[#0F131A] shadow-xl">
                        <h1
                            class="absolute mt-[-10px] ml-[15px] p-0 pr-3 pl-3 bg-[#1D4272] text-[#C2C2C2] text-[14px] rounded-full shadow-[#0F131A] shadow-lg">
                            E-mail</h1>
                        <input class="p-1 pl-3 pr-3 text-[18px] text-[#d7d7d7] bg-transparent pt-[16px] w-[100%]"
                            type="email" name="email" id="register-email">
                    </div>
                    <div class="bg-[#1A2431] rounded-md w-full mt-[10px] shadow-[#0F131A] shadow-xl">
                        <h1
                            class="absolute mt-[-10px] ml-[15px] p-0 pr-3 pl-3 bg-[#1D4272] text-[#C2C2C2] text-[14px] rounded-full shadow-[#0F131A] shadow-lg">
                            Senha</h1>
                        <input class="p-1 pl-3 pr-3 text-[18px] text-[#d7d7d7] bg-transparent pt-[16px] w-[100%]"
                            type="password" name="password" id="register-password">
                    </div>
					<div class="bg-[#1A2431] rounded-md w-full mt-[10px] shadow-[#0F131A] shadow-xl">
                        <h1
                            class="absolute mt-[-10px] ml-[15px] p-0 pr-3 pl-3 bg-[#1D4272] text-[#C2C2C2] text-[14px] rounded-full shadow-[#0F131A] shadow-lg">
                            Repetir Senha</h1>
                        <input class="p-1 pl-3 pr-3 text-[18px] text-[#d7d7d7] bg-transparent pt-[16px] w-[100%]"
                            type="password" name="password_verify" id="register-password-verify">
                    </div>
                    <button
                        class="bg-[#2B4C77] active:bg-[#2B4C77] hover:bg-[#3c6396] w-full p-2 mt-[15px] rounded-md transition text-[20px]"
                        id="register-send">Registrar Conta</button>
                        </form>
                    <div class="mb-[10px] mt-[5px] flex justify-between">
                        <button class="text-[#005C9F] group flex items-center gap-[5px]" id="login-user">Já tenho conta<i
                                class="transition fa-solid fa-arrow-right group-hover:translate-x-1"></i></button>
                    </div>
            `,
                classes: "flex flex-col justify-center p-5",
                pop_display_delete: "w-[350px] h-[150px]",
                pop_display_add: "w-[400px]"
            })
            visibilityOrHiddenPop();
        }, 150)
    })

    $('body').on('click', 'button#password-reset', function (event) {
        $("#view-pop").addClass("opacity-0")
        setTimeout(() => {
            $("#view-pop").removeClass("flex")
            $("#view-pop").removeClass("scale-[1.05]");
            $("#view-pop").addClass("hidden")
        }, 100);
        setTimeout(() => {
            PopContent({
                element: `
            <h1 class="font-medium uppercase text-[40px] font-['Heavitas'] mt-[10px] mb-[20px] text-center">
                        Recuperação
                    </h1>
                    <form onsubmit="if (!window.__cfRLUnblockHandlers) return false; return false;">
                    <div class="bg-[#1A2431] rounded-md w-full mt-[10px] shadow-[#0F131A] shadow-xl">
                        <h1
                            class="absolute mt-[-10px] ml-[15px] p-0 pr-3 pl-3 bg-[#1D4272] text-[#C2C2C2] text-[14px] rounded-full shadow-[#0F131A] shadow-lg">
                            E-mail</h1>
                        <input class="p-1 pl-3 pr-3 text-[18px] text-[#d7d7d7] bg-transparent pt-[16px] w-[100%]"
                            type="email" name="email" id="login-email">
                    </div>
                    <button
                        class="bg-[#2B4C77] active:bg-[#2B4C77] hover:bg-[#3c6396] w-full p-2 mt-[15px] rounded-md transition text-[20px]"
                        id="code-reset-send">Enviar código</button>
                        </form>
					<div class="mb-[10px] mt-[5px] flex justify-between">
                        <button class="text-[#005C9F] group flex items-center gap-[5px]" id="login-user">Lembrei a senha<i
                                class="transition fa-solid fa-arrow-right group-hover:translate-x-1"></i></button>
					</div>
            `,
                classes: "flex flex-col justify-center p-5",
                pop_display_delete: "w-[350px] h-[150px]",
                pop_display_add: "w-[400px]"
            })
            visibilityOrHiddenPop();
        }, 150)
    })

    $('body').on('click', 'button#login-send', async function (event) {
        reloadAnimationHTML(this);
        const email = $("#login-email").val().trim();
        const password = $("#login-password").val().trim();

        if (!email || !email.includes("@")) {
            $("#login-email").focus();
            notifyView({ content: "Insira um email válido...", type: 1 });
            resetButton(this);
            return;
        }

        if (!password || password.length <= 8) {
            $("#login-password").focus();
            notifyView({ content: "Insira uma senha válida (mínimo 8 caracteres)...", type: 1 });
            resetButton(this);
            return;
        }

        try {
            const response = await fetch(apiVersionURL("v1", "/auth/login"), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ email, password })
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Resposta inválida do servidor');
            }

            const data = await response.json(); // Tentamos analisar a resposta como JSON

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao conectar-se ao servidor...');
            } else {
                console.log(data.message);
                notifyView({ content: data.message, type: 2 });

                $("#view-pop").addClass("opacity-0")
                setTimeout(() => {
                    $("#view-pop").removeClass("flex")
                    $("#view-pop").removeClass("scale-[1.05]");
                    $("#view-pop").addClass("hidden")
                }, 100);
            }

            console.log(data); // Exibir os dados da resposta

            // Redirecionar o usuário ou fazer outra operação com base na resposta, se necessário
        } catch (err) {
            console.error(err);
            notifyView({ content: err.message, type: 1 });
        } finally {
            resetButton(this);
        }

        function resetButton(button) {
            $(button)
                .html("Entrar")
                .attr("disabled", false);
        }
    });

    $('body').on('click', 'button#register-send', async function (event) {
        reloadAnimationHTML(this);
        const name = $("#register-name").val().trim();
        const email = $("#register-email").val().trim();
        const password = $("#register-password").val().trim();
        const password2 = $("#register-password-verify").val().trim();

        if (!name || name.length <= 4) {
            $("#register-name").focus();
            notifyView({ content: "Insira um nome completo ou apenas nome é sobrenome...", type: 1 });
            resetButton(this);
            return;
        }

        if (!email || !email.includes("@")) {
            $("#register-email").focus();
            notifyView({ content: "Insira um email válido...", type: 1 });
            resetButton(this);
            return;
        }

        if (!password || password.length <= 8) {
            $("#register-password").focus();
            notifyView({ content: "Insira uma senha válida (mínimo 8 caracteres)...", type: 1 });
            resetButton(this);
            return;
        }

        if (password != password2) {
            $("#register-password-verify").focus();
            notifyView({ content: "As senhas não são iguais...", type: 1 });
            resetButton(this);
            return;
        }

        try {
            const response = await fetch(apiVersionURL("v1", "/auth/register"), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ name, email, password })
            });


            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Resposta inválida do servidor');
            }

            const data = await response.json(); // Tentamos analisar a resposta como JSON

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao conectar-se ao servidor...');
            } else {
                console.log(data.message);
                notifyView({ content: data.message, type: 2 });

                $("#view-pop").addClass("opacity-0")
                setTimeout(() => {
                    $("#view-pop").removeClass("flex")
                    $("#view-pop").removeClass("scale-[1.05]");
                    $("#view-pop").addClass("hidden")
                }, 100);
            }

            console.log(data); // Exibir os dados da resposta

            // Redirecionar o usuário ou fazer outra operação com base na resposta, se necessário
        } catch (err) {
            console.error(err);
            notifyView({ content: err.message, type: 1 });
        } finally {
            resetButton(this);
        }

        function resetButton(button) {
            $(button)
                .html("Entrar")
                .attr("disabled", false);
        }
    })

    $('body').on('click', 'button#code-reset-send', function (event) {
        reloadAnimationHTML(this);
    })
})

function notifyView({ content, type = 0 }) {
    var elementBase = $("#notification-view");
    var dateId = Date.now();

    var colors = [
        "#00000075",
        "#641d1d75",
        "#079e4e75"
    ]

    var item = $("<div>")
        .addClass(`p-0 pr-5 pl-5 rounded-full pointer-events-auto cursor-pointer`)
        .css({ "background-color": colors[type] })
        .attr("id", `notify-${dateId}`)
        .html(`
        <div class="p-2 pr-8 pl-8 rounded-full pointer-events-auto cursor-pointer">
            <span class="flex gap-[15px] items-center justify-center">${content}</span>
        </div>
        `)

    elementBase.append(item);

    var deleteNotifyTime = setTimeout(() => {
        $(`div#notify-${dateId}`).remove();
    }, 5000)

    $(`div#notify-${dateId}`).click(function (v) {
        clearTimeout(deleteNotifyTime);
        $(this).remove();
    })
}

function reloadAnimationHTML(element, width = "30px", height = width) {
    $(element)
        .attr("disabled", true)
        .addClass("flex justify-center items-center")
        .html(`
         <svg class="spinner" width="${width}" height="${height}" viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33"
            r="30"></circle>
         </svg>
        `)
}

function apiVersionURL(version, url) {
    return `/api/${url}`;
}