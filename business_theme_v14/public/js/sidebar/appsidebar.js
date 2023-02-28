// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt

frappe.provide("frappe.ui.toolbar");
frappe.provide("frappe.search");

frappe.ui.toolbar.AppSidebar = class {
	constructor() {
		this.pages = {};
		$("<sidebar></sidebar>").insertAfter("header");
		$("sidebar").replaceWith(
			frappe.render_template("appsidebar", {
				avatar: frappe.avatar(frappe.session.user, "avatar-medium"),
				navbar_settings: frappe.boot.navbar_settings,
			})
		);
		this.make();
	}

	make() {

		this.bind();
		this.bind_events();
	}
	async bind() {
		this.sidebar_pages = !this.discard ? await this.get_pages() : this.sidebar_pages;
		this.all_pages = this.sidebar_pages.pages;
		let menuData = this.all_pages;
		let sidebarMenu = [];
		let parentMap = {};

		let current_url = document.location.pathname.replace('/app/', '');
		current_url = current_url.replace('/app', '');

		// creating a map of all parent items
		for (let i = 0; i < menuData.length; i++) {
			let item = menuData[i];
			let selected = current_url.startsWith(item.route);
			menuData[i].selected = selected;

			if (current_url === "" && item.route === "index")
				menuData[i].selected = true;

			if (item.parent_globale_menu_item) {
				if (!parentMap[item.parent_globale_menu_item]) {
					parentMap[item.parent_globale_menu_item] = [];
				}

				parentMap[item.parent_globale_menu_item].push(item);
			} else {

				sidebarMenu.push({ name: item.name, route: item.route, icon: item.icon, subItems: [] });
			}
		}

		// adding sub-items to their respective parent items
		for (let i = 0; i < sidebarMenu.length; i++) {
			let parentItem = sidebarMenu[i];
			let subItems = parentMap[parentItem.name];
			if (subItems) {
				parentItem.subItems = subItems;
			}
		}

		let menu = {};
		menuData.forEach(item => {
			if (!item.parent_globale_menu_item) {
				menu[item.name] = {
					name: item.name,
					icon: item.icon,
					route: item.route,
					selected: item.selected,
					items: []
				};
			} else {
				app
				if (menu[item.parent_globale_menu_item])
					menu[item.parent_globale_menu_item].items.push({
						name: item.name,
						icon: item.icon,
						route: item.route,
						selected: item.selected
					});
			}
		});

		let $sidebar = $(".vertical-nav-menu");

		for (let key in menu) {
			let $li = this.get_item(menu[key]);
			$li.appendTo($sidebar);
			
		}
	}

	get_item(item){
		let $li = $("<li></li>");
		let $a = $(`<a href="${item.route? '/app/'+item.route : '#'}"></a>`).appendTo($li);
	
		if (item.icon) {
			$a.append(`<i class="metismenu-icon pe-7s-diamond" item-icon=${item.icon || "folder-normal"}>${frappe.utils.icon(item.icon || "folder-normal",
				"md"
			)}</i>`);
		}
		$a.append(item.name);

		$a.on("click", () => {
			$(".vertical-nav-menu *").removeClass("mm-active");
			$a.addClass("mm-active");
			$a.parent().parent().closest('li').addClass("mm-active");
		});


		if (item.items &&item.items.length>0) {

			$a.on("click", function(event)  {
				event.preventDefault();
				console.log("a clicked")
			});
	
			let $drop_icon = $(`<i class="metismenu-state-icon" >${frappe.utils.icon("small-down", "xs")}</i>`).appendTo($a);
			let $ul = $("<ul class='hidden'></ul>").appendTo($li);

			item.items.forEach(child => {
				let $il=this.get_item(child);
				$il.appendTo($ul)

			});

			let $child_item_section = $li.find("ul");
			$drop_icon.on("click", function(event)  {
				event.preventDefault();
				console.log("drop_icon clicked")
				let icon =
					$drop_icon.find("use").attr("href") === "#icon-small-down"
						? "#icon-small-up"
						: "#icon-small-down";
				$drop_icon.find("use").attr("href", icon);
				$child_item_section.toggleClass("hidden");
			});

		}
		if (item.selected) {
			$a.addClass("mm-active");
			$a.parent().parent().closest('li').addClass("mm-active");
			$a.parent().parent().closest('ul').removeClass("hidden");
		}
		return $li;
	}
	bind_events() {
		// clear all custom menus on page change

	}
	get_pages() {
		return frappe.xcall("business_theme_v14.settings.settings.get_menu_sidebar_items");
	}

};


