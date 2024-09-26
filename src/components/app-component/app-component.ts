import { html, render } from "lit-html"
import { Model, store } from "../../model/model"
import { ToDo } from "../../model/todo"
import { map } from "rxjs"

interface RowViewModel {
    id: number
    text: string
}
interface ViewModel {
    header: string
    rows: RowViewModel[]
}
class AppComponent extends HTMLElement {
    connectedCallback() {
        console.log("App component connected")
        store
            .pipe(map(toViewModel))
            .subscribe(model => {
                const html = todoTable(model)
                render(html, this)
        })
    }
}
customElements.define("app-component", AppComponent)

function toViewModel(model: Model) {
    function totoDoModel(toDo: ToDo) {
        const toModel: RowViewModel = {
            id: toDo.id,
            text: toDo.title
        }
        return toModel
    }
    const rows = model.todos.map(totoDoModel)
    const viewModel: ViewModel = {
        header: "Title",
        rows
    }
    return viewModel
}

function todoTable(vm: ViewModel) {
    const todoTemplate = vm.rows.map(todoRow)
    return html`
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>${vm.header}</th>
                </tr>
            </thead>
            <tbody>
                ${todoTemplate}
            </tbody>
        </table>
    `
}
function todoRow(toDo: RowViewModel) {
    return html`
        <tr>
            <td>${toDo.id}</td>
            <td>${toDo.text}</td>
        </tr>
    `
}