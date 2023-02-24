import frappe

def execute():
    default_menu = frappe.get_doc({
        "doctype": "MyMenu",
        "name": "Default Menu",
        "menu_name": "Default Menu",
        "items": [
            {
                "doctype": "Globale Menu item",
                "item_name": "Accueil",
                "icon": "organization",
                "route": "home",
                "is_group": 0,
                "idx": 1
            },
            {
                "doctype": "Globale Menu item",
                "item_name": "Clients",
                "icon": "share-people",
                "route": "customer",
                "is_group": 0,
                "idx": 2
            },
            {
                "doctype": "Globale Menu item",
                "item_name": "Articles",
                "icon": "projects",
                "route": "item",
                "is_group": 0,
                "idx": 3
            },
            {
                "doctype": "Globale Menu item",
                "item_name": "Ventes",
                "icon": "retail",
                "is_group": 1,
                "idx": 4,
                "parent_globale_menu_item": "Ventes",
                "items": [
                    {
                        "doctype": "Globale Menu item",
                        "item_name": "Devis",
                        "route": "quotation",
                        "is_group": 0,
                        "idx": 1
                    },
                    {
                        "doctype": "Globale Menu item",
                        "item_name": "Commandes",
                        "route": "sales-order",
                        "is_group": 0,
                        "idx": 2
                    },
                    {
                        "doctype": "Globale Menu item",
                        "item_name": "Factures",
                        "route": "sales-invoice",
                        "is_group": 0,
                        "idx": 3
                    }
                ]
            },
            {
                "doctype": "Globale Menu item",
                "item_name": "Achats",
                "icon": "assets",
                "route": "purchase",
                "is_group": 0,
                "idx": 5
            },
            {
                "doctype": "Globale Menu item",
                "item_name": "Stock",
                "icon": "stock",
                "is_group": 0,
                "idx": 6
            },
            {
                "doctype": "Globale Menu item",
                "item_name": "Demande d'achat",
                "route": "supplier-quotation",
                "is_group": 0,
                "idx": 7
            }
        ]
    })
    default_menu.insert()
