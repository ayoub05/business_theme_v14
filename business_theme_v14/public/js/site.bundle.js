import "./sidebar/appsidebar.html";
import "./sidebar/appsidebar.js";
import "./toolbar/quikadd.html";


$(document).ready(function () {
	if (!frappe.utils.supportsES6) {
		frappe.msgprint({
			indicator: "red",
			title: __("Browser not supported"),
			message: __(
				"Some of the features might not work in your browser. Please update your browser to the latest version."
			),
		});
	}
	if (frappe.boot && frappe.boot.home_page !== "setup-wizard") {
        frappe.frappe_sidebar = new frappe.ui.toolbar.AppSidebar();
    }
    $("header .navbar .custom-menu").prepend();
    $('body > div.main-section > header > div > div > ul').prepend('<li class="vertical-bar d-none d-sm-block"></li>');
    $('body > div.main-section > header > div > div > ul').prepend(
        frappe.render_template("quikadd", {
        avatar: frappe.avatar(frappe.session.user, "avatar-medium"),
        navbar_settings: frappe.boot.navbar_settings,
    }));
	$(".dropdown-help").remove();
	$('header .container').prepend(`
	<span class="collapse-expand cursor-pointer" data-class="closed-sidebar">
		${frappe.utils.icon("menu", "md")}
	</span>
`);
$('.collapse-expand').click(function () {

	var classToSwitch = $(this).attr('data-class');
	var containerElement = '.main-section';
	$(containerElement).toggleClass(classToSwitch);

	var closeBtn = $(this);

	if (closeBtn.hasClass('is-active')) {
		closeBtn.removeClass('is-active');

	} else {
		closeBtn.addClass('is-active');
	}
});

});