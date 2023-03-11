frappe.views.ListView = class ListView extends frappe.views.ListView {

    constructor(opts) {
	super(opts);
	//	this.show();
    console.log("ListView");
	}

    after_render() {
        super.after_render();
		console.log(this);
    }

}; 