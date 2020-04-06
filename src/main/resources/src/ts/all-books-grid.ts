import * as moment from "moment";
import * as bootstrap from "bootstrap";
let isbn  = "";
interface BorrowInfo {
    username: string,
    isbn: string,
    duration: string,
    readerid: number
}
function borrowModal() {
    $('#borrow-modal').modal("show");
    $(".modal-title").html($(this).children('td[data-field="title"]').children("div").html());
    isbn = $(this).children('td[data-field="isbn"]').children("div").html();
    let borrowinfo = {} as BorrowInfo;
    borrowinfo.duration=$("#duration").val().toString();
    borrowinfo.isbn = isbn;
    borrowinfo.username = sessionStorage.getItem("username");
    borrowinfo.readerid = JSON.parse(sessionStorage.userInfo).readerid;
    $("#borrow").on("click", async function(){
        debugger
        if(sessionStorage.username === $("#borrow-confirm").val()) {
            const response = await fetch("/api/borrow", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(borrowinfo)
            });
            const flag = await response.json();
            console.log(flag);
        }
    });
}
export let books  = {
    settings: {
        excel:{
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
                    const response = await fetch("/api/books", {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        },
                    });
                    const deals = await response.json();
                    options.success(deals);
                }
            },
            schema: {
                model: {
                    fields: {
                        docid: { type: "number" },
                        title: { type: "string" },
                        pdate: { type: "date" },
                        publisher: {type: "string"},
                        isbn: { type: "string" },
                        genre: { type: "string" }
                    }
                }
            },
            pageSize: 20,
        }),
        dataBound:function () {
            $("#all-books-grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr").on("click",borrowModal);
        },
        scrollable: true,
        sortable: true,
        pageable: true,
        filterable: true,
        columns:[
            {
                field: "title",
                title: "Title",
                width: "100px",
                filterable: false,
                template: function (dataRow: { title: string; }) {
                    return `<div class = "cut-text" ">${dataRow.title}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Title</div>'
            },
            {
                field: "pdate",
                title: "Publish Date",
                width: "63px",
                filterable: {
                    ui: function (element: any) {
                        element.kendoDatePicker({
                            format: '{0: dd-MM-yyyy}'
                        })
                    }
                },
                template: function (dataRow: { pdate: Date; }) {
                    if (dataRow.pdate.getDay() === 1)
                        return '<div style="font-weight: bold; color: black; "></div>';
                    return `<div class = "cut-text" ">${moment(dataRow.pdate).format("LL")}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Publish Date</div>'
            },
            {
                field: "publisher",
                title: "Publisher",
                width: "63px",
                filterable: false,
                template: function (dataRow: { publisher: string; }) {
                    return `<div class = "cut-text" ">${dataRow.publisher}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Publisher</div>'
            },
            {
                field: "isbn",
                title: "ISBN",
                width: "63px",
                filterable: false,
                template: function (dataRow: { isbn: string; }) {
                    return `<div class = "cut-text" ">${dataRow.isbn}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">ISBN</div>'
            },
            {
                field: "genre",
                title: "Genre",
                width: "100px",
                filterable: false,
                template: function (dataRow: { genre: string; }) {
                    return `<div class = "cut-text" ">${dataRow.genre}</div>`;
                },
                headerTemplate: '<div style="font-weight: bold; color: black; ">Genre</div>'
            }
        ]
    } as kendo.ui.GridOptions
}