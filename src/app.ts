showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

enum NoteStatus {
    Pending,
    Completed
}

class Note {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public createdAt: Date,
        public editedAt: Date,
        public status: NoteStatus,
        public confirmationRequired: boolean
    ) {}
}

class TodoList {
    private notes: Note[] = [];

    // використовую типи відносин між об'єктами однонаправлена асоціація а саме її підвид Композиція - сильний звʼязок, в класі TodoList створюється клас Note який буде знищено разом з TodoList
    addNote(title: string, content: string, confirmationRequired: boolean): void {
        const id = 1;// Math.floor(Math.random() * 1000000);
        const now = new Date();
        const newNote = new Note(id, title, content, now, now, NoteStatus.Pending, confirmationRequired);
        this.notes.push(newNote);
    }

    deleteNoteById(id: number): void {
        const index = this.notes.findIndex(note => note.id === id);
        if (index !== -1) {
            if (this.notes[index].confirmationRequired) {
                console.log('Confirmation required for deletion');
            } else {
                this.notes.splice(index, 1);
            }
        } else {
            console.log('Note with id', id, 'not found');
        }
    }

    editNoteById(id: number, newTitle: string, newContent: string): void {
        const index = this.notes.findIndex(note => note.id === id);
        if (index !== -1) {
            if (this.notes[index].confirmationRequired) {
                console.log('Confirmation required for editing');
            } else {
                const now = new Date();
                this.notes[index].title = newTitle;
                this.notes[index].content = newContent;
                this.notes[index].editedAt = now;
            }
        } else {
            console.log('Note with id', id, 'not found');
        }
    }

    getNoteById(id: number): Note | undefined {
        return this.notes.find(note => note.id === id);
    }

    getAllNotes(): Note[] {
        return this.notes;
    }

    markNoteAsCompleted(id: number): void {
        const index = this.notes.findIndex(note => note.id === id);
        this.notes[index].status = NoteStatus.Completed;
    }

    getTotalNotesCount(): number {
        return this.notes.length;
    }

    getPendingNotesCount(): number {
        return this.notes.filter(note => note.status === NoteStatus.Pending).length;
    }

    searchNotesByKeyword(keyword: string): Note[] {
        return this.notes.filter(note => note.title.includes(keyword) || note.content.includes(keyword));
    }

    sortNotesByStatus(): void {
        this.notes.sort((a, b) => a.status - b.status);
    }

    sortNotesByCreationDate(): void {
        this.notes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}

const todoList = new TodoList();
todoList.addNote('watch a lecture on TypeScript', 'Object-oriented programming', false);

console.log(todoList.getAllNotes());
todoList.deleteNoteById(1);
console.log(todoList.getAllNotes());

todoList.addNote('watch a lecture on TypeScript', 'Object-oriented programming', true);
console.log(todoList.getNoteById(1));
todoList.markNoteAsCompleted(1);
console.log(todoList.getNoteById(1));
console.log(todoList.searchNotesByKeyword('TypeScript'));
console.log(todoList.getTotalNotesCount());


