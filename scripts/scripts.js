// JavaScript Document
$(document).ready(function () {
	"use strict";

	//vars
	var menuHeight = $("#subover").parent().height();
	var menuTime = 200; // tempo do menu
	var photosUrl = "img/gallery";
	var transitionTimer = 200;
	var bodyHeight = $(document).height() - ($("#foot").height() + $("#menu").height()) - 20;

	//alert (bodyHeight);
	//set parameters
	$("#menu li ul").css("top", menuHeight);
	$("div#body").css("min-height", bodyHeight);

	//animação menu
	var mIn = function () {
		$("#submenu").stop().animate({
			height: "show"
		}, menuTime);
	};
	var mOut = function () {
		$("#submenu").stop().animate({
			height: "hide"
		}, menuTime);
	};

	$("#subover, #submenu").mouseenter(mIn);
	$("#subover, #submenu").mouseleave(mOut);

	//inicio sistema de fotos
	var photosSystem = function () {
		//leitura da galeria
		/**/
		$("#photos").empty();
		$.ajax({
			url: "../" + photosUrl,
			success: function (data) {
				$(".hidden").append(data);
				$(".hidden").find("td > a").each(function (index) {
					//alert(index);
					var imgHref = $(this).attr("href");
					if (imgHref.match(/.jpg|.gif|.png/gi)) {
						$("#photos").append("<div id='photo" + (index - 1) + "'></div>");
						$("#photos #photo" + (index - 1)).html("<img src=\"" + photosUrl + "/" + imgHref + "\" id=\"ph" + (index - 1) + "\" />");
					}
				});
				$(".hidden").empty();

				//sistema abrir/fechar fotos
				var openPhoto = function () {
					$("#photo").empty();

					$("#photo").css({
						width: "auto",
						height: "auto"
					});
					var addrImg = $(this).attr("src");
					$("#photo").html("<img src=\"" + addrImg + "\" />");
					$("#photoBg, #photo").show(transitionTimer);
				};
				var closePhoto = function () {
					$("#photoBg, #photo").hide(transitionTimer);
				};
				$("body").keydown(function (k) {
					if (k.which === 27 || k.which === 8) {
						//27 = esc; 8 = backspace
						closePhoto();
					}
				});
				$("#photos div img").click(openPhoto);
				$("#photoBg, #photo").click(closePhoto);
				//fim sistema abrir/fechar fotos
			}
		});
		/**/

	};
	//fim sistema de fotos

	/*temp*
	$("#body").load("gallery.html", function () {
		photosSystem();
	});
	/*end temp*/

	//carregamento páginas
	var pgAddress = (window.location.href).match(/#(.*)+/g);
	if (!pgAddress) {
		pgAddress = "home";
	} else {
		pgAddress = pgAddress[0].replace("#", "");
	}
	console.log(pgAddress);

	var pgLoad = function (pgAddr, ext) {
		if (!pgAddr) {
			pgAddr = "home";
		}
		if (!ext) {
			ext = ".html";
		}
		if (pgAddr !== "") {
			$("#body").load(pgAddr + ext, function () {
				if (pgAddr === "gallery") {
					photosSystem();
				}
			});
		}
	};
	pgLoad(pgAddress);


	$("#menu a").click(function () {
		var pLoad = $(this).attr("href").replace(/[^a-z0-9]*/gi, "");
		pgLoad(pLoad);

	});
});
