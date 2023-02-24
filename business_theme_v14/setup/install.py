import frappe


def after_install():
    create_main_menu()



def create_main_menu():
    doc = frappe.get_doc({
    'doctype': 'Task',
    'title': 'New Task'
    })
    doc.insert()