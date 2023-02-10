// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt

frappe.provide("frappe.ui.toolbar");
frappe.provide("frappe.search");

frappe.ui.toolbar.AppSidebar = class {
	constructor() {
		this.pages = {};
		$("sidebar").replaceWith(
			frappe.render_template("appsidebar", {
				avatar: frappe.avatar(frappe.session.user, "avatar-medium"),
				navbar_settings: frappe.boot.navbar_settings,
			})
		);
		this.make();
	}

	make() {
		this.bind_events();
		this.bind();
	}
	async bind() {
		this.sidebar_pages = !this.discard ? await this.get_pages() : this.sidebar_pages;
		this.all_pages = this.sidebar_pages.pages;
		let menuData = this.all_pages;
let sidebarMenu = [];
let parentMap = {};

// creating a map of all parent items
for (let i = 0; i < menuData.length; i++) {
    let item = menuData[i];
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
      items: []
    };
  } else {app
	if(menu[item.parent_globale_menu_item])
    menu[item.parent_globale_menu_item].items.push({
      name: item.name,
      icon: item.icon,
      route: item.route
    });
  }
});

let $sidebar = $(".vertical-nav-menu");
for (let key in menu) {
  let item = menu[key];
  let $li = $("<li></li>").appendTo($sidebar);

  let $a = $(`<a href="/app/${item.route|| '#' }"></a>`).appendTo($li);
  if (item.icon) {
    $a.append(`<i class="metismenu-icon pe-7s-diamond" item-icon=${item.icon || "folder-normal"}>${frappe.utils.icon(item.icon || "folder-normal",
		"md"
	)}</i>`);
  }
  $a.append(item.name);
  if (item.items.length) {
	let $drop_icon = $(`<i class="metismenu-state-icon" >${frappe.utils.icon("small-down", "xs")}</i>`).appendTo($a);
    let $ul = $("<ul></ul>").appendTo($li);
    item.items.forEach(child => {
      let $childLi = $("<li></li>").appendTo($ul);
      let $childA = $(`<a href="/app/${child.route|| '#' }"></a>`).appendTo($childLi);
      if (child.icon) {
        $childA.append(`<i class="metismenu-icon pe-7s-diamond" item-icon=${child.icon || "folder-normal"}>${frappe.utils.icon(child.icon || "folder-normal",
		"md"
	)}</i>`);
      }
      $childA.append(child.name);
    });
	let $child_item_section = $li.find("ul");
	$drop_icon.on("click", () => {
		let icon =
			$drop_icon.find("use").attr("href") === "#icon-small-down"
				? "#icon-small-up"
				: "#icon-small-down";
		$drop_icon.find("use").attr("href", icon);
		$child_item_section.toggleClass("hidden");
	});

  }
}
console.log($sidebar);
	}	
	bind_events() {
		// clear all custom menus on page change
		$(document).on("page-change", function () {
			$("header .navbar .custom-menu").remove();
		});

		//focus search-modal on show in mobile view
		$("#search-modal").on("shown.bs.modal", function () {
			var search_modal = $(this);
			setTimeout(function () {
				search_modal.find("#modal-search").focus();
			}, 300);
		});
		$(".navbar-toggle-full-width").click(() => {
			frappe.ui.toolbar.toggle_full_width();
		});
	}
	get_pages() {
		return frappe.xcall("frappe.desk.desktop.get_menu_sidebar_items");
	}

};


