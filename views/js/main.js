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
            <h1>Sistema de autenticação está em contrução, tente novamente mais tarde...</h1>
            `,
            classes: "flex justify-center items-center w-full h-full"
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

function PopContent({ element = "Erro, elemento não encontrado...", classes = "" }) {
    $("#view-pop-content").html(element).removeClass().addClass(classes);
}