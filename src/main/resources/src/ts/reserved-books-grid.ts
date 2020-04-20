import * as moment from "moment";
import {calculateFine} from "./functions";

let bornumber: number;

function returnModal() {
    $("#return-modal").modal("show");
    $(".modal-title").html($(this).children('td[data-field="title"]').children("div").html());
    bornumber = parseInt($(this).children('td[data-field="bornumber"]').children("div").html());
}

export let reservedBooks = {
    settings: {
        excel: {
            fileName: "BookExport.xlsx",
            allPages: true
        },
        excelExport: function (e) {
            let columns = e.workbook.sheets[0].columns;
            columns.forEach(function (column) {
                delete column.width;
                column.autoWidth = true;
            });
        },
        dataSource: new kendo.data.DataSource({
            transport: {
                read: async function (options) {
                    const response = await fetch("/api/borrowed", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        },
                        body: JSON.stringify({readerID: JSON.parse(sessionStorage.userInfo).readerid})
                    });
                    const borrowed = await response.json();
                    options.success(borrowed);
                }
            },
            schema: {
                model: {
                    fields: {
                        bornumber: {type: "number"},
                        title: {type: "string"},
                        btime: {type: "date"},
                        rtime: {type: "date"},
                        fines: {type: "number"},
                        duedate: {type: "date"}
                    }
                }
            },
            pageSize: 15,
            sort: {field: "duedate", dir: "asc"},
        }),
        dataBound: function () {
            $("#borrowed-books-grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr").off("click", returnModal);
            $("#borrowed-books-grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr").on("click", returnModal);
        },
        scrollable: true,
        sortable: true,
        pageable: true,
        filterable: true,
        columns: [
            {
                field: "bornumber",
                title: "Borrow Number",
                width: "50px",
                filterable: false,
                template: function (dataRow: { bornumber: string; }) {
                    return `<div class = "cut-text" ">${dataRow.bornumber}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Borrow Number</div>'
            },
            {
                field: "title",
                title: "Title",
                width: "63px",
                filterable: false,
                template: function (dataRow: { title: string; }) {
                    return `<div class = "cut-text" ">${dataRow.title}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Title</div>'
            },
            {
                field: "btime",
                title: "Borrowed",
                width: "63px",
                filterable: {
                    ui: function (element: any) {
                        element.kendoDatePicker({
                            format: '{0: dd-MM-yyyy}'
                        })
                    }
                },
                template: function (dataRow: { btime: Date; }) {
                    if (dataRow.btime === null)
                        return '<div style="font-weight: bold; color: black; "></div>';
                    return `<div class = "cut-text" ">${moment(dataRow.btime).format("LL")}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Borrowed</div>'
            },
            {
                field: "rtime",
                title: "Return Date",
                width: "63px",
                filterable: {
                    ui: function (element: any) {
                        element.kendoDatePicker({
                            format: '{0: dd-MM-yyyy}'
                        })
                    }
                },
                template: function (dataRow: { rtime: Date; }) {
                    if (dataRow.rtime === null)
                        return '<div style="font-weight: bold; color: black; "></div>';
                    return `<div class = "cut-text" >${moment(dataRow.rtime).format("LL")}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Return Date</div>'
            },
            {
                field: "fines",
                title: "Fines",
                width: "63px",
                filterable: false,
                template: function (dataRow: { duedate: Date; }) {
                    return `<div class = "cut-text" >$${calculateFine(dataRow.duedate) > 0 ? calculateFine(dataRow.duedate) : 0}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Fines</div>'
            },
            {
                field: "duedate",
                title: "Due",
                width: "63px",
                filterable: {
                    ui: function (element: any) {
                        element.kendoDatePicker({
                            format: '{0: dd-MM-yyyy}'
                        })
                    }
                },
                template: function (dataRow: { duedate: Date; }) {
                    if (dataRow.duedate === null)
                        return '<div style="font-weight: bold; color: black; "></div>';
                    return `<div class = "cut-text" >${moment(dataRow.duedate).format("LL")}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Due</div>'
            }
        ]
    } as kendo.ui.GridOptions
}