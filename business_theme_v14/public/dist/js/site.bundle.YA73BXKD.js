(() => {
  // frappe-html:/home/erpnext/new-bench/frappe-bench/apps/business_theme_v14/business_theme_v14/public/js/sidebar/appsidebar.html
  frappe.templates["appsidebar"] = `<div class="app-sidebar sidebar-shadow">
    <div class="scrollbar-sidebar ps">
        <div class="app-sidebar__inner">
            <ul class="vertical-nav-menu">
                <li class="app-sidebar__heading">Dashboards</li>
                <li>
                    <a href="/app/" >
                        <i class="metismenu-icon pe-7s-rocket"></i>
                        Dashboard
                    </a>
                </li>
                <li class="app-sidebar__heading">Main Menu</li>
                
            </ul>
        </div>
    </div>
 
</div>`;

  // ../business_theme_v14/business_theme_v14/public/js/sidebar/appsidebar.js
  frappe.provide("frappe.ui.toolbar");
  frappe.provide("frappe.search");
  frappe.ui.toolbar.AppSidebar = class {
    constructor() {
      this.pages = {};
      $("sidebar").replaceWith(frappe.render_template("appsidebar", {
        avatar: frappe.avatar(frappe.session.user, "avatar-medium"),
        navbar_settings: frappe.boot.navbar_settings
      }));
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
      for (let i = 0; i < sidebarMenu.length; i++) {
        let parentItem = sidebarMenu[i];
        let subItems = parentMap[parentItem.name];
        if (subItems) {
          parentItem.subItems = subItems;
        }
      }
      let menu = {};
      menuData.forEach((item) => {
        if (!item.parent_globale_menu_item) {
          menu[item.name] = {
            name: item.name,
            icon: item.icon,
            route: item.route,
            items: []
          };
        } else {
          app;
          if (menu[item.parent_globale_menu_item])
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
        let $a = $(`<a href="/app/${item.route || "#"}"></a>`).appendTo($li);
        $a.on("click", () => {
          $(".vertical-nav-menu *").removeClass("mm-active");
          $a.addClass("mm-active");
          $a.parent().parent().closest("li").addClass("mm-active");
        });
        if (item.icon) {
          $a.append(`<i class="metismenu-icon pe-7s-diamond" item-icon=${item.icon || "folder-normal"}>${frappe.utils.icon(item.icon || "folder-normal", "md")}</i>`);
        }
        $a.append(item.name);
        if (item.items.length) {
          let $drop_icon = $(`<i class="metismenu-state-icon" >${frappe.utils.icon("small-down", "xs")}</i>`).appendTo($a);
          let $ul = $("<ul></ul>").appendTo($li);
          item.items.forEach((child) => {
            let $childLi = $("<li></li>").appendTo($ul);
            let $childA = $(`<a href="/app/${child.route || "#"}"></a>`).appendTo($childLi);
            if (child.icon) {
              $childA.append(`<i class="metismenu-icon pe-7s-diamond" item-icon=${child.icon || "folder-normal"}>${frappe.utils.icon(child.icon || "folder-normal", "md")}</i>`);
            }
            $childA.append(child.name);
            $childA.on("click", () => {
              $(".vertical-nav-menu *").removeClass("mm-active");
              $childA.addClass("mm-active");
              $childA.parent().parent().closest("li").addClass("mm-active");
            });
          });
          let $child_item_section = $li.find("ul");
          $drop_icon.on("click", () => {
            let icon = $drop_icon.find("use").attr("href") === "#icon-small-down" ? "#icon-small-up" : "#icon-small-down";
            $drop_icon.find("use").attr("href", icon);
            $child_item_section.toggleClass("hidden");
          });
        }
      }
      console.log($sidebar);
    }
    bind_events() {
    }
    get_pages() {
      return frappe.xcall("frappe.desk.desktop.get_menu_sidebar_items");
    }
  };

  // frappe-html:/home/erpnext/new-bench/frappe-bench/apps/business_theme_v14/business_theme_v14/public/js/toolbar/quikadd.html
  frappe.templates["quikadd"] = `<li class="nav-item dropdown dropdown-quik-add dropdown-mobile">
    <a class="nav-link btn" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="true" href="#" onclick="return false;">
        <span class="notifications-seen">
            <svg class="icon icon-md">
                <use href="#icon-small-add"></use>
            </svg>
        </span>

    </a>
    <div class="dropdown-menu quik-add dropdown-menu-right" role="menu">
        <ul class="list-inline">
            <li class="list-inline-item">
                <ul class="list-unstyled">
                    <li class="header">
                        <span class="notifications-seen">
                        <svg class="icon icon-md">
                            <use href="#icon-notification"></use>
                        </svg>
                    </span>G\xE9n\xE9ral</li>
                    <li><a class="" href="#" data-ember-action="" data-ember-action-220="220">+
                            &nbsp;Ajouter des utilisateurs</a></li>
                    <li><a id="ember221" class="ember-view " href="#/inventory/items/new">+
                            &nbsp;Article</a></li><!----><!----><!----><!----><!---->
                    <li><a class="" href="#" data-ember-action="" data-ember-action-222="222">+
                            &nbsp;Heure du journal</a></li>
                    <li><a class="" href="#" data-ember-action="" data-ember-action-223="223">+
                            &nbsp;Journal hebdomadaire</a></li><!----><!----><!---->
                </ul>

            </li>
            <li class="list-inline-item"><ul class="list-unstyled">
                <li class="header">
                    <span class="notifications-seen">
                    <svg class="icon icon-md">
                        <use href="#icon-notification"></use>
                    </svg>
                </span>G\xE9n\xE9ral</li>
                <li><a class="" href="#" >+
                        &nbsp;Ajouter des utilisateurs</a></li>
                <li><a iclass="ember-view " href="#/inventory/items/new">+
                        &nbsp;Article</a></li>
                <li><a class="" href="#" >+
                        &nbsp;Heure du journal</a></li>
                <li><a class="" href="#" >+
                        &nbsp;Journal hebdomadaire</a></li>
            </ul></li>
            <li class="list-inline-item"><ul class="list-unstyled">
                <li class="header">
                    <span class="notifications-seen">
                    <svg class="icon icon-md">
                        <use href="#icon-notification"></use>
                    </svg>
                </span>G\xE9n\xE9ral</li>
                <li><a class="" href="#" >+
                        &nbsp;Ajouter des utilisateurs</a></li>
                <li><a id="ember221" class="ember-view " href="#/inventory/items/new">+
                        &nbsp;Article</a></li><!----><!----><!----><!----><!---->
                <li><a class="" href="#" >+
                        &nbsp;Heure du journal</a></li>
                <li><a class="" href="#" >+
                        &nbsp;Journal hebdomadaire</a></li><!----><!----><!---->
            </ul></li>
        </ul>
    </div>
</li>`;

  // ../business_theme_v14/business_theme_v14/public/js/site.bundle.js
  $(document).ready(function() {
    if (!frappe.utils.supportsES6) {
      frappe.msgprint({
        indicator: "red",
        title: __("Browser not supported"),
        message: __("Some of the features might not work in your browser. Please update your browser to the latest version.")
      });
    }
    if (frappe.boot && frappe.boot.home_page !== "setup-wizard") {
      frappe.frappe_sidebar = new frappe.ui.toolbar.AppSidebar();
    }
    $("header .navbar .custom-menu").prepend();
    $("body > div.main-section > header > div > div > ul").prepend('<li class="vertical-bar d-none d-sm-block"></li>');
    $("body > div.main-section > header > div > div > ul").prepend(frappe.render_template("quikadd", {
      avatar: frappe.avatar(frappe.session.user, "avatar-medium"),
      navbar_settings: frappe.boot.navbar_settings
    }));
    $(".dropdown-help").remove();
    $("header .container").prepend(`
	<span class="collapse-expand cursor-pointer" data-class="closed-sidebar">
		${frappe.utils.icon("menu", "md")}
	</span>
`);
    $(".collapse-expand").click(function() {
      var classToSwitch = $(this).attr("data-class");
      var containerElement = ".main-section";
      $(containerElement).toggleClass(classToSwitch);
      var closeBtn = $(this);
      if (closeBtn.hasClass("is-active")) {
        closeBtn.removeClass("is-active");
      } else {
        closeBtn.addClass("is-active");
      }
    });
  });
})();
//# sourceMappingURL=site.bundle.YA73BXKD.js.map