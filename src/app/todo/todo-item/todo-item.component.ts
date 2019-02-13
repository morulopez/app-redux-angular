import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  chkField: FormControl;
  txtInput: FormControl;
  probando: FormControl;
  editando: boolean;
  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.chkField = new FormControl( this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.probando = new FormControl();
    this.chkField.valueChanges.subscribe( () => {
      const accion = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });

  }
  editar() {
    this.editando = true;
    this.txtInputFisico.nativeElement.focus();   /*oooo tambien ponemos this.txtInputFisico.nativeElement.select();*/
  }
  terminarEdicion() {
    this.editando = false;
    const accion = new EditarTodoAction(this.todo.id, this.txtInput.value);
    this.store.dispatch(accion);
    console.log(this.todo.id);
  }
  borrar_todo() {
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }

}
