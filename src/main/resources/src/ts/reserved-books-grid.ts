import * as moment from "moment";

let resnumber: number;

function pickupModal(e: Event) {
    $("#pickup-modal").modal("show");
    $(".modal-title").html($(this).children('td[data-field="title"]').children("div").html());
    let grid = $("#reserved-books-grid").data("kendoGrid");
    let readerOBJ = grid.dataItem(this);
    resnumber = readerOBJ.get("resnumber");
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
                    const response = await fetch("/api/reserved", {
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
                        resnumber: {type: "number"},
                        title: {type: "string"},
                        rtime: {type: "date"}
                    }
                }
            },
            pageSize: 15,
            sort: {field: "duedate", dir: "asc"},
        }),
        dataBound: function () {
            $("#reserved-books-grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr").off("click");
            $("#reserved-books-grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr").on("click", pickupModal);
        },
        scrollable: true,
        sortable: true,
        pageable: true,
        filterable: true,
        columns: [
            {
                field: "resnumber",
                title: "Reserve Number",
                width: "50px",
                filterable: false,
                template: function (dataRow: { resnumber: string; }) {
                    return `<div class = "cut-text" ">${dataRow.resnumber}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Reserve Number</div>'
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
                field: "rtime",
                title: "Reserved",
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
                    return `<div class = "cut-text" ">${moment(dataRow.rtime).format("LL")}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Reserved</div>'
            }
        ]
    } as kendo.ui.GridOptions
}