import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  todos = [];

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo = {
      id: Date.now(),
      ...createTodoDto,
      completed: false,
      date: new Date(),
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    if (!this.todos.find((todo) => todo.id === id)) {
      throw new NotFoundException();
    }

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          ...updateTodoDto,
        };
      }
      return todo;
    });

    return this.todos.find((todo) => todo.id === id);
  }

  remove(id: number) {
    if (!this.todos.find((todo) => todo.id === id)) {
      throw new NotFoundException();
    }

    this.todos = this.todos.filter((todo) => todo.id !== id);
    return `Todo with id ${id} has been removed`;
  }
}
