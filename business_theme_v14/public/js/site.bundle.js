import "./sidebar/appsidebar.html";
import "./sidebar/appsidebar.js";
import "./toolbar/quikadd.html";
import "./ui/listview.js";
frappe.frappe_sidebar = new frappe.ui.toolbar.AppSidebar();

frappe.router.render =function() {
	if (this.current_route[0]) {
		this.render_page();
	} else {
		// Show home
		frappe.views.pageview.show("index");
	}
};
frappe.widget.widget_factory.render_card= function() {
	// your custom HTML here
	this._super();
	console.log("NumberCardWidget");
};
$(document).ready(function () {

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
frappe.widget.widget_factory.render_card= function() {
	// your custom HTML here
	this._super();
	console.log("NumberCardWidget");
};

});