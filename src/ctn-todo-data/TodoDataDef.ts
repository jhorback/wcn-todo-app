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

    images: {
        /** is true if a request is in process. */
        isLoading: Boolean,
        urls: Array<string>
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
        images:{
            isLoading: false,
            urls: []
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
    
    static deleteImage = (index: number) =>
        newEvent("delete-image", {index});
};



const newEvent = (name: string, detail?: object) => new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail
});