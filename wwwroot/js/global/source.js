DevExpress.localization.locale("es-HN");

window.onload = function () {
    cambiarTema();
};

window.onresize = function () {
    cambiarTema()
}

function treeViewItemClick(e) {
    if (e.itemData.items.length == 0) {
        $.post("/Principal/Default/GuardarMenuSeleccionado", { nombreLogico: e.itemData.nombreLogico, seleccionar: true }, function (data) {
            document.location.pathname = e.itemData.url;
        }, 'json')
    } else {
        if (e.node.expanded) {
            $.post("/Principal/Default/GuardarMenuSeleccionado", { nombreLogico: e.itemData.nombreLogico, seleccionar: false }, function (data) {
                e.component.collapseItem(e.node.key);
            }, 'json')
        } else {
            $.post("/Principal/Default/GuardarMenuSeleccionado", { nombreLogico: e.itemData.nombreLogico, seleccionar: true }, function (data) {
                e.component.expandItem(e.node.key);
            }, 'json')
        }
    }
}

function onToolbarContentReady(e) {
    let buttonElement = e.element.find(".dx-toolbar-menu-container .dx-dropdownmenu-button");
    buttonElement.dxButton("instance").option("icon", "user");
    buttonElement.dxButton("instance").option("text", document.getElementById("_user").value);
    buttonElement.dxButton("instance").option("elementAttr.class", "negrita");
}

function openButton_click() {
    var drawer = $("#drawer").dxDrawer("instance");
    drawer.toggle();
    $.post("/Principal/Default/GuardarDrawerEstado", { abierto: (drawer.option("opened") ? "SI" : "NO") }, function (data) { }, 'json')
}

function cerrar_click() {
    DevExpress.ui.dialog.confirm("¿Seguro(a) de Cerrar Sesión?", "Confirmación").done(function (r) {
        if (r) {
            window.location = $("#_cerrar_sesion").attr("href")
        }
    });
}

function selectBoxTema_value_changed(valor) {
    cambiarTema(valor);
}

function cambiarTema(valor = null) {
    if (valor != null) {
        $.post("/Principal/Default/GuardarTema", { tema: valor.value }, function (data) {
            if (data.exito) {
                window.location.reload();
            }
        }, 'json')
    }
    var alto = $(".dx-toolbar").css("height");
    var altoReal = parseInt(alto.replace("px", ""));
    var altoPantalla = parseInt($(window).height());
    //$('.drawer').css("padding-top", `${alto}`);
    //$('#content').css("min-height", `${altoPantalla - altoReal}px`);
    //$('#contenedor_height_auto').css("min-height", `${(altoPantalla - altoReal) - 20}px`);
    //$('.panel-list').css("min-height", `${altoPantalla - altoReal}px`);
    //$('#simple-treeview').dxTreeView('instance').option('height', (altoPantalla - altoReal) - (45-30));
    $('#simple-treeview').dxTreeView('instance').option('height', $(".drawer").height() - 2);
}

function cambiar_contrasena() {
    $("#PopupCambiarContrasena").dxPopup("instance").show();
    $("#TxtContraseñaNueva").dxTextBox("instance").option("value", "");
    $("#TxtContraseñaAnterior").dxTextBox("instance").option("value", "");
    $("#TxtContraseñaConfirmar").dxTextBox("instance").option("value", "");
}

function OnClick_Cambiar_Contrasena() {
    var anterior = $("#TxtContraseñaAnterior").dxTextBox("instance").option("value");
    var nueva = $("#TxtContraseñaNueva").dxTextBox("instance").option("value");
    var confirmacion = $("#TxtContraseñaConfirmar").dxTextBox("instance").option("value");

    if (anterior != null && anterior != "") {
        if (nueva != null && nueva != "") {
            if (confirmacion != null && confirmacion != "") {
                if (nueva.trim() == confirmacion.trim()) {
                    $.post("/Principal/Default/CambiarPassword", { contrasenaAnterior: anterior.trim(), contrasenaNueva: nueva.trim() }, function (data) {
                        if (data.ok) {
                            if (data.result == "0") {
                                toastr.error("Contraseña actual incorrecta", "Error", {
                                    "progressBar": true,
                                    "closeButton": true,
                                    "positionClass": "toast-top-right",
                                    "preventDuplicates": true
                                })
                            } else {
                                toastr.success("Se cambió la contraseña correctamente", "Exito", {
                                    "progressBar": true,
                                    "closeButton": true,
                                    "positionClass": "toast-top-right",
                                    "preventDuplicates": true
                                })
                                $("#TxtContraseñaNueva").dxTextBox("instance").option("value", "");
                                $("#TxtContraseñaAnterior").dxTextBox("instance").option("value", "");
                                $("#TxtContraseñaConfirmar").dxTextBox("instance").option("value", "");
                                $("#PopupCambiarContrasena").dxPopup("instance").hide();
                            }
                        }
                    }, 'json')
                } else {
                    toastr.error("La nueva contraseña no es igual a la contraseña de confimación", "Error", {
                        "progressBar": true,
                        "closeButton": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true
                    })
                }
            } else {
                toastr.error("Ingrese la contraseña de confirmación", "Error", {
                    "progressBar": true,
                    "closeButton": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": true
                })
            }
        } else {
            toastr.error("Ingrese la contraseña nueva", "Error", {
                "progressBar": true,
                "closeButton": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": true
            })
        }
    } else {
        toastr.error("Ingrese la contraseña anterior", "Error", {
            "progressBar": true,
            "closeButton": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": true
        })
    }
}

document.oncontextmenu = function () {
    return false;
}

//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function CustomizeColumns_Dgv(columns) {
    columns.forEach(function (column) {
        reglasMensajes(column, "required")
    });
}

function reglasMensajes(columna, tipo) {
    if (columna.validationRules) {
        var indices = []
        var indiceLast = -1;
        columna.validationRules.forEach((v, i) => {
            if (v.type == tipo) {
                indices.push(i);
                indiceLast = i;
            }
        })
        indices.forEach((v, indice) => {
            if (columna.validationRules[indice]) {
                if (tipo == "required" && (!columna.validationRules[indiceLast].message || columna.validationRules[indiceLast].message.includes("required"))) {
                    columna.validationRules[indice].message = columna.dataField + " es requerido!";
                } else {
                    columna.validationRules[indice].message = columna.validationRules[indiceLast].message;
                }
            }
        })
    }
}

var loadedPageMenus = false;
function OnContentReady_simple_treeview(e) {
    if (!loadedPageMenus) {
        var alto = $(".dx-toolbar").css("height");
        var altoReal = parseInt(alto.replace("px", ""));
        var altoPantalla = parseInt($(window).height());
        $('#simple-treeview').dxTreeView('instance').option('height', (altoPantalla - altoReal) - 45);
        var menus = e.component.getNodes();
        var menu = ObtenerMenuSeleccionado(menus);
        loadedPageMenus = true;
        if (menu) {
            setTimeout(function () {
                e.component._scrollableContainer.scrollToElement($("div[data-nombrelogicomenu='" + menu + "']"));
            })
        }
    }
}

function ObtenerMenuSeleccionado(menus) {
    var menuSeleccionado = "";
    (menus || []).forEach(function (v) {
        if (v.selected) {
            menuSeleccionado = v.itemData.nombreLogico;
        } else if (v.items.length > 0) {
            let ms = ObtenerMenuSeleccionado(v.items)

            if (ms && ms != "") {
                menuSeleccionado = ms;
            }
        }
    })
    return menuSeleccionado;
}