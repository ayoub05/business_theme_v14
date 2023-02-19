import frappe

@frappe.whitelist()
def get_menu_sidebar_items():
	"""Get list of sidebar items for desk"""
	has_access = "Workspace Manager" in frappe.get_roles()

	# don't get domain restricted pages
	blocked_modules = frappe.get_doc("User", frappe.session.user).get_blocked_modules()
	blocked_modules.append("Dummy Module")

	filters = {
		"parent": "Default Menu",
	}

	if has_access:
		filters = []

	# pages sorted based on sequence id
	order_by = "idx"
	fields = [
		"name",
		"route",
		"icon",
		"parent_globale_menu_item",
	]
	all_pages = frappe.get_all(
		"Globale Menu item", fields=fields, filters=filters, order_by=order_by, ignore_permissions=True
	)
	

	return {"pages": all_pages, "has_access": has_access}
