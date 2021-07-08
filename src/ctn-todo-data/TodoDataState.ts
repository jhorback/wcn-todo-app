export {TodoDataState};

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
    text: String
};