export { TodoDataDef, TodoListName, TodoDataState, TodoItem };


enum TodoListName {
    TodoItems = "todoItems",
    DoneItems = "doneItems"
}

type TodoDataState = {
    /** The list of items todo. */
    todoItems: Array<TodoItem>,

    /** The list of completed todo items. */
    doneItems: Array<TodoItem>,

    dogs: {
        /** Is true if a request is in process. */
        isLoading: Boolean,
        dogItems: Array<Object>
    }
};

type TodoItem = {
    /** The todo text. */
    text: String,
    done: boolean
};

class TodoDataDef {
    static defaultState : TodoDataState = {
        todoItems: [],
        doneItems: [],
        dogs:{
            isLoading: false,
            dogItems: []
        }
    };

    static addTodoEvent = (text: string) =>
        newEvent("add-todo", {text});

    static toggleTodoItem = (listName: TodoListName, index: number) =>
        newEvent("toggle-todo-item", {listName, index});

    static deleteTodoEvent = (listName: TodoListName, index: number) =>
        newEvent("delete-todo", {listName, index});

    static deleteAllCompletedEvent = () =>
        newEvent("delete-completed-todos");
};



const newEvent = (name: string, detail?: object) => new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail
});